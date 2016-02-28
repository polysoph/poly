
export default {
	domain: 'poly.sh',
	env: process.env.NODE_ENV || 'development',

	app: {
		history: true,
		root: ''
	},

	api: {
		// endpoint: 'http://159.203.6.69:5969/v0'
		endpoint: 'http://localhost:5250/v0'
	}
}
