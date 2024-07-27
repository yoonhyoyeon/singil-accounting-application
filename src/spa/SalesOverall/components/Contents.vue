<template>
    <div class="contents-wrap">
        <div class="top-box">
            <div class="row">
                <div class="item">
                    <span class="price">
                        <ICountUp
                            :delay="1000"
                            :endVal="Number(total_sales_day)"
                            :options="animaiton_options"
                        />원
                    </span>
                    <span class="title">오늘 총 매출</span>
                </div>
                <div class="item">
                    <span class="price">
                        <ICountUp
                            :delay="1500"
                            :endVal="Number(total_sales_week)"
                            :options="animaiton_options"
                        />원
                    </span>
                    <span class="title">최근 7일 총 매출</span>
                </div>
                <div class="item">
                    <span class="price">
                        <ICountUp
                            :delay="2000"
                            :endVal="Number(total_sales_month)"
                            :options="animaiton_options"
                        />원
                    </span>
                    <span class="title">최근 30일 총 매출</span>
                </div>
                <div class="item">
                    <button class="btn" @click="download()">엑셀 파일 다운로드<img src="@/assets/img/download-icon.png" /></button>
                </div>
            </div>
        </div>
        <div class="contents">
            <div class="date_row">
                <span class="title">Overall Summary</span>
                <span class="date_box">
                    <input type="date" placeholder="From" v-model="from_date" :max="(to_date ? to_date : today_date)" />
                    <span class="txt">~</span>
                    <input ref="to_date_input" type="date" placeholder="To" v-model="to_date" :min="from_date" :max="today_date" />
                </span>
            </div>
            <div class="row">
                <div class="item">
                    <div class="top">
                        <span class="title">현금 매출</span>
                    </div>
                    <div class="bottom">
                        <span class="price">
                            <ICountUp
                            :delay="1000"
                            :endVal="Number(total_cash)"
                            :options="animaiton_options"
                            />원
                        </span>
                        <span class="rate" v-if="increase_cash!=NaN && isFinite(increase_cash)">
                            <img v-if="increase_cash>0" src="@/assets/img/rate_up.png" />
                            <img v-else-if="increase_cash<0" src="@/assets/img/rate_down.png" />
                            {{increase_cash}}%
                        </span>
                    </div>
                </div>
                <div class="item">
                    <div class="top">
                        <span class="title">카드 매출</span>
                    </div>
                    <div class="bottom">
                        <span class="price">
                            <ICountUp
                            :delay="1000"
                            :endVal="Number(total_card)"
                            :options="animaiton_options"
                            />원
                        </span>
                        <span class="rate" v-if="increase_card!=NaN && isFinite(increase_card)">
                            <img v-if="increase_card>0" src="@/assets/img/rate_up.png" />
                            <img v-else-if="increase_card<0" src="@/assets/img/rate_down.png" />
                            {{increase_card}}%
                        </span>
                    </div>
                </div>
                <div class="item">
                    <div class="top">
                        <span class="title">티머니 매출</span>
                    </div>
                    <div class="bottom">
                        <span class="price">
                            <ICountUp
                            :delay="1000"
                            :endVal="Number(total_tmoney)"
                            :options="animaiton_options"
                            />원
                        </span>
                        <span class="rate" v-if="increase_tmoney!=NaN && isFinite(increase_tmoney)">
                            <img v-if="increase_tmoney>0" src="@/assets/img/rate_up.png" />
                            <img v-else-if="increase_tmoney<0" src="@/assets/img/rate_down.png" />
                            {{increase_tmoney}}%
                        </span>
                    </div>
                </div>
                <div class="item">
                    <div class="top">
                        <span class="title">캐시비 매출</span>
                    </div>
                    <div class="bottom">
                        <span class="price">
                            <ICountUp
                            :delay="1000"
                            :endVal="Number(total_cashbee)"
                            :options="animaiton_options"
                            />원
                        </span>
                        <span class="rate" v-if="increase_cashbee!=NaN && isFinite(increase_cashbee)">
                            <img v-if="increase_cashbee>0" src="@/assets/img/rate_up.png" />
                            <img v-else-if="increase_cashbee<0" src="@/assets/img/rate_down.png" />
                            {{increase_cashbee}}%
                        </span>
                    </div>
                </div>
                <div class="item">
                    <div class="top">
                        <span class="title">총 매출 현황</span>
                    </div>
                    <div class="bottom">
                        <span class="price">
                            <ICountUp
                            :delay="1000"
                            :endVal="Number(total_sales)"
                            :options="animaiton_options"
                            />원
                        </span>
                        <span v-if="increase_sales!=NaN && isFinite(increase_sales)" class="rate">
                            <img v-if="increase_sales>0" src="@/assets/img/rate_up.png" />
                            <img v-else-if="increase_sales<0" src="@/assets/img/rate_down.png" />
                            {{increase_sales}}%
                        </span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="chart-box">
                    <div class="top">
                        <span class="title">총 매출 현황</span>
                    </div>
                    <div class="chart">
                        <canvas ref="overall_chart"></canvas>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="chart-box">
                    <div class="top">
                        <span class="title">현금 매출 현황</span>
                    </div>
                    <div class="chart">
                        <canvas ref="cash_chart"></canvas>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="chart-box">
                    <div class="top">
                        <span class="title">카드 매출 현황</span>
                    </div>
                    <div class="chart">
                        <canvas ref="card_chart"></canvas>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="chart-box">
                    <div class="top">
                        <span class="title">티머니 매출 현황</span>
                    </div>
                    <div class="chart">
                        <canvas ref="tmoney_chart"></canvas>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="chart-box">
                    <div class="top">
                        <span class="title">캐시비 매출 현황</span>
                    </div>
                    <div class="chart">
                        <canvas ref="cashbee_chart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ICountUp from 'vue-countup-v2';
import moment from 'moment';

const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'Contents',
    components: {
      ICountUp
    },
    data() {
        return {
            overall_chart_data: {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '총 매출',
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
            overall_chart: undefined,
            cash_chart_data: {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '현금 매출',
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
            cash_chart: undefined,
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
            tmoney_chart_data: {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '티머니 매출',
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
            tmoney_chart: undefined,
            cashbee_chart_data: {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '캐시비 매출',
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
            cashbee_chart: undefined,
            today_date: undefined,
            from_date: undefined,
            to_date: undefined,
            before_from_date: undefined,
            before_to_date: undefined,
            astems_token: '',
            yeosin_token: '',
            animaiton_options: {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            },

            total_sales_day: 0,
            total_sales_week: 0,
            total_sales_month: 0,
            total_sales: 0,
            total_cash: 0,
            total_card: 0,
            total_tmoney: 0,
            total_cashbee: 0,
            increase_sales: 0,
            increase_cash: 0,
            increase_card: 0,
            increase_tmoney: 0,
            increase_cashbee: 0,
            sales_data: [],
            cash_data: [],
            card_data: [],
            tmoney_data: [],
            cashbee_data: [],
            dates: []
        }
    },
    computed: {
        
    },
    created() {
        this.astems_token = this.$session.get('astems_token');
        this.yeosin_token = this.$session.get('yeosin_token');
        let now = moment();

        this.today_date = now.format('YYYY-MM-DD');
        this.to_date = this.today_date;
        this.from_date = now.startOf('month').format('YYYY-MM-DD');
        let term = moment(this.to_date, 'YYYY-MM-DD').diff(moment(this.from_date, 'YYYY-MM-DD'),'days')+1;
        this.before_from_date = moment(this.from_date, "YYYY-MM-DD").add(-1*term, 'days').format('YYYY-MM-DD');
        this.before_to_date = moment(this.from_date, "YYYY-MM-DD").add(-1, 'days').format('YYYY-MM-DD');

        this.$http.get(`${baseURI}/sales/statics`)
        .then((res) => {
            this.total_sales_day = res.data.data.today
            this.total_sales_week = res.data.data.week
            this.total_sales_month = res.data.data.month
        })
        .catch((error) => {
            console.log(error);
        })
    },
    mounted() {
        this.overall_chart = new Chart(this.$refs.overall_chart, this.overall_chart_data);
        this.cash_chart = new Chart(this.$refs.cash_chart, this.cash_chart_data);
        this.card_chart = new Chart(this.$refs.card_chart, this.card_chart_data);
        this.tmoney_chart = new Chart(this.$refs.tmoney_chart, this.tmoney_chart_data);
        this.cashbee_chart = new Chart(this.$refs.cashbee_chart, this.cashbee_chart_data);
    },
    watch: {
        'to_date': function() {
            let term = moment(this.to_date, 'YYYY-MM-DD').diff(moment(this.from_date, 'YYYY-MM-DD'),'days')+1;
            this.before_from_date = moment(this.from_date, "YYYY-MM-DD").add(-1*term, 'days').format('YYYY-MM-DD');
            this.before_to_date = moment(this.from_date, "YYYY-MM-DD").add(-1, 'days').format('YYYY-MM-DD');
            this.getData();
        },
        'from_date': function() {
            let term = moment(this.to_date, 'YYYY-MM-DD').diff(moment(this.from_date, 'YYYY-MM-DD'),'days')+1;
            this.before_from_date = moment(this.from_date, "YYYY-MM-DD").add(-1*term, 'days').format('YYYY-MM-DD');
            this.before_to_date = moment(this.from_date, "YYYY-MM-DD").add(-1, 'days').format('YYYY-MM-DD');
            this.getData();
        }
    },
    methods: {
        chart_update() {
            this.overall_chart_data.data.datasets[0].data = this.sales_data;
            this.cash_chart_data.data.datasets[0].data = this.cash_data;
            this.card_chart_data.data.datasets[0].data = this.card_data;
            this.tmoney_chart_data.data.datasets[0].data = this.tmoney_data;
            this.cashbee_chart_data.data.datasets[0].data = this.cashbee_data;
            this.overall_chart_data.data.labels = this.dates;
            this.cash_chart_data.data.labels = this.dates;
            this.card_chart_data.data.labels = this.dates;
            this.tmoney_chart_data.data.labels = this.dates;
            this.cashbee_chart_data.data.labels = this.dates;
            this.overall_chart.update();
            this.cash_chart.update();
            this.card_chart.update();
            this.tmoney_chart.update();
            this.cashbee_chart.update();
        },
        getData() {
            this.$http.get(`${baseURI}/sales/statics2?startDate=${this.from_date}&endDate=${this.to_date}`)
            .then((res) => {
                console.log(res);
                this.sales_data=[];
                this.cash_data=[];
                this.card_data=[];
                this.tmoney_data=[];
                this.cashbee_data=[];
                this.dates=[];
                this.total_sales=0;
                this.total_cash=0;
                this.total_card=0;
                this.total_tmoney=0;
                this.total_cashbee=0;
                for (let i = 0; i < res.data.data.length; i++){
                    this.sales_data[i] = res.data.data[i]["sales"];
                    this.cash_data[i] = res.data.data[i]["cash"];
                    this.card_data[i] = res.data.data[i]["card"];
                    this.tmoney_data[i] = res.data.data[i]["tmoney"];
                    this.cashbee_data[i] = res.data.data[i]["cashbee"];
                    this.dates[i] = res.data.data[i]["date"];
                    this.total_sales += res.data.data[i]["sales"];
                    this.total_cash += res.data.data[i]["cash"];
                    this.total_card += res.data.data[i]["card"];
                    this.total_tmoney += res.data.data[i]["tmoney"];
                    this.total_cashbee += res.data.data[i]["cashbee"];
                }
                this.chart_update();
                this.$http.get(`${baseURI}/sales/statics2?startDate=${this.before_from_date}&endDate=${this.before_to_date}`)
                .then((res) => {
                    let t_ss = 0;
                    let t_ch = 0;
                    let t_cd = 0;
                    let t_tm = 0;
                    let t_cb = 0;
                    for (let i = 0; i < res.data.data.length; i++){
                        t_ss += res.data.data[i]["sales"];
                        t_ch += res.data.data[i]["cash"];
                        t_cd += res.data.data[i]["card"];
                        t_tm += res.data.data[i]["tmoney"];
                        t_cb += res.data.data[i]["cashbee"];
                    }
                    this.increase_sales = ((this.total_sales / t_ss - 1) * 100).toFixed(1);
                    this.increase_cash = ((this.total_cash / t_ch - 1) * 100).toFixed(1);
                    this.increase_card = ((this.total_card / t_cd - 1) * 100).toFixed(1);
                    this.increase_tmoney = ((this.total_tmoney / t_tm - 1) * 100).toFixed(1);
                    this.increase_cashbee = ((this.total_cashbee / t_cb - 1) * 100).toFixed(1);
                })
                .catch((error) => {
                    console.log(error);
                })
            })
            .catch((error) => {
                console.log(error);
            })
        },
        download() {
            const year = 2019;
            const month = 12;
            this.$http.get(`${baseURI}/excel/sales?year=${year}&month=${month}`, {
                responseType: 'blob'
            })
            .then((res) => {
                console.log(res);
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${year}년 ${month}월 매출현황.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>