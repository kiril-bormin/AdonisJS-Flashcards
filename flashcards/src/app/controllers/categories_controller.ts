import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { categoryValidator } from '#validators/category'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const categories = await Category.query()
    return view.render('pages/categories/index', { categories })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/categories/create', { title: 'Création de catégorie' })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    const { name } = await request.validateUsing(categoryValidator)

    const categorie = await Category.create({
      name,
    })

    session.flash('success', `Le nouveau catégorie ${categorie.name} a été ajouté avec succès !`)
    return response.redirect().toRoute('categories.index')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

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
  async destroy({ params }: HttpContext) {}
}
