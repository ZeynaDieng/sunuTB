<template>
  <footer class="bg-[#e3e2e5] dark:bg-slate-950 w-full relative">
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 w-full font-['Inter'] text-sm">

      <!-- COL 1 -->
      <div class="flex flex-col gap-5">
        
        <!-- Logo -->
        <div class="flex items-center">
          <img 
            src="/logo1.png" 
            alt="Sunu Tawfekh" 
            class="h-20 w-auto object-contain"
          />
        </div>

        <!-- Texte -->
        <p class="text-[#4b5563] dark:text-slate-400 max-w-xs leading-relaxed">
          Votre boutique de confiance à Dakar. Une grande diversité de produits pour tous vos besoins depuis 2024.
        </p>

        <!-- Social -->
        <div class="flex gap-4 pt-2">
          <span class="material-symbols-outlined text-[#6d4f8b] hover:scale-110 transition cursor-pointer">share</span>
          <span class="material-symbols-outlined text-[#6d4f8b] hover:scale-110 transition cursor-pointer">public</span>
          <span class="material-symbols-outlined text-[#6d4f8b] hover:scale-110 transition cursor-pointer">campaign</span>
        </div>

      </div>

      <!-- COL 2 -->
      <div>
        <h5 class="relative font-bold text-[#111827] dark:text-white mb-6 uppercase tracking-[0.15em] ">
          Catégories
          <span class="absolute left-0 -bottom-2 w-10 h-[3px] bg-[#6d4f8b] rounded-full"></span>
        </h5>

        <ul class="space-y-4">
          <li><NuxtLink to="/shop?category=mode" class="text-[#4b5563] dark:text-slate-400 hover:text-[#6d4f8b] transition">Mode</NuxtLink></li>
          <li><NuxtLink to="/shop?category=electronique" class="text-[#4b5563] dark:text-slate-400 hover:text-[#6d4f8b] transition">Électronique</NuxtLink></li>
          <li><NuxtLink to="/shop?category=beaute" class="text-[#4b5563] dark:text-slate-400 hover:text-[#6d4f8b] transition">Beauté</NuxtLink></li>
          <li><NuxtLink to="/shop?category=alimentation" class="text-[#4b5563] dark:text-slate-400 hover:text-[#6d4f8b] transition">Alimentation</NuxtLink></li>
        </ul>
      </div>

      <!-- COL 3 -->
      <div>
        <h5 class="relative font-bold text-[#111827] dark:text-white mb-6 uppercase tracking-[0.15em] ">
          Service
          <span class="absolute left-0 -bottom-2 w-10 h-[3px] bg-[#6d4f8b] rounded-full"></span>
        </h5>

        <ul class="space-y-4">
          <li><NuxtLink to="/contact" class="text-[#4b5563] dark:text-slate-400 hover:text-[#6d4f8b] transition">Nous contacter</NuxtLink></li>
          <li><NuxtLink to="/about" class="text-[#4b5563] dark:text-slate-400 hover:text-[#6d4f8b] transition">À propos</NuxtLink></li>
          <li><NuxtLink to="/terms" class="text-[#4b5563] dark:text-slate-400 hover:text-[#6d4f8b] transition">Conditions d'utilisation</NuxtLink></li>
          <li><NuxtLink to="/privacy" class="text-[#4b5563] dark:text-slate-400 hover:text-[#6d4f8b] transition">Politique de confidentialité</NuxtLink></li>
        </ul>
      </div>

      <!-- COL 4 -->
      <div>
        <h5 class="relative font-bold text-[#111827] dark:text-white mb-6 uppercase tracking-[0.15em] ">
          Contact
          <span class="absolute left-0 -bottom-2 w-10 h-[3px] bg-[#6d4f8b] rounded-full"></span>
        </h5>

        <ul class="space-y-4">
          <li>
            <a href="mailto:contact@sunutawfekh.sn" class="text-[#4b5563] dark:text-slate-400 hover:text-[#6d4f8b] transition">
              contact@sunutawfekh.sn
            </a>
          </li>
          <li>
            <a href="tel:+221774135353" class="text-[#4b5563] dark:text-slate-400 hover:text-[#6d4f8b] transition">
              +221 77 413 53 53
            </a>
          </li>

          <!-- Newsletter -->
          <li class="pt-4">
            <div class="bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-xl border border-black/5 dark:border-white/10">
              <p class="text-[10px] font-semibold text-[#6d4f8b] mb-2 uppercase tracking-wider">
                Rejoignez-nous
              </p>

              <div class="flex gap-2 items-center">
                <input 
                  class="bg-transparent border-b border-[#6d4f8b]/30 focus:border-[#6d4f8b] outline-none py-1 w-full text-xs placeholder:text-gray-400"
                  placeholder="Adresse email"
                  type="email"
                />
                <button class="material-symbols-outlined text-[#6d4f8b] hover:translate-x-1 transition">
                  arrow_forward
                </button>
              </div>
            </div>
          </li>

        </ul>
      </div>

    </div>

    <!-- BOTTOM -->
    <div class="px-12 py-8 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <span class="text-[#4b5563] dark:text-slate-400 text-xs">
        © 2024 Sunu Tawfekh. Tous droits réservés.
      </span>
    </div>

  </footer>
</template>