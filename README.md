# Task 04 - Create React App

Your task will be to try out how to use Vite to start a new web app project and then how to work with imports and jsx.

## Preparation

Start by using Vite tool to create new project.

```
npm create vite@latest pv247-assignment -- --template react-swc-ts
```

This will create a new folder `pv247-assignment` in current folder. Since we already have a git repository with a content, we can't add it as a origin for the folder created by Vite.

- After the command finishes, copy it's contents back to this folder.

Before getting to the task itself:

- Install npm packages.
  ```
  npm install
  ```
- Install our linter configs.
  ```
  npx install-peerdeps --dev @haaxor1689/eslint-config
  ```
- In `package.json` add `lint` script and replace eslint and prettier configs.

  ```jsonc
  {
    "scripts": {
      // ...
      "lint": "eslint \"./src/**/*.{ts,tsx}\" && prettier \"./src/**/*.{ts,tsx}\" --check"
    },
    // ...
    "eslintConfig": {
      "extends": "@haaxor1689/eslint-config"
    },
    "prettier": "@haaxor1689/prettier-config"
  }
  ```

- Autoformat `src/main.tsx` and `src/App.tsx` so they follow our linter config.

Now we can run the app using this command.

```
npm run dev
```

After the build finishes, you can open `http://localhost:5173/` in your browser.

## Default styles

Every browser has some custom styling (like button or input styles) built in, but ideally we want our application to look the same everywhere. That's where [`sanitize.css` package](https://csstools.github.io/sanitize.css/) comes in and tries to normalize all the differences.

- Add this package to dependencies and then import it in `main.tsx` file.

To see if you successfully included this package, look for it's `style` element inside `head`.

## Using JS in JSX

We can use JavaScript to pass and format values in JSX. Change the contents of the `p.read-the-docs` element in `App.tsx` to print out current date and time in this format.

```
It's 10/4/2021, 9:00:00 AM right now!
```

## Importing SVGs

Add the [vite-plugin-svgr](https://www.npmjs.com/package/vite-plugin-svgr) and replace the `reactLogo` import in `App.tsx` with `{ ReactComponent as ReactLogo }` and use it instead of the `img` tag. Since `svg` doesn't have `alt` property, we can replace it with `title` property.

Next, we will make some changes to `src/assets/react.svg` file so we can utilize it now being imported as a markup. First remove `width` and `height` from the root `svg` element since we will be setting those with css. Then change `fill` of the `path` element to `currentColor`. This is a special keyword in css that makes it so the actual color can be inherited from the current css color value of the element. After these changes, the logo should have proper size again and have the color of the link element.

Make the React logo change color on hover by changing `a:hover` rule in `index.css`.

## Adding interactions

Originally `forms` in HTML were made to send a POST request with the filled out form data to a specified url (action). Since in React apps we handle data flow with JavaScript, we don't want the form to redirect our user to some different url. We can prevent this in `onSubmit` callback of the form element. We get access to a `React.FormEvent<HTMLFormElement>` object on which we can call `preventDefault` to stop the form from refreshing the page. This event object also contains a `target` property that is a reference to the `form` element which we can use to read the form data from with JavaScript.

- Add a `form` element below current content of `App.tsx`.
- Add one `input` into the form with a id `"name"` and placeholder `"Your name..."`.
- Add one `button` with text `"Greet"`.
- Create new file `getFormValues.ts` in `src` folder that exports the function below as a **default export**.
  ```ts
  const getFormValues = <Keys extends string>(target: unknown) =>
    Object.values(target as { id?: string; value: string }[]).reduce(
      (prev, e) => (e.id ? { ...prev, [e.id]: e.value } : prev),
      {} as Record<Keys, string>
    );
  ```
- Add a `onSubmit` callback to the form element, that first prevents it from refreshing the page and then using the `getFormValues` shows JavaScript `alert` with message in this format.
  ```
  Hello there NAME!
  ```

## Tips

- To get the current time use `new Date()`.
- To print the date into a formatted string use `toLocaleString` method.
- Some characters in HTML needs to be escaped. Easiest solution is to use [HTML character entities](http://www.madore.org/~david/computers/unicode/htmlent.html).
- `button` elements that are inside a `form` by default trigger it's submission since default value for `type` prop of button is `"submit"`
