export default defineEventHandler((event) => {
  const { userId, login } = event.context.session

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })
  }

  return { userId, login }
})
