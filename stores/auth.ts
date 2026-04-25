import { defineStore } from 'pinia'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),

  getters: {
    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.firstName} ${state.user.lastName}`.trim()
    },
    initials: (state) => {
      if (!state.user) return '?'
      return `${state.user.firstName.charAt(0)}${state.user.lastName.charAt(0)}`.toUpperCase()
    }
  },

  actions: {
    // Initialiser l'auth depuis localStorage
    initializeAuth() {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('auth')
        if (stored) {
          try {
            const authData = JSON.parse(stored)
            this.user = authData.user
            this.isAuthenticated = authData.isAuthenticated
          } catch (error) {
            console.error('Erreur parsing localStorage auth:', error)
            this.clearAuth()
          }
        }
      }
    },

    // Sauvegarder dans localStorage
    saveToLocalStorage() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify({
          user: this.user,
          isAuthenticated: this.isAuthenticated
        }))
      }
    },

    // Inscription
    async register(userData: {
      email: string
      firstName: string
      lastName: string
      password: string
      phone?: string
      address?: string
    }) {
      this.isLoading = true
      this.error = null

      try {
        // Simuler une API d'inscription
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Vérifier si l'email existe déjà (simulation)
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
        if (existingUsers.some((user: any) => user.email === userData.email)) {
          throw new Error('Cet email est déjà utilisé')
        }

        // Créer le nouvel utilisateur
        const newUser: User = {
          id: `user_${Date.now()}`,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          address: userData.address,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }

        // Sauvegarder l'utilisateur
        existingUsers.push(newUser)
        localStorage.setItem('users', JSON.stringify(existingUsers))

        // Connecter automatiquement après inscription
        this.user = newUser
        this.isAuthenticated = true
        this.saveToLocalStorage()

        this.showNotification('Compte créé avec succès !', 'success')
        return true

      } catch (error: any) {
        this.error = error.message || 'Erreur lors de l\'inscription'
        this.showNotification(this.error, 'error')
        return false
      } finally {
        this.isLoading = false
      }
    },

    // Connexion
    async login(email: string, password: string) {
      this.isLoading = true
      this.error = null

      try {
        // Simuler une API de connexion
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Vérifier les identifiants (simulation)
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find((u: any) => u.email === email)

        if (!user) {
          throw new Error('Email ou mot de passe incorrect')
        }

        // Simuler la vérification du mot de passe
        // En production, on vérifierait le hash du mot de passe

        // Mettre à jour lastLogin
        user.lastLogin = new Date().toISOString()
        const updatedUsers = users.map((u: any) => u.id === user.id ? user : u)
        localStorage.setItem('users', JSON.stringify(updatedUsers))

        // Connecter l'utilisateur
        this.user = user
        this.isAuthenticated = true
        this.saveToLocalStorage()

        this.showNotification('Connexion réussie !', 'success')
        return true

      } catch (error: any) {
        this.error = error.message || 'Erreur lors de la connexion'
        this.showNotification(this.error, 'error')
        return false
      } finally {
        this.isLoading = false
      }
    },

    // Déconnexion
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.error = null
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth')
      }

      this.showNotification('Déconnexion réussie', 'info')
    },

    // Mettre à jour le profil
    async updateProfile(updates: Partial<User>) {
      if (!this.user) return false

      this.isLoading = true
      this.error = null

      try {
        // Simuler une API de mise à jour
        await new Promise(resolve => setTimeout(resolve, 500))

        // Mettre à jour l'utilisateur dans localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const updatedUser = { ...this.user, ...updates }
        
        const updatedUsers = users.map((u: any) => 
          u.id === this.user?.id ? updatedUser : u
        )
        localStorage.setItem('users', JSON.stringify(updatedUsers))

        // Mettre à jour le store
        this.user = updatedUser
        this.saveToLocalStorage()

        this.showNotification('Profil mis à jour !', 'success')
        return true

      } catch (error: any) {
        this.error = error.message || 'Erreur lors de la mise à jour'
        this.showNotification(this.error, 'error')
        return false
      } finally {
        this.isLoading = false
      }
    },

    // Supprimer le compte
    async deleteAccount() {
      if (!this.user) return false

      this.isLoading = true
      this.error = null

      try {
        // Simuler une API de suppression
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Supprimer l'utilisateur de localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const filteredUsers = users.filter((u: any) => u.id !== this.user?.id)
        localStorage.setItem('users', JSON.stringify(filteredUsers))

        // Nettoyer les données de l'utilisateur
        localStorage.removeItem('auth')
        localStorage.removeItem('favorites')
        localStorage.removeItem('cart')

        // Déconnecter
        this.user = null
        this.isAuthenticated = false

        this.showNotification('Compte supprimé avec succès', 'success')
        return true

      } catch (error: any) {
        this.error = error.message || 'Erreur lors de la suppression'
        this.showNotification(this.error, 'error')
        return false
      } finally {
        this.isLoading = false
      }
    },

    // Mettre à jour le mot de passe
    async updatePassword(newPassword: string): Promise<boolean> {
      try {
        if (!this.user) {
          this.error = 'Utilisateur non connecté'
          return false
        }

        // Mettre à jour le mot de passe dans localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const userIndex = users.findIndex((u: any) => u.id === this.user!.id)
        
        if (userIndex !== -1) {
          users[userIndex].password = newPassword
          localStorage.setItem('users', JSON.stringify(users))
          
          // Mettre à jour le mot de passe dans le token
          const token = localStorage.getItem('authToken')
          if (token) {
            const tokenData = JSON.parse(atob(token))
            tokenData.password = newPassword
            const newToken = btoa(JSON.stringify(tokenData))
            localStorage.setItem('authToken', newToken)
          }
          
          return true
        }
        
        this.error = 'Utilisateur non trouvé'
        return false
      } catch (error) {
        console.error('Password update error:', error)
        this.error = 'Erreur lors de la mise à jour du mot de passe'
        return false
      }
    },

    // Nettoyer l'auth
    clearAuth() {
      this.user = null
      this.isAuthenticated = false
      this.error = null
    },

    // Afficher une notification
    showNotification(message: string, type: 'success' | 'error' | 'info') {
      console.log(`[AUTH ${type.toUpperCase()}] ${message}`)
      
      if (typeof window !== 'undefined') {
        // Créer une notification temporaire
        const notification = document.createElement('div')
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 shadow-lg transition-all duration-300 ${
          type === 'success' ? 'bg-green-500' : 
          type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`
        notification.textContent = message
        notification.style.transform = 'translateX(100%)'
        document.body.appendChild(notification)
        
        // Animation d'entrée
        setTimeout(() => {
          notification.style.transform = 'translateX(0)'
        }, 100)
        
        // Animation de sortie
        setTimeout(() => {
          notification.style.transform = 'translateX(100%)'
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification)
            }
          }, 300)
        }, 3000)
      }
    }
  }
})
