import Medusa from "@medusajs/medusa-js"

export const medusaClient = new Medusa({
  baseUrl: "http://localhost:9000", 
  maxRetries: 3,
  publishableApiKey: "pk_477d1ad0d408595725cb76e4dea6d102d610e93d087c1c80984a3c4ca93c5ac9", // ✅ Replace with your real key
})
