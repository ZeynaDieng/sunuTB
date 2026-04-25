// Composable for Orion API integration - Updated with real endpoints
import type { OrionProduct, OrionStore, OrionAPIResponse, OrionPaginatedResponse } from '~/types/orion'

export const useOrionAPI = () => {
  const config = useRuntimeConfig()
  
  const apiBase = config.orionApiBase || 'https://api.orionsn.com/api'
  const storeSlug = config.orionStoreSlug || 'sunu-tawfekh-boutique'
  
  // Generic API request function
  const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${apiBase}/${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
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
      console.error('Orion API Error:', error)
      throw error
    }
  }
  
  // Get store information
  const getStoreInfo = async (): Promise<OrionStore> => {
    return apiRequest(storeSlug)
  }
  
  // Get all products with pagination
  const getProducts = async (params?: {
    page?: number
    pageSize?: number
    populate?: boolean
    category?: string
    search?: string
  }): Promise<OrionPaginatedResponse<OrionProduct>> => {
    const queryParams = new URLSearchParams({
      page: (params?.page || 1).toString(),
      pageSize: (params?.pageSize || 20).toString(),
      populate: (params?.populate || true).toString(),
      ...(params?.category && { category: params.category }),
      ...(params?.search && { search: params.search }),
    })
    
    return apiRequest(`products/store/${storeSlug}?${queryParams.toString()}`)
  }
  
  // Get single product by slug or ID (search in products list)
  const getProduct = async (productSlug: string): Promise<OrionProduct> => {
    // Get all products and find the one we need
    const response: OrionPaginatedResponse<OrionProduct> = await apiRequest(
      `products/store/${storeSlug}?pageSize=100&populate=true`
    )
    
    // Handle the actual API response structure
    let products: OrionProduct[] = []
    if (response.data && response.data.items) {
      products = response.data.items
    } else if (response.data && Array.isArray(response.data)) {
      products = response.data
    }
    
    const product = products.find(p => 
      p._id === productSlug || p.slug === productSlug
    )
    
    if (!product) {
      throw new Error(`Product not found: ${productSlug}`)
    }
    
    return product
  }
  
  // Get products by category
  const getProductsByCategory = async (categorySlug: string, params?: {
    page?: number
    pageSize?: number
    populate?: boolean
  }): Promise<OrionAPIResponse<OrionProduct>> => {
    const queryParams = new URLSearchParams({
      page: (params?.page || 1).toString(),
      pageSize: (params?.pageSize || 20).toString(),
      populate: (params?.populate || true).toString(),
    })
    
    return apiRequest(`products/store/${storeSlug}?category=${categorySlug}&${queryParams.toString()}`)
  }
  
  // Search products
  const searchProducts = async (query: string, params?: {
    page?: number
    pageSize?: number
    populate?: boolean
  }): Promise<OrionAPIResponse<OrionProduct>> => {
    const queryParams = new URLSearchParams({
      search: query,
      page: (params?.page || 1).toString(),
      pageSize: (params?.pageSize || 20).toString(),
      populate: (params?.populate || true).toString(),
    })
    
    return apiRequest(`products/store/${storeSlug}?${queryParams.toString()}`)
  }
  
  // Get featured products (products with high stock or specific status)
  const getFeaturedProducts = async (limit: number = 8): Promise<OrionProduct[]> => {
    const response: OrionAPIResponse<OrionProduct> = await apiRequest(
      `products/store/${storeSlug}?pageSize=${limit}&populate=true&statut=publie`
    )
    return response.data
  }
  
  // Get new arrivals (sorted by creation date)
  const getNewArrivals = async (limit: number = 12): Promise<OrionProduct[]> => {
    const response: OrionAPIResponse<OrionProduct> = await apiRequest(
      `products/store/${storeSlug}?pageSize=${limit}&populate=true&statut=publie`
    )
    // Sort by creation date (newest first)
    return response.data.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }
  
  // Get products on sale
  const getSaleProducts = async (limit: number = 12): Promise<OrionProduct[]> => {
    const response: OrionAPIResponse<OrionProduct> = await apiRequest(
      `products/store/${storeSlug}?pageSize=${limit}&populate=true&statut=publie`
    )
    // Filter products with sale prices
    return response.data.filter(product => product.sale_price_ttc > 0)
  }
  
  return {
    apiRequest,
    getStoreInfo,
    getProducts,
    getProduct,
    getProductsByCategory,
    searchProducts,
    getFeaturedProducts,
    getNewArrivals,
    getSaleProducts,
  }
}
