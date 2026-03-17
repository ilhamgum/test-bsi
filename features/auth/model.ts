import UserRole from "@/common/constants/user-role"

export interface AuthState {
    currentRole: UserRole
    setRole: (role: UserRole) => void
}
