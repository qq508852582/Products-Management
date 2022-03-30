# products-management

## About
*A small web application to manage products.
As user, I’m able to create, list, update and delete product*
- ### Architecture
Use Vue3, Element-Plus, axios 
- ### Mock
Use Mockjs as a mock server, as for being no real server, mockjs is added in dependencies(should've been devDependencies).
Mock file's no testing, since being a fake server
- ### UT
Since using E2E test  for this project, UT is not for the business code,it's for components or some custom-wrap,
in this case API-wrap only.
As the specific API code could be generated form Api-doc(like  swagger), tests are not necessary.
- ### E2E Test
Cypress's being used.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```
