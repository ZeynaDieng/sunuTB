// Utility to adapt Orion API products to our component format
import type { OrionProduct } from '~/types/orion'

// Adapted product interface for our components
export interface AdaptedProduct {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  images: string[]
  vendor: string
  tags: string[]
  handle: string
  variants: Array<{
    id: string
    title: string
    price: number
    originalPrice: number
    available: boolean
    sku: string
    image: string
    onSale: boolean
    stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock'
    stock: number
    threshold: number
    attributes: Array<{
      name: string
      option: string
      slug?: string
    }>
  }>
  options: Array<{
    name: string
    options: string[]
  }>
  available: boolean
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock'
  stock: number
  threshold: number
  onSale: boolean
  hasVariants: boolean
  createdAt: string
  updatedAt: string
  // Additional fields for complex products
  type: 'simple' | 'variable'
  reference: string
  manage_stock: boolean
  vendre_apres_rupture: boolean
  promos: any[]
}

export const adaptOrionProduct = (product: OrionProduct): AdaptedProduct => {
  
  const variants = getProductVariants(product)
  const availableVariants = getAvailableVariants(product)
  const hasVariants = product.type === 'variable' && variants.length > 0
  const onSale = isOnSale(product)
  
  const price = getPrice(product)
  const originalPrice = getOriginalPrice(product)
  
  return {
    id: product._id,
    name: product.nom || product.name || product.title || '',
    description: product.description || '',
    price: price,
    originalPrice: originalPrice,
    image: getImage(product),
    images: product.images || [],
    vendor: product.store || 'Orion Store',
    tags: product.tags || [],
    handle: product.slug,
    variants: variants.map(v => ({
      id: v._id,
      title: getVariantAttributes(v),
      price: getVariantPrice(v),
      originalPrice: getVariantOriginalPrice(v),
      available: isVariantInStock(v),
      sku: v.slug,
      image: getVariantImage(v, product),
      onSale: isVariantOnSale(v),
      stockStatus: getVariantStockStatus(v),
      stock: v.stock_available,
      threshold: v.threshold,
      attributes: v.attributes
    })) || [],
    options: product.attributes || [],
    available: isInStock(product),
    stockStatus: getStockStatus(product),
    stock: product.stock_available,
    threshold: product.threshold,
    onSale,
    hasVariants,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    // Additional fields for complex products
    type: product.type,
    reference: product.reference,
    manage_stock: product.manage_stock,
    vendre_apres_rupture: product.vendre_apres_rupture,
    promos: product.promos || []
  }
}

export const adaptOrionProducts = (products: any): AdaptedProduct[] => {
  console.log('adaptOrionProducts input:', products)
  console.log('adaptOrionProducts input type:', typeof products)
  
  // Handle different response structures
  let productArray: OrionProduct[] = []
  
  if (Array.isArray(products)) {
    productArray = products
    console.log('Using direct array')
  } else if (products && typeof products === 'object') {
    // Check for paginated response structure: { statusCode, data: { currentPage, totalPages, totalItems, items } }
    if ('data' in products && products.data && 'items' in products.data) {
      productArray = products.data.items || []
      console.log('Using paginated response products.data.items array')
    }
    // Check for simple response structure: { statusCode, data: [] }
    else if ('data' in products && Array.isArray(products.data)) {
      productArray = products.data || []
      console.log('Using simple response products.data array')
    }
    // Check for direct items structure
    else if ('items' in products && Array.isArray(products.items)) {
      productArray = products.items || []
      console.log('Using products.items array')
    }
  }
  
  console.log('Final productArray:', productArray)
  console.log('productArray length:', productArray.length)
  
  if (!Array.isArray(productArray) || productArray.length === 0) {
    console.warn('No valid product array found')
    return []
  }
  
  return productArray.map(adaptOrionProduct)
}

// Helper function to extract price (with promotion support)
export const getPrice = (product: OrionProduct): number => {
  // Check if product is on sale at product level
  if (product.sale_price_ttc && product.sale_price_ttc > 0) {
    return product.sale_price_ttc
  }
  return product.prix_ttc || product.prix || 0
}

// Helper function to extract original price (before discount)
export const getOriginalPrice = (product: OrionProduct): number => {
  return product.prix_ttc || product.prix || 0
}

// Helper function to extract variant price
export const getVariantPrice = (variant: OrionProductVariant): number => {
  // Check if variant is on sale
  if (variant.on_sale && variant.sale_price_ttc && variant.sale_price_ttc > 0) {
    return variant.sale_price_ttc
  }
  return variant.prix_ttc || variant.prix || 0
}

// Helper function to extract variant original price
export const getVariantOriginalPrice = (variant: OrionProductVariant): number => {
  return variant.prix_ttc || variant.prix || 0
}

// Helper function to extract image
export const getImage = (product: OrionProduct): string => {
  // Check if product has valid images
  if (product.images && product.images.length > 0 && product.images[0]) {
    return product.images[0]
  }
  // Return placeholder if no valid images
  return '/placeholder-product.svg'
}

// Helper function to extract variant image
export const getVariantImage = (variant: OrionProductVariant, product: OrionProduct): string => {
  // Check if variant has valid image
  if (variant.image) {
    return variant.image
  }
  // Check if product has valid images
  if (product.images && product.images.length > 0 && product.images[0]) {
    return product.images[0]
  }
  // Return placeholder if no valid images
  return '/placeholder-product.svg'
}

// Helper function to check if product is in stock
export const isInStock = (product: OrionProduct): boolean => {
  return product.stock_available > 0
}

// Helper function to check if variant is in stock
export const isVariantInStock = (variant: OrionProductVariant): boolean => {
  return variant.stock_available > 0
}

// Helper function to get stock status
export const getStockStatus = (product: OrionProduct): 'in_stock' | 'low_stock' | 'out_of_stock' => {
  if (product.stock_available === 0) return 'out_of_stock'
  if (product.threshold && product.stock_available <= product.threshold) return 'low_stock'
  return 'in_stock'
}

// Helper function to get variant stock status
export const getVariantStockStatus = (variant: OrionProductVariant): 'in_stock' | 'low_stock' | 'out_of_stock' => {
  if (variant.stock_available === 0) return 'out_of_stock'
  if (variant.threshold && variant.stock_available <= variant.threshold) return 'low_stock'
  return 'in_stock'
}

// Helper function to check if product is on sale
export const isOnSale = (product: OrionProduct): boolean => {
  return (product.sale_price_ttc && product.sale_price_ttc > 0 && product.sale_price_ttc < product.prix_ttc) ||
         (product.varietes && product.varietes.some(v => v.on_sale))
}

// Helper function to check if variant is on sale
export const isVariantOnSale = (variant: OrionProductVariant): boolean => {
  return variant.on_sale && variant.sale_price_ttc > 0 && variant.sale_price_ttc < variant.prix_ttc
}

// Helper function to get product variants with stock info
export const getProductVariants = (product: OrionProduct): OrionProductVariant[] => {
  return product.varietes || []
}

// Helper function to get available variants
export const getAvailableVariants = (product: OrionProduct): OrionProductVariant[] => {
  return product.varietes?.filter(variant => isVariantInStock(variant)) || []
}

// Helper function to extract product attributes
export const getAttributes = (product: OrionProduct): string[] => {
  if (!product.attributes) return []
  return product.attributes.map(attr => `${attr.name}: ${attr.options.join(', ')}`).filter(Boolean)
}

// Helper function to extract variant attributes
export const getVariantAttributes = (variant: OrionProductVariant): string => {
  return variant.fullCarac || variant.attributes?.map(attr => attr.option).join(' ') || ''
}

// Helper function to calculate discount percentage
export const getDiscountPercentage = (originalPrice: number, salePrice: number): number => {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}
