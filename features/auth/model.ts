export type UserRole = "staff" | "officer"

export interface AuthState {
    currentRole: UserRole
    setRole: (role: UserRole) => void
}
