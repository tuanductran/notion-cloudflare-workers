import type { z } from 'zod/v4-mini'
import type { NotionAuthorSchema } from '../schema'

type NotionAuthor = z.infer<typeof NotionAuthorSchema>

export async function fetchAuthorDetails(
  authorId: string,
  token: string,
): Promise<string> {
  const endpoint = `https://api.notion.com/v1/pages/${authorId}`
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Notion-Version': '2022-06-28',
  }

  try {
    const res = await fetch(endpoint, { method: 'GET', headers })

    if (!res.ok) {
      console.warn(
        `[fetchAuthorDetails] ${authorId} - HTTP ${res.status} ${res.statusText}`,
      )
      return 'Unknown Author'
    }

    const data: NotionAuthor = await res.json()
    const title = data?.properties?.Title?.title?.[0]?.plain_text?.trim()

    return title || 'Unknown Author'
  }
  catch (err) {
    console.warn(`[fetchAuthorDetails] Error fetching ${authorId}:`, err)
    return 'Unknown Author'
  }
}
