import { fetchNotionDatabase } from './module/fetchNotionDatabase'

export default {
  async fetch(request: Request, env: Record<string, string>): Promise<Response> {
    const { NOTION_DATABASE_ID, NOTION_TOKEN } = env

    const pathname = new URL(request.url).pathname
    if (pathname === '/favicon.ico') {
      return new Response(null, { status: 204 })
    }

    try {
      const pages = await fetchNotionDatabase(NOTION_DATABASE_ID, NOTION_TOKEN)

      return new Response(JSON.stringify(pages, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 's-maxage=300, stale-while-revalidate=60',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }
    catch (err: unknown) {
      const message
        = err instanceof Error ? err.message : 'Unexpected error occurred.'

      console.error('Failed to handle request:', message)

      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
}
