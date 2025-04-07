# BSCardPreview

The `BSCardPreview` component is designed to provide a styled preview section for card components within the BrightSpace Project.
**The image format in this component might not be changed by styles.**

### Component Props

| Prop Name                  | Type            | Default Value | Description                                               |
| -------------------------- | --------------- | ------------- | --------------------------------------------------------- |
| **children**               | React.ReactNode | —             | The content to be rendered within the card preview.       |
| **givenCardPreviewStyles** | string          | —             | Optional custom class name for overriding default styles. |

### Component Logic

1. **Style Determination:**
   - Uses `makeStyles` to define default styles for the card preview.
   - If `givenCardPreviewStyles` is provided, it overrides the default style; otherwise, the style from `useStyles` is applied.
2. **Rendering:**
   - Wraps the `children` prop in a Fluent UI `CardPreview` component with the computed class name.

---

## Usage

Below is the usage for the `BSCardPreview` component:

```tsx
import BSCardPreview from "./path/to/BSCardPreview";

const MyCardPreview = () => (
  <BSCardPreview>
    <p>This is a preview content inside the card.</p>
  </BSCardPreview>
);
```
