<template>
    <div class="link_info_box">
        <div class="box">
            <h1 class="title">아스템즈 계정 등록</h1>
            <input placeholder="아이디" ref="firstinput" class="input" v-model="id" @keyup.enter="submit"/>
            <input placeholder="비밀번호" class="input" type="password" v-model="pass" @keyup.enter="submit"/>
            <div class="btns">
                <span @click="submit" class="submit-btn">다음</span>
            </div>
            <p class="sub-txt">아이디와 비밀번호는 서버에 안전하게 암호화되어 저장되며 서비스 이용 목적 외에 다른 목적으로 절대 사용하지 않습니다.</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LinkAstemes',
    props: ['astems_id','astems_pass'],
    data() {
        return {
            id: this.astems_id,
            pass: this.astems_pass
        }
    },
    mounted() {
        this.$refs.firstinput.focus();
    },
    methods: {
        submit: function() {
            if(!this.id.replace(/ /gi,"") || !this.pass.replace(/ /gi,"")) {
                alert('아이디와 비밀번호를 입력해주세요!');
                return false;
            }
            this.$emit('astems_submit', this.id, this.pass);
            this.$emit('next_step');
        }
    },
}
</script>
<style scoped>
</style>