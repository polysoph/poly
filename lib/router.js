
import Router from 'vue-router'

import config from './config'
import routes from './config/routes'

/**
 * Configure router
 */
const router = new Router({
	root: config.app.root,
	history: config.app.history,
	saveScrollPosition: false,
	linkActiveClass: 'is-active'
})

/**
 * Routes
 */
router.map(routes)

router.redirect({
	'': '/question/dhj-theorem'
})

/**
 * Export `router`
 */
export default router
