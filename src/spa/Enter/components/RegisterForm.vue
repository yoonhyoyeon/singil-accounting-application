<template>
    <div>
        <input ref="firstinput" class="input" placeholder="아이디" type="text" v-model="id" @keyup.enter="register"/>
        <input class="input" placeholder="비밀번호" type="password" v-model="pass" @keyup.enter="register"/>
        <input class="input" placeholder="관리자 성명" type="text" v-model="name" @keyup.enter="register"/>
        <input ref="phoneinput" class="input" placeholder="관리자 전화번호( - 포함)" type="text" v-model="phone" @keyup.enter="register"/>
        <input class="input" placeholder="관리자 이메일" type="text" v-model="email" @keyup.enter="register"/>
        <input class="input" placeholder="법인명 (사업자명)" type="text" v-model="business_name" @keyup.enter="register"/>
        <input class="input" placeholder="법인번호 (사업자등록번호)" type="text" v-model="business_num" @keyup.enter="register"/>
        <button class="submit-btn" @click="register">회원가입</button>
        <div class="sub-txt-box">
            <span class="sub-txt">계정이 이미 있으신가요?</span>
            <span @click="go_login_page" class="sub-txt">로그인</span>
        </div>
    </div>
</template>
<script>
const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'RegisterForm',
    props: ['go_login_page'],
    data() {
        return {
            id: '',
            pass: '',
            name: '',
            phone: '',
            email: '',
            business_name: '',
            business_num: '',
        }
    },
    mounted() {
        this.$refs.firstinput.focus();
    },
    methods: {
        register() {
            if(this.checkInput()) {
                this.$http.post(`${baseURI}/auth/signup`, 
                {
                    username: this.id,
                    password: this.pass,
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    corporate_name: this.business_name,
                    corporate_number: this.business_num
                }).then((res) => {
                    console.log(res);
                    this.go_login_page();
                }).catch((error) => {
                    const msg = error.response.data.error.msg;
                    if(msg == "username must be unique") alert('이미 존재하는 아이디 입니다.');
                    else if(msg == "phone must be unique") alert('이미 등록된 전화번호 입니다.');
                    else if(msg == "email must be unique") alert('이미 등록된 이메일 입니다.');
                })
            }
        },
        checkInput() {
            let checkid = /^[a-z0-9]+$/;
            let checkpass = /^[a-zA-Z0-9~!@#$%<>^&*()\-=+_’.]+$/;
            let checkname = /^[a-zA-Z가-힣]+$/;
            let checkphone = /^\d{3}-\d{3,4}-\d{4}$/;
            let checkemail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

            if (!checkid.test(this.id) || this.id.length < 3 || this.id.length > 15) {
                alert('아이디는 영문 소문자, 숫자 조합 3~15자 이어야합니다!');
                return false;
            }
            else if (!checkpass.test(this.pass) || this.pass.length < 8 || this.pass.length > 30) {
                alert('비밀번호는 영문 대소문자, 숫자, 특수문자 조합 8~30자 이어야합니다!');
                return false;
            }
            else if (!checkname.test(this.name) || this.name.length < 2 || this.name.length > 5) {
                alert('관리자 이름은 영문 대소문자, 한글 조합 2~5자 이어야합니다!');
                return false;
            }
            else if (!checkphone.test(this.phone)) {
                alert('관리자 전화번호를 전화번호 형식(010-1234-5678)에 맞게 입력해주세요!');
                return false;
            }
            else if (!checkemail.test(this.email)) {
                alert('관리자 이메일을 이메일 형식에 맞게 입력해주세요!');
                return false;
            }
            else if (this.business_name.length < 2 || this.business_name.length > 30) {
                alert('법인명(사업자명)은 2~30자 이어야합니다!');
                return false;
            }
            else if (this.business_num.length < 10 || this.business_num.length > 13) {
                alert('법인번호(사업자등록번호)는 10~13자 이어야합니다!');
                return false;
            }
            else {
                return true;
            }
        }
    },
    watch: {
        'phone': function() {
            this.phone = this.phone.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-")
        }
    },
    computed: {

    }
}
</script>
<style scoped>
</style>