import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { login, password } = body

  if (!login || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Login et mot de passe requis' })
  }

  // Recherche de l'utilisateur en base
  const [rows] = await pool.query('SELECT id, login, password FROM users WHERE login = ?', [login]) as any[]
  if (rows.length === 0) {
    throw createError({ statusCode: 401, statusMessage: 'Login ou mot de passe incorrect' })
  }

  const user = rows[0]

  // Comparaison du mot de passe avec le hash stocké
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Login ou mot de passe incorrect' })
  }

  // Stockage de l'utilisateur en session (assignation directe, Nitro persiste automatiquement)
  event.context.session.userId = user.id
  event.context.session.login = user.login

  return { message: 'Connexion réussie', login: user.login }
})
