export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  message: string
  fieldErrors?: Record<string, string[]>
}

export type ApiResult<T> = ApiSuccess<T> | ApiError
