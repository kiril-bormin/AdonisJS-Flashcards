import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator } from '#validators/auth'
import User from '#models/user'
/**
 * Controller pour l'authentification
 */
export default class AuthController {
 /**
 * Gérer la connexion d'un utilisateur
 */
 async login({ request, auth, session, response }: HttpContext) {
 const { username, password } = await request.validateUsing(loginUserValidator)
 const user = await User.verifyCredentials(username, password)
 await auth.use('web').login(user)
 session.flash('success', `Connecté en tant que ${user.username}`)
 return response.redirect().toRoute('home')
 }

 /**
 * Déconnecter l'utilisateur
 */
 async logout({ auth, response }: HttpContext) {
 await auth.use('web').logout()
 return response.redirect().toRoute('home')
 }
}