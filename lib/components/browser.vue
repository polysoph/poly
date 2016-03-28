<template>
	<div class="browser">
		<div class="browser-frame">
			<div class="browser-buttons"></div>
		</div>
		<div class="browser-content">
			<slot>
				<img src="https://placeholdit.imgix.net/~text?bg=444444&w=800&h=600" />
			</slot>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Browser'
}

</script>
