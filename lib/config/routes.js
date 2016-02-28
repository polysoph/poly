
import ProfileView from '../views/profile.vue'
import NotFoundView from '../views/notfound.vue'

import QuestionView from '../views/question.vue'
import QuestionOverviewView from '../views/question/overview.vue'
import QuestionDiscussionView from '../views/question/discussion.vue'
import QuestionFilesView from '../views/question/files.vue'
import QuestionReferencesView from '../views/question/references.vue'
import QuestionContributorsView from '../views/question/contributors.vue'
import QuestionSettingsView from '../views/question/settings.vue'

import DiscoverView from '../views/discover.vue'
import DiscoverDisciplineView from '../views/discover/discipline.vue'

export default {
	'/question/:question':  {
		name: 'question',
		component: QuestionView,
		subRoutes: {
			'/': { name: 'question:overview', component: QuestionOverviewView },
			'/discussion': { name: 'question:discussion', component: QuestionDiscussionView },
			'/files': { name: 'question:files', component: QuestionFilesView },
			'/references': { name: 'question:references', component: QuestionReferencesView },
			'/contributors': { name: 'question:contributors', component: QuestionContributorsView },
			'/settings': {
				auth: true,
				name: 'question:settings',
				component: QuestionSettingsView
			}
		}
	},
	'/discover':  {
		name: 'discover',
		component: DiscoverView,
		subRoutes: {
			'/:discipline': { name: 'discover:discipline', component: DiscoverDisciplineView }
		}
	},
	'/users/:user': { name: 'user', component: ProfileView },
	// '/institutions': { name: 'institutions', component: InstitutionView },
	'*': { component: NotFoundView }
}
