<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="login">Login :</label>
        <input id="login" v-model="login" type="text" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p>Pas encore de compte ? <NuxtLink to="/register">Créer un compte</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
const login = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  error.value = ''
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { login: login.value, password: password.value },
    })
    // Redirection vers le dashboard après connexion réussie
    await navigateTo('/dashboard')
  } catch (e: any) {
    error.value = e.data?.statusMessage || 'Erreur lors de la connexion'
  }
}
</script>
