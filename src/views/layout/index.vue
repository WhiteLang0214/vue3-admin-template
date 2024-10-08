<script setup lang="ts">
import LaHeader from "./src/LaHeader/index.vue";
import LaSide from "./src/LaAside/index.vue";
import LaFooter from "./src/LaFooter/index.vue";
</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100%" direction="horizontal">
      <LaSide />
      <el-container direction="vertical">
        <LaHeader />
        <el-main class="pd-0">
          <el-scrollbar height="100%">
            <router-view v-slot="{ Component }">
              <transition>
                <component :is="Component" />
              </transition>
            </router-view>
          </el-scrollbar>
        </el-main>
        <LaFooter />
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100%;
}
</style>
