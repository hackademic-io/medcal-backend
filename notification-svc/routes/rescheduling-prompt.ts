import express from 'express'
import reschedulingController from '../controllers/reschedulingController'

const reschedulingPromptRoutes = express.Router()

// endpoint for rescheduling-svc to interact with
reschedulingPromptRoutes.post('/rescheduling-prompt', reschedulingController.prompt)

reschedulingPromptRoutes.get('/rescheduling-confirm', reschedulingController.confirm)

reschedulingPromptRoutes.get('/rescheduling-reject', reschedulingController.reject)

export default reschedulingPromptRoutes