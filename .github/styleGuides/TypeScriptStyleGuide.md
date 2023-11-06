# TypeScript Style Guide

It's cool to follow the rules. Please admire the styleguide and follow it as you code. We would recommend you to open this styleguide on one side and code on the other.

## 1 Introduction

All of these rules are to be followed at all conditions, if your code has disobey an of our style rules, it will not be accepted.

## 2 Naming Conventions

### 2.1 Variable Naming

Variables are to be named using only camelCase style. This means that the first letter of a variable should be in lowercase and and the first letter of each subsequent concatenated word starts with an uppercase.

```typescript
// ❌ Incorrect
const userid = "12345";

// ✔️ Correct
const userId = "12345";
}
```

### 2.2 Function Naming

Functions are to be named in PascalCase. That is the first letter of the function should be in uppercase and all other subsequent concatenated word starts with an uppercase too.

```typescript
// ❌ Incorrect
export default function some_weird_name() {
  // rest of the code...
}

// ✔️ Correct
export default function SomeWeirdName() {
  // rest of the code...
}
```

### 2.3 Arrow function naming

Arrow function are recommended for making supabase connections.

All arrow functions are to be in camelCase. That is the first letter of the function should be in lowercase and all other subsequent concatenated word starts with an uppercase.

```typescript
// ❌ Incorrect
const handle_update = () => {
  // rest of the code...
}

// ✔️ Correct
const handleUpdate = () => {
  // rest of the code...
}
```

### 2.4 Interface naming

We use interface **sometimes** and not often.

All interfaces should be at most only one word, mainly `Props`. In case of multi naming then follow PascalCase.
That is the first letter of the interface should be in uppercase and all other subsequent concatenated word starts with an uppercase too.

```typescript
// ❌ Incorrect
interface propname {
  // prop items...
}

// ✔️ Correct
interface PropName {
  // prop items...
}
```

### 2.5 TypeScript file naming

We recommend that you use components rather then putting huge lines of code in one file.

All the **TypeScript files** should be in PascalCase. That is the first letter of the file should be in uppercase and all other subsequent concatenated word starts with an uppercase too.

```typescript
// ❌ Incorrect
comment_bar.tsx

// ✔️ Correct
CommentBar.tsx
```

## 3 Components

We recommend to use server components rather then client components in your code. In cases where you need to use interactivity, you can create a separate component that uses the client side.

**NOTE**: Some times interactivity is fully needed, and this can be excused.

## 4 Imports

TO make imports easy to to understand, make sure to do imports using these rules:

1. Components should be imported like this - `import FunctionName from '@/components/ComponentName';`
2. React, nextjs and other library components should be imported like this - `import { useState } from 'react';`
3. StyleSheets should be imported like this - `import '@/css/styleSheet.css`

```typescript
// Recommended: choose between two options.
import FunctionName from '@/components/ComponentName';
import { useState } from 'react';

// Use only for css style files
import '@/css/styleSheet.css';
import '@polymer/paper-button';
```

## 5 Character length

We have a fix character length of 80 chars only. As for comments, they can be ignored.
