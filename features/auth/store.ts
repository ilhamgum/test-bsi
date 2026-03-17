"use client"

import { create } from "zustand"

import { AuthState, UserRole } from "./model"

export const useAuthStore = create<AuthState>((set) => ({
    currentRole: "staff" as UserRole,
    setRole: (role: UserRole) => set({ currentRole: role }),
}))
