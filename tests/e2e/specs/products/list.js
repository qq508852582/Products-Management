describe('products/list', () => {
  beforeEach(() => {
    cy.visit('/products');
  });
  it('Elements', () => {
    cy.contains('Product List');
    cy.contains('Add');
    cy.contains('ID');
    cy.contains('Name');
    cy.contains('Price');
    cy.contains('Action');
    cy.get('.el-pagination').should('be.visible');
  });
  it('Loading', () => {
    cy.get('.el-loading-mask').should('be.visible');
    cy.get('.el-loading-mask').should('not.contain');
  });

  it('Rows', () => {
    cy.get('.el-pagination').should('not.contain');
    // first page  should have 10 rows
    cy.get('tbody').find('tr').should('have.length', 10);
  });

  it('Pagination', () => {
    cy.get('.el-pagination').should('not.contain');
    // first page  should have 10 rows
    cy.get('.btn-next').click();
    cy.get('.el-loading-mask').should('be.visible');
    cy.get('.el-pagination').should('not.contain');
    // next page  should have at least 1 row
    cy.get('tbody').find('tr').should('have.length.at.least', 1);
    cy.get('.btn-prev').click();
    cy.get('tbody').find('tr').should('have.length', 10);
  });

  it('Add ', () => {
    cy.contains('Add').click();
    cy.contains('Product Add');
  });

  it('Edit ', () => {
    cy.contains('Edit').click();
    cy.contains('Product Edit');
  });

  it('Detail ', () => {
    cy.contains('Detail').click();
    cy.contains('Product Detail');
  });
});
