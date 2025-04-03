import { fetchNotionDatabase } from './api/notion'
import { fetchWithCloudflareCache } from './utils/memoryCache'

/**
 * Cloudflare Worker entry point.
 * Handles incoming requests and interacts with Notion API.
 * @param request - The incoming Request object.
 * @param env - Environment variables set in the Cloudflare dashboard.
 * @returns A Response object to be sent to the client.
 */
export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
  ): Promise<Response> {
    try {
      const url = new URL(request.url)

      // Ignore favicon.ico requests
      if (url.pathname === '/favicon.ico') {
        return new Response(null, { status: 204 })
      }

      // Extract Notion credentials from environment variables
      const databaseId = env.NOTION_DATABASE_ID
      const notionToken = env.NOTION_TOKEN

      // Validate Notion API token
      if (!notionToken || !/^[\w-]+$/.test(notionToken)) {
        return new Response(
          JSON.stringify({ error: 'Invalid or missing Notion API token' }),
          { status: 400 },
        )
      }

      // Validate Notion Database ID
      if (!databaseId || !/^[a-f0-9]{32}$/i.test(databaseId)) {
        return new Response(
          JSON.stringify({ error: 'Invalid or missing Notion Database ID' }),
          { status: 400 },
        )
      }

      // Generate cache key based on request URL
      const cacheKey = decodeURIComponent(url.toString())

      const data = await fetchWithCloudflareCache(cacheKey, () =>
        fetchNotionDatabase(databaseId, notionToken))

      // Prepare response
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 's-maxage=300, stale-while-revalidate=60',
        },
      })
    }
    catch (error: any) {
      console.error('Error processing request:', error.message || error)
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
      })
    }
  },
}
