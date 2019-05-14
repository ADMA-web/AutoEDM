<template>
	<p>{{ message }} world</p>
</template>

<script>
	module.exports = {
		data: function() {
			return {
				message: 'Hello'
			}
		}
	}
</script>

<style scoped>
	p {
		font-size: 2em;
		text-align: center;
	}
</style>