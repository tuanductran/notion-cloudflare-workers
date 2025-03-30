import { NotionPage, NotionAPIResponse } from "./types";

/**
 * Fetch all pages from a Notion database with pagination.
 * @param databaseId - The ID of the Notion database.
 * @param token - The Notion API token.
 * @returns A formatted array of Notion pages.
 */
export async function fetchNotionDatabase(
  databaseId: string,
  token: string,
): Promise<NotionPage[]> {
  let hasMore = true;
  let nextCursor: string | null = null;
  const allResults: NotionPage[] = [];

  while (hasMore) {
    const requestBody: Record<string, any> = {
      page_size: 100,
      ...(nextCursor && { start_cursor: nextCursor }),
    };

    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Notion data: ${response.status} ${response.statusText}`,
      );
    }

    const data: NotionAPIResponse = await response.json();
    hasMore = data.has_more;
    nextCursor = data.next_cursor || null;

    // Format Notion pages
    const formattedResults: NotionPage[] = data.results
      .filter((page) => page.object === "page")
      .map((page) => ({
        id: page.id,
        title: page.properties?.Title?.title?.[0]?.plain_text || "Untitled",
        createdAt: page.created_time,
        updatedAt: page.last_edited_time,
        public_url: page.public_url,
        status: page.properties?.Status?.formula?.string || "Unknown",
      }));

    allResults.push(...formattedResults);
  }

  // Sort results by creation date (newest first)
  return allResults.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
