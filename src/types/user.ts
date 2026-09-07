export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  createdAt: string
}

export interface AuthSession {
  user: User
  accessToken: string
  refreshToken?: string
}
