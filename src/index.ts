import { fetchNotionDatabase } from "./api/notion";

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
    const { NOTION_DATABASE_ID, NOTION_TOKEN } = env;

    // Extract and validate credentials
    if (!NOTION_TOKEN || !/^[\w-]+$/.test(NOTION_TOKEN)) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing Notion API token" }),
        { status: 400 },
      );
    }

    if (!NOTION_DATABASE_ID || !/^[a-f0-9]{32}$/i.test(NOTION_DATABASE_ID)) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing Notion Database ID" }),
        { status: 400 },
      );
    }

    // Ignore favicon.ico requests
    const url = new URL(request.url);
    if (url.pathname === "/favicon.ico") {
      return new Response(null, { status: 204 });
    }

    try {
      const data = await fetchNotionDatabase(NOTION_DATABASE_ID, NOTION_TOKEN);

      // Prepare and send the response
      return new Response(JSON.stringify(data, null, 2), {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error: any) {
      console.error("Error processing request:", error.message || error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  },
};
