describe('Smoke test suite for todo app', function() {
  
  //Visit target main page. The URL imports from the "cypress.json" file.
  before(() => {
    cy.visit('/')
  })

  it('Generate todo-item and assert length of list', function () {
    
    //Generates 5 todo-items with unique labels.
    var todoArray = Array.from({length:5})  
    var i = 1  
    cy.wrap(todoArray).each(() => {
      cy.get('input[class=new-todo]')
        .type('Todo-item '+ i++ +'{enter}')
    })
    
    //Asserts that Todo-list has length of 5 items in it and contains "Todo-item " labels.
    cy.get('.todo-list li')
      .should('have.length', 5)
      .find('label')
      .should('contain', 'Todo-item ')
  })

  it('Mark "todo-item 2" and "todo-item 3" as compleeted', function () {
    
    cy.get('.todo-list li')
      .eq(1)
      .should('contain', 'Todo-item 2')
      .find('.toggle')
      .check()

    cy.get('.todo-list li')
      .eq(2)
      .should('contain', 'Todo-item 3')
      .find('.toggle')
      .check()
  })

  it('Assert the list of completed todo-items with filter button "Completed"', function () {
    
    //Finds "Completed" button in the footer and clicks on it.
    cy.get('.filters')
      .contains('Completed')
      .click()
    
    //Asserts that only checked items remains in the list.
    cy.get('.todo-list li')
      .should('have.length', 2)
  })

  it('Clear the list of completed items with "Clear completed" button and assert that the list is empty', function () {
    
    //Finds "Clear completed" button in the footer and clicks on it.
    cy.get('.clear-completed')
      .contains('Clear completed')
      .click()
    
    //Asserts that the list of items is empty.
    cy.get('.todo-list li')
      .should('have.length', 0)
  })

  it('Return to the "All" selected filter and assert that the list still contains 3 items', function () {
    
    //Finds "All" button in the footer and clicks on it.
    cy.get('.filters')
      .contains('All')
      .click()
    
    //Asserts that the list of items is empty.
    cy.get('.todo-list li')
      .should('have.length', 3)
  })

})