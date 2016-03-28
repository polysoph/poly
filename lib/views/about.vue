
<template>

	<div class="purpose">
		<div class="purpose-notice">
			<p>{{ name }} is the undergraduate thesis project of designer and developer <a href="http://rosszurowski.com">Ross Zurowski</a>.<br/>It's just a prototype for now. Interested in helping make it real? <a href="mailto:ross+polysoph@rosszurowski.com">Let's talk!</a></p>
		</div>
		<div class="purpose-introduction">
			<h1>Scientific publishing is broken</h1>
		</div>
		<article class="purpose-context" v-html="contextEssay | markdown"></article>
	</div>

</template>

<script>

import config from '../config'
import contextEssay from '../../docs/context.md'

export default {
	name: 'AboutView',

	computed: {
		name () {
			return config.name
		},
		contextEssay () {
			return contextEssay
		}
	}
}

</script>
