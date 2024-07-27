<template>
    <div class="contents-wrap">
        <div class="contents">
            <div class="row">
                <div class="info-box">
                    <div class="title-box">
                        <h1>기본정보</h1>
                    </div>
                    <div v-if="!editing">
                        <div class="info-table">
                            <div class="info">
                                <div class="title-area">
                                    <span class="title">관리자 이름</span>
                                </div>
                                <div class="info-area">
                                    <span class="val">{{info.name}}</span>
                                    
                                </div>
                            </div>
                            <div class="info">
                                <div class="title-area">
                                    <span class="title">관리자 이메일</span>
                                </div>
                                <div class="info-area">
                                    <span class="val">{{info.email}}</span>
                                    
                                </div>
                            </div>
                            <div class="info">
                                <div class="title-area">
                                    <span class="title">관리자 전화번호</span>
                                </div>
                                <div class="info-area">
                                    <span class="val">{{info.phone}}</span>
                                    
                                </div>
                            </div>
                            <div class="info">
                                <div class="title-area">
                                    <span class="title">법인명(사업자명)</span>
                                </div>
                                <div class="info-area">
                                    <span class="val">{{info.corporate_name}}</span>
                                </div>
                            </div>
                            <div class="info">
                                <div class="title-area">
                                    <span class="title">법인번호(사업자등록번호)</span>
                                </div>
                                <div class="info-area">
                                    <span class="val">{{info.corporate_number}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="bottom-box">
                            <span class="edit-btn" @click="editing=true">편집</span>
                        </div>
                    </div>
                    <edit-table 
                        :name="info.name" 
                        :email="info.email"
                        :phone="info.phone"
                        :corporate_name="info.corporate_name"
                        :corporate_number="info.corporate_number"
                        @edit_finish="edit_finish"
                        v-else 
                    />
                </div>
                <div class="info-box">
                    <div class="title-box">
                        <h1>부가정보</h1>
                    </div>
                    <div class="info-table">
                        <div class="info">
                            <div class="title-area">
                                <span class="title">아스템즈ID</span>
                            </div>
                            <div class="info-area">
                                <span class="val">{{(linked_account_pos ? astems_id + ' (연동됨)' : '연동안됨')}}</span>
                            </div>
                        </div>
                        <div class="info">
                            <div class="title-area">
                                <span class="title">여신금융협회ID</span>
                            </div>
                            <div class="info-area">
                                <span class="val">{{(linked_account_goddess ? goddess_id + ' (연동됨)' : '연동안됨')}}</span>
                            </div>
                        </div>
                        <div class="info">
                            <div class="title-area">
                                <span class="title">티머니 수수료</span>
                            </div>
                            <div class="info-area">
                                <span class="val">2.5%</span>
                            </div>
                        </div>
                        <div class="info">
                            <div class="title-area">
                                <span class="title">캐시비 수수료</span>
                            </div>
                            <div class="info-area">
                                <span class="val">2.0%</span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-box tobottom">
                        <span @click="$router.push('/views/linkinfo')" class="edit-btn">편집</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import EditTable from './components/EditTable';

const baseURI = 'http://r.kdw.kr:20410';

export default {
    name: 'AccountInfo',
    components: {
        'edit-table': EditTable
    },
    data() {
        return {
            info: {
                name: '',
                email: '',
                phone: '',
                corporate_name: '',
                corporate_number: '',
            },
            astems_id: '',
            goddess_id: '',
            linked_account_pos: true,
            linked_account_goddess: true,
            editing: false,
        }
    },
    created() {
        this.$http.get(`${baseURI}/users/me?all=1`)
        .then((res) => {
            this.info = res.data.data
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error)
        })
        this.$http.get(`${baseURI}/link/me`)
        .then((res) => {
            if(res.data.data[0].code == "yeosin") {
                this.goddess_id = res.data.data[0].username;
                this.astems_id = res.data.data[1].username;
            }
            else if(res.data.data[0].code == "astems") {
                this.goddess_id = res.data.data[1].username;
                this.astems_id = res.data.data[0].username;
            }
        })
        .catch((error) => {
            console.log(error)
        })
        this.$http.get(`${baseURI}/link/astems`)
        .then((res) => {
            if(res.data.status == -100) {
                this.linked_account_pos=false;
            }
            else {
                
                this.linked_account_pos=true;
            }
        })
        .catch((error) => {
            console.log(error)
        })
        this.$http.get(`${baseURI}/link/yeosin`)
        .then((res) => {
            if(res.data.status == -100) {
                this.linked_account_goddess=false;
            }
            else this.linked_account_goddess=true;
            console.log(res);
        })
        .catch((error) => {
            console.log(error)
        })
    },
    methods: {
        edit_finish() {
            this.editing=false;
        }
    },
}
</script>
<style scoped>
.views .view-box .contents-wrap .contents .info-box {
    position: relative;
}
.views .view-box .contents-wrap .contents .tobottom {
    position: absolute;
    bottom: 23px;
    right: 23px;
}
</style>