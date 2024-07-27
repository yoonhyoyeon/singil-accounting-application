<template>
    <div class="link_info_box">
        <div class="box">
            <h1 class="title">티머니, 캐시비 수수료 등록</h1>
            <div class="input-wrap">
                <input ref="firstinput" step="0.1" placeholder="티머니 수수료" class="input num" type="number" min="0" max="100" v-model="tmoney_fee" @keyup.enter="submit"/>
                <span class="persent">%</span>
            </div>
            <div class="input-wrap">
                <input step="0.1" placeholder="캐시비 수수료" class="input num" type="number" min="0" max="100" v-model="cashbee_fee" @keyup.enter="submit"/>
                <span class="persent">%</span>
            </div>
            <div class="btns">
                <button @click="$emit('prev_step')" class="submit-btn">이전</button>
                <button @click="submit" class="submit-btn">등록</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LinkFees',
    props: ['tmoney', 'cashbee'],
    data() {
        return {
            tmoney_fee: this.tmoney,
            cashbee_fee: this.cashbee
        }
    },
    mounted() {
        this.$refs.firstinput.focus();
    },
    methods: {
        submit: function() {
            if(!this.tmoney_fee && !this.cashbee_fee) {
                alert('수수료를 입력해주세요!');
                return false;
            }
            this.$emit('fee_submit', this.tmoney_fee, this.cashbee_fee);
        }
    },
}
</script>
<style scoped>
</style>