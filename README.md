# Task 09 - State management

## Prerequisites

1. Correctly initialize firebase app with your `firebaseConfig`.

Your task for this lesson is to practice work with global state management using react context.

## Localization

Using the `useTranslation` hook, localize the app.

- Add new localization keys to `localization/en` and `localization/cs` and use them in individual components.
- Create a `LanguageSwitch` component that renders GB and CZ flag side by side, that when clicked, change current language of the app
- Render the `LanguageSwitch` component in the app header

## User

Update the `useLoggedInUser` hook to use context, instead of adding new subscription to auth state every time we use it. Create a private context and `UserProvider` component similar to `LanguageProvider` and use this context in `useLoggedInUser`.

## Hints

- For country flags, you can use the [`react-flagkit` package](https://www.npmjs.com/package/react-flagkit)
- Don't forget to remove unused translation keys from localization files
- You can highlight active language by applying `filter: saturate(0.1);` to inactive language flag
- Don't forget to rename `useLoggedInUser.ts` to `useLoggedInUser.tsx` since now it should contain JSX
- You don't need to translate the About page and it also won't be a big deal if you miss som strings
