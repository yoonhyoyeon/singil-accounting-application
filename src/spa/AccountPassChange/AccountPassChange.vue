<template>
    <div class="link_info_box">
        <div class="box">
            <h1 class="title">비밀번호 변경</h1>
            <input placeholder="현재 비밀번호" ref="firstinput" type="password" class="input" v-model="before_pass" @keyup.enter="submit"/>
            <input placeholder="새 비밀번호" class="input" type="password" v-model="new_pass1" @keyup.enter="submit"/>
            <input placeholder="새 비밀번호 확인" class="input" type="password" v-model="new_pass2" @keyup.enter="submit"/>
            <div class="btns">
                <span @click="submit" class="submit-btn">완료</span>
            </div>
            <p class="sub-txt">안전한 비밀번호로 내정보를 보호하세요.</p>
        </div>
    </div>
</template>
<script>
const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'AccountPassChange',
    data() {
        return {
            username: '',
            before_pass: "",
            new_pass1: "",
            new_pass2: "",
        }
    },
    mounted() {
        this.$refs.firstinput.focus();
    },
    methods: {
        submit() {
            this.$http.get(`${baseURI}/users/me`)
            .then((res) => {
                this.username = res.data.data.username;
                this.$http.put(`${baseURI}/users/me`, {
                    password: this.new_pass1,
                    old_password: this.before_pass
                }).then((res) => {
                    if(res.data.status===100) {
                        alert('비밀번호가 변경되었습니다.');
                        this.$router.push('/views');
                    }
                    else if(res.data.status===-101) {
                        alert("현재 비밀번호를 확인해주세요!")
                    }
                }).catch((error) => {
                    console.log(error);
                })
            })
            .catch((error) => {
                console.log(error)
            })
        },
        checkInput() {
            let checkpass = /^[a-zA-Z0-9~!@#$%<>^&*()\-=+_’.]+$/;
            //기존 비밀번호 확인
            if(this.before_pass == "") {
                alert("본인인증을 위해 현재 비밀번호를 입력해주세요!")
            }
            else if(this.new_pass1 != this.new_pass2) {
                alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다!');
                return false;
            }
            else if (!checkpass.test(this.new_pass1) || this.new_pass1.length < 8 || this.new_pass1.length > 30) {
                alert('새 비밀번호는 영문 대소문자, 숫자, 특수문자 조합 8~30자 이어야합니다!');
                return false;
            }
            else {
                return true;
            }
        }
    },
}
</script>
<style scoped>
</style>