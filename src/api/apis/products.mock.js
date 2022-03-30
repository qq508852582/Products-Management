import Mock from 'mockjs';

Mock.setup({
  timeout: '200-600',
});

const productsMock = Mock.mock({
  'data|10-100': [{
    'id|+1': 0,
    name: '@word(5, 7)',
    'price|1-1000.2': 1,
    delete: false,
  }],
});

//  here's a mock function producing reasonable data, so  no params  validation
Mock.mock(/\/api\/products\/?(\?.*=.*)?$/, 'get', ({ url }) => {
  const {
    current = 1,
    pageSize = 10,
    name,
  } = (url.split('?')[1] ?? '').split('&')
    .reduce(
      (result, curr) => {
        const [k, v] = curr.split('=');
        return ({
          ...result,
          [k]: v,
        });
      },
      {},
    );

  const enableProducts = productsMock.data.filter((p) => !p.delete);
  const products = enableProducts.filter((p) => !p.delete)
    .filter((p) => (name == null || (p.name.indexOf(name) >= 0)));
  const numberCurrent = parseInt(current, 10);
  const pageSizeCurrent = parseInt(pageSize, 10);
  const result = {
    success: true,
    data: {
      current: numberCurrent,
      pageSize: pageSizeCurrent,
      total: products.length,
      list: products.slice((numberCurrent - 1) * pageSizeCurrent, (numberCurrent) * pageSizeCurrent),
    },
  };
  return JSON.stringify(result);
});

//  here's a mock function producing reasonable data, so  no params  validation
Mock.mock(/\/api\/products\/[0-9]*$/, 'get', ({ url }) => {
  const urlSplits = url.split('/');
  const id = urlSplits[urlSplits.length - 1];
  const product = productsMock.data.filter((p) => !p.delete)
    .find((p) => `${p.id}` === `${id}`);
  const result = {
    success: product != null,
    data: product,
    errorCode: product == null ? 404 : undefined,
  };
  return JSON.stringify(result);
});

//  here's a mock function producing reasonable data, so  no params  validation
Mock.mock(/\/api\/products\/?$/, 'put', ({ body }) => {
  const product = JSON.parse(body);

  const index = productsMock.data.filter((p) => !p.delete)
    .findIndex((p) => `${p.id}` === `${product.id}`);
  let retProduct;
  if (index >= 0) {
    productsMock.data[index] = product;
    retProduct = product;
  } else {
    retProduct = {
      id: productsMock.data.length,
      ...product,
    };
    productsMock.data.push(retProduct);
  }

  const result = {
    success: product,
    data: retProduct,
  };

  return JSON.stringify(result);
});

Mock.mock(/\/api\/products\/[0-9]*$/, 'delete', ({ url }) => {
  const urlSplits = url.split('/');
  const id = urlSplits[urlSplits.length - 1];
  const product = productsMock.data.filter((p) => !p.delete)
    .find((p) => `${p.id}` === `${id}`);

  if (product) {
    product.delete = true;
  }

  const result = {
    success: product,
    data: product,
  };

  return JSON.stringify(result);
});
