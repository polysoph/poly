
<template>
	<article class="milestone-preview">
		<header class="milestone-preview-header">
			<div class="milestone-preview-meta">
				<div class="milestone-preview-author">
					<a class="milestone-preview-author-avatar" v-link="milestone.owner.handle | linkToProfile">
						<img :src="milestone.owner.avatar.url" />
					</a>
					<div class="milestone-preview-author-details">
						<a class="milestone-preview-author-name" v-link="milestone.owner.handle | linkToProfile">{{ milestone.owner.name }}</a>
						<div class="milestone-preview-date">Posted {{ milestone.createdAt | dateFromNow }}</div>
					</div>
				</div>
			</div>
			<a class="milestone-preview-title" v-link="{ name: 'question:milestone', params: { id: milestone.id } }">{{ milestone.title }} <span class="milestone-preview-index">#{{ index }}</span></a>
		</header>
		<div class="milestone-preview-contents" v-html="milestone.contents | markdown | truncate 250"></div>
		<footer class="milestone-preview-footer">
			<a class="milestone-preview-read-more" v-link="{ name: 'question:milestone', params: { id: milestone.id } }">Read more</a>
			<div class="milestone-preview-fields">
				<div class="milestone-preview-field-comment-count">{{ milestone.commentCount }}</div>
				<div class="milestone-preview-field-view-count">{{ milestone.viewCount }}</div>
			</div>
		</footer>
	</article>
</template>

<script>

export default {
	name: 'MilestonePreview',

	props: {
		milestone: {
			type: Object,
			required: true
		},
		index: {
			type: Number
		}
	}
}

</script>
