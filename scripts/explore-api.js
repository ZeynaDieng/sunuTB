// Advanced API explorer with authentication and different endpoints
const API_BASE = 'https://api.orionsn.com/api'
const STORE_SLUG = 'sunu-tawfekh-boutique'

// Helper function to make API requests with different headers
async function testAPI(endpoint, description, headers = {}) {
  console.log(`\n=== ${description} ===`)
  console.log(`URL: ${endpoint}`)
  if (Object.keys(headers).length > 0) {
    console.log(`Headers: ${JSON.stringify(headers, null, 2)}`)
  }
  
  try {
    const response = await fetch(endpoint, { headers })
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

// Test different authentication methods and endpoint patterns
async function exploreAPI() {
  console.log('=== Advanced Orion API Explorer ===')
  console.log(`API Base: ${API_BASE}`)
  console.log(`Store Slug: ${STORE_SLUG}`)
  
  // Test different authentication approaches
  const authMethods = [
    { name: 'No Auth', headers: {} },
    { name: 'API Key Header', headers: { 'X-API-Key': 'test-key' } },
    { name: 'Bearer Token', headers: { 'Authorization': 'Bearer test-token' } },
    { name: 'Store Header', headers: { 'X-Store': STORE_SLUG } },
    { name: 'Content-Type', headers: { 'Content-Type': 'application/json' } }
  ]
  
  // Test different endpoint patterns
  const endpointPatterns = [
    // Direct store endpoints
    `/stores/${STORE_SLUG}`,
    `/stores/${STORE_SLUG}/products`,
    `/stores/${STORE_SLUG}/catalog`,
    `/stores/${STORE_SLUG}/items`,
    
    // Catalog endpoints
    `/catalog`,
    `/catalog/products`,
    `/catalog/items`,
    
    // Product endpoints with store parameter
    `/products?store=${STORE_SLUG}`,
    `/products?slug=${STORE_SLUG}`,
    `/products?shop=${STORE_SLUG}`,
    
    // Store endpoints
    `/store/${STORE_SLUG}`,
    `/shop/${STORE_SLUG}`,
    `/boutique/${STORE_SLUG}`,
    
    // Public endpoints
    `/public/products`,
    `/public/catalog`,
    `/public/stores/${STORE_SLUG}`,
    
    // Alternative base URLs
    `/v1/stores/${STORE_SLUG}`,
    `/v2/stores/${STORE_SLUG}`,
    `/api/v1/stores/${STORE_SLUG}`
  ]
  
  // First, try to discover the API structure
  console.log('\n=== API Discovery ===')
  
  // Test root endpoints with different auth
  for (const auth of authMethods) {
    await testAPI(
      `${API_BASE}/`,
      `Root API - ${auth.name}`,
      auth.headers
    )
  }
  
  // Test store info with different auth
  console.log('\n=== Store Information Tests ===')
  for (const auth of authMethods) {
    await testAPI(
      `${API_BASE}/stores/${STORE_SLUG}`,
      `Store Info - ${auth.name}`,
      auth.headers
    )
  }
  
  // Test product endpoints
  console.log('\n=== Product Endpoints Tests ===')
  for (const pattern of endpointPatterns.slice(0, 8)) {
    await testAPI(
      `${API_BASE}${pattern}`,
      `Products: ${pattern}`,
      { 'Content-Type': 'application/json' }
    )
  }
  
  console.log('\n=== API Exploration Complete ===')
  console.log('\n=== Summary ===')
  console.log('1. Most endpoints require authentication')
  console.log('2. Need to find correct endpoint structure')
  console.log('3. May need API key or token from Orion documentation')
  console.log('4. Store slug might need different format')
}

// Run the exploration
exploreAPI().catch(console.error)
