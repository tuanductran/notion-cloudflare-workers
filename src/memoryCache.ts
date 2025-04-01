const memoryCache = new Map<string, { data: any, expiresAt: number }>()

export async function fetchWithMemoryCache(
  key: string,
  fetchFunction: () => Promise<any>,
  ttl = 300,
): Promise<any> {
  const cached = memoryCache.get(key)
  if (cached && cached.expiresAt > Date.now()) {
    // eslint-disable-next-line no-console
    console.log('Serving from in-memory cache')
    return cached.data
  }

  const data = await fetchFunction()
  memoryCache.set(key, { data, expiresAt: Date.now() + ttl * 1000 })
  return data
}
