<template>
    <div class="contents-wrap">
        <div class="link_info_box">
            <loading-img v-if="loading"></loading-img>
            <div class="box" v-else>
                <h1 class="title">아스템즈 동기화</h1>
                <div class="input-wrap">
                    <input ref="to_date_input" type="date" placeholder="From" v-model="from_date" :max="to_date" />
                </div>
                <div class="input-wrap">
                    <input ref="to_date_input" type="date" placeholder="To" v-model="to_date" :min="from_date" :max="today_date" />
                </div>
                <div class="btns">
                    <button @click="submit" class="submit-btn">동기화</button>
                </div>
                <p class="sub-txt">데이터를 불러오기 위해 동기화를 해야합니다.</p>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from '@/shared-components/Loding';
import moment from 'moment';

const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'Contents',
    components: {
        'loading-img' : Loading
    },
    data() {
        return {
            today_date: undefined,
            from_date: undefined,
            to_date: undefined,
            loading: false,
        }
    },
    created() {
        let now = moment();
        this.today_date = now.format('YYYY-MM-DD');
        this.to_date = this.today_date;
        this.from_date = now.startOf('month').format('YYYY-MM-DD');
    },
    methods: {
        submit() {
            this.loading=true;
            this.$http.post(`${baseURI}/sync/sales?startDate=${this.from_date}&endDate=${this.to_date}&chk=1`,{},
            {
                headers: {
                    'authorization2': this.$session.get('astems_token')
                }
            })
            .then((res) => {
                if(res.data.status == 100) {
                    this.loading = false;
                    this.from_date = undefined;
                    this.to_date = this.today_date;
                    alert('아스템즈 데이터 동기화 성공');
                }
            })
            .catch((error) => {
                console.log(error.response);
                if(error.response.data.status == -110) {
                    this.update_astems_token();
                }
                this.loading = false;
            })
        },
        update_astems_token() {
            this.$http.get(`${baseURI}/link/astems`)
            .then((res) => {
                if(res.data.status == 100) {
                    this.$session.set('astems_token', res.data.data.token);
                    alert('동기화 실패: 토큰 만료 (다시시도 해주세요)');
                    location.reload();
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
}
</script>
<style scoped>
input {
    color: #6d6d6d;
    font-weight: 600;
    border: 0;
    box-shadow: 0px 0px 3px rgba(0,0,0,.2);
    background-color: #fff;
    padding: 10px 12px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
}
input[type="date"]:before {
    content: attr(placeholder) !important;
    color: #aaa;
    margin-right: 10px;
}
.btns {
    margin-top: 5px;
}
button.submit-btn {
    margin: 0!important;
}
</style>