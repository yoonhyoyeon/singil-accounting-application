<template>
    <div class="views" v-cloak>
        <side-bar></side-bar>
        <top-bar @Toggle_user_popup="Toggle_user_popup" :user_popup_opened="user_popup_opened"></top-bar>
        <user-popup @Toggle_user_popup="Toggle_user_popup" :user_popup_opened="user_popup_opened"></user-popup>
        <div class="view-box">
            <router-view :linked_account="linked_account" />
        </div>
    </div>
</template>
<script>
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Userpopup from './components/Userpopup';

const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'Views',
    components: {
        'side-bar' : Sidebar,
        'top-bar' : Topbar,
        'user-popup' : Userpopup,
    },
    data() {
        return {
            user_popup_opened : false,
            linked_account_pos: true,
            linked_account_goddess: true,
            linked_fees: true,
        }
    },
    created() {
        //현재 연동 상태 받아오기
        if(this.$session.get('astems_token')) this.linked_account_pos=true;
        else this.linked_account_pos=false;
        if(this.$session.get('yeosin_token')) this.linked_account_goddess=true;
        else this.linked_account_goddess=false;
    },
    methods: {
        Toggle_user_popup: function() {
            this.user_popup_opened = !this.user_popup_opened;
        }
    },
    computed: {
        linked_account: function() {
            return this.linked_account_pos && this.linked_account_goddess && this.linked_fees;
        }
    }
}
</script>
<style scoped>
</style>