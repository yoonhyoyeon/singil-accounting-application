<template>
  <div class="nav-btn">
    <div class="title-area" @click="toggle_btn">
      <span class="title">{{title}}</span>
        <img class="dropdown_icon" :class="{opened : opened}" src="@/assets/img/arrow_down.png"/>
    </div>
    <transition name="dropdown">
      <div class="btns" v-if="opened">
          <span class="btn" v-for="btn in btns"><router-link :to="btn.link">{{btn.name}}</router-link></span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Dropdown_btn',
  props: ['title', 'btns'],
  data() {
    return {
      opened: true,
    }
  },
  methods: {
    'toggle_btn': function() {
      this.opened = !this.opened;
    }
  }
};
</script>

<style scoped>
</style>