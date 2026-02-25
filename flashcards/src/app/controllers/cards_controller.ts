import type { HttpContext } from '@adonisjs/core/http'
import { cardValidator } from '#validators/card'
import Card from '#models/card'
import Deck from '#models/deck'

export default class CardsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const decks = await Deck.query().withCount('cards')
    return view.render('pages/home', { decks })
  }

  /**
   * Display form to create a new record
   */
  async create({ params, view }: HttpContext) {
    const deckId = params.id
    return view.render('pages/card/create', { title: 'Création de cartes', deckId })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request, session, response }: HttpContext) {
    const { front, back } = await request.validateUsing(cardValidator)
    const deckId = params.id
    const card = await Card.create({
      front,
      back,
      deckId,
    })

    session.flash('success', `La carte a été ajouté au deck ${deckId} avec succès !`)
    return response.redirect().toRoute('deck.show', { id: deckId })
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
