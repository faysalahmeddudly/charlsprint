import { apiClient } from "./api-client"
import type { Product, ProductFilters, ProductListResponse } from "@/types"

function toQueryString(filters: ProductFilters = {}) {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) params.set(key, String(value))
  })
  const query = params.toString()
  return query ? `?${query}` : ""
}

export const productService = {
  list: (filters?: ProductFilters) =>
    apiClient.get<ProductListResponse>(`/products${toQueryString(filters)}`),
  getBySlug: (slug: string) => apiClient.get<Product>(`/products/${slug}`),
}
