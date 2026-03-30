<template>
  <div>
    <h1>Bienvenue, {{ user?.login }}</h1>
    <p>Vous êtes connecté.</p>
    <button @click="handleLogout">Se déconnecter</button>
  </div>
</template>

<script setup lang="ts">
// Protection de la page via le middleware "auth"
definePageMeta({
  middleware: 'auth',
})

// Récupération des infos utilisateur depuis la session coté serveur via l'API
const { data: user } = await useFetch('/api/auth/me')

async function handleLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await navigateTo('/login')
}
</script>
