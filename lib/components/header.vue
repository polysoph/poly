<template>
	<header class="header">
		<div class="header-wrapper">
			<div class="header-content">
				<a v-link="{ path: '/' }" class="header-logo">
					<img src="/assets/images/mark.svg" alt="Polysoph" />
				</a>
				<div class="header-search">
					<div class="header-search-icon"></div>
					<input class="header-search-input" type="text" placeholder="Search..." />
				</div>
				<nav class="header-nav">
					<a class="header-nav-link" v-link="{ path: '/#!' }">Feed</a>
					<a class="header-nav-link" v-link="{ name: 'discover' }">Discover</a>
					<a class="header-nav-link" v-link="{ path: '/#!' }">Contribute</a>
				</nav>
			</div>
			<div class="header-user">
				<div clas="header-notifications">
				</div>
				<div class="header-profile">
					<div class="header-profile-avatar">
						<img :src="user.avatar.url" :alt="user.name" />
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>

import store from '../store'

export default {
	name: 'Header',

	computed: {
		user () {
			return store.user
		}
	}
}

</script>
