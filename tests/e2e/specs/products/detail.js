describe('products/detail', () => {
  beforeEach(() => {
    cy.visit('/products');
    cy.visit('/products/0');
  });
  it('Elements', () => {
    cy.contains('Product Detail');
    cy.contains('Edit');
    cy.contains('Delete');
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
    cy.contains('Edit').click();
    cy.contains('Product Edit');
  });
  it('Delete', () => {
    cy.contains('Delete')
      .click();

    cy.contains('Are you sure to delete this product?');
    cy.contains('OK').click();
    cy.get('.is-loading').should('be.visible');

    cy.contains('Product List');
  });
  it('Did  Delete', async () => {
    // if no  such  data, url  shall be redirect
    cy.contains('Product List');
  });
});
