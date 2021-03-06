type Content = {
  id: number
  content: string
  slug: string
  name: string
  updated_at: string
  created_by?: User
  updated_by: User
}

type User = {
  id: number
  first_name: string
  last_name: string
  roles: Array<{
    role: string
  }>
}

export type { Content, User }
