<template>
	<div class="discussion-action discussion-action--{{ action.type }}">
		<div class="discussion-action-by-line">
			<a class="discussion-action-actor" v-link="{ name: 'user', params: { slug: action.actor.handle }}">
				<div class="discussion-action-actor-image"><img :src="action.actor.avatar.url" /></div>
				<span class="discussion-action-actor-name">{{ action.actor.name }}</span>
			</a>
			<span class="discussion-action-help-text">
				<template v-if="action.type === 'resolve'">marked the discussion as resolved</template>
				<template v-if="action.type === 'unresolve'">marked the discussion as ongoing</template>
				<template v-if="action.type === 'add'">added {{ action.count }} rows to spreadsheet</template>
				<template v-if="action.type === 'reference'">referenced a paper</template>
				<template v-if="action.type === 'share'">
					<span>added</span>
					<a class="discussion-action-actor discussion-action-actee" v-link="{ name: 'user', params: { slug: action.actee.handle }}">
						<div class="discussion-action-actee-image discussion-action-actor-image"><img :src="action.actee.avatar.url" /></div>
						<span class="discussion-action-actee-name discussion-action-actor-name">{{ action.actee.name }}</span>
					</a>
				</template>
	 		</span>
	 		<span>on</span>
			<span class="discussion-action-created-at" tooltip title="{{ action.createdAt | date 'h:mma [on] MMM Do' }}">{{ action.createdAt | date 'MMM D, Y' }}</span>
		</div>
		<a class="discussion-action-subject" v-link="{ name: 'question:artifact', params: { id: action.artifact.id } }" v-if="action.artifact">
			{{ action.artifact.title }}
		</a>
	</div>
</template>

<script>

const wrap = str => `&nbsp;${str}&nbsp;`

export default {
	name: 'Action',

	props: {
		action: {
			type: Object,
			required: true
		}
	},

	computed: {
		helpText () {
			let result
			switch (this.action.type) {
				case 'add':
					result = wrap(`added ${this.action.count} rows to spreadsheet`)
					break
				case 'reference':
					result = wrap(`referenced a paper`)
					break
				case 'share':
					result = wrap(`added ${this.action.actee} a spreadsheet with`)
					break
				default:
					result = wrap(`performed an action`)
					break
			}
			return result
		}
	}
}

</script>
