/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import SectionsController from '#controllers/sections_controller'
import TeachersController from '#controllers/teachers_controller'
import Section from '#models/section'
import { Secret } from '@adonisjs/core/helpers'

import router from '@adonisjs/core/services/router'

router.get('/', [TeachersController, 'index']).as('home')

router.get('/teacher/:id/show', [TeachersController, 'show']).as('teacher.show')

router.delete('/teacher/:id/destroy', [TeachersController, 'destroy']).as('teacher.destroy')

router.get('/teacher/add', [TeachersController, 'create']).as('teacher.create')

router.post('/teacher/add', [TeachersController, 'store']).as('teacher.store')

router.get('/teacher/:id/edit', [TeachersController, 'edit']).as('teacher.edit')

router.put('/teacher/:id/update', [TeachersController, 'update']).as('teacher.update')

//sections

router.get('/sections', [SectionsController, 'index']).as('section.index')

router.delete('/sections/:id/destroy', [SectionsController, 'destroy']).as('section.destroy')

router.get('/sections/add', [SectionsController, 'create']).as('section.create')

router.post('/sections/add', [SectionsController, 'store']).as('section.store')
