# Task 01 - Tooling

## Prerequisites

- Installed **Node.js** - [download](https://nodejs.org/en/download/)

## Task

Your task is to set up a javascript project with npm and linting.

1. Create `package.json` by running `npm init` and following the setup instructions
1. Add `typescript` package as a **development dependency**
1. Add `@haaxor1689/eslint-config` package as a **development dependency** and configure your project to use these configs
   > You can follow installation instructions in [readme files of this package](https://www.npmjs.com/package/@haaxor1689/eslint-config)
1. Add scripts to your `package.json` file
   ```json
   "build": "npx ts-node ./src/index.ts",
   "lint": "eslint \"./src/**/*.{ts,tsx}\" && prettier \"./src/**/*.{ts,tsx}\" --check",
   "lint:fix": "eslint \"./src/**/*.{ts,tsx}\" --fix && prettier \"./src/**/*.{ts,tsx}\""
   ```
1. Fix all the linter errors and warnings in `src/index.ts` file
   > Recommended [ESlint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for vs code

## Tips

- after pushing your solution, don't forget to go to the #1 `Feedback` pull request and label it with _Submitted_ label and make sure that the submit action succeeds
- make sure you actually use the eslint and prettier configs in your project
- using `_` to prefix unused variables that can't be easily omitted is a common pattern that is also enforced by linter config we use
- many of linter errors in `index.ts` can be [autofixed](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems)
- we have prepared a simple `tsconfig.json` file for this assignment which we will be talking more about in the next lecture
- since this task does not include any React, you can ignore the warning `Warning: React version was set to "detect" in eslint-plugin-react settings, but the "react" package is not installed. Assuming latest React version for linting.`
