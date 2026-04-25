<template>
  <footer class="bg-[#e3e2e5] dark:bg-slate-950 w-full relative">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 w-full font-['Inter'] text-sm tracking-normal">
      <div class="flex flex-col gap-6">
        <span class="text-lg font-black text-[#1a1c1e] dark:text-slate-100">Sunu Tawfekh</span>
        <p class="text-[#1a1c1e] dark:text-slate-400 max-w-xs">Votre boutique de confiance à Dakar. Une grande diversité de produits pour tous vos besoins depuis 2024.</p>
        <div class="flex gap-4">
          <span class="material-symbols-outlined text-[#6d4f8b] cursor-pointer" data-icon="share">share</span>
          <span class="material-symbols-outlined text-[#6d4f8b] cursor-pointer" data-icon="public">public</span>
          <span class="material-symbols-outlined text-[#6d4f8b] cursor-pointer" data-icon="campaign">campaign</span>
        </div>
      </div>
      <div>
        <h5 class="font-bold text-[#1a1c1e] dark:text-slate-100 mb-6 uppercase tracking-widest text-[10px]">Catégories</h5>
        <ul class="space-y-4">
          <li><NuxtLink to="/shop?category=mode" class="text-[#1a1c1e] dark:text-slate-400 hover:text-[#735c00] transition-colors">Mode</NuxtLink></li>
          <li><NuxtLink to="/shop?category=electronique" class="text-[#1a1c1e] dark:text-slate-400 hover:text-[#735c00] transition-colors">Électronique</NuxtLink></li>
          <li><NuxtLink to="/shop?category=beaute" class="text-[#1a1c1e] dark:text-slate-400 hover:text-[#735c00] transition-colors">Beauté</NuxtLink></li>
          <li><NuxtLink to="/shop?category=alimentation" class="text-[#1a1c1e] dark:text-slate-400 hover:text-[#735c00] transition-colors">Alimentation</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h5 class="font-bold text-[#1a1c1e] dark:text-slate-100 mb-6 uppercase tracking-widest text-[10px]">Service</h5>
        <ul class="space-y-4">
          <li><NuxtLink to="/contact" class="text-[#1a1c1e] dark:text-slate-400 hover:text-[#735c00] transition-colors">Nous Contacter</NuxtLink></li>
          <li><NuxtLink to="/about" class="text-[#1a1c1e] dark:text-slate-400 hover:text-[#735c00] transition-colors">À Propos</NuxtLink></li>
          <li><NuxtLink to="/checkout" class="text-[#1a1c1e] dark:text-slate-400 hover:text-[#735c00] transition-colors">Mon Panier</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h5 class="font-bold text-[#1a1c1e] dark:text-slate-100 mb-6 uppercase tracking-widest text-[10px]">Contact</h5>
        <ul class="space-y-4">
          <li><a href="mailto:contact@sunutawfekh.sn" class="text-[#1a1c1e] dark:text-slate-400 hover:text-[#735c00] transition-colors">contact@sunutawfekh.sn</a></li>
          <li><a href="tel:+221338212345" class="text-[#1a1c1e] dark:text-slate-400 hover:text-[#735c00] transition-colors">+221 33 821 23 45</a></li>
          <li class="pt-4">
            <div class="bg-white/30 p-4 rounded-lg">
              <p class="text-[10px] font-bold text-[#6d4f8b] mb-2 uppercase">Rejoignez-nous</p>
              <div class="flex gap-2">
                <input class="bg-transparent border-b border-[#6d4f8b]/30 focus:border-[#6d4f8b] outline-none py-1 w-full text-xs" placeholder="Adresse Email" type="email"/>
                <button class="material-symbols-outlined text-[#6d4f8b]" data-icon="arrow_forward">arrow_forward</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="px-12 py-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <span class="text-[#1a1c1e] dark:text-slate-400 text-xs">© 2024 Sunu Tawfekh. Tous Droits Réservés.</span>
      <div class="flex gap-6 text-[10px] font-bold text-[#1a1c1e] dark:text-slate-400 tracking-widest">
        <span>VISA</span>
        <span>MASTERCARD</span>
        <span>AMEX</span>
        <span>APPLE PAY</span>
      </div>
    </div>
  </footer>
</template>
