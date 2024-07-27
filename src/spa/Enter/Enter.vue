<template>
    <div class="Enter">
        <div class="enter-box">
            <div class="left-box">
                <img class="icon" src="@/assets/img/icon3.png"/>
            </div>
            <div class="right-box">
                <div class="form-box">
                    <div class="wrap">
                        <div class="inner-wrap">
                            <h1 class="title">학교<br> 사회적 협동조합<br> 인트라넷</h1>
                            <transition name="fade" mode="out-in">
                                <login-form 
                                    v-if="login_page"
                                    :go_register_page="go_register_page"
                                />
                                <register-form 
                                    v-else 
                                    :go_login_page="go_login_page" 
                                />
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

export default {
    name: 'Enter',
    components: {
        'login-form': LoginForm,
        'register-form': RegisterForm
    },
    data() {
        return {
            login_page: true
        }
    },
    methods: {
        go_login_page: function() {
            this.login_page = true;
        },
        go_register_page: function() {
            this.login_page = false;
        }
    }
}
</script>
<style scoped>
</style>