<template>
  <div class="home">
    Product {{ route.params.id == null ? 'Add' : 'Edit' }}
    <el-form ref="ruleFormRef"
             :rules="rules"
             v-loading="loading"
             :model="form" label-width="120px">
      <el-form-item label="ID" prop="id">
        <el-input v-model="form.id" disabled/>
      </el-form-item>
      <el-form-item label="Product Name" prop="name" data-cy="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="Price" prop="price" data-cy="price">
        <el-input-number v-model="form.price" :precision="2"/>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit(ruleFormRef)">Save</el-button>
    <el-button @click="onCancel">Cancel</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { product, Product, saveProduct } from '@/api/apis/products';
import { FormInstance } from 'element-plus';

const ruleFormRef = ref<FormInstance>();

const form = reactive<Product>({
  id: undefined,
  name: undefined,
  price: undefined,
});
const loading = ref<boolean>(true);
const router = useRouter();
const route = useRoute();
const getProduct = (id: string | number) => {
  if (id == null) {
    loading.value = false;
  } else {
    product(id)
      .then((_product) => {
        form.id = _product.id;
        form.name = _product.name;
        form.price = _product.price;
      })
      .catch(() => {
        router.replace('/products/');
      })
      .finally(() => {
        loading.value = false;
      });
  }
};

const onSubmit = (formEl: FormInstance) => {
  formEl.validate()
    .then(() => saveProduct(form))
    .then((p) => {
      router.replace(`/products/${p.id}`);
    });
};

const onCancel = () => {
  router.back();
};
const rules = reactive({
  name: [
    {
      required: true,
      message: 'Please input Product name',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 10,
      message: 'Length should be 3 to 10',
      trigger: 'blur',
    },
  ],
  price: [
    {
      required: true,
      message: 'Please input price',
      trigger: 'blur',

    },
    {
      type: 'number',
      message: 'Please input number',
      trigger: 'blur',
    },
    {
      type: 'number',
      min: 1,
      max: 1000,
      message: 'Price should be 1 to 1000',
      trigger: 'blur',
    },
  ],
});

onMounted(() => {
  getProduct(route.params.id as string);
});
</script>
