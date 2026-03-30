<template>
  <div>
    <h1>Créer un compte</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="login">Login :</label>
        <input id="login" v-model="login" type="text" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Créer le compte</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-if="success">{{ success }}</p>
    <p>Déjà un compte ? <NuxtLink to="/login">Se connecter</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
const login = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

async function handleRegister() {
  error.value = ''
  success.value = ''
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { login: login.value, password: password.value },
    })
    success.value = 'Compte créé ! Vous pouvez vous connecter.'
    login.value = ''
    password.value = ''
  } catch (e: any) {
    error.value = e.data?.statusMessage || 'Erreur lors de la création du compte'
  }
}
</script>
