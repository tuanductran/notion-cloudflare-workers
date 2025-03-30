/**
 * Stores a response in the Cloudflare cache.
 * @param request - The Request object used as the cache key.
 * @param response - The Response object to be cached.
 */
export async function saveToCache(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const cacheStorage = await caches.open("notion-books");
    await cacheStorage.put(request, response.clone());
  } catch (error) {
    console.error("Error saving to cache:", error);
  }
}

/**
 * Retrieves a cached response if available.
 * @param request - The Request object used as the cache key.
 * @returns The cached Response or null if not found.
 */
export async function getFromCache(request: Request): Promise<Response | null> {
  try {
    const cacheStorage = await caches.open("notion-books");
    return (await cacheStorage.match(request)) ?? null;
  } catch (error) {
    console.error("Error retrieving from cache:", error);
    return null;
  }
}
