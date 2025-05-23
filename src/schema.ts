import { z } from 'zod/v4-mini'

export const NotionAuthorSchema = z.object({
  properties: z.object({
    Title: z.object({
      title: z.array(
        z.object({
          plain_text: z.string(),
        }),
      ),
    }),
  }),
})

export const NotionPageSchema = z.object({
  authors: z.array(z.string()),
  created_at: z.iso.datetime(),
  current_page: z.number(),
  description: z.string(),
  id: z.uuid(),
  page_url: z.url(),
  status: z.string(),
  time_reading: z.string(),
  title: z.string(),
  total_pages: z.number(),
  updated_at: z.iso.datetime(),
})

const AuthorRelationSchema = z.object({
  id: z.uuid(),
})

const FormulaStringSchema = z.object({
  string: z.string(),
})

export const NotionAPIResultSchema = z.object({
  created_time: z.iso.datetime(),
  id: z.string(),
  last_edited_time: z.iso.datetime(),
  url: z.url(),
  properties: z.object({
    'Title': z.object({
      title: z.array(
        z.object({
          plain_text: z.string(),
        }),
      ),
    }),
    'Description': z.object({
      rich_text: z.array(
        z.object({
          plain_text: z.string(),
        }),
      ),
    }),
    'Total pages': z.object({
      number: z.number(),
    }),
    'Current page': z.object({
      number: z.number(),
    }),
    'Status': z.object({
      formula: FormulaStringSchema,
    }),
    'Time reading': z.object({
      formula: FormulaStringSchema,
    }),
    'Authors': z.object({
      relation: z.array(AuthorRelationSchema),
    }),
  }),
})

export const NotionAPIResponseSchema = z.object({
  has_more: z.boolean(),
  next_cursor: z.union([z.string(), z.null()]),
  results: z.array(NotionAPIResultSchema),
})
