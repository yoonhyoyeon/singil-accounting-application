<template>
    <div>
        <div class="info-table">
            <div class="info">
                <div class="title-area">
                    <span class="title">관리자 이름</span>
                </div>
                <div class="info-area">
                    <input v-model="info.edited_name" class="val" />
                </div>
            </div>
            <div class="info">
                <div class="title-area">
                    <span class="title">관리자 이메일</span>
                </div>
                <div class="info-area">
                    <input v-model="info.edited_email" class="val" />
                </div>
            </div>
            <div class="info">
                <div class="title-area">
                    <span class="title">관리자 전화번호</span>
                </div>
                <div class="info-area">
                    <input v-model="info.edited_phone" class="val" /> 
                </div>
            </div>
            <div class="info">
                <div class="title-area">
                    <span class="title">법인명(사업자명)</span>
                </div>
                <div class="info-area">
                    <input v-model="info.edited_corporate_name" class="val" />
                </div>
            </div>
            <div class="info">
                <div class="title-area">
                    <span class="title">법인번호(사업자등록번호)</span>
                </div>
                <div class="info-area">
                    <span class="val">{{corporate_number}}</span>
                </div>
            </div>
            <div class="info">
                <div class="title-area">
                    <span class="title">비밀번호 확인</span>
                </div>
                <div class="info-area">
                    <input v-model="old_pass" type="password" class="val" />
                </div>
            </div>
        </div>
        <div class="bottom-box">
            <span class="edit-btn" @click="submit">완료</span>
        </div>
    </div>
</template>
<script>
const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'EditTable',
    props: ['name','email','phone','corporate_name','corporate_number'],
    data() {
        return {
            info: {
                edited_name: this.name,
                edited_email: this.email,
                edited_phone: this.phone,
                edited_corporate_name: this.corporate_name,
            },
            old_pass: '',
        }
    },
    methods: {
        checkInput() {
            let checkid = /^[a-z0-9]+$/;
            let checkpass = /^[a-zA-Z0-9~!@#$%<>^&*()\-=+_’.]+$/;
            let checkname = /^[a-zA-Z가-힣]+$/;
            let checkphone = /^\d{3}-\d{3,4}-\d{4}$/;
            let checkemail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

            if (!checkname.test(this.info.edited_name) || this.info.edited_name.length < 2 || this.info.edited_name.length > 5) {
                alert('관리자 이름은 영문 대소문자, 한글 조합 2~5자 이어야합니다!');
                return false;
            }
            else if (!checkphone.test(this.info.edited_phone)) {
                alert('관리자 전화번호를 전화번호 형식(010-1234-5678)에 맞게 입력해주세요!');
                return false;
            }
            else if (!checkemail.test(this.info.edited_email)) {
                alert('관리자 이메일을 이메일 형식에 맞게 입력해주세요!');
                return false;
            }
            else if (this.info.edited_corporate_name.length < 2 || this.info.edited_corporate_name.length > 30) {
                alert('법인명(사업자명)은 2~30자 이어야합니다!');
                return false;
            }
            else if(this.old_pass=="") {
                alert('본인인증을 위해 비밀번호를 입력해주세요!');
                return false;
            }
            else {
                return true;
            }
        },
        submit() {
            if(this.checkInput()) {
                this.$http.put(`${baseURI}/users/me`, {
                    name: this.info.edited_name,
                    email: this.info.edited_email,
                    phone: this.info.edited_phone,
                    corporate_name: this.info.edited_corporate_name,
                    old_password: this.old_pass
                }).then((res) => {
                    console.log(res.data.status)
                    if(res.data.status===100) {
                        location.reload();
                    }
                    else if(res.data.status===-101) {
                        alert('비밀번호를 확인해 주세요!');
                    }
                }).catch((error) => {
                    const msg = error.response.data.error.msg;
                    if(msg == "username must be unique") alert('이미 존재하는 아이디 입니다.');
                    else if(msg == "phone must be unique") alert('이미 등록된 전화번호 입니다.');
                    else if(msg == "email must be unique") alert('이미 등록된 이메일 입니다.');
                })
                return 0;
            }
        }
    },
}
</script>
<style scoped>
</style>