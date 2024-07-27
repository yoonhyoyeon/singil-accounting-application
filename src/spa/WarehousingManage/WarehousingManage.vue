<template>
    <div class="SalesOverall">
        <div v-if="linked_account" class="box2">This is WarehousingManage componenet</div>
        <no-linked-info :linked_account_pos="linked_account_pos" :linked_account_goddess="linked_account_goddess" v-else ></no-linked-info>
    </div>
</template>
<script>
import NoLinkedInfo from '@/spa/NoLinkedInfo/NoLinkedInfo';

export default {
    name: 'WarehousingManage',
    props: ['linked_account_pos', 'linked_account_goddess', 'linked_account'],
    components: {
        'no-linked-info': NoLinkedInfo
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