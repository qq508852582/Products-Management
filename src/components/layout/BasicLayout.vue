<template>
  <div class="common-layout">
    <el-container>
      <el-aside >
        <el-menu
          router
          class="el-menu-vertical-demo"
          :default-active="$route.path"
        >
          <el-menu-item index="/products">
            <span>products</span>
          </el-menu-item>
          <el-menu-item index="/other/0" >
            <span>other0</span>
          </el-menu-item>
          <el-menu-item index="/other/1" >
            <span>other1</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header ( logo might be here )</el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Footer ( copyright might be  here )</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BasicLayout',
  props: {
    msg: String,
  },
  created() {
    console.log(this.$route.path);
  },
});
</script>
<style scoped>

</style>
