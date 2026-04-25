<template>
  <div class="pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
    <header class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-4">Contactez-Nous</h1>
      <p class="text-xl text-on-surface-variant max-w-2xl mx-auto">
        Nous serions ravis d'avoir de vos nouvelles. Que vous ayez des questions sur nos produits, besoin de conseils ou souhaitiez partager vos commentaires.
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <!-- Contact Form -->
      <section>
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">Prénom</label>
              <input 
                v-model="form.firstName"
                class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                type="text"
                required
              />
            </div>
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">Nom</label>
              <input 
                v-model="form.lastName"
                class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                type="text"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">Adresse Email</label>
            <input 
              v-model="form.email"
              class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
              type="email"
              required
            />
          </div>

          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">Sujet</label>
            <select 
              v-model="form.subject"
              class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="order">Demande de Commande</option>
              <option value="product">Question sur un Produit</option>
              <option value="shipping">Livraison & Retours</option>
              <option value="partnership">Partenariat</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">Message</label>
            <textarea 
              v-model="form.message"
              rows="6"
              class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none resize-none"
              placeholder="Dites-nous en plus..."
              required
            ></textarea>
          </div>

          <button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-primary text-on-primary py-4 rounded-lg font-semibold hover:bg-primary-container transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message' }}
          </button>
        </form>
      </section>

      <!-- Contact Information -->
      <section class="space-y-8">
        <div>
          <h2 class="text-2xl font-headline font-bold mb-6">Visitez Notre Boutique</h2>
          <div class="bg-surface-container-low rounded-xl p-6 space-y-4">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary mt-1">location_on</span>
              <div>
                <p class="font-medium text-on-surface">Sunu Tawfekh</p>
                <p class="text-sm text-on-surface-variant">Plateau, Avenue Cheikh Anta Diop</p>
                <p class="text-sm text-on-surface-variant">Dakar, Sénégal</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary">schedule</span>
              <div>
                <p class="text-sm text-on-surface-variant">Lundi - Samedi: 9h - 19h</p>
                <p class="text-sm text-on-surface-variant">Dimanche: Fermé</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-headline font-bold mb-6">Contactez-Nous</h2>
          <div class="space-y-4">
            <a href="mailto:contact@sunutawfekh.sn" class="flex items-center gap-3 text-on-surface hover:text-primary transition-colors">
              <span class="material-symbols-outlined">email</span>
              <span>contact@sunutawfekh.sn</span>
            </a>
            <a href="tel:+221338212345" class="flex items-center gap-3 text-on-surface hover:text-primary transition-colors">
              <span class="material-symbols-outlined">phone</span>
              <span>+221 33 821 23 45</span>
            </a>
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary">chat</span>
              <div>
                <p class="font-medium text-on-surface">Chat en Direct</p>
                <p class="text-sm text-on-surface-variant">Disponible Lun-Ven, 9h-17h (GMT)</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-headline font-bold mb-6">Suivez-Nous</h2>
          <div class="flex gap-4">
            <a href="#" class="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined">public</span>
            </a>
            <a href="#" class="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined">photo_camera</span>
            </a>
            <a href="#" class="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="fixed bottom-8 right-8 bg-primary text-on-primary px-6 py-4 rounded-lg shadow-lg">
      <p class="font-medium">Message envoyé avec succès ! Nous vous répondrons rapidement.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'Contact | Sunu Tawfekh',
  meta: [
    { name: 'description', content: 'Contactez Sunu Tawfekh pour toute question, commande ou partenariat. Votre boutique de confiance à Dakar.' }
  ]
})

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Contact form submitted:', form.value)
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    }
    
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
