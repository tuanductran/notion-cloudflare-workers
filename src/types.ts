// Represents a Notion page object
export interface NotionPage {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  public_url: string
  status: string
}

// Defines the Notion API response structure
export interface NotionAPIResponse {
  has_more: boolean
  next_cursor?: string
  results: any[]
}
