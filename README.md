# Task 03 - Typescript

## Task

Your task for this week will be to define types for provided data and then do some data transformations. Data you will be working with is in `data.ts` file.

Start by declaring types in `types.ts` according to provided instructions.

Seconds part of this task is in `index.ts` where you will need to do some data transformations. One of the subtasks is to install and use `lodash` package. This package is not written in TypeScript so you will need to also add types from DefinitelyTyped.

Running the code (`npm run build`) will output the data into console using `JSON.stringify`.

<details>
<summary>Preview of console output</summary>

```
Complete people data:
 [
  {
    "id": "a",
    "name": "John",
    "type": "student",
    "semester": 1,
    "attends": [
      "A",
      "B",
      "D"
    ]
  },
...

Teachers:
 [
  {
    "id": "1",
    "name": "Mr. Shady",
    "type": "teacher",
    "teaches": [
      "A",
      "D"
    ]
  },
...

Courses dictionary:
 {
  "A": {
    "teachers": [
      "Mr. Shady"
    ],
    "students": [
      "John",
      "Jimmy",
      "Laura",
      "Peter"
    ]
  },
...

Student info:
 Student John attends courses A,B,D

Teacher info:
 Teacher Mr. Shady teaches courses A,D

Unknown info:
 No person provided
```

</details>

## Tips

- To install new dependency use `npm i <<package_name>>`
- To install types from DefinitelyTyped `npm i -D @types/<<package_name>>`
- VS code should automatically suggest an import for `groupBy` function from 'lodash' package. If not, you can import the function like this:

  ```ts
  import { groupBy } from 'lodash';
  ```

- Don't forget to format and lint your code before submitting
