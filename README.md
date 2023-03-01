# Task 02 - JavaScript

## Prerequisites

- Installed `Node.js >= 18.14.0` and `npm >= 9.3.0`

## Task

Your task is to complete `getDimensions` and `isValidGeometry` functions in `src/index.ts` according to their documentation. Your solution should work correctly with any arbitrary (valid) input.

You must use each of these constructs at least once:

- Template literal
- Arrow function
- Destructuring

You must use at least one of these (use only one, or both - it just depends on your particular solution):

- Nullish coalescing
- Optional chaining

After running the script (`npm run build`) you should see this output in the console:

```
SQUARE (3x3) is valid
RECTANGLE (3x5) is valid
SQUARE (1x3) is invalid!!!
RECTANGLE (0x2) is invalid!!!
RECTANGLE (0x0) is invalid!!!
```

## Tips

- Use `getDimensions` in `isValidGeometry`
- If `type` is not provided in geometry, deduce it from it's dimensions
- You can use `Math.abs` to get the absolute value of a number
