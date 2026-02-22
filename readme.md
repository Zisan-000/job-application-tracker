## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: getElementById finds exactly one element by its unique ID, getElementsByClassName grabs a group of elements sharing the same class, and querySelector tools let you find elements using the exact same styling rules you'd use in CSS!

## 2. How do you create and insert a new element into the DOM?

Ans: You make a brand new piece of HTML from scratch using document.createElement(), and then you attach it to the page by grabbing an existing element and using a method like appendChild() to stick it inside.

## 3. What is Event Bubbling? And how does it work?

Ans: Event bubbling is when you trigger an event on a deeply nested element, and that event "bubbles" upwards, automatically triggering the same event on all of its parent containers!

## 4. What is Event Delegation in JavaScript? Why is it useful?

Ans: Instead of putting an event listener on every single child element, you attach just one listener to their parent container, which is super useful because it saves computer memory and automatically works on new children you add to the page later.

## 5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: preventDefault() stops a browser's default behavior, while stopPropagation() specifically stops an event from bubbling up to the parent elements.
