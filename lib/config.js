
export default {
	domain: 'poly.sh',
	env: process.env.NODE_ENV || 'development',

	app: {
		history: true,
		root: ''
	},

	api: {
		endpoint: process.env.NODE_ENV === 'development'
			? 'http://localhost:5250/v0'
			: 'http://159.203.6.69:5969/v0'
	}
}
