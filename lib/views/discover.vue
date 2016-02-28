<template>
	<div class="discover-page">
		<div class="discover-summary">
			A way of finding problems that might interest mathematicians/scientists, in an attempt to persuade them to join, and be a part of cool things that are happening.
		</div>
		<div class="discover-questions">
			<article class="discover-question discover-question--{{ question.category.slug }}" v-for="question in questions">
				<header class="discover-question-header">
					<div class="discover-question-category">{{ question.category.title }}</div>
					<div class="discover-question-title">{{ question.title }}</div>
				</header>
				<section class="discover-question-body">
					<div class="discover-question-contents">
						<p class="discover-question-description" v-html="question.significance | markdown | truncate 150"></p>
					</div>
					<a class="discover-question-read-more" v-link="{ name: 'question', params: { question: question.slug } }">Read More</a>
				</section>
			</article>
		</div>
	</div>
</template>

<script>

import db from '../db'

export default {
	name: 'DiscoverView',

	data () {
		return {
			questions: []
		}
	},

	route: {
		data: t => {
			db(`
				query {
					questions {
						id, title, slug,
						description,
						significance,
						category {
							id,
							title,
							slug
						}
					}
				}
			`).then(res => t.next(res))
		}
	}
}

</script>
