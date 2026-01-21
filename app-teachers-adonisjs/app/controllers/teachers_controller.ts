import Section from '#models/section'
import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'
export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const teachers = await Teacher.query()
      .orderBy('lastname', 'asc')
      .orderBy('firstname', 'asc')
      .exec()
    return view.render('pages/home', { teachers })
  }
  async create({}: HttpContext) {}
  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}
  /**
   * Show individual record
   */
  async show({ view, params }: HttpContext) {
    // SELECT *
    // FROM teacher AS T
    // JOIN section AS S
    // WHERE T.section_id = S.id
    // AND id = 'params.id'

    // Sélectionner l'enseignant dont on veut afficher les détails
    const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail()

    return view.render('pages/teachers/show.edge', { title: "Détail d'un enseignant", teacher })
  }
  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}
  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    await teacher.delete()
    session.flash(
      'success',
      `L'enseignant ${teacher.lastname} ${teacher.firstname} a été supprimé avec succès !`
    )
    return response.redirect().toRoute('home')
  }
}
