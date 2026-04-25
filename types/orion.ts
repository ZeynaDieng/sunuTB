// Orion API Types - Based on actual API structure
export interface OrionProduct {
  _id: string
  store: string
  reference: string
  origin: string
  type: 'simple' | 'variable'
  attributes: OrionAttribute[]
  category: string | null
  images: string[]
  nom: string
  description: string
  prix: number
  prix_ttc: number
  taxe: number
  prix_max: number
  taxes: any[]
  profit: number
  sale_price_ht: number
  sale_price_ttc: number
  seen: number
  favoris: string[]
  stock: number
  precommande: number
  manage_stock: boolean
  to_sale: boolean
  mode: string
  vendre_apres_rupture: boolean
  deleted: boolean
  varietes: OrionProductVariant[]
  statut: 'publie' | 'brouillon' | 'archive'
  archived: boolean
  promos: any[]
  createdAt: string
  updatedAt: string
  slug: string
  __v: number
  stock_available: number
  stock_reserved: number
  stock_total: number
  marketplaceStatus: string
  normalized: string
  marketplaceTags?: string[]
  marketplaceId?: number
  marketplacePublishedAt?: string
  marketplaceRejectionReason?: any
  collections?: any
}

export interface OrionProductVariant {
  _id: string
  store: string
  origin: string
  name?: string
  attributes: Array<{
    name: string
    option: string
    slug?: string
  }>
  favoris: string[]
  produitId: string
  manage_stock: boolean
  vendre_apres_rupture: boolean
  fullCarac: string
  description?: string
  prix: number
  prix_ht: number
  prix_ttc: number
  prix_gros_ht: number
  prix_gros_ttc: number
  on_sale: boolean
  sale_price_ht: number
  sale_price_ttc: number
  taxe: number
  taxe_gros: number
  taxe_promo: number
  taxes: any[]
  cout_par_unite: number
  profit: number
  profit_gros: number
  profit_sale: number
  stock: number
  stock_total: number
  stock_reserved: number
  stock_available: number
  deleted: boolean
  seen: number
  statut: 'publie' | 'non publie'
  threshold: number
  promos: any[]
  createdAt: string
  updatedAt: string
  slug: string
  __v: number
  normalized: string
  image?: string
  marketplaceVariationId?: number
}

export interface OrionProductAttribute {
  name: string
  options: string[]
}

export interface OrionStore {
  _id: string
  name: string
  slug: string
  email?: string
  phone?: string
  address?: string
  description?: string
  logo?: string
  banner?: string
  currency?: string
  settings?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface OrionAPIResponse<T> {
  statusCode: number
  data: T[]
}

export interface OrionPaginatedResponse<T> {
  statusCode: number
  data: {
    currentPage: number
    totalPages: number
    totalItems: number
    items: T[]
  }
}
