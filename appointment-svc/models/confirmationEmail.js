const sendMessageToInitAppExc = require('../models/init_app_exc_connection')


function confirmAppRoutes({ msg, router_key }) {
    sendMessageToInitAppExc({ msg, router_key })
}

module.exports = confirmAppRoutes