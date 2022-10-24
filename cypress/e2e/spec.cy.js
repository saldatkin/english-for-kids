describe('Visit English website', () => {
  it('Successfully visits English for Kids', () => {
    cy.visit('https://saldatkin.github.io/english-for-kids/html/main.html')
  })
})
describe('Main page of English website', () => {
  it('contains train caption', () => {
    cy.contains('train')
  })
  it('contains nature category', () => {
    cy.contains('nature')
  })
})
describe('Main page of English website', () => {
  it('does not contain films category', () => {
    cy.contains('films').should('not.exist');
  })
})
describe('Click on animals category', () => {
  it('clicking on animals returns new category', () => {
    cy.contains('animals').click()
    cy.contains('turtle')
  })
})
describe('Click on nav-burger button', () => {
  it('clicking on nav-burger button opens sidebar', () => {
    cy.get('.nav-burger').click()
    cy.contains('stats')
  })
})
describe('Click on space outside the sidebar', () => {
  it('clicking outside sidebar closes sidebar', () => {
    cy.get('.overlay').click()
    cy.contains('stats').should('not.be.visible');
  })
})
describe('Click on main name', () => {
  it('clicking on main name link opens main page', () => {
    cy.get('.header-title').click()
    cy.contains('animals2')
  })
})