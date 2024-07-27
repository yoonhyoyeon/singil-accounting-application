<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if(this.$session.get('accessToken')) this.$http.defaults.headers.common['authorization'] = this.$session.get('accessToken')
  }
}
</script>

<style src="./assets/css/style.css">
</style>
