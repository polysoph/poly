<template>
	<div class="question-artifacts">
		<header class="question-artifacts-header question-subview-header">
			<div class="question-artifacts-masthead question-subview-masthead">
				<div class="question-artifacts-title question-subview-title">Artifacts <span class="question-subview-title-help ss-icon ss-help" tooltip title="Files, documents, datasets, papers or prior works related to the object of study."></span></div>
				<div class="question-artifacts-actions">
					<a href="#!">Add new Artifact</a>
				</div>
			</div>
			<div class="question-artifacts-filter-bar question-subview-filter-bar">
				<a v-link="{ name: 'question:artifacts', activeClass: 'no-op' }" :class="{ 'is-active': isFiltering('all') }" class="question-subview-filter-category">Everything</a>
				<a v-link="{ name: 'question:artifacts', query: { type: 'document' }, activeClass: 'no-op' }" :class="{ 'is-active': isFiltering('document') }" class="question-subview-filter-category">Documents <span class="question-subview-filter-category-count">{{ getCountOfType('document') }}</span></a>
				<a v-link="{ name: 'question:artifacts', query: { type: 'dataset' }, activeClass: 'no-op' }" :class="{ 'is-active': isFiltering('dataset') }" class="question-subview-filter-category">Data Sets <span class="question-subview-filter-category-count">{{ getCountOfType('dataset') }}</span></a>
				<a v-link="{ name: 'question:artifacts', query: { type: 'article' }, activeClass: 'no-op' }" :class="{ 'is-active': isFiltering('article') }" class="question-subview-filter-category">References <span class="question-subview-filter-category-count">{{ getCountOfType('article') }}</span></a>
			</div>
		</header>
		<main class="question-artifacts-list">
			<artifact-preview class="question-artifact-preview" :artifact="artifact" v-for="artifact in filteredArtifacts"></artifact-preview>
		</main>
	</div>
</template>

<script>

import db from '../../db'
import ArtifactPreview from '../../components/artifact-preview.vue'

export default {
	name: 'QuestionArtifactsView',

	components: {
		ArtifactPreview
	},

	data () {
		return {
			question: {
				artifacts: []
			}
		}
	},

	methods: {
		getArtifactsByType (type) {
			if (type === 'all') return this.question.artifacts
			return this.question.artifacts.filter(a => a.type === type)
		},
		getCountOfType (type) {
			return this.getArtifactsByType(type).length
		},
		isFiltering (type) {
			return this.filterType === type
		}
	},

	computed: {
		filterType () {
			if (!this.$route.query.type) return 'all'
			return this.$route.query.type
		},
		filteredArtifacts () {
			const artifacts = this.question.artifacts.concat()
			const filterType = this.filterType
			const filtered = this.getArtifactsByType(filterType)
			const sorted = filtered.sort(sortByLastUpdated)
			return sorted
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					question(slug: "${t.to.params.slug}") {
						artifacts {
							id,
							type,
							title,
							owner { id, name, handle, avatar { url } },
							source { url, hostname },
							lastUpdatedAt
						}
					}
				}
			`).then(res => {
				console.log(res)
				return res
			})
		}
	}
}

function sortByLastUpdated (a, b) {
	const dateA = new Date(a.lastUpdatedAt)
	const dateB = new Date(b.lastUpdatedAt)
	return dateB - dateA
}

</script>
