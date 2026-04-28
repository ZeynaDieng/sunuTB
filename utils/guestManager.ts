/**
 * Utilitaires pour la gestion des utilisateurs invités et synchronisation des favoris
 */

// Génération et gestion du guest_id
export const getGuestId = (): string => {
  if (typeof window === 'undefined') return ''
  
  let guestId = localStorage.getItem('guest_id')
  if (!guestId) {
    guestId = crypto.randomUUID()
    localStorage.setItem('guest_id', guestId)
  }
  return guestId
}

// Normalisation du numéro de téléphone sénégalais
export const normalizePhoneNumber = (phone: string): string => {
  if (!phone) return ''
  
  // Supprimer tous les caractères non numériques
  const cleaned = phone.replace(/\D/g, '')
  
  // Gérer les différents formats sénégalais
  if (cleaned.startsWith('221')) {
    // Format international: +221 77X XX XX XX ou 22177XXXXXX
    return cleaned.startsWith('221') ? cleaned.slice(3) : cleaned
  } else if (cleaned.startsWith('00')) {
    // Format international: 00221...
    return cleaned.startsWith('00221') ? cleaned.slice(5) : cleaned
  } else {
    // Format local: 77X XX XX XX ou 77XXXXXXX
    return cleaned
  }
}

// Validation du numéro sénégalais
export const isValidSenegalesePhone = (phone: string): boolean => {
  const normalized = normalizePhoneNumber(phone)
  if (!normalized) return false
  
  // Les numéros sénégalais commencent par 77, 76, 70, 78, 75, 76
  const validPrefixes = ['77', '76', '70', '78', '75']
  const prefix = normalized.slice(0, 2)
  
  return normalized.length === 9 && validPrefixes.includes(prefix)
}

// Débounce pour les appels API
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Configuration API pour la synchronisation
export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD 
    ? 'https://api.sunutawfekh.sn' 
    : 'http://localhost:3001',
  ENDPOINTS: {
    FAVORITES_BY_PHONE: '/favorites/by-phone',
    SYNC_FAVORITES: '/favorites/sync',
    LINK_GUEST: '/link-guest'
  }
}

// Fonctions utilitaires pour les appels API
export const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// Types pour l'API
export interface FavoriteSyncRequest {
  guestId: string
  phone: string
  favorites: Array<{
    productId: string
    addedAt: string
  }>
}

export interface FavoriteResponse {
  productId: string
  addedAt: string
}

export interface LinkGuestRequest {
  guestId: string
  phone: string
}
