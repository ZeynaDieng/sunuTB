<template>
  <div class="hidden">
    <!-- Component invisible - structured data added via useHead -->
  </div>
</template>

<script setup lang="ts">
interface Props {
  type: 'home' | 'product' | 'store' | 'breadcrumb'
  product?: any
  breadcrumbs?: Array<{ name: string; url: string }>
}

const props = defineProps<Props>()

// Générer les données structurées selon le type
const structuredData = computed(() => {
  switch (props.type) {
    case 'home':
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Sunu Tawfekh',
        description: 'Votre boutique de confiance à Dakar. Découvrez une infinité de produits pour tous vos besoins : mode, électronique, beauté, alimentation et plus.',
        url: 'https://sunutawfekh.sn',
        logo: 'https://sunutawfekh.sn/logo.png',
        image: 'https://sunutawfekh.sn/hero-image.jpg',
        telephone: '+221 33 123 45 67',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Rue de la Médina, Dakar',
          addressLocality: 'Dakar',
          addressRegion: 'Dakar',
          postalCode: '12345',
          addressCountry: 'SN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '14.6928',
          longitude: '-17.4467'
        },
        openingHours: [
          'Mo-Sa 08:00-20:00',
          'Su 09:00-18:00'
        ],
        priceRange: '$',
        sameAs: [
          'https://facebook.com/sunutawfekh',
          'https://instagram.com/sunutawfekh',
          'https://twitter.com/sunutawfekh'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Produits Sunu Tawfekh',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Mode et Vêtements',
                category: 'Mode'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Électronique',
                category: 'Électronique'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Beauté et Soins',
                category: 'Beauté'
              }
            }
          ]
        }
      }

    case 'product':
      if (!props.product) return null
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: props.product.name,
        description: props.product.description || '',
        image: props.product.image,
        brand: {
          '@type': 'Brand',
          name: 'Sunu Tawfekh'
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Sunu Tawfekh'
        },
        offers: {
          '@type': 'Offer',
          url: `https://sunutawfekh.sn/products/${props.product.id}`,
          priceCurrency: 'XOF',
          price: props.product.price || 0,
          priceValidUntil: '2026-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          availability: props.product.stockStatus === 'in_stock' 
            ? 'https://schema.org/InStock' 
            : props.product.stockStatus === 'low_stock'
            ? 'https://schema.org/LimitedAvailability'
            : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'Sunu Tawfekh',
            url: 'https://sunutawfekh.sn',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Rue de la Médina, Dakar',
              addressLocality: 'Dakar',
              addressCountry: 'SN'
            }
          }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          reviewCount: '128'
        },
        review: [
          {
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'Marie S.'
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5'
            },
            reviewBody: 'Excellent produit, livraison rapide à Dakar !'
          }
        ]
      }

    case 'store':
      return {
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: 'Sunu Tawfekh - Boutique Dakar',
        description: 'Boutique en ligne et physique à Dakar proposant des produits de qualité pour tous vos besoins',
        url: 'https://sunutawfekh.sn/shop',
        image: 'https://sunutawfekh.sn/store-image.jpg',
        telephone: '+221 33 123 45 67',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Rue de la Médina, Dakar',
          addressLocality: 'Dakar',
          addressRegion: 'Dakar',
          postalCode: '12345',
          addressCountry: 'SN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '14.6928',
          longitude: '-17.4467'
        },
        openingHours: [
          'Mo-Sa 08:00-20:00',
          'Su 09:00-18:00'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Catalogue Sunu Tawfekh',
          numberOfItems: '1000+'
        },
        paymentAccepted: 'Cash, Credit Card, Mobile Money',
        priceRange: '$'
      }

    case 'breadcrumb':
      if (!props.breadcrumbs) return null
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: 'https://sunutawfekh.sn'
          },
          ...props.breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: crumb.name,
            item: crumb.url
          }))
        ]
      }

    default:
      return null
  }
})

// Ajouter les données structurées au head
useHead(() => {
  const data = structuredData.value
  if (!data) return {}

  return {
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(data, null, 0)
      }
    ]
  }
})
</script>
