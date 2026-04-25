// API discovery script for Orion
const API_BASE = 'https://api.orionsn.com/api'
const STORE_SLUG = 'sunu-tawfekh-boutique'

// Test different base URLs and patterns
async function discoverAPI() {
  console.log('=== Orion API Discovery ===')
  
  // Test different base URLs
  const baseUrls = [
    'https://api.orionsn.com/api',
    'https://api.orionsn.com/v1',
    'https://api.orionsn.com/v2',
    'https://orionsn.com/api',
    'https://api.orion.sn/api',
    'https://api.orion.sn/v1'
  ]
  
  // Test common endpoints
  const endpoints = [
    '/health',
    '/status',
    '/ping',
    '/version',
    '/docs',
    '/swagger',
    '/openapi.json',
    '/stores',
    '/products',
    '/categories',
    '/catalog',
    '/shop',
    '/boutique'
  ]
  
  // Test combinations
  for (const baseUrl of baseUrls) {
    console.log(`\n=== Testing Base: ${baseUrl} ===`)
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(baseUrl + endpoint)
        
        if (response.ok) {
          console.log(`\n*** FOUND: ${baseUrl}${endpoint} ***`)
          console.log(`Status: ${response.status}`)
          
          const data = await response.json()
          console.log('Response:', JSON.stringify(data, null, 2))
          
          // If we found a working endpoint, explore it further
          if (endpoint.includes('stores')) {
            console.log('\n--- Exploring stores endpoint ---')
            await exploreStoresEndpoint(baseUrl + endpoint)
          }
          
          return baseUrl + endpoint
        } else if (response.status !== 404) {
          console.log(`${baseUrl}${endpoint}: ${response.status}`)
        }
      } catch (error) {
        // Silently ignore network errors
      }
    }
  }
  
  console.log('\n=== Trying store-specific patterns ===')
  
  // Test store-specific patterns
  const storePatterns = [
    `/stores/${STORE_SLUG}`,
    `/store/${STORE_SLUG}`,
    `/shop/${STORE_SLUG}`,
    `/boutique/${STORE_SLUG}`,
    `/catalog/${STORE_SLUG}`,
    `/products?store=${STORE_SLUG}`,
    `/products?shop=${STORE_SLUG}`,
    `/products?boutique=${STORE_SLUG}`
  ]
  
  for (const pattern of storePatterns) {
    try {
      const response = await fetch(API_BASE + pattern)
      
      if (response.status === 401) {
        console.log(`\n*** REQUIRES AUTH: ${API_BASE}${pattern} ***`)
        console.log('This endpoint exists but needs authentication!')
        return API_BASE + pattern
      } else if (response.ok) {
        console.log(`\n*** WORKING: ${API_BASE}${pattern} ***`)
        const data = await response.json()
        console.log('Response:', JSON.stringify(data, null, 2))
        return API_BASE + pattern
      }
    } catch (error) {
      // Ignore network errors
    }
  }
  
  console.log('\n=== API Discovery Complete ===')
  console.log('Could not find accessible endpoints.')
  console.log('API likely requires:')
  console.log('1. Authentication (API key/token)')
  console.log('2. Different endpoint structure')
  console.log('3. Documentation from Orion team')
  
  return null
}

// Explore stores endpoint if found
async function exploreStoresEndpoint(endpoint) {
  try {
    // Try to get list of stores
    const response = await fetch(endpoint)
    if (response.ok) {
      const data = await response.json()
      console.log('Stores data:', JSON.stringify(data, null, 2))
      
      // If it's an array, look for our store
      if (Array.isArray(data)) {
        const ourStore = data.find(store => 
          store.slug === STORE_SLUG || 
          store.name?.includes('sunu') ||
          store.name?.includes('tawfekh')
        )
        
        if (ourStore) {
          console.log('Found our store:', ourStore)
        }
      }
    }
  } catch (error) {
    console.log('Error exploring stores:', error.message)
  }
}

// Run discovery
discoverAPI().catch(console.error)
