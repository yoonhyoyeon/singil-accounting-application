<template>
    <div class="contents-wrap">
        <div class="top-box">
            <div class="row">
                <div class="item">
                    <span class="price">42,500원</span>
                    <span class="title">오늘 캐시비 매출</span>
                </div>
                <div class="item">
                    <span class="price">242,900원</span>
                    <span class="title">최근 7일 캐시비 매출</span>
                </div>
                <div class="item">
                    <span class="price">1,695,200원</span>
                    <span class="title">최근 30일 캐시비 매출</span>
                </div>
                <div class="item">
                    <button class="btn">엑셀 파일 다운로드<img src="@/assets/img/download-icon.png" /></button>
                </div>
            </div>
        </div>
        <div class="contents">
            <div class="date_row">
                <span class="title">Cashbee Sales</span>
                <span class="date_box">
                    <input type="date" placeholder="From" v-model="from_date" :max="(to_date ? to_date : today_date)" />
                    <span class="txt">~</span>
                    <input ref="to_date_input" type="date" placeholder="To" v-model="to_date" :min="from_date" :max="today_date" />
                </span>
            </div>
            <div class="row">
                <div class="chart-box">
                    <div class="top">
                        <span class="title">캐시비 매출 현황</span>
                    </div>
                    <div class="chart">
                        <canvas ref="cashbee_chart"></canvas>
                    </div>
                    <div class="table-wrap">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th style="width: 10%;">카드</th>
                                    <th>결재 금액</th>
                                    <th>수수료율</th>
                                    <th>수수료</th>
                                    <th>입금금액</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td>캐시비</td>
                                    <td>15800원</td>
                                    <td>0.8%</td>
                                    <td>710원</td>
                                    <td>14180원</td>
                                    <td><span class="btn">자세히 보기</span></td>
                                </tr>
                                <tr>
                                    <td>총계</td>
                                    <td>15800원</td>
                                    <td></td>
                                    <td>710원</td>
                                    <td>14180원</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Contents',
    data() {
        return {
            cashbee_chart_data: {
                type: 'line',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '캐시비 매출',
                        data: [6,2,3,2,1,5],
                        backgroundColor: 'rgba(119, 159, 229, 0.3)',
                        borderColor: 'rgba(119, 159, 229, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            },
            tmoeny_chart: undefined,
            today_date: undefined,
            from_date: undefined,
            to_date: undefined,
        }
    },
    created() {
        let dateob = new Date(); 
        let year = dateob.getFullYear(); 
        let month = dateob.getMonth()+1; 
        let day = dateob.getDate();  
        
        if(day == 1) {
            day = new Date(year,String(Number(month)-1),'0').getDate();
            month -= 1;
        }
        else {
            day = day-1;
        }
        month = String(month);
        day = String(day);
        if(month.length == 1){ 
            month = "0" + month; 
        } 
        if(day.length == 1){ 
            day = "0" + day;
        }
        this.today_date = year + "-" + month + "-" + day;
    },
    mounted() {
        let cashbee_chart = this.$refs.cashbee_chart;
        let cashbee_chart_obj = new Chart(cashbee_chart, this.cashbee_chart_data);
        this.to_date = this.today_date;
    },
    methods: {

    },
}
</script>
<style scoped>
</style>