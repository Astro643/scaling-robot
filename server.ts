import * as http from "node:http"
import { createRequestListener } from "remix/node-fetch-server"

import { assets } from "./app/assets.ts"
import { router } from "./app/router.ts"

const port = Number.parseInt(process.env.PORT ?? "", 10) || 5173

const server = http.createServer(createRequestListener(router.fetch))

server.on("error", (error) => {
  console.error(error)
  process.exit(1)
})

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

let shuttingDown = false

function shutdown() {
  if (shuttingDown) return
  shuttingDown = true
  // Don't hang forever on stuck connections.
  setTimeout(() => process.exit(1), 10_000).unref()
  server.close(() => assets.close().finally(() => process.exit(0)))
  server.closeAllConnections()
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
