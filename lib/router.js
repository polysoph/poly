
import Router from 'vue-router'

import config from './config'

import HomeView from './views/home.vue'
import AboutView from './views/about.vue'
import PublishView from './views/publish.vue'

import LoginView from './views/login.vue'
import JoinView from './views/join.vue'
import NotFoundView from './views/notfound.vue'

import SubmitView from './views/submit.vue'
import FeedView from './views/feed.vue'
import ProfileView from './views/profile.vue'

import QuestionView from './views/question.vue'
import QuestionOverviewView from './views/question/overview.vue'
import QuestionMilestonesView from './views/question/milestones.vue'
import QuestionDiscussionsView from './views/question/discussions.vue'
import QuestionDiscussionView from './views/question/discussion.vue'
import QuestionDiscussionCreateView from './views/question/discussion-create.vue'
import QuestionTasksView from './views/question/tasks.vue'
import QuestionArtifactsView from './views/question/artifacts.vue'
import QuestionArtifactView from './views/question/artifact.vue'
import QuestionMetricsView from './views/question/metrics.vue'
import QuestionContributorsView from './views/question/contributors.vue'
import QuestionSettingsView from './views/question/settings.vue'

import DiscoverView from './views/discover.vue'
import DiscoverDisciplineView from './views/discover/discipline.vue'


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
router.map({

	'/': { name: 'home', component: HomeView },
	'/login': { name: 'login', component: LoginView },
	'/join': { name: 'join', component: JoinView },
	'/about': { name: 'about', component: AboutView },
	'/publish': { name: 'publish', component: PublishView },
	'*': { component: NotFoundView },

	'/feed': { name: 'feed', component: FeedView },
	'/question/:slug':  {
		name: 'question',
		component: QuestionView,
		subRoutes: {
			'/': { name: 'question:overview', component: QuestionOverviewView },
			'/milestones': { name: 'question:milestones', component: QuestionMilestonesView },
			'/milestones/:id': { name: 'question:milestone', component: QuestionMilestonesView },
			'/discussions': { name: 'question:discussions', component: QuestionDiscussionsView },
			'/discussions/:id': { name: 'question:discussion', component: QuestionDiscussionView },
			'/discussions/new': { name: 'question:discussion:new', component: QuestionDiscussionCreateView },
			'/tasks': { name: 'question:tasks', component: QuestionTasksView },
			'/artifacts': { name: 'question:artifacts', component: QuestionArtifactsView },
			'/artifacts/:id': { name: 'question:artifact', component: QuestionArtifactView },
			'/metrics': { name: 'question:metrics', component: QuestionMetricsView },
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

	'/submit': { name: 'submit', component: SubmitView }
})

router.redirect({
	'/login': '/question/dhj-theorem'
})

router.beforeEach(t => {
	window.scrollTo(0, 0)
	t.next()
})

/**
 * Export `router`
 */
export default router
