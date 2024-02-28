import { Response, Request } from 'express'
import { reschedulingEventEmitter } from '../utils/customEventEmitters'
import sendEmail from '../services/sendEmail'
import generateAndShareHash from '../utils/encryption'

class reschedulingController {
    prompt(req: Request, res: Response) {
        const { appointment } = req.body
        let isPending = true
        const listenerId = `${appointment}`

        const { hash, encryptionIV } = generateAndShareHash(appointment)
        const emailType = 'rescheduling-prompt'
        sendEmail(emailType, appointment, hash, encryptionIV)

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
        const { appointment } = req.body
        const listenerId = `${appointment}`
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