import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { login, password } = body

  if (!login || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Login et mot de passe requis' })
  }

  // Vérifie si le login existe déjà
  const [rows] = await pool.query('SELECT id FROM users WHERE login = ?', [login]) as any[]
  if (rows.length > 0) {
    throw createError({ statusCode: 409, statusMessage: 'Ce login est déjà utilisé' })
  }

  // Hash du mot de passe (cout 12)
  const hashedPassword = await bcrypt.hash(password, 12)

  // Insertion en base
  await pool.query('INSERT INTO users (login, password) VALUES (?, ?)', [login, hashedPassword])

  return { message: 'Compte créé avec succès' }
})
