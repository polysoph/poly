
import './lib/config'
import './lib/config/vue'

import router from './lib/router'
import App from './lib/app.vue'

router.start(App, 'app')
