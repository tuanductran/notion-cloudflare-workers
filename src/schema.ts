import { z } from 'zod'

const NotionAuthorSchema = /* @__PURE__ */ (() => z.strictObject({
  properties: z.strictObject({
    Title: z.strictObject({
      title: z.array(z.strictObject({
        plain_text: z.string(),
      })),
    }),
  }),
}))()

const NotionPageSchema = /* @__PURE__ */ (() => z.strictObject({
  authors: z.array(z.string()),
  created_at: z.string(),
  current_page: z.number(),
  description: z.string(),
  id: z.string(),
  page_url: z.string(),
  status: z.string(),
  time_reading: z.string(),
  title: z.string(),
  total_pages: z.number(),
  updated_at: z.string(),
}))()

const NotionAPIResultSchema = /* @__PURE__ */ (() => z.strictObject({
  created_time: z.string(),
  id: z.string(),
  last_edited_time: z.string(),
  properties: z.strictObject({
    'Title': z.strictObject({
      title: z.array(z.strictObject({
        plain_text: z.string(),
      })),
    }),
    'Description': z.strictObject({
      rich_text: z.array(z.strictObject({
        plain_text: z.string(),
      })),
    }),
    'Total pages': z.strictObject({
      number: z.number(),
    }),
    'Current page': z.strictObject({
      number: z.number(),
    }),
    'Status': z.strictObject({
      rollup: z.strictObject({
        array: z.array(z.strictObject({
          formula: z.strictObject({
            string: z.string(),
          }),
        })),
      }),
    }),
    'Time reading': z.strictObject({
      formula: z.strictObject({
        string: z.string(),
      }),
    }),
    'Authors': z.strictObject({
      relation: z.array(z.strictObject({
        id: z.string(),
      })),
    }),
  }),
  url: z.string(),
}))()

const NotionAPIResponseSchema = /* @__PURE__ */ (() => z.strictObject({
  has_more: z.boolean(),
  next_cursor: z.string().nullable(),
  results: z.array(NotionAPIResultSchema),
}))()

export { NotionAPIResponseSchema, NotionAuthorSchema, NotionPageSchema }
