<template>
	<header class="header" :class="{ 'header--home': isHome }">
		<div class="header-wrapper">
			<div class="header-content">
				<a v-link="{ name: 'home' }" class="header-logo">
					<img src="/assets/images/mark.svg" alt="Polysoph" />
				</a>
				<div class="header-search" v-if="!isHome">
					<div class="header-search-icon"></div>
					<input class="header-search-input" type="text" placeholder="Search" />
				</div>
				<nav class="header-nav">
					<a class="header-nav-link" v-link="{ name: 'discover' }">Discover</a>
					<a class="header-nav-link" v-link="{ name: 'publish' }">Start a Project</a>
				</nav>
			</div>
			<div class="header-user" v-if="!isHome">
				<nav class="header-user-nav">
					<a class="header-nav-link" v-link="{ name: 'feed' }" v-if="!isHome">Feed</a>
				</nav>
				<div class="header-notifications header-notifications--active">
					<i class="header-notifications-icon s-icon ss-notifications"></i>
				</div>
				<a class="header-profile" v-link="{ name: 'user', params: { slug: currentUser.handle }}">
					<div class="header-profile-avatar">
						<img :src="currentUser.avatar.url" :alt="currentUser.name" />
					</div>
				</a>
			</div>
			<div class="header-cta" v-if="isHome">
				<a v-link="{ name: 'login' }" class="header-cta-button header-cta-button--dark">Log in</a>
			</div>
	</header>
</template>

<script>

import store from '../store'

export default {
	name: 'Header',

	computed: {
		currentUser () {
			return store.state.user
		},
		isHome () {
			return this.$route.name === 'home'
		}
	}
}

</script>
