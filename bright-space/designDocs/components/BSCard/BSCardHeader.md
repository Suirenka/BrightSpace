# BSCardHeader

The `BSCardHeader` component is designed to provide a styled header section for card components within the BrightSpace Project.

### Component Props

| Prop Name                 | Type            | Default Value | Description                                                      |
| ------------------------- | --------------- | ------------- | ---------------------------------------------------------------- |
| **children**              | React.ReactNode | —             | The header text content to be rendered inside the header.        |
| **givenCardHeaderStyles** | string          | —             | Optional custom class name for overriding default header styles. |

### Component Logic

1. **Style Determination:**
   - Uses `makeStyles` to define default styles for the card header.
   - If `givenCardHeaderStyles` is provided, it overrides the default style; otherwise, the style from `useStyles` is applied.
2. **Rendering:**
   - Wraps the `children` prop in a Fluent UI `CardHeader` component.
   - Renders a `Text` component as an `h1` with semibold weight and size 600 to display the header text.

---

## Usage

Below is the usage for the `BSCardHeader` component:

```tsx
import BSCardHeader from "./path/to/BSCardHeader";

const MyCard = () => (
  <div>
    <BSCardHeader>My Card Title</BSCardHeader>
    {/* Additional card content */}
  </div>
);
```
