export interface ProductImage {
  id: string
  url: string
  alt: string
}

export interface ProductVariant {
  id: string
  label: string
  price: number
  stock: number
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  compareAtPrice?: number
  currency: string
  images: ProductImage[]
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  variants?: ProductVariant[]
}

export interface ProductListResponse {
  items: Product[]
  total: number
  page: number
  pageSize: number
}

export interface ProductFilters {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sort?: "newest" | "price-asc" | "price-desc" | "rating"
  page?: number
  pageSize?: number
}
