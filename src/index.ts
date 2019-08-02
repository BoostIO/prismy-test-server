import http from 'http'
import listen from 'test-listen'
import { prismy, HandlerClass } from 'prismy'

export async function testServer(
  handlerClass: HandlerClass | HandlerClass[],
  testCallback: (url: string) => any
): Promise<void> {
  const server = new http.Server(prismy(handlerClass))

  const url = await listen(server)
  try {
    await testCallback(url)
  } catch (error) {
    throw error
  } finally {
    server.close()
  }
}
