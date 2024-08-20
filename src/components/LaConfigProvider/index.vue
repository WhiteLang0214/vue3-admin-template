<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
// import en from "element-plus/es/locale/lang/en";
// import zhTw from "element-plus/es/locale/lang/zh-tw";

const locale = zhCn;
</script>

<template>
  <el-config-provider :locale="locale" :message="{ max: 1 }">
    <slot></slot>
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
