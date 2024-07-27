<template>
    <div class="link_info_box">
        <transition name="opacity" mode="out-in">
            <link-astems
                v-if="step==0"
                :astems_id="astems_id"
                :astems_pass="astems_pass"
                @astems_submit="astems_submit"
                @next_step="next_step"
            ></link-astems>
            <link-goddess
                v-else-if="step==1"
                :goddess_id="goddess_id"
                :goddess_pass="goddess_pass"
                @goddess_submit="goddess_submit"
                @next_step="next_step"
                @prev_step="prev_step"
            ></link-goddess>
            <link-fees
                v-else-if="step==2"
                :tmoney="tmoney"
                :cashbee="cashbee"
                @fee_submit="fee_submit"
                @prev_step="prev_step"
            ></link-fees>
        </transition>
    </div>
</template>
<script>
import LinkGoddess from './components/LinkGoddess';
import LinkAstems from './components/LinkAstems';
import LinkFees from './components/LinkFees';

const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'LinkInfo',
    components: {
        'link-goddess': LinkGoddess,
        'link-astems': LinkAstems,
        'link-fees' : LinkFees
    },
    data() {
        return {
            step: 0,
            astems_id: 'astems_id',
            astems_pass: 'astems_pass',
            goddess_id: 'goddess_id',
            goddess_pass: 'hamin@goddess_pass',
            tmoney: 2.5,
            cashbee: 2.0,
            astems_check: true,
            yeosin_check: true,
        }
    },
    methods: {
        next_step() {
            this.step++;
        },
        prev_step() {
            this.step--;
        },
        astems_submit(id, pass) {
            this.astems_id = id;
            this.astems_pass = pass;
        },
        goddess_submit(id, pass) {
            this.goddess_id = id;
            this.goddess_pass = pass;
        },
        fee_submit(tmoney, cashbee) {
            this.tmoney = tmoney;
            this.cashbee = cashbee;
            this.submit();
        },
        submit() {
            this.$http.post(`${baseURI}/link/astems`, 
            {
                username: this.astems_id, 
                password: this.astems_pass
            })
            .then((res) => {
                console.log(res)
                if(res.data.status == 101 || res.data.status == 100) {
                    this.$session.set('astems_token', res.data.data.token);
                    console.log(res.data.data.token);
                }
                else if(res.data.status == -107) {
                    this.$session.remove('astems_token');
                    this.astems_check = res.data.status;
                }
                this.$http.post(`${baseURI}/link/yeosin`, 
                {
                    username: this.goddess_id, 
                    password: this.goddess_pass
                })
                .then((res) => {
                    console.log(res)
                    if(res.data.status == 101 || res.data.status == 100) {
                        this.$session.set('yeosin_token', res.data.data.token);
                        console.log(res.data.data.token)
                    }
                    else if(res.data.status == -107) {
                        this.$session.remove('yeosin_token');
                        this.yeosin_check = res.data.status;
                    }
                    if(this.astems_check==-107) {
                        alert('아스템즈 연동 실패: 아이디 또는 비밀번호가 올바르지 않음')
                    }
                    else if(this.astems_check==-108) {
                        alert('아스템즈 연동 실패: 로그인 실패 횟수 초과')
                    }
                    if(this.yeosin_check == -107) {
                        alert('여신금융 연동 실패: 아이디 또는 비밀번호가 올바르지 않음')
                    }
                    else if(this.yeosin_check == -108) {
                        alert('여신금융 연동 실패: 로그인 실패 횟수 초과')
                    }
                    this.$router.push('/views');
                    location.reload();
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
<style scoped>
</style>
