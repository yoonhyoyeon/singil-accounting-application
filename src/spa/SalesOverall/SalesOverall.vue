<template>
    <div class="SalesOverall">
        <contents v-if="linked_account"></contents>
        <no-linked-info v-else ></no-linked-info>
    </div>
</template>
<script>
import NoLinkedInfo from '@/spa/NoLinkedInfo/NoLinkedInfo';
import Contents from './components/Contents';

export default {
    name: 'SalesOverall',
    props: ['linked_account'],
    components: {
        'no-linked-info': NoLinkedInfo,
        'contents': Contents
    }
}
</script>
<style scoped>
</style>