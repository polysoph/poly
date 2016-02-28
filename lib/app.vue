
<template>
	<app-header></app-header>
	<main class="main">
		<router-view></router-view>
	</main>
</template>

<script>

import router from './router'
import store from './store'

import AppHeader from './components/header.vue'

export default {
	name: 'App',

	components: {
		AppHeader
	},

	data () {
		return {}
	},

	computed: {
		user () {
			return store.user
		}
	}
}

</script>
