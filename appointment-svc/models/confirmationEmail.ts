import sendMessageToInitAppExc from '../models/init_app_exc_producer'


function confirmAppRoutes({ msg, router_key }: { msg: string, router_key: string }) {
    const data = {
        msg,
        confirm_type: router_key,
        router_key: 'confirm',
    }
    sendMessageToInitAppExc(data)
}

export default confirmAppRoutes