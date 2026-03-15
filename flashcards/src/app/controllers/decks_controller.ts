import Category from '#models/category'
import Deck from '#models/deck'
import { deckValidator } from '#validators/deck'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'

export default class DecksController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const decks = await Deck.query().withCount('cards')
    const categories = await Category.query()
    return view.render('pages/home', { decks, categories })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const categories = await Category.query()
    return view.render('pages/deck/create', { title: 'Création de decks', categories })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    const { name, description, categoryId } = await request.validateUsing(deckValidator)

    const deck = await Deck.create({
      name,
      description,
      categoryId,
    })

    session.flash('success', `Le nouveau deck ${deck.name} a été ajouté avec succès !`)
    return response.redirect().toRoute('home')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    await deck.load('cards') // ajouter les cartes associées au deck
    return view.render('pages/deck/show', { deck, cards: deck.cards, title: deck.name })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    const categories = await Category.query()
    return view.render('pages/deck/edit', { deck, title: `Modifier ${deck.name}`, categories })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    try {
      const { name, description, categoryId } = await request.validateUsing(deckValidator)
      const deck = await Deck.findOrFail(params.id)
      deck.name = name
      deck.description = description
      deck.categoryId = categoryId
      await deck.save()

      session.flash('success', `Le deck ${deck.name} a été modifié avec succès !`)
      return response.redirect().toRoute('deck.show', { id: deck.id })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    await deck.delete()
    return response.redirect().toRoute('home')
  }
}
