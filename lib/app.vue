
<template>
	<app-header></app-header>
	<main class="main">
		<router-view></router-view>
	</main>
</template>

<script>

import tooltip from 'tlite'

import store from './store'
import AppHeader from './components/header.vue'

export default {
	name: 'App',

	components: {
		AppHeader
	},

	computed: {
		state () {
			return store.state
		},
		user () {
			return store.state.user
		}
	},

	ready () {
		tooltip(el => {
			if (!el.hasAttribute('tooltip')) return false
			return { grav: 's' }
		})
	}
}

</script>
