# BSCardFooter

The `BSCardFooter` component is designed to provide a styled footer section for card components within the BrightSpace Project.

### Component Props

| Prop Name                 | Type            | Default Value | Description                                               |
| ------------------------- | --------------- | ------------- | --------------------------------------------------------- |
| **children**              | React.ReactNode | —             | The content to be rendered within the card footer.        |
| **givenCardFooterStyles** | string          | —             | Optional custom class name for overriding default styles. |

### Component Logic

1. **Style Determination:**
   - Uses `makeStyles` to define default styles for the card footer.
   - If `givenCardFooterStyles` is provided, it overrides the default style; otherwise, the style from `useStyles` is applied.
2. **Rendering:**
   - Wraps the `children` prop in a Fluent UI `CardFooter` component with the computed class name.

---

## Usage

Below is the usage for the `BSCardFooter` component:

```tsx
import BSCardFooter from "./path/to/BSCardFooter";

const MyCardFooter = () => (
  <BSCardFooter>
    <p>Footer content goes here.</p>
  </BSCardFooter>
);
```
