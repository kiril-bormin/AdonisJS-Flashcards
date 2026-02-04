/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CardsController from '#controllers/cards_controller'
import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'

//DECKS ROUTES
router.get('/', [DecksController, 'index']).as('deck.index').as('home')

router.get('/deck/create', [DecksController, 'create']).as('deck.create')

router.post('/deck/store', [DecksController, 'store']).as('deck.store')

router.get('/deck/:id', [DecksController, 'show']).as('deck.show')

//CARDS ROUTES
router.get('/card/create', [CardsController, 'create']).as('card.create')

router.post('/card/store', [CardsController, 'store']).as('card.store')
