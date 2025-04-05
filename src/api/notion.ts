import type { NotionAPIResponse, NotionPage } from '../types'
import { CompareFunctionLookup } from '../utils/compare'

/**
 * Fetch all pages from a Notion database with pagination.
 * @param databaseId - The ID of the Notion database.
 * @param token - The Notion API token.
 * @param sortOrder - The sort order of the pages.
 * @returns A formatted array of Notion pages.
 */
export async function fetchNotionDatabase(
  databaseId: string,
  token: string,
  sortOrder: 'asc' | 'desc' = 'desc',
): Promise<NotionPage[]> {
  try {
    const allResults: NotionPage[] = []
    let hasMore = true
    let nextCursor: string | null = null

    // Paginate through Notion database
    while (hasMore) {
      const requestBody = {
        page_size: 100,
        ...(nextCursor && { start_cursor: nextCursor }),
      }

      const response = await fetch(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      )

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Notion data: ${response.status} ${response.statusText}`,
        )
      }

      const data: NotionAPIResponse = await response.json()
      allResults.push(
        ...data.results.map(page => ({
          id: page.id,
          title: page.properties?.Title?.title?.[0]?.plain_text || 'Untitled',
          total_pages: page.properties?.['Total pages']?.number || 0,
          current_page: page.properties?.['Current page']?.number || 0,
          created_at: page.created_time,
          updated_at: page.last_edited_time,
          public_url: page.public_url,
          status: page.properties?.Status?.formula?.string || 'Unknown',
        })),
      )

      hasMore = data.has_more
      nextCursor = data.next_cursor || null
    }

    // Sort results by creation date (newest first)
    return allResults.sort((a, b) =>
      CompareFunctionLookup[sortOrder](
        new Date(a.created_at),
        new Date(b.created_at),
      ),
    )
  }
  catch (error) {
    console.error('Error fetching Notion database:', error)
    return []
  }
}
