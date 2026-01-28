/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.get('/deck/create', [DecksController, 'create']).as('deck.create')

router.get('/deck/store', [DecksController, 'store']).as('deck.store')
