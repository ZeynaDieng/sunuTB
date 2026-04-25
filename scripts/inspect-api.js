// API inspection script to understand the structure
const API_BASE = 'https://api.orionsn.com/api'

// Test with OPTIONS to see what methods are allowed
async function inspectAPI() {
  console.log('=== API Structure Inspection ===')
  
  const endpoints = [
    '/stores',
    '/products',
    '/categories',
    '/catalog',
    '/health',
    '/docs',
    '/swagger'
  ]
  
  for (const endpoint of endpoints) {
    console.log(`\n--- ${endpoint} ---`)
    
    try {
      // Try OPTIONS to see allowed methods
      const optionsResponse = await fetch(API_BASE + endpoint, {
        method: 'OPTIONS'
      })
      
      console.log(`OPTIONS Status: ${optionsResponse.status}`)
      
      if (optionsResponse.ok) {
        const allowHeader = optionsResponse.headers.get('Allow')
        console.log(`Allowed Methods: ${allowHeader}`)
      }
      
      // Try GET with different headers to see error details
      const headers = [
        {},
        { 'Accept': 'application/json' },
        { 'Content-Type': 'application/json' },
        { 'User-Agent': 'Mozilla/5.0' },
        { 'Origin': 'http://localhost:3000' }
      ]
      
      for (const header of headers) {
        try {
          const response = await fetch(API_BASE + endpoint, {
            method: 'GET',
            headers: header
          })
          
          if (response.status === 401) {
            const wwwAuth = response.headers.get('WWW-Authenticate')
            console.log(`WWW-Authenticate: ${wwwAuth}`)
            
            // Try to get error body
            const errorText = await response.text()
            console.log(`Error body: ${errorText}`)
            break
          }
        } catch (error) {
          // Continue
        }
      }
      
    } catch (error) {
      console.log(`Network error: ${error.message}`)
    }
  }
  
  // Try to access documentation
  console.log('\n=== Documentation Discovery ===')
  const docEndpoints = [
    '/docs',
    '/swagger',
    '/openapi.json',
    '/api-docs',
    '/documentation'
  ]
  
  for (const doc of docEndpoints) {
    try {
      const response = await fetch(API_BASE + doc)
      if (response.ok) {
        console.log(`\n*** Documentation found: ${API_BASE}${doc} ***`)
        const data = await response.json()
        console.log('Doc structure:', JSON.stringify(data, null, 2))
        return
      }
    } catch (error) {
      // Continue
    }
  }
  
  // Try to access health endpoints
  console.log('\n=== Health Check ===')
  const healthEndpoints = [
    '/health',
    '/status',
    '/ping',
    '/version'
  ]
  
  for (const health of healthEndpoints) {
    try {
      const response = await fetch(API_BASE + health)
      if (response.ok) {
        console.log(`\n*** Health endpoint: ${API_BASE}${health} ***`)
        const data = await response.json()
        console.log('Health data:', JSON.stringify(data, null, 2))
      }
    } catch (error) {
      // Continue
    }
  }
}

// Run inspection
inspectAPI().catch(console.error)
