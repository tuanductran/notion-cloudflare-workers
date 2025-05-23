import type { z } from 'zod/v4-mini'
import type { NotionAPIResponseSchema, NotionPageSchema } from '../schema'
import { CompareFunctionLookup } from '../utils/compare'
import { fetchAuthorDetails } from './fetchAuthorDetails'

type NotionPage = z.infer<typeof NotionPageSchema>
type NotionAPIResponse = z.infer<typeof NotionAPIResponseSchema>

export async function fetchNotionDatabase(
  databaseId: string,
  token: string,
  sortOrder: 'asc' | 'desc' = 'desc',
): Promise<NotionPage[]> {
  const pages: NotionPage[] = []
  const endpoint = `https://api.notion.com/v1/databases/${databaseId}/query`

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
  }

  let nextCursor: string | null = null

  try {
    let hasMore = true

    while (hasMore) {
      const payload = {
        page_size: 100,
        ...(nextCursor ? { start_cursor: nextCursor } : {}),
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error(
          `Notion API Error: ${response.status} - ${response.statusText}`,
        )
        break
      }

      const data: NotionAPIResponse = await response.json()

      for (const page of data.results) {
        const authors: NotionPage['authors'] = []

        const authorsRelation = page.properties?.Authors?.relation ?? []

        for (const author of authorsRelation) {
          try {
            const authorData = await fetchAuthorDetails(author.id, token)
            authors.push(authorData)
          }
          catch (authorError) {
            console.warn(`Failed to fetch author ${author.id}:`, authorError)
          }
        }

        const formattedPage: NotionPage = {
          authors,
          created_at: page.created_time,
          current_page: page.properties?.['Current page']?.number ?? 0,
          description:
            page.properties?.Description?.rich_text?.[0]?.plain_text
            ?? 'No description',
          id: page.id,
          page_url: page.url,
          status: page.properties?.Status?.formula?.string ?? 'Unknown',
          time_reading:
            page.properties?.['Time reading']?.formula?.string ?? 'Unknown',
          title: page.properties?.Title?.title?.[0]?.plain_text ?? 'Untitled',
          total_pages: page.properties?.['Total pages']?.number ?? 0,
          updated_at: page.last_edited_time,
        }

        pages.push(formattedPage)
      }

      hasMore = data.has_more
      nextCursor = data.next_cursor ?? null
    }

    return pages.sort((a, b) =>
      CompareFunctionLookup[sortOrder](
        new Date(a.created_at),
        new Date(b.created_at),
      ),
    )
  }
  catch (error) {
    console.error('Error while fetching Notion database:', error)
    return []
  }
}
