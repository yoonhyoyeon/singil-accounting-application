<template>
    <div class="contents-wrap">
        <div class="contents">
            <div class="date_row">
                <span class="title">Full Sales List</span>
            </div>
            <div class="row">
                <div class="chart-box">
                    <div class="top">
                        <span class="title">총 매출 목록</span>
                        <button class="download-btn">엑셀 파일 다운로드<img src="@/assets/img/download-icon.png" /></button>
                    </div>
                    <div class="table-wrap">
                        <div class="table-top">
                            <input ref="to_date_input" type="date" placeholder="On" v-model="on_date" :max="today_date" />
                            
                            <div class="limit-box">
                                <span class="txt">페이지당 조회건수</span>
                                <select v-model="item_limit">
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th style="width: 8%;">영수번호</th>
                                    <th style="width: 8%;">POS번호</th>
                                    <th style="width: 8%;">시간</th>
                                    <th style="width: 8%;">매출구분</th>
                                    <th style="width: 10%;">티머니</th>
                                    <th style="width: 10%;">캐시비</th>
                                    <th style="width: 10%;">현금</th>
                                    <th style="width: 10%;">카드</th>
                                    <th style="width: 10%;">카드사</th>
                                    <th>총 매출액</th>
                                </tr>
                                <tr v-if="loading">
                                    <td colspan="10" style="background-color:#fff!important;">
                                        <loading-img></loading-img>
                                    </td>
                                </tr>
                                <tr v-else-if="data.length==0">
                                    <td colspan="10" style="background-color:#fff!important;">
                                        <div class="nodata_box">
                                            <img class="icon" src="@/assets/img/nodata.png" />
                                            <span class="nodata_text">존재하는 데이터가 없습니다!</span>
                                            <span class="sync-btn" @click="sync_data">동기화</span>
                                        </div>       
                                    </td>
                                </tr>
                                <tr v-else v-for="item in data">
                                    <td>{{item.bill_no}}</td>
                                    <td>{{item.pos_num}}</td>
                                    <td>{{item.time}}</td>
                                    <td>{{item.klass}}</td>
                                    <td>{{item.tmoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                                    <td>{{item.cashbee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                                    <td>{{item.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                                    <td>{{item.card.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                                    <td>{{item.card_company}}</td>
                                    <td>{{item.sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="table-bottom">
                            <paginate
                            :page-count="max_page"
                            :force-page="pageNum"
                            :click-handler="page_change"
                            :prev-text="'Prev'"
                            :next-text="'Next'"
                            :container-class="'pagination'">
                            </paginate>
                        </div>
                    </div>
                </div>
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
            on_date: undefined,
            today_date: undefined,
            astems_token: '',
            yeosin_token: '',
            data: [],
            loading: false,

            item_limit: 30,
            pageNum: 1,
            max_page: 0
        }
    },
    created() {
        this.astems_token = this.$session.get('astems_token');
        this.yeosin_token = this.$session.get('yeosin_token');
        if(this.$session.get('item_limit')===undefined) this.item_limit = '30';
        else this.item_limit = this.$session.get('item_limit');

        let now = moment();
        this.today_date = now.format('YYYY-MM-DD');
        this.on_date = this.today_date;
    },
    watch: {
        'on_date': function() {
            this.pageNum = 1;
            this.get_data();
        },
        'item_limit': function() {
            this.$session.set('item_limit', this.item_limit);
            this.pageNum = 1;
            this.get_data();
        }
    },
    methods: {
        update_astems_token() {
            this.$http.get(`${baseURI}/link/astems`)
            .then((res) => {
                if(res.data.status == 100) {
                    this.$session.set('astems_token', res.data.data.token);
                    alert('만료되었당.');
                    location.reload();
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        sync_data() {
            this.loading=true;
            this.$http.post(`${baseURI}/sync/sales?startDate=${this.on_date}&endDate=${this.on_date}`,{},
            {
                headers: {
                    'authorization2': this.$session.get('astems_token')
                }
            })
            .then((res) => {
                console.log(res);
                this.get_data();
            })
            .catch((error) => {
                console.log(error.response);
                if(error.response.data.status == -110) {
                    this.update_astems_token();
                }
                this.loading = false;
            })
        },
        get_data() {
            this.loading=true;
            this.$http.get(`${baseURI}/sales?date=${this.on_date}&page=${this.pageNum-1}&limit=${this.item_limit}`)
            .then((res) => {
                this.data = res.data.data;
                this.max_page = res.data.totalPage;
                this.data.reverse();
                this.loading=false;
            })
            .catch((error) => {
                console.log(error.response)
                this.loading = false;
            })
        },
        page_change(pageNum) {
            this.pageNum = pageNum;
            this.get_data();
        }
    }
}
</script>
<style scoped>
    .views .view-box .contents-wrap .contents .date_row {
        margin-bottom: 40px;
    }
    .views .view-box .contents-wrap .contents .row .download-btn {
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        padding: 10px 22px;
        background-color: #779fe5;
        border: 0;
        border-radius: 3px;
        cursor: pointer;
    }
    .views .view-box .contents-wrap .contents .row .download-btn img {
        width: 17px;
        margin-left: 8px;
    }
    .views .view-box .contents-wrap .contents .row .chart-box .top {
        display: flex;
        justify-content: space-between;
    }
    .views .view-box .contents-wrap .contents input {
        color: #6d6d6d;
        font-weight: 600;
        border: 0;
        box-shadow: 0px 0px 3px rgba(0,0,0,.2);
        background-color: #fff;
        padding: 10px 12px;
        width: 190px;
    }
    .views .view-box .contents-wrap .contents .row .chart-box .table-wrap .table tr td:first-child {
        background-color: #eef4ff!important;
        font-weight: 600;
    }
    .views .view-box .contents-wrap .contents .row .chart-box .table-wrap .table tr:last-child {
        border-top: 0;
        background-color: #fff;
    }
    .views .view-box .contents-wrap .contents .row .chart-box .table-wrap .table tr:last-child td {
        padding: 8px 0;
    }

</style>