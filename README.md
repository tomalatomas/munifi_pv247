# Task 06 - React cont

In this assignment we will continue our work on the Tic Tac Toe app. It consists of three parts: Custom theme, Routing and Login form

## Custom theme

Start by customizing the app by overriding the default MUI theme. You can place your custom theme into `src/theme.ts` file.

1.  Create a new theme with different primary color and `dark` mode on
1.  Add `ThemeProvider` to `App.tsx` and provide it with your custom theme
1.  Add two new custom colors for our players **X** and **O** to the palette and use them in `PlayerIcon`
    > We will also need to augment the `Palette` and `PaletteOptions` types of MUI in order for TypeScript to accept our custom values. You can place this code into `theme.ts`
    ```ts
    declare module '@mui/material/styles' {
    	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    	interface Palette {
    		playerX?: string;
    		playerO?: string;
    	}
    	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    	interface PaletteOptions {
    		playerX?: string;
    		playerO?: string;
    	}
    }
    ```
1.  Don't forget to also add `CssBaseline`

## Routing

In `App.tsx`:

1.  Add other routes using `new Route({...})` and add them to `rootRoute` with `.addChildren`.
1.  Add fallback route using `*` path that handles unknown routes.
1.  Add button links according to the routes below. Use MUI `Button` and wrap this button into `Link` component from @tanstack/react-router.
1.  Add right aligned Login/Logout button based on `user` state
    - Login button will be wrapped with Link pointing to `/login` page
    - Logout button will be a normal button (not wrapped with Link) that sets `user` state to `null` on click
1.  Change the `Let's start` button in `Home` component to button link to `/play` and it's colors to the new custom ones from theme

These are all the routes the app should contain:

| Route    | Component  | Note           |
| -------- | ---------- | -------------- |
| `/`      | `Home`     |
| `/play`  | `Play`     |
| `/about` | `About`    |
| `/login` | `Login`    |
| -        | `NotFound` | Fallback route |

## Login form

Last part of this assignment is to add a simple login screen. It consists of a `Paper` component that serves as a `form` component, some describing `Typography` and a submit `Button`. Your task will be to add a `TextField` component that should fulfill these points:

- Has an `id` and `label`
- Is controlled and uses a `username` state (provide `value` and `onChange` props)
- Tracks a `usernameTouched` state (set this state to `true` in `onBlur` event)
- Is required and shows an error message if left empty (use `required`, `error` and `helperText` props)
- Show the error only after user touched the input since initial state is invalid
  ```tsx
  const hasError = usernameTouched && !username;
  ```

Complete the form's `onSubmit` so it uses the `setUser` to set it to value from the input and then redirects user to homepage using `useNavigate` hook.

Lastly, in `Home` component, conditionally render the `Welcome, {user}!` only if the component receives `user`.

## Hints

- It's not the same, if you wrap button with link OR you wrap link with button
- See [this repository](https://github.com/DaliborPan/vite-tanstack-router) for the correct configuration of router and links
- MUI documentation on [customizing colors](https://mui.com/material-ui/customization/palette/#providing-the-colors-directly) and [adding new colors](https://mui.com/material-ui/customization/palette/#adding-new-colors)
- MUI [`TextField` documentation](https://mui.com/material-ui/react-text-field/)
- If you don't want to come up with your own colors you can use these:
  ```ts
  {
    primary: { main: '#f2d45c' },
    playerX: '#f25a5a',
    playerO: '#5a8cf2',
  }
  ```
