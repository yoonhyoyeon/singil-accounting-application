<template>
    <div class="top-bar">
        <div class="locate">
            <span class="text">{{page_title}}</span>
            <div class="bar"></div>
            <span class="sub">{{page_sub_title}}</span>
        </div>
        <div class="user" @click="Toggle_user_popup">
            <span class="name">{{name}}님 환영합니다!</span>
            <img class="icon" :class="{user_opened : user_opened}" src="@/assets/img/arrow_down_white.png"/>
        </div>
    </div>
</template>
<script>
const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'Topbar',
    props: ['user_popup_opened'],
    data() {
        return {
            name: ''
        }
    },
    created() {
        this.$http.get(`${baseURI}/users/me`)
        .then((res) => {
            this.name = res.data.data.name
        })
        .catch((error) => {
            console.log(error)
            if(error.response.data.status == -106) {
                this.$session.destroy();
                delete this.$http.defaults.headers.common['authorization'];
                this.$router.push('/');
            }
        })
    },
    methods: {
        Toggle_user_popup: function() {
            this.$emit('Toggle_user_popup');
        }
    },
    computed: {
        'user_opened': function() {
            return this.$props.user_popup_opened;
        },
        'page_title': function() {
            if(this.$route.path.indexOf("sales") != -1) return "매출";
            else if(this.$route.path.indexOf("warehousing") != -1) return "입고";
            else if(this.$route.path.indexOf("linkinfo") != -1) return "등록";
            else if(this.$route.path.indexOf("account") != -1) return "계정";
            else if(this.$route.path.indexOf("sync") != -1) return "동기화";
        },
        'page_sub_title': function() {
            if(this.$route.path.indexOf("overall") != -1) return "현황";
            else if(this.$route.path.indexOf("card") != -1) return "카드";
            else if(this.$route.path.indexOf("tmoney") != -1) return "티머니";
            else if(this.$route.path.indexOf("cashbee") != -1) return "캐시비";
            else if(this.$route.path.indexOf("manage") != -1) return "관리";
            else if(this.$route.path.indexOf("linkinfo") != -1) return "부가정보";
            else if(this.$route.path.indexOf("info") != -1) return "정보";
            else if(this.$route.path.indexOf("passchange") != -1) return "비밀번호 변경";
            else if(this.$route.path.indexOf("list") != -1) return "목록";
            else if(this.$route.path.indexOf("astems") != -1) return "아스템즈";
            else if(this.$route.path.indexOf("yeosin") != -1) return "여신금융협회";
        }
    }
}
</script>
<style scoped>
</style>