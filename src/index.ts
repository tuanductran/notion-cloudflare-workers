import { Hono } from 'hono'
import { fetchNotionDatabase } from './module/fetchNotionDatabase'

interface Env {
  NOTION_DATABASE_ID: string
  NOTION_TOKEN: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', async (c) => {
  const { NOTION_DATABASE_ID, NOTION_TOKEN } = c.env

  if (!NOTION_DATABASE_ID || !NOTION_TOKEN) {
    return c.json({ error: 'Missing environment variables.' }, 500)
  }

  try {
    const pages = await fetchNotionDatabase(NOTION_DATABASE_ID, NOTION_TOKEN)
    return c.json(pages, 200, {
      'Cache-Control': 's-maxage=300, stale-while-revalidate=60',
      'Access-Control-Allow-Origin': '*',
    })
  }
  catch (error) {
    console.error('[Notion API Error]', error)
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})

export default app
