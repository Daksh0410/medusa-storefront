import Medusa from "@medusajs/medusa-js"

export const medusa = new Medusa({
  baseUrl: "http://localhost:9000",
  publishableApiKey: "pk_5bc810215aa666ebde46f963e7aa5c0d4674e2720b863c5c94cb3cae64b35e49",
  maxRetries: 3  // ✅ Required in latest version
})

export default medusa




