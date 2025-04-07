# BSCard

The `BSCard` component is designed to provide a styled container card within the BrightSpace Project.

### Component Props

| Prop Name          | Type            | Default Value | Description                                               |
| ------------------ | --------------- | ------------- | --------------------------------------------------------- |
| **children**       | React.ReactNode | —             | The content to be rendered within the card.               |
| **givenCardStyle** | string          | —             | Optional custom class name for overriding default styles. |

### Component Logic

1. **Style Determination:**
   - Uses `makeStyles` to define default card styles.
   - If `givenCardStyle` is provided, it overrides the default style; otherwise, the style from `useStyles` is applied.
2. **Rendering:**
   - Wraps the `children` prop in a Fluent UI `Card` component with the computed class name.
   - According to definition of `<Card>`, body content might be necessary.

---

## Usage

Below is the usage for the `BSCard` component:

```tsx
import BSCard from "./path/to/BSCard";

const MyComponent = () => (
  <BSCard>
    <p>This is some content inside the card.</p>
  </BSCard>
);
```
