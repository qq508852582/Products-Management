// https://docs.cypress.io/api/table-of-contents

describe('products/edit', () => {
  beforeEach(() => {
    cy.visit('/products');
    cy.visit('/products/0/edit');
  });
  it('Elements', () => {
    cy.contains('Product Edit');
    cy.contains('Save');
    cy.contains('Cancel');
    cy.contains('ID');
    cy.contains('Product Name');
    cy.contains('Price');
  });
  it('Loading', () => {
    cy.get('.el-loading-mask')
      .should('be.visible');
    cy.get('.el-loading-mask')
      .should('not.contain');
  });
  it('Data', () => {
    // We can use yml or other file to inject test data to the db while dock compose up.
    // So that we can use pipeline to check the test value.
    // I'm not gonna use mockjs to make it, since doing that might go against the conception of E2E
    // So here's an empty case.
  });
  it('Edit', () => {
    cy.get('.el-loading-mask')
      .should('not.contain');
    cy.get('[data-cy=name] > .el-form-item__content > .el-input > .el-input__inner').should('be.visible')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .type('TEST-NAME');
    cy.get('.el-input-number > .el-input > .el-input__inner').should('be.visible')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .type('111');
    cy.contains('Save').click();

    cy.contains('TEST-NAME');
    cy.contains('$111');
  });
  it('Edit Form Validation', () => {
    cy.get('.el-loading-mask')
      .should('not.contain');
    cy.get('[data-cy=name] > .el-form-item__content > .el-input > .el-input__inner')
      .should('be.visible')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .blur();

    cy.contains('Please input Product name');
    cy.get('[data-cy=name] > .el-form-item__content > .el-input > .el-input__inner')
      .type('1')
      .blur();
    cy.contains('Length should be 3 to 10');
    cy.get('[data-cy=name] > .el-form-item__content > .el-input > .el-input__inner')
      .type('1234567890123')
      .blur();
    cy.contains('Length should be 3 to 10');

    cy.get('.el-input-number > .el-input > .el-input__inner')
      .should('be.visible')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .blur();

    cy.contains('Price should be 1 to 1000').should('be.visible');
    cy.get('.el-input-number > .el-input > .el-input__inner')
      .should('be.visible')
      .type('AAA')
      .blur();
    cy.contains('Price should be 1 to 1000').should('be.visible');

    cy.get('.el-input-number > .el-input > .el-input__inner')
      .should('be.visible')
      .type('0')
      .blur();
    cy.contains('Price should be 1 to 1000').should('be.visible');
    cy.get('.el-input-number > .el-input > .el-input__inner')
      .should('be.visible')
      .type('99999999')
      .blur();
    cy.contains('Price should be 1 to 1000').should('be.visible');
  });
});
