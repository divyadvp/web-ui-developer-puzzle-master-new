describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should set mark as read from reading list', () => {
    cy.get('input[type="search"]').type('test');
    cy.get('form').submit();
    cy.get('[data-testing="want-to-read"]').first().click();
    cy.wait(500);
    cy.get('[data-testing="toggle-reading-list"]').first().click();
    cy.get('[data-testing="mark-as-read"]').last().click();
    cy.get('[data-testing="mark-as-read"]').should(
      'contain.text',
      'Finished'
    );
  });
});
