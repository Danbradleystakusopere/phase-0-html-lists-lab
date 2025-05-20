require('jsdom-global')();// ✅ Sets up a simulated DOM

const fs = require('fs');
const path = require('path');
const chai = require("chai");
chai.use(require("chai-dom"));
const { expect } = chai;

// ✅ Load HTML into DOM
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
document.documentElement.innerHTML = html;

describe("the <ul> tag", () => {
  it("exists in the document", () => {
    const ul = document.querySelector("ul");
    const hint = "The document should have a <ul> element";
    expect(ul, hint).to.exist;
  });

  it("has three child <li> tags with the correct content", () => {
    const ul = document.querySelector("ul");
    const hint = "The <ul> should have three <li> elements nested inside";
    expect(ul.children, hint).to.have.lengthOf(3);

    const [firstLi, secondLi, thirdLi] = ul.children;

    expect(firstLi).to.have.tagName("li");
    expect(firstLi).to.contain.text("Grilled Cheese");

    expect(secondLi).to.have.tagName("li");
    expect(secondLi).to.contain.text("Tomato Soup");

    expect(thirdLi).to.have.tagName("li");
    expect(thirdLi).to.contain.text("Banh Mi");
  });

  it("contains a nested <ul> tag within a <li>", () => {
    const ul = document.querySelector("ul");
    const hint = "There should be a nested <ul> inside a <li>";
    expect(ul.querySelector("li ul"), hint).to.exist;
  });

  it("contains three <li> nested within the nested <ul> with the correct content", () => {
    const nestedUl = document.querySelector("ul li ul");
    const nestedLis = nestedUl.querySelectorAll("li");

    expect(nestedLis.length).to.equal(3);
    expect(nestedLis[0]).to.contain.text("Croutons");
    expect(nestedLis[1]).to.contain.text("Cheese");
    expect(nestedLis[2]).to.contain.text("Basil");
  });
});

describe("the <ol> tag", () => {
  it("exists in the document", () => {
    const ol = document.querySelector("ol");
    expect(ol).to.exist;
  });

  it("has five child <li> tags with the correct content", () => {
    const ol = document.querySelector("ol");
    const items = ol.querySelectorAll("li");

    expect(items.length).to.equal(5);
    expect(items[0]).to.contain.text("Sushi");
    expect(items[1]).to.contain.text("Baba Ghanoush");
    expect(items[2]).to.contain.text("Pizza");
    expect(items[3]).to.contain.text("Ramen");
    expect(items[4]).to.contain.text("Tacos");
  });
});
