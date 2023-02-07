beforeEach(() => {
  cy.visit('/')
});

describe('first tests to try cypress', () => {
  it('should write in input', () => {
    cy.get('#searchText').type('HEJHEJ');
  });
});

describe('test input functionality', () => {
  it('should render movies with h3 elements', () => {
    cy.get('#searchText').type('Die hard');
    cy.get('#search').click();
    cy.get('.movie:first-child > h3').should('contain.text', 'Die Hard');
  });
});

