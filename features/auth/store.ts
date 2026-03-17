"use client"

import { create } from "zustand"

import UserRole from "@/common/constants/user-role"

import { AuthState } from "./model"

export const useAuthStore = create<AuthState>((set) => ({
    currentRole: UserRole.STAFF as UserRole,
    setRole: (role: UserRole) => set({ currentRole: role }),
}))
