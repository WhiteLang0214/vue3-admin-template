<script setup lang="ts">
import LaConfigProvider from "@/components/LaConfigProvider/index.vue";
import LaTable from "@/views/test/vxeTable.vue";
</script>

<template>
  <la-config-provider>
    <!-- <LaTable style="width: 100%" /> -->
    <!-- <el-button type="primary" plain>按钮</el-button>
    <el-table mb-1 :data="[]" />
    <span class="m-1">m-1</span><span>m-2</span>
    <i class="mdi:account-cancel-outline" /> -->
    <RouterView />
  </la-config-provider>
</template>

<style scoped></style>
