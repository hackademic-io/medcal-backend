import { Response, Request } from 'express'
import sendEmail from '../models/sendEmail'
import { reschedulingEventEmitter } from '../utils/customEventEmitters'

class reschedulingController {
    prompt(req: Request, res: Response) {
        const { patient, appointment } = req.body
        let isPending = true
        const listenerId = `${appointment}_${patient}`
        sendEmail(`Dear ${patient}, would you like to take an earlier appointment ${appointment}.`)
        isPending && reschedulingEventEmitter.once('prompt-handled' + listenerId, message => {
            res.status(200).send(message);
            isPending = false
        })
        setTimeout(() => {
            isPending && (reschedulingEventEmitter.emit = () => false)
            isPending && res.status(200).send('expired')
            isPending = false
        }, 60000)
    }

    confirm(req: Request, res: Response) {
        const { patient, appointment } = req.body
        const listenerId = `${appointment}_${patient}`
        console.log('rescheduling confirmed')
        reschedulingEventEmitter.emit('prompt-handled' + listenerId, 'confirmed')
        res.status(200).send('Your rescheduling confirmed')
    }

    reject(req: Request, res: Response) {
        const { patient, appointment } = req.body
        const listenerId = `${appointment}_${patient}`
        console.log('rescheduling rejected')
        reschedulingEventEmitter.emit('prompt-handled' + listenerId, 'rejected')
        res.status(200).send('Your rescheduling rejected')
    }
}

export default new reschedulingController()