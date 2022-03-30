<template>
  <div>
    <div class="header">
      <div> Product List</div>
      <el-button type="primary" @click="onAddClicked">Add</el-button>
    </div>
    <el-table :data="listModule.list" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="180"/>
      <el-table-column prop="name" label="Name" width="180"/>
      <el-table-column label="Price">
        <template v-slot="scope">
          $ {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="onDetailClicked(scope.row)">Detail</el-button>
          <el-button type="text" size="small" @click="onEditClicked(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="listModule.pageSize"
      :current-page.prop="listModule.current"
      layout="prev, pager, next"
      :total="listModule.total"
      @current-change="onCurrentChanged"

    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Product, products } from '@/api/apis/products';
import { PageResponse } from '@/api/APIResponse';
import { useRouter } from 'vue-router';

const listModule = ref<PageResponse<Product>>({
  list: [],
  pageSize: 0,
  total: 0,
  current: 0,
});

const loading = ref<boolean>(true);
const getProducts = ({ current = 1 } = {}) => {
  loading.value = true;
  products({ current })
    .then((_listModule) => {
      listModule.value = _listModule;
    })
    .finally(() => {
      loading.value = false;
    });
};
onMounted(() => {
  getProducts();
});

const onCurrentChanged = (current: number) => {
  getProducts({ current });
};
const router = useRouter();
const onDetailClicked = (product: Product) => {
  router.push(`/products/${product.id}`);
};
const onEditClicked = (product: Product) => {
  router.push(`/products/${product.id}/edit`);
};
const onAddClicked = () => {
  router.push('/products/add');
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
</style>
