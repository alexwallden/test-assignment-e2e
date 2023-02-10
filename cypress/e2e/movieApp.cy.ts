beforeEach(() => {
  cy.visit('/')
});

describe('test input functionality', () => {
  it('should fetch data from omdb api and render .movie elements in #movie-container', () => {
    cy.get('#searchText').type('Die hard');
    cy.get('#search').click();

    cy.get('#movie-container').children().should('have.length.greaterThan', 0);
    cy.get('.movie').parent().should('have.id', 'movie-container');
    cy.get('.movie:first-child > h3').should('contain.text', 'Die Hard');
  });

  it('should fetch from fixture with correct url and render titles in h3-tags inside movie element', () => {
    cy.intercept('GET', 'http://omdbapi.com/*', { fixture: "omdbResponse" }).as('omdbCall');
    const searchText = 'Movies from fixture';

    cy.get('#searchText').type(searchText);
    cy.get('#search').click();

    cy.wait('@omdbCall').its('request.url').should('contain', searchText.replaceAll(' ', '%20'));
    cy.get('.movie').eq(0).get('h3').should('contain.text', 'A Man Called Otto');
    cy.get('.movie').eq(1).get('h3').should('contain.text', 'Dune');
  });
});

describe('test handling of response data', () => {
  it('should display message for no results due to empty response', () => {
    cy.intercept('GET', 'http://omdbapi.com/*', { fixture: 'omdbEmptyResponse' }).as('omdbCall');

    cy.get('#search').click();

    cy.get('#movie-container > p').should('exist');
    cy.get('p').should('contain.text', 'Inga sökresultat att visa');
  });

  it('should display message for no results due to unexpected response', () => {
    cy.intercept('GET', 'http://omdbapi.com/*', { fixture: 'omdbWrongResponse' }).as('omdbCall');

    cy.get('#search').click();

    cy.get('#movie-container > p').should('exist');
    cy.get('p').should('contain.text', 'Inga sökresultat att visa');
  });
});
