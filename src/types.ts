// Represents a Notion page object
export interface NotionPage {
  id: string
  title: string
  total_pages: number
  current_page: number
  created_at: string
  updated_at: string
  page_url: string
  status: string
  time_reading: string
}

// Represents a Notion API response object
export interface NotionAPIResponse {
  has_more: boolean
  next_cursor?: string
  results: any[]
}
