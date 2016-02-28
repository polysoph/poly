
require('./db')

const state = {
	user: {
		id: 1,
		name: 'Terrence Tao',
		handle: 'ttao',
		institution: "University of California, Los Angeles",
		avatar: {
			url: "http://polysoph-assets.s3.amazonaws.com/terrencetao.jpg"
		},
		authenticated: true
	}
}

export default state
