<template>
    <div class="login-form">
        <form>
			<v-btn color="info" @click="login">Log in with Facebook</v-btn>
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
