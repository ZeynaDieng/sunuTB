// Test script to explore Orion API structure
const API_BASE = 'https://api.orionsn.com/api'
const STORE_SLUG = 'sunu-tawfekh-boutique'

// Helper function to make API requests
async function testAPI(endpoint, description) {
  console.log(`\n=== ${description} ===`)
  console.log(`URL: ${endpoint}`)
  
  try {
    const response = await fetch(endpoint)
    console.log(`Status: ${response.status} ${response.statusText}`)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log(`Error: ${errorText}`)
      return null
    }
    
    const data = await response.json()
    console.log('Response structure:')
    console.log(JSON.stringify(data, null, 2))
    
    return data
  } catch (error) {
    console.log(`Network error: ${error.message}`)
    return null
  }
}

// Test all potential endpoints
async function exploreAPI() {
  console.log('=== Orion API Explorer ===')
  console.log(`API Base: ${API_BASE}`)
  console.log(`Store Slug: ${STORE_SLUG}`)
  
  // Test endpoints to explore
  const endpoints = [
    // Store info
    {
      url: `${API_BASE}/stores/${STORE_SLUG}`,
      description: 'Store Information'
    },
    
    // Products
    {
      url: `${API_BASE}/stores/${STORE_SLUG}/products`,
      description: 'All Products'
    },
    
    // Categories
    {
      url: `${API_BASE}/stores/${STORE_SLUG}/categories`,
      description: 'Categories'
    },
    
    // Alternative endpoints (common patterns)
    {
      url: `${API_BASE}/products?store=${STORE_SLUG}`,
      description: 'Products (Alternative)'
    },
    
    {
      url: `${API_BASE}/categories?store=${STORE_SLUG}`,
      description: 'Categories (Alternative)'
    },
    
    // Root API to see available endpoints
    {
      url: `${API_BASE}/`,
      description: 'Root API'
    },
    
    {
      url: `${API_BASE}/stores`,
      description: 'All Stores'
    }
  ]
  
  for (const endpoint of endpoints) {
    await testAPI(endpoint.url, endpoint.description)
  }
  
  console.log('\n=== API Exploration Complete ===')
}

// Run the exploration
exploreAPI().catch(console.error)
