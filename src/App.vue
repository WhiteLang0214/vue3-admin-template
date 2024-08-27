<script setup lang="ts">
import LaConfigProvider from "@/components/LaConfigProvider/index.vue";
import HtoTable from "@/views/test/handsontable.vue";
</script>

<template>
  <la-config-provider>
    <HtoTable />
    <el-button type="primary" plain>按钮</el-button>
    <el-table mb-1 :data="[]" />
    <span class="m-1">m-1</span><span>m-2</span>
    <i class="mdi:account-cancel-outline" />
  </la-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
