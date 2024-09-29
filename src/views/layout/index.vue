<script setup lang="ts">
import LaHeader from "@/components/LaHeader/index.vue";
import LaAside from "@/components/LaAside/index.vue";
import LaFooter from "@/components/LaFooter/index.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <LaHeader />
      <el-container>
        <LaAside />
        <el-container>
          <el-main style="flex: 1; background-color: #f0f0f0">
            <router-view v-slot="{ Component }">
              <transition>
                <component :is="Component" />
              </transition>
            </router-view>
          </el-main>
          <LaFooter />
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss"></style>
