
<template>
	<div class="artifact-preview " :class="className">
		<a class="artifact-preview-icon" v-link="{ name: 'question:artifact', params: { id: artifact.id } }"
			@mouseenter="titleHover = true"
			@mouseleave="titleHover = false">
			<img :src="iconUrl" />
		</a>
		<div class="artifact-preview-meta">
			<div class="artifact-preview-main-line">
				<a class="artifact-preview-title"
					v-link="{ name: 'question:artifact', params: { id: artifact.id } }"
					@mouseenter="titleHover = true"
					@mouseleave="titleHover = false">{{ artifact.title }}</a>
			</div>
			<div class="artifact-preview-by-line">
				<a class="artifact-preview-source"
					:href="sourceUrl"
					:class="{ 'artifact-preview-source--is-url': sourceIsUrl }"
					target="_blank">{{ sourceName }}<i v-if="sourceIsUrl" class="artifact-preview-source-icon"></i></a>
				<span class="artifact-preview-source-action"></span>
			</div>
		</div>
		<div class="artifact-preview-details">
			<span class="artifact-preview-last-updated-at">Updated <span tooltip title="{{ artifact.lastUpdatedAt | date 'MMM D, Y' }}">{{ artifact.lastUpdatedAt | dateFromNow }}</span></span>
		</div>
	</div>
</template>

<script>

import url from 'component-url'

export default {
	name: 'ArtifactPreview',

	props: {
		artifact: {
			type: Object,
			required: true
		}
	},

	data () {
		return {
			titleHover: false
		}
	},

	computed: {
		className () {
			const classes = {}
			classes[`artifact-preview--${this.artifact.type}`] = true
			classes['artifact-preview--hover'] = this.titleHover
			return classes
		},
		sourceIsUrl () {
			const hostname = this.artifact.source.hostname
			if (hostname === 'docs.google.com') return false
			return true
		},
		sourceUrl () {
			const source = this.artifact.source
			if (source.hostname === 'docs.google.com') return ''
			return source.url
		},
		sourceName () {
			const hostname = this.artifact.source.hostname
			switch (hostname) {
				case 'docs.google.com':
					return 'Google Docs'
					break
				case 'arxiv.org':
					return 'ArXiv'
					break
				default:
					return hostname
			}
		},
		iconUrl () {
			return `/assets/images/icons/${this.artifact.type}.svg`
		},
		sourceAction () {

		}
	}
}

</script>
