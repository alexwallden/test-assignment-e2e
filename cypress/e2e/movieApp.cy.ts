beforeEach(() => {
  cy.visit('/')
});

describe('first tests to try cypress', () => {
  it('should write in input', () => {
    cy.get('#searchText').type('HEJHEJ');
  });
})
