import { fetchNotionDatabase } from "./notion";
import { getFromCache, saveToCache } from "./cache";

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
      // Extract Notion credentials from environment variables
      const databaseId = env.NOTION_DATABASE_ID;
      const notionToken = env.NOTION_TOKEN;

      // Validate Notion API token
      if (!notionToken || !/^[a-zA-Z0-9_-]+$/.test(notionToken)) {
        return new Response(
          JSON.stringify({ error: "Invalid or missing Notion API token" }),
          { status: 400 },
        );
      }

      // Validate Notion Database ID
      if (!databaseId || !/^[a-fA-F0-9]{32}$/.test(databaseId)) {
        return new Response(
          JSON.stringify({ error: "Invalid or missing Notion Database ID" }),
          { status: 400 },
        );
      }

      // Generate cache key based on request URL
      const url = new URL(request.url);
      const cacheKey = new Request(url.toString(), { method: "GET" });

      // Check if response is already cached
      const cachedResponse = await getFromCache(cacheKey);
      if (cachedResponse) {
        console.log("Serving response from cache");
        return cachedResponse;
      }

      // Fetch fresh data from Notion API
      console.log("Fetching fresh data from Notion API");
      const data = await fetchNotionDatabase(databaseId, notionToken);

      // Prepare response
      const response = new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "s-maxage=300, stale-while-revalidate=60", // Cache for 5 minutes
        },
      });

      // Store response in cache for future requests
      await saveToCache(cacheKey, response);
      return response;
    } catch (error: any) {
      console.error("Error processing request:", error.message || error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  },
};
