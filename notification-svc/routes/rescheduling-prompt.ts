import express, { Response, Request } from 'express'
import sendEmail from '../models/sendEmail'
import { reschedulingEventEmitter } from '../utils/customEventEmitters'

const reschedulingPromptRoutes = express.Router()

// endpoint for rescheduling-svc to interact with
reschedulingPromptRoutes.post('/rescheduling-prompt', (req: Request, res: Response) => {
    const { patient, appointment } = req.body
    let isPending = true
    sendEmail('prompt', `Dear ${patient}, would you like to take an earlier appointment ${appointment}.`)
    isPending && reschedulingEventEmitter.once('prompt-handled', message => {
        res.status(200).send(message);
        isPending = false
    })
    setTimeout(() => {
        isPending && (reschedulingEventEmitter.emit = () => false)
        isPending && res.status(200).send('expired')
        isPending = false
    }, 1000)
})


reschedulingPromptRoutes.post('/rescheduling-confirm', (req: Request, res: Response) => {
    console.log('rescheduling confirmed')
    reschedulingEventEmitter.emit('prompt-handled', 'confirmed')
    res.status(200).send('Your rescheduling confirmed')
})

reschedulingPromptRoutes.post('/rescheduling-reject', (req: Request, res: Response) => {
    console.log('rescheduling rejected')
    reschedulingEventEmitter.emit('prompt-handled', 'rejected')
    res.status(200).send('Your rescheduling rejected')
})

reschedulingPromptRoutes.get('/rescheduling-ui', (req: Request, res: Response) => {
    res.send(`
    <html>
      <head><title>Rescheduling Page</title></head>
      <body>
        <button onclick="sendRequest('confirm')">Confirm</button>
        <button onclick="sendRequest('reject')">Reject</button>
        <script>
          function sendRequest(action) {
            fetch('/notification/rescheduling-' + action, { method: 'POST' })
              .then(response => response.text())
              .then(data => alert(data))
              .catch(error => console.error('Error:', error));
          }
        </script>
      </body>
    </html>
  `);
})

export default reschedulingPromptRoutes