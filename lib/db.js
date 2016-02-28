
import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

import config from './config'

const client = new Lokka({
	transport: new Transport(config.api.endpoint)
})

module.exports = (query, vars) => client.query(query, vars)
