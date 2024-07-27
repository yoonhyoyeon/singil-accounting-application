<template>
    <div class="popup-background">
        <div class="popup-box">
            <div class="popup-top">
                <h1 class="title">{{type}} 매출내역 <span class="sub">({{from_date}} ~ {{to_date}})</span></h1>
                <span class="close" @click="$emit('close')"><img src="@/assets/img/close.png" /></span>
            </div>
            <div class="table-wrap">
                <table class="table">
                    <tbody>
                        <tr>
                            <th style="width: 8%;">날짜</th>
                            <th style="width: 8%;">카드사</th>
                            <th style="width: 8%;">매입건수</th>
                            <th style="width: 8%;">매입합계</th>
                            <th style="width: 10%;">수수료</th>
                            <th style="width: 10%;">부가세 대리납부금액</th>
                            <th style="width: 10%;">지급예정합계</th>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="10" style="background-color:#fff!important;">
                                <loading-img></loading-img>
                            </td>
                        </tr>
                        <template v-else>
                        <tr v-for="item in data">
                            <td>{{item.date}}</td>
                            <td>{{item.card_company}}</td>
                            <td>{{item.count}}</td>
                            <td>{{item.pca_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                            <td>{{item.fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                            <td>{{item.vat_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                            <td>{{item.pym_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                        </tr>
                        <tr>
                            <td>총계</td>
                            <td></td>
                            <td>{{amount_info.count}}</td>
                            <td>{{amount_info.pca_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                            <td>{{amount_info.fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                            <td>{{amount_info.vat_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                            <td>{{amount_info.pym_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                        </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from '@/shared-components/Loding';

const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'DetailPopup',
    components: {
        'loading-img': Loading
    },
    props: ['type', 'from_date', 'to_date', 'card_data'],
    data() {
        return {
            data: [],
            loading: false,
            card_all_data: this.card_data
        }
    },
    created() {
        this.get_data();
    },
    computed: {
        'amount_info' : function() {
            return this.card_data.filter((obj) => obj.card_company == this.type)[0];
        }
    },
    methods: {
        page_change() {

        },
        get_data() {
            this.loading=true;
            this.$http.get(`${baseURI}/cards/detail?startDate=${this.from_date}&endDate=${this.to_date}&cardCompany=${this.type}`)
            .then((res) => {
                this.data = res.data.data;
                this.loading=false;
            })
            .catch((error) => {
                console.log(error);
                this.loading=false;
            })
        }
    }
}
</script>
<style scoped>
    .popup-background {
        color: #545454;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: rgba(0,0,0,.2);
    }
    .popup-background .popup-box {
        width: 74%;
        height: 88%;
        background-color: #fff;
        box-shadow: 0px 0px 3px rgba(0,0,0,.2);
        border-radius: 5px;
        box-sizing: border-box;
        border-radius: 5px;
        overflow: hidden;
    }
    .popup-background .popup-box .popup-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        padding: 0 3%;
        background-color: #f6f8fa;
        box-shadow: 0px 0px 3px rgba(0,0,0,.2);
    }
    .popup-background .popup-box .popup-top .close {
        cursor: pointer;
    }
    .popup-background .popup-box .popup-top .close img {
        width: 14px;
    }
    .popup-background .popup-box .popup-top .title {
        font-size: 26px;
    }
    .popup-background .popup-box .popup-top .title .sub {
        font-size: 16px;
        color: #779fe5;
    }
    .table-wrap {
        width: 100%;
        height: calc(100% - 80px);
        box-sizing: border-box;
        padding: 30px 3%;
        overflow-y: auto;
    }
     .table-wrap .table {
        width: 100%;
        text-align: center;
        border-top: 3px solid #85a8e6;
        border-bottom: 3px solid #85a8e6;
    }
     .table-wrap .table tr:nth-child(2n) td:first-child {
        font-weight: 600;
        padding: 0;
        text-align: center;
        background-color: #eef4ff;
    }
     .table-wrap .table tr th {
        padding: 10px 0;
        border-bottom: 3px solid #85a8e6;
    }
     .table-wrap .table tr td {
        border: 0;
        padding: 8px 0;
        border-bottom: 1px solid #c4c4c4;
        border-right: 1px solid #c4c4c4;
        border-left: 1px solid #c4c4c4;
    }
     .table-wrap .table tr th:last-child {
        border-right: 0;
    }
     .table-wrap .table tr td:last-child {
        border-right:0!important;
    }
     .table-wrap .table tr th:first-child {
        border-left:0;
    }
     .table-wrap .table tr td:first-child {
        border-left:0!important;
    }
     .table-wrap .table tr th {
        border-right: 1px solid #c4c4c4;
        border-left: 1px solid #c4c4c4;
    }
     .table-wrap .table tr:first-child {
        background-color: #eef4ff;
    }
     .table-wrap .table tr:last-child {
        border-top: 3px solid #85a8e6;
        background-color: #eef4ff;
    }
     .table-wrap .table tr:last-child td {
        padding: 10px 0;
        border-right: 1px solid #c4c4c4;
        border-left: 1px solid #c4c4c4;
    }
     .table-wrap .table .btn {
        cursor: pointer;
    }
     .table-wrap .table .nodata_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 25px 0;
        box-sizing: border-box;
    }
     .table-wrap .table .nodata_box .icon {
        width: 150px;
    }
     .table-wrap .table .nodata_box .nodata_text {
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 10px;
    }
     .table-wrap .table .nodata_box .sync-btn {
        color: #85a8e6;
        font-weight: 600;
        font-size: 18px;
        margin-left: 10px;
        cursor: pointer;
    }
    .table-wrap .table tr td:first-child {
        background-color: #eef4ff!important;
        font-weight: 600;
    }
</style>