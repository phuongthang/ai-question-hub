import { create } from "zustand"

interface UserProfile {
  name: string
  role: string
  avatar: string
}

interface AuthState {
  isLoggedIn: boolean
  user: UserProfile | null
  login: (email: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  user: localStorage.getItem("isLoggedIn") === "true" 
    ? {
        name: "Nguyễn Thắng",
        role: "common.admin",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeh_DdUfOkeyLYccPWRR2dgrQpb7d12vuoIti1h8RwhuHJig5rnJUX-S5rQf9bAj3oVmqHjLK8dfIdW_5GKDaLaMikR06lazODXrbELXk-iGjWMv9qB9cjmfplgGAj1rCNv_x7L7ctB-Gm4h2vCZjWfrEjpOOYxjHBt8LWCtIj7OHuCe-hYJC-GUz3yA0WpdgL4K8bl7aRmILjG01T-pV785Xj9Y9iaLVKSQOvnN1fV8ZdMWfo1Vh3oRp94KE7WJPnTdPNjs4mxtw"
      }
    : null,
  login: (email: string) => {
    localStorage.setItem("isLoggedIn", "true")
    set({
      isLoggedIn: true,
      user: {
        name: email.split("@")[0] || "Nguyễn Thắng",
        role: "common.admin",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeh_DdUfOkeyLYccPWRR2dgrQpb7d12vuoIti1h8RwhuHJig5rnJUX-S5rQf9bAj3oVmqHjLK8dfIdW_5GKDaLaMikR06lazODXrbELXk-iGjWMv9qB9cjmfplgGAj1rCNv_x7L7ctB-Gm4h2vCZjWfrEjpOOYxjHBt8LWCtIj7OHuCe-hYJC-GUz3yA0WpdgL4K8bl7aRmILjG01T-pV785Xj9Y9iaLVKSQOvnN1fV8ZdMWfo1Vh3oRp94KE7WJPnTdPNjs4mxtw"
      }
    })
  },
  logout: () => {
    localStorage.removeItem("isLoggedIn")
    set({ isLoggedIn: false, user: null })
  }
}))
