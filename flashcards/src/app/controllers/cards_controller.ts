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
  async edit({ params, view }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    return view.render('pages/card/edit', { title: 'Modifier la carte', card })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const { front, back } = await request.validateUsing(cardValidator)
    card.front = front
    card.back = back
    await card.save()

    session.flash('success', `La carte a été modifiée avec succès !`)
    return response.redirect().toRoute('deck.show', { id: card.deckId })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deckId = card.deckId
    await card.delete()
    return response.redirect().toRoute('deck.show', { id: deckId })
  }
}
