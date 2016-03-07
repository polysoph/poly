
import Vue from 'vue'
import Router from 'vue-router'
import Redux from 'vuex'

import config from '.'

import date from '../filters/date'
import dateFromNow from '../filters/date-from-now'
import markdown from '../filters/markdown'
import truncate from '../filters/truncate'

/**
 * Configure Vue plugins
 */
Vue.use(Router)
Vue.use(Redux)

/**
 * Configure Vue extensions
 */
Vue.filter('date', date)
Vue.filter('dateFromNow', dateFromNow)
Vue.filter('markdown', markdown)
Vue.filter('truncate', truncate)

/**
 * Set development mode
 */
if (config.env === 'development') {
	Vue.config.debug = true
}

/**
 * Export `Vue`
 */
export default Vue
