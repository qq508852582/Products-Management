// https://docs.cypress.io/api/table-of-contents

describe('products/add', () => {
  beforeEach(() => {
    cy.visit('/products/add');
  });
  it('Elements', () => {
    cy.contains('Product Add');
    cy.contains('Save');
    cy.contains('Cancel');
    cy.contains('ID');
    cy.contains('Product Name');
    cy.contains('Price');
  });
  it('Add', () => {
    cy.get('.el-loading-mask')
      .should('not.contain');
    cy.get('[data-cy=name] > .el-form-item__content > .el-input > .el-input__inner').should('be.visible')
      .type('TEST-NAME');
    cy.get('.el-input-number > .el-input > .el-input__inner').should('be.visible')
      .type('111');
    cy.contains('Save').click();

    cy.contains('TEST-NAME');
    cy.contains('$111');
  });
});
