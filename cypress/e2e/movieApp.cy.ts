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

  it('should render a man called otto', () => {
    cy.intercept('GET', 'http://omdbapi.com/*', { fixture: "omdbResponse" }).as('omdbCall');


    cy.get('#searchText').type('Die hard');
    cy.get('#search').click();

    cy.wait('@omdbCall').its('request.url').should('contain', 'Die%20hard');
    cy.get('.movie').eq(0).get('h3').should('contain.text', 'A Man Called Otto');
    cy.get('.movie').eq(1).get('h3').should('contain.text', 'Dune');
  });
});

describe('test handling of response data', () => {
  it('should display message for no results', () => {
    cy.intercept('GET', 'http://omdbapi.com/*', {fixture: 'omdbEmptyResponse'}).as('omdbCall');

    cy.get('#searchText').type('Ska returnera "Inga sökresultat att visa"');
    cy.get('#search').click();

    cy.get('p').should('contain.text', 'Inga sökresultat att visa');
  })
})


