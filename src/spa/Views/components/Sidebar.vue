<template>
    <div class="side-bar">
        <div class="logo-box">
            <img class="logo-icon" src="@/assets/img/logo.png" />
            <router-link to="/views" class="logo">Intranet</router-link>
        </div>
        <div class="nav-box">
            <dropdown-btn 
                title="매출" 
                :btns="[
                    {'name':'현황','link':'/views/salesoverall'}, 
                    {'name':'목록','link':'/views/saleslist'}, 
                    {'name':'카드','link':'/views/salescard'},
                    {'name':'티머니','link':'/views/salestmoney'},
                    {'name':'캐시비','link':'/views/salescashbee'},
                ]"
            />
            <dropdown-btn 
                title="입고"
                :btns="[
                    {'name':'현황','link':'/views/warehousingoverall'},
                    {'name':'관리','link':'/views/warehousingmanage'},
                ]"
            />
            <dropdown-btn 
                title="동기화"
                :btns="[
                    {'name':'아스템즈','link':'/views/syncastems'},
                    {'name':'여신금융협회','link':'/views/syncyeosin'},
                ]"
            />
        </div>
    </div>
</template>
<script>
import Dropdown from './Dropdown';

export default {
    name: 'Sidebar',
    components: {
        'dropdown-btn': Dropdown,
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
<style scoped>
</style>