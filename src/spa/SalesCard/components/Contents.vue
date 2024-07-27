<template>
    <div class="contents-wrap">
        <transition name="opacity">
            <detail-popup
                v-if="detail_popup"
                @close="popup_close"
                :type="popup_type"
                :from_date="from_date"
                :to_date="to_date"
                :card_data="card_data"
            />
        </transition>
        
        <div class="top-box">
            <div class="row">
                <div class="item">
                    <span class="price">
                        <ICountUp
                            :delay="1000"
                            :endVal="Number(static_today)"
                            :options="animaiton_options"
                        />원
                    </span>
                    <span class="title">최근 1일 카드 매출</span>
                </div>
                <div class="item">
                    <span class="price">
                        <ICountUp
                            :delay="1500"
                            :endVal="Number(static_week)"
                            :options="animaiton_options"
                        />원
                    </span>
                    <span class="title">최근 7일 카드 매출</span>
                </div>
                <div class="item">
                    <span class="price">
                        <ICountUp
                            :delay="2000"
                            :endVal="Number(static_month)"
                            :options="animaiton_options"
                        />원
                    </span>
                    <span class="title">최근 30일 카드 매출</span>
                </div>
                <div class="item">
                    <button class="btn">엑셀 파일 다운로드<img src="@/assets/img/download-icon.png" /></button>
                </div>
            </div>
        </div>
        <div class="contents">
            <div class="date_row">
                <span class="title">Card Sales</span>
                <span class="date_box">
                    <input type="date" placeholder="From" v-model="from_date" :max="(to_date ? to_date : today_date)" />
                    <span class="txt">~</span>
                    <input ref="to_date_input" type="date" placeholder="To" v-model="to_date" :min="from_date" :max="today_date" />
                </span>
            </div>
            <div class="row">
                <div class="chart-box">
                    <div class="top">
                        <span class="title">카드 매출 현황</span>
                    </div>
                    <div class="chart">
                        <canvas ref="card_chart"></canvas>
                    </div>
                    <div class="table-wrap">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th style="width: 10%;">카드사</th>
                                    <th style="width: 10%">매입건수</th>
                                    <th>매입합계</th>
                                    <th>수수료</th>
                                    <th>부가세 대리납부금액</th>
                                    <th>지급예정합계</th>
                                    <th></th>
                                </tr>
                                <tr v-if="loading">
                                    <td colspan="10" style="background-color:#fff!important;">
                                        <loading-img></loading-img>
                                    </td>
                                </tr>
                                <template v-else>
                                <tr v-for="item in card_data">
                                    <td>{{item.card_company}}</td>
                                    <td>{{item.count}}</td>
                                    <td>{{item.pca_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                                    <td>{{item.fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                                    <td>{{item.vat_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                                    <td>{{item.pym_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                                    <td><span class="btn" @click="popup_open(item.card_company)">자세히 보기</span></td>
                                </tr>
                                <tr>
                                    <td>총계</td>
                                    <td>{{count_amount}}</td>
                                    <td>{{pca_amount}}</td>
                                    <td>{{fee_amount}}</td>
                                    <td>{{vat_fee_amount}}</td>
                                    <td>{{pym_amount}}</td>
                                    <td></td>
                                </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from '@/shared-components/Loding';
import moment from 'moment';
import DetailPopup from '@/shared-components/DetailPopup';
import ICountUp from 'vue-countup-v2';

const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'Contents',
    components: {
        'detail-popup': DetailPopup,
        ICountUp,
        'loading-img': Loading,
    },
    data() {
        return {
            card_chart_data: {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '카드 매출',
                        data: [],
                        backgroundColor: 'rgba(119, 159, 229, 0.3)',
                        borderColor: 'rgba(119, 159, 229, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                userCallback: function(value, index, values) {
                                    value = value.toString();
                                    value = value.split(/(?=(?:...)*$)/);
                                    value = value.join(',');
                                    return value+'원';
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);
                                value = value.join(',');
                                return value+'원';
                            }
                        }
                    }
                }
            },
            card_chart: undefined,
            chart_card_data: [],
            dates: [],

            animaiton_options: {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            },
            today_date: undefined,
            from_date: undefined,
            to_date: undefined,
            detail_popup: false,
            popup_type: '',
            loading: false,

            card_data: [],
            static_today: 0,
            static_week: 0,
            static_month: 0,
        }
    },
    created() {
        let now = moment();
        this.today_date = now.format('YYYY-MM-DD');
        this.to_date = this.today_date;
        this.from_date = now.startOf('month').format('YYYY-MM-DD');

        this.$http.get(`${baseURI}/cards/statics`)
        .then((res) => {
            console.log(res)
            this.static_today=res.data.data.today;
            this.static_week=res.data.data.week;
            this.static_month=res.data.data.month;
        })
        .catch((error) => {
            console.log(error);
        })
    },
    watch: {
        'from_date' : function() {
            this.get_data();
            this.get_data_1();
        },
        'to_date' : function() {
            this.get_data();
            this.get_data_1();
        },
    },
    computed: {
        'count_amount': function() {
            return this.card_data.reduce(function(prev, next) {
              return Number(prev) + Number(next.count);
            }, 0);
        },
        'pca_amount': function() {
            return this.card_data.reduce(function(prev, next) {
              return Number(prev) + Number(next.pca_amount);
            }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        'pym_amount': function() {
            return this.card_data.reduce(function(prev, next) {
              return Number(prev) + Number(next.pym_amount);
            }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        'fee_amount': function() {
            return this.card_data.reduce(function(prev, next) {
              return Number(prev) + Number(next.fee);
            }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        'vat_fee_amount': function() {
            return this.card_data.reduce(function(prev, next) {
              return Number(prev) + Number(next.vat_fee);
            }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
    },
    mounted() {
        this.card_chart = new Chart(this.$refs.card_chart, this.card_chart_data);
    },
    methods: {
        chart_update() {
            this.card_chart_data.data.datasets[0].data = this.chart_card_data;
            this.card_chart_data.data.labels = this.dates;
            this.card_chart.update();
        },
        popup_close() {
            this.detail_popup = false;
        },
        popup_open(type) {
            this.detail_popup = true;
            this.popup_type = type;
        },

        get_data() {
            this.loading=true;
            this.$http.get(`${baseURI}/cards?startDate=${this.from_date}&endDate=${this.to_date}`)
            .then((res) => {
                this.card_data = res.data.data;
                this.loading=false;
            })
            .catch((error) => {
                console.log(error);
                this.loading=false;
            })
        },
        
        get_data_1() {
            this.$http.get(`${baseURI}/sales/statics2?startDate=${this.from_date}&endDate=${this.to_date}`)
            .then((res) => {
                console.log(res);
                this.chart_card_data=[];
                this.dates=[];
                for (let i = 0; i < res.data.data.length; i++){
                    this.chart_card_data[i] = res.data.data[i]["card"];
                    this.dates[i] = res.data.data[i]["date"];
                }
                this.chart_update();
            })
            .catch((error) => {
                console.log(error);
            })
        },
        update_yeosin_token() {
            this.$http.get(`${baseURI}/link/yeosin`)
            .then((res) => {
                if(res.data.status == 100) {
                    this.$session.set('yeosin_token', res.data.data.token);
                    alert('여신 만료되었당.');
                    location.reload();
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
}
</script>
<style scoped>
    .table-wrap .table tr td:first-child {
        background-color: #eef4ff!important;
        font-weight: 600;
    }
</style>