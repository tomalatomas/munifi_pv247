# Task 07 - Hooks

This week, we will be improving the Tic Tac Toe app with custom hooks. All our custom hooks will go into the `hooks` folder. You can find a `useLocalStorage` hook there, that you can use as an inspiration.

## Page title

First custom hook we will create is `usePageTitle`. This hook should accept one argument `title` and using `useEffect` change the `document.title` to `${title} | Tic Tac Toe`. Make sure that the `useEffect` hook has correct dependencies.

## Wrapping game logic

Next, create `useGame` hook that wraps all the logic related to game state. This hook should receive initial `BoardState` as an argument (you can set it's default value to `{}`) and return an object:

- `board`: board state value
- `player`: memoized value (`useMemo`) that is calculated from `board` state
- `winner`: memoized value, returning player that won
- `onSquareClicked`: same as it was previously
- `onRestart`: memoized function (`useCallback`)

While you are refactoring how we handle the game state, add some new functionality:

- Make sure board is not changeable after game ended
- Create a hotkey for restarting the game by pressing `R`. In a `useEffect` hook, use `document.addEventListener`, listening for `'keydown'` that restarts the game. Make sure to also unregister that listener with `document.removeEventListener` when the component is unmounted
- Add a **tie** condition that is also shown in `Status` component (use new `Winner` type for it that is either `Player`, `'Tie'` string literal or `undefined`)

Handle all the required state inside this hook, only returning the above mentioned values. Also make sure all hooks use correct dependencies. Lastly move all other relevant code from `Board.tsx` here and export only what is necessary.

Lastly, use the hook in `Board` component.

## Simple `useField` hook

The `Login` component is another ideal spot where we can introduce a custom hook. Right now there is only one form field, but what if we will want to add more in the future. To make this easier, we can create a `useField` hook that will handle all related state to one specific field.

Create new hook `useField` in separate file inside hooks folder. The hook will have this signature:

```ts
const useField: (
	id: string,
	opts?: { required?: boolean }
) => {
	value: string;
	props: {
		id: string;
		value: string;
		onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
		onBlur: () => void;
		required?: boolean;
		error?: boolean;
		helperText?: string;
	};
};
```

> **Don't copy this example into your code!** If you write the hook correctly, its type will **implicitly** look like this.

The hook will internally take care of `value`, `touched` and `error` states (just like username, usernameTouched and hasError in `Login` now) and return all props mentioned above so all you need to do to use it is spread those props onto the input like this:

```tsx
const Login = () => {
	const username = useField('username', { required: true });
	return (
		<Paper {/* ... */} >
			{/* ... */}
			<TextField label="Username" {...username.props} />
			{/* ... */}
		</Paper>
	);
};
```

## Hints

- Both `player` and `winner` should not be a state but memoized values
- Since player `X` goes always first, we can calculate current player from the `board` state based on how many squares were clicked, the `%` operator should help
- You can use `Object.entries` function to get an array of key/value tuples from given object
- You should be also able to update the `setBoard` in `onSquareClicked` to use callback with previous value
- Use dependencies of `useEffect` to make sure that only one listener is added for given component
