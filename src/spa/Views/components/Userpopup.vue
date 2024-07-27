<template>
    <transition name="user_dropdown">
        <div class="background" v-if="user_popup_opened" @click="Toggle_user_popup">
            <div class="user_dropdown">
                <span class="btn" @click="$router.push('/views/accountinfo')">회원정보</span>
                <span class="btn" @click="$router.push('/views/accountpasschange')">비밀번호 변경</span>
                <span class="btn" @click="Logout">로그아웃</span>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Userpopup',
    props: ['user_popup_opened'],
    data() {
        return {
            
        }
    },
    methods: {
        Toggle_user_popup: function() {
            this.$emit('Toggle_user_popup');
        },
        Logout() {
            this.$session.destroy();
            delete this.$http.defaults.headers.common['authorization'];
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
</style>