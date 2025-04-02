export async function fetchWithCloudflareCache(
  key: string,
  fetchFunction: () => Promise<any>,
  ttl = 300,
): Promise<any> {
  const cached = await caches.default.match(new Request(key))

  if (cached) {
    return cached.clone().text()
  }

  const data = await fetchFunction()

  const response = new Response(data)
  response.headers.set('Cache-Control', `s-maxage=${ttl}`)
  await caches.default.put(new Request(key), response)

  return data
}
