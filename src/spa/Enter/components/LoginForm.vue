<template>
    <div>
        <input ref="firstinput" class="input" placeholder="아이디" type="text" v-model="id" @keyup.enter="submit(id,pass)" />
        <input class="input" placeholder="비밀번호" type="password" v-model="pass" @keyup.enter="submit(id,pass)" />
        <button class="submit-btn" @click="submit(id, pass)">로그인</button>
        <div class="sub-txt-box">
            <span class="sub-txt">계정이 없으신가요?</span>
            <span @click="go_register_page" class="sub-txt">회원가입</span>
        </div>
    </div>
</template>
<script>
const baseURI="http://r.kdw.kr:20410"

export default {
    name: 'LoginForm',
    props: ['go_register_page'],
    data() {
        return {
            id: '',
            pass: '',
        }
    },
    mounted() {
        this.$refs.firstinput.focus();
    },
    methods: {
        submit(username, password) {
            if(this.checkInput()) {
                this.$http.post(`${baseURI}/auth/login`, {username, password})
                .then((res) => {
                    if(res.data.status == 100) {
                        this.$session.set('accessToken', res.data.data.token)
                        this.$http.defaults.headers.common['authorization'] = res.data.data.token
                        this.$http.get(`${baseURI}/link/astems`)
                        .then((res) => {
                            if(res.data.status == 100) {
                                this.$session.set('astems_token', res.data.data.token);
                            }
                            this.$http.get(`${baseURI}/link/yeosin`)
                            .then((res) => {
                                if(res.data.status == 100) {
                                    this.$session.set('yeosin_token', res.data.data.token);
                                }
                                this.$router.push('/views');
                            })
                            .catch((error) => {
                                this.$router.push('/views');
                                console.log(error)
                            })
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    }
                    else if(res.data.status == -101) alert('아이디 또는 비밀번호가 일치하지 않습니다!')
                })
                .catch((error) => {
                    console.log(error)
                }) 
            }
        },
        checkInput() {
            let checkid = /^[a-z0-9]+$/;
            let checkpass = /^[a-zA-Z0-9~!@#$%<>^&*()\-=+_’.]+$/;
            
            if (!checkid.test(this.id) || this.id.length < 3 || this.id.length > 15) {
                alert('아이디는 영문 소문자, 숫자 조합 3~15자 이어야합니다!');
                return false;
            }
            else if (!checkpass.test(this.pass) || this.pass.length < 8 || this.pass.length > 30) {
                alert('비밀번호는 영문 대소문자, 숫자, 특수문자 조합 8~30자 이어야합니다!');
                return false;
            }
            else {
                return true;
            }
        }
    },
    computed: {
        'token': function() {
            return this.$session.get('accessToken');
        }
    }
}
</script>
<style scoped>
</style>