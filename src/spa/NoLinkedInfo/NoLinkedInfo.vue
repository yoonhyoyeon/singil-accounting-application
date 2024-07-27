<template>
    <div class="no-linked-info">
        <img class="icon" src="@/assets/img/nodata.png" />
        <h1 class="title">아직 서비스를 이용하실 수 없습니다!</h1>
        <p class="sub">서비스 제공에 필요한 정보들(<a href="https://www.astems.co.kr/home/main/Astems_main.php3" target="blank">아스템즈(POS)</a>, <a href="https://www.cardsales.or.kr/" target="blank">여신금융협회</a>, 티머니&캐쉬비 수수료)을 등록해야합니다.</p>
        <div class="btns">
            <router-link to="/views/linkinfo" class="btn" v-if="!linked_account_pos">정보 등록하러 가기 <img src="@/assets/img/arrow_down_white.png" /></router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NoLinkedInfo',
    props: ['linked_account_pos', 'linked_account_goddess'],
    data() {
        return {
            
        }
    },
    methods: {

    }
}
</script>
<style scoped>
</style>