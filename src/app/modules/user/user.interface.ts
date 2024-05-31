export type TUser = {
  id: string
  password: string
  needsPassowordChange: boolean
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export type TNewUser = {
  password: string
  role: string
  id: string
}
