# Expo + Tailwind Documentation

## Overview

This repo uses `expo-router` plus Tailwind-style styling through `nativewind` and PostCSS. It supports both mobile and web from the same codebase.

### Key features
- `expo-router` for navigation
- Tailwind utilities via `nativewind`
- Shared `global.css` for Tailwind imports
- Platform-safe `SafeAreaView` fallback for web
- Consistent mobile + web styling

---

## Project setup

### Important files
- `package.json`
- `postcss.config.mjs`
- `global.css`
- `app/_layout.tsx`
- `shared/components/ui/safe-area-view.tsx`
- page files like `app/(tabs)/index.tsx`

### `postcss.config.mjs`

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### `global.css`

```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";

@import "nativewind/theme";

@theme {
    --color-background: #fff9e3;
    --color-foreground: #081126;
    --color-card: #fff8e7;
    --color-muted: #f6eecf;
    --color-muted-foreground: rgba(0, 0, 0, 0.6);
    --color-primary: #081126;
    --color-accent: #ea7a53;
    --color-border: rgba(0, 0, 0, 0.1);
    --color-success: #16a34a;
    --color-destructive: #dc2626;
    --color-subscription: #8fd1bd;

    --spacing-0: 0px;
    --spacing-1: 4px;
    --spacing-2: 8px;
    --spacing-3: 12px;
    --spacing-4: 16px;
    --spacing-5: 20px;
    --spacing-6: 24px;
    --spacing-7: 28px;
    --spacing-8: 32px;
    --spacing-9: 36px;
    --spacing-10: 40px;
    --spacing-11: 44px;
    --spacing-12: 48px;
    --spacing-14: 56px;
    --spacing-16: 64px;
    --spacing-18: 72px;
    --spacing-20: 80px;
    --spacing-24: 96px;
    --spacing-30: 120px;

    --font-sans: sans-regular;
    --font-sans-light: sans-light;
    --font-sans-medium: sans-medium;
    --font-sans-semibold: sans-semibold;
    --font-sans-bold: sans-bold;
    --font-sans-extrabold: sans-extrabold;
}
```

---

## How styling is applied

The root layout imports the CSS once:

```tsx
import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

Any page can then use Tailwind classes with `className`:

```tsx
<View className="flex-1 bg-background p-5">
  <Text className="text-xl font-bold text-success">
    Welcome to Nativewind!
  </Text>
</View>
```

---

## SafeAreaView fallback for web

This repo uses a shared component wrapper that uses real `SafeAreaView` on mobile and falls back to a regular `View` on web.

### `shared/components/ui/safe-area-view.tsx`

```tsx
import { Platform, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView =
  Platform.OS === "web"
    ? styled(View)
    : styled(RNSafeAreaView);

export default SafeAreaView;
```

### Why this matters
- mobile gets proper safe-area inset handling
- web avoids inconsistent safe-area behavior
- the same component API works on both platforms
- you can still write:

```tsx
<SafeAreaView className="flex-1 bg-background p-5">
```

---

## Catering both web and mobile

### Best practice
- Use a shared component API across platforms
- Add platform-specific fallbacks only in one place
- Keep page layout classes shared
- Avoid spreading web/mobile exceptions across every screen

### Example

```tsx
<SafeAreaView className="flex-1 bg-background p-5">
  ...
</SafeAreaView>
```

This means mobile will render the safe area wrapper and web will render a normal `View` wrapper.

---

## Avoid className styling for icons

### Important note
Icon and image styling can be flaky on web if you rely only on `className` on the `Image` component.

### Better pattern
Wrap the icon in a container and style the wrapper:

```tsx
<View className="tabs-icon">
  <View className={clsx("tabs-pill", focused && "tabs-active")}>
    <Image source={icon} style={{ width: 24, height: 24 }} />
  </View>
</View>
```

### Why
- `Image` may not map all Tailwind classes the same way on web
- the wrapper handles layout, padding, background, and active state
- the icon itself can use explicit `style` for reliable sizing

---

## Why web styling can still work without `babel.config.js`

Expo provides a default Babel configuration. That means:
- `babel.config.js` is only required when you need custom Babel settings
- if Expo’s default build covers your app, you can remove it
- web styling still works because `postcss.config.mjs` and `global.css` are still loaded

So in this repo:
- Tailwind/PostCSS is configured by `postcss.config.mjs`
- the app imports `global.css`
- Expo provides the default Babel/Webpack pipeline

---

## Summary

- Use `global.css` + `postcss.config.mjs` to enable Tailwind utilities
- Import the CSS once in `app/_layout.tsx`
- Use `SafeAreaView` on mobile and fallback to `View` on web
- Keep icon styling in wrappers, not on the raw `Image`
- Removing `babel.config.js` is okay if Expo’s defaults already cover the build
