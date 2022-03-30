<template>
  <div class="home">
    Product Detail
    <el-descriptions
      v-loading="loading"
      class="margin-top"
      :column="1"
      :size="size"
      border
    >
      <template #extra>
        <el-button type="primary" @click="onEditClicked">Edit</el-button>
        <el-button type="danger" @click="onDeleteClicked" :loading="deleting">Delete</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            ID
          </div>
        </template>
        {{ productModel.id }}
      </el-descriptions-item>
      <el-descriptions-item >
        <template #label>
          <div class="cell-item">
            Product Name
          </div>
        </template>
        {{ productModel.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Price
          </div>
        </template>
        ${{ productModel.price }}
      </el-descriptions-item>
    </el-descriptions>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteProduct, product, Product } from '@/api/apis/products';
import { ElMessageBox } from 'element-plus';

const route = useRoute();

const productModel = ref<Product | object>({});
const loading = ref<boolean>(true);
const deleting = ref<boolean>(false);
const router = useRouter();

const getProduct = (id: string | number) => {
  loading.value = true;
  product(id)
    .then((_product) => {
      productModel.value = _product;
    })
    .catch(() => {
      router.replace('/products/');
    })
    .finally(() => {
      loading.value = false;
    });
};
const onEditClicked = () => {
  router.replace(`/products/${route.params.id as string}/edit`);
};
const onDeleteClicked = () => {
  ElMessageBox.confirm('Are you sure to delete this product?')
    .then(() => {
      deleting.value = true;
    })
    .then(() => deleteProduct(route.params.id as string))
    .then(() => {
      deleting.value = false;
    })
    .then(() => {
      router.back();
    });
};
onMounted(() => {
  getProduct(route.params.id as string);
});
</script>
