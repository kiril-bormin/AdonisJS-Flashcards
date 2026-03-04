import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlaysController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({}: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    await deck.load('cards')
    return view.render('pages/play/mode', { deck, cards: deck.cards, title: deck.name })
  }
  async play({ params, request, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    await deck.load('cards')

    const cards = deck.cards
    const total = cards.length
    const mode = request.input('mode', 'basic')
    const index = Number(request.input('index', 0))
    const showAnswer = request.input('showAnswer', 'false') === 'true'

    if (index >= total) {
      return view.render('pages/play/finish', {
        title: 'Résultat',
        deckId: deck.id,
        deckName: deck.name,
        total,
      })
    }

    const card = cards[index]

    return view.render('pages/play/game', {
      title: deck.name,
      deckId: deck.id,
      card,
      index,
      total,
      mode,
      showAnswer,
    })
  }

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({}: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({}: HttpContext) {}
}
