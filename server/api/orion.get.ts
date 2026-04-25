// Server-side API proxy for Orion
import { useOrionAPI } from '~/composables/useOrionAPI'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const orion = useOrionAPI()
  
  try {
    // Proxy different endpoints based on query parameters
    if (query.endpoint === 'products') {
      return await orion.getProducts(query)
    } else if (query.endpoint === 'categories') {
      return await orion.getCategories()
    } else if (query.endpoint === 'store') {
      return await orion.getStoreInfo()
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid endpoint'
      })
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Orion API Error'
    })
  }
})
