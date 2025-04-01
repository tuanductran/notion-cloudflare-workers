/* eslint-disable no-console */
declare const caches: CacheStorage & { default: Cache }

/**
 * Stores a response in Cloudflare's default cache storage.
 * @param request - The Request object used as the cache key.
 * @param response - The Response object to be cached.
 * @param cacheTTL - Time-to-live for cached response (in seconds).
 */
export async function saveToCache(
  request: Request,
  response: Response,
  cacheTTL: number = 300, // Default: 5 minutes
): Promise<void> {
  try {
    const cache = caches.default

    // Ensure response is cloneable
    if (!response || !response.ok) {
      console.warn('Invalid response, not caching.')
      return
    }

    const clonedResponse = response.clone() // Clone response before consuming body

    // Add cache-control headers to control TTL
    const headers = new Headers(clonedResponse.headers)
    headers.set('Cache-Control', `public, max-age=${cacheTTL}`)

    const cachedResponse = new Response(clonedResponse.body, {
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
      headers,
    })

    await cache.put(request, cachedResponse)
    console.log(`Cached response for: ${request.url}`)
  }
  catch (error) {
    console.error('Error saving to cache:', error)
  }
}

/**
 * Retrieves a cached response from Cloudflare's cache storage.
 * @param request - The Request object used as the cache key.
 * @returns The cached Response or null if not found.
 */
export async function getFromCache(request: Request): Promise<Response | null> {
  try {
    const cache = caches.default
    const cachedResponse = await cache.match(request)

    if (cachedResponse) {
      console.log(`Cache hit for: ${request.url}`)
      return cachedResponse.clone() // Clone response before returning
    }

    console.log(`Cache miss for: ${request.url}`)
    return null
  }
  catch (error) {
    console.error('Error retrieving from cache:', error)
    return null
  }
}
