// middleware/auth.ts
// Ce middleware est exécuté avant chaque navigation vers une page protégée
// déclarée via : definePageMeta({ middleware: 'auth' })
export default defineNuxtRouteMiddleware(async () => {
  // Lors du rendu SSR (nouvel onglet, F5...), $fetch tourne sur le serveur
  // et n'a pas accès aux cookies du navigateur automatiquement.
  const headers = useRequestHeaders(['cookie'])
  try {
    await $fetch('/api/auth/me', { headers })
  } catch {
    return navigateTo('/login')
  }
})
