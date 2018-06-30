<template>
    <div class="login-form">
        <form>
			<vs-button vs-color="primary" @click.prevent="login">Login with Facebook</vs-button>
        </form>
    </div>
</template>

<script>
export default {
	name: 'login',
	mounted() {
		if (this.$store.getters['auth/token']) {
			this.$router.push('/');
		}
	},
	methods: {
		login() {
			window.location.href = 'https://api.agilitynotebook.com/auth/facebook?returnTo=http://localhost:8080';
		}
	}
};
</script>

<style lang="scss" scoped>
	.login-form {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
