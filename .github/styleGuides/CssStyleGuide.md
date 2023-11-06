# TypeScript Style Guide

It's cool to follow the rules. Please admire the styleguide and follow it as you code. We would recommend you to open this styleguide on one side and code on the other.

## 1 Introduction

All of these rules are to be followed at all conditions, if your code has disobey an of our style rules, it will not be accepted.

## 2 Naming convection

### 2.1 Class Over Id

We prefer to use classes rather then ids for css styling.

```html
<!-- ❌ Incorrect -->
<div id="style"></div>

<!-- ✔️ Correct -->
<div class="style"></div>
```

### 2.2 dashes over all other cases

All class names should have all letters in lowercases and all subsequent words should be separated using dashes(**-**).

```css
/* ❌ Incorrect */
.style_sheet {
  /* ... */
}
.styleSheet {
  /* ... */
}
.StyleSheet {
  /* ... */
}


/* ✔️ Correct */
.style-sheet {
  /* ... */
}
```

## 3 When use Custom css over tailwind

Lambda isn't just designed using custom css, but also tailwind, but that doesn't means you can use tailwind classes all the time.

In these cases you must use custom css over tailwind:

- When using colors (check the **global.css** file for more info)
- When using too many tailwind classes

There are also cases when you might use tailwind classes instead:

- When using media query for device fitting
- When not needing to use any color
- When less css code is needed
