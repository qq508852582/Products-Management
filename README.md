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

1. cd to project finder. run 'yarn test:e2e'

![image](https://user-images.githubusercontent.com/6310358/161045913-9ea858a1-4de4-44d6-9bad-433657a0fea3.png)
2. wait for server start
![image](https://user-images.githubusercontent.com/6310358/161046069-c630d807-b08c-46ed-a99c-ee40d189922e.png)

3. server started. after about half a min.
![image](https://user-images.githubusercontent.com/6310358/161046093-0a8e7994-294b-43f5-9dbd-163e5a85c1c4.png)

4. Cypress Window comes out
![image](https://user-images.githubusercontent.com/6310358/161046112-b944592f-e215-46ac-80a8-433f591f53fb.png)

5. click  Run  1 spec
![image](https://user-images.githubusercontent.com/6310358/161046128-d3a402fb-56fa-4b50-a691-ee5d8de101a8.png)

6.  New window comes out, cases running
![image](https://user-images.githubusercontent.com/6310358/161046158-6dbc48fd-7d21-4e13-acbb-99ac088a2b92.png)

7. All cases succeed.
![image](https://user-images.githubusercontent.com/6310358/161046183-498f19cc-4fb9-4bf7-a655-fb4c07f93ac4.png)

