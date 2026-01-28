import type { HttpContext } from '@adonisjs/core/http'
import Section from '#models/section'
import { dd } from '@adonisjs/core/services/dumper'
import { sectionValidator } from '#validators/section'

export default class SectionsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const sections = await Section.query().orderBy('name', 'asc').exec()
    return view.render('pages/sections/sections.edge', { sections })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/sections/create', { title: "ajout d'une section" })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    // dd(request.all())
    const { name } = await request.validateUsing(sectionValidator)

    const section = await Section.create({
      name,
    })

    session.flash('success', `La nouvelle section ${section.name} a été ajouté avec succès !`)
    return response.redirect().toRoute('section.index')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const teacher = await Section.query().where('id', params.id).preload('section').firstOrFail()
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
    const section = await Section.findOrFail(params.id)
    await section.delete()
    session.flash('success', `La section ${section.name} a été supprimé avec succès !`)
    return response.redirect().toRoute('section.index')
  }
}
