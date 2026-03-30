export default defineEventHandler((event) => {
  // Suppression des données de session (Nitro persiste automatiquement)
  delete event.context.session.userId
  delete event.context.session.login
  return { message: 'Déconnexion réussie' }
})
