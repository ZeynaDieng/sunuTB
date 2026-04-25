// Test the real Orion API endpoints provided by user
const BASE_URL = 'https://api.orionsn.com/api'
const STORE_SLUG = 'sunu-tawfekh-boutique'

// Test the specific endpoints
async function testRealEndpoints() {
  console.log('=== Testing Real Orion API Endpoints ===')
  
  const endpoints = [
    {
      url: `${BASE_URL}/${STORE_SLUG}`,
      description: 'Store Base Endpoint'
    },
    {
      url: `${BASE_URL}/products/store/${STORE_SLUG}?page=1&pageSize=20&populate=true`,
      description: 'Products with Pagination'
    },
    {
      url: `${BASE_URL}/products/store/${STORE_SLUG}`,
      description: 'Products (Simple)'
    }
  ]
  
  for (const endpoint of endpoints) {
    console.log(`\n=== ${endpoint.description} ===`)
    console.log(`URL: ${endpoint.url}`)
    
    try {
      const response = await fetch(endpoint.url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`Status: ${response.status} ${response.statusText}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Response Structure:')
        console.log(JSON.stringify(data, null, 2))
        
        // Analyze the structure
        if (Array.isArray(data)) {
          console.log(`\n--- Array Analysis ---`)
          console.log(`Type: Array`)
          console.log(`Length: ${data.length}`)
          if (data.length > 0) {
            console.log(`First item keys: ${Object.keys(data[0])}`)
            console.log(`First item sample:`, JSON.stringify(data[0], null, 2))
          }
        } else if (typeof data === 'object') {
          console.log(`\n--- Object Analysis ---`)
          console.log(`Type: Object`)
          console.log(`Keys: ${Object.keys(data)}`)
          
          // Check for pagination
          if (data.data && Array.isArray(data.data)) {
            console.log(`Paginated response with ${data.data.length} items`)
            if (data.data.length > 0) {
              console.log(`First item keys: ${Object.keys(data.data[0])}`)
              console.log(`First item sample:`, JSON.stringify(data.data[0], null, 2))
            }
          }
          
          // Check for meta
          if (data.meta) {
            console.log(`Meta info:`, JSON.stringify(data.meta, null, 2))
          }
        }
        
      } else {
        const errorText = await response.text()
        console.log(`Error: ${errorText}`)
      }
      
    } catch (error) {
      console.log(`Network error: ${error.message}`)
    }
  }
  
  console.log('\n=== Testing Additional Patterns ===')
  
  // Test other common patterns
  const additionalEndpoints = [
    `${BASE_URL}/categories/store/${STORE_SLUG}`,
    `${BASE_URL}/categories/store/${STORE_SLUG}?populate=true`,
    `${BASE_URL}/${STORE_SLUG}/products`,
    `${BASE_URL}/${STORE_SLUG}/categories`,
    `${BASE_URL}/store/${STORE_SLUG}/products`,
    `${BASE_URL}/store/${STORE_SLUG}/categories`
  ]
  
  for (const url of additionalEndpoints) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        console.log(`\n*** FOUND: ${url} ***`)
        const data = await response.json()
        console.log('Response:', JSON.stringify(data, null, 2))
      } else {
        console.log(`${url}: ${response.status}`)
      }
    } catch (error) {
      // Ignore
    }
  }
}

// Run tests
testRealEndpoints().catch(console.error)
