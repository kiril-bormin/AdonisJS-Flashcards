/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import CardsController from '#controllers/cards_controller'
import DecksController from '#controllers/decks_controller'
import PlaysController from '#controllers/plays_controller'
import router from '@adonisjs/core/services/router'

//DECKS ROUTES
router.get('/', [DecksController, 'index']).as('deck.index').as('home')

router.get('/deck/create', [DecksController, 'create']).as('deck.create')

router.post('/deck/store', [DecksController, 'store']).as('deck.store')

router.get('/deck/:id', [DecksController, 'show']).as('deck.show')

router.get('/deck/:id/edit', [DecksController, 'edit']).as('deck.edit')

router.post('/deck/:id', [DecksController, 'update']).as('deck.update')

router.post('/deck/:id/destroy', [DecksController, 'destroy']).as('deck.destroy')

//CARDS ROUTES
router.get('/decks/:id/cards/create', [CardsController, 'create']).as('card.create')

router.post('/decks/:id/cards', [CardsController, 'store']).as('card.store')

router.get('/card/:id/edit', [CardsController, 'edit']).as('card.edit')

router.post('/card/:id', [CardsController, 'update']).as('card.update')

router.post('/card/:id/destroy', [CardsController, 'destroy']).as('card.destroy')

//PLAY ROUTES

router.get('/play/:id/', [PlaysController, 'show']).as('play.show')

router.get('/play/:id/game', [PlaysController, 'play']).as('play.play')


//LOGIN ROUTES

router.post('/login', [AuthController, 'login']).as('auth.login')
router.post('/logout', [AuthController, 'logout']).as('auth.logout')

