
import ProfileView from '../views/profile.vue'
import NotFoundView from '../views/notfound.vue'

import QuestionView from '../views/question.vue'
import QuestionOverviewView from '../views/question/overview.vue'
import QuestionMilestonesView from '../views/question/milestones.vue'
import QuestionDiscussionsView from '../views/question/discussions.vue'
import QuestionDiscussionView from '../views/question/discussion.vue'
import QuestionTasksView from '../views/question/tasks.vue'
import QuestionArtifactsView from '../views/question/artifacts.vue'
import QuestionReferencesView from '../views/question/references.vue'
import QuestionContributorsView from '../views/question/contributors.vue'
import QuestionSettingsView from '../views/question/settings.vue'

import DiscoverView from '../views/discover.vue'
import DiscoverDisciplineView from '../views/discover/discipline.vue'

export default {
	'/question/:slug':  {
		name: 'question',
		component: QuestionView,
		subRoutes: {
			'/': { name: 'question:overview', component: QuestionOverviewView },
			'/milestones': { name: 'question:milestones', component: QuestionMilestonesView },
			'/discussions': { name: 'question:discussions', component: QuestionDiscussionsView },
			'/discussions/:id': { name: 'question:discussion', component: QuestionDiscussionView },
			'/discussions/new': { name: 'question:discussion:new', component: QuestionDiscussionsView },
			'/tasks': { name: 'question:tasks', component: QuestionTasksView },
			'/artifacts': { name: 'question:artifacts', component: QuestionArtifactsView },
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
	'/users/:slug': { name: 'user', component: ProfileView },
	// '/institutions': { name: 'institutions', component: InstitutionView },
	'*': { component: NotFoundView }
}
