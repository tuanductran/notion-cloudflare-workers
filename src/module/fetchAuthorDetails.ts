import type { z } from 'zod'
import type { NotionAuthorSchema } from '../schema'

type NotionAuthor = z.infer<typeof NotionAuthorSchema>

export async function fetchAuthorDetails(authorId: string, token: string): Promise<string> {
  const endpoint = `https://api.notion.com/v1/pages/${authorId}`
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Notion-Version': '2022-06-28',
  }

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch author details for ${authorId}: ${response.statusText}`)
    }

    const data: NotionAuthor = await response.json()
    return data.properties?.Title?.title?.[0]?.plain_text ?? 'Unknown Author'
  }
  catch (error) {
    console.error(error)
    return 'Unknown Author'
  }
}
