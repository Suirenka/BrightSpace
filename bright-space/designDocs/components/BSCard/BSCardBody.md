# BSCardBody

The `BSCardBody` component is designed to provide a styled content body within the BrightSpace Project, specifically for use inside card components to display textual information with consistent formatting.

### Component Props

| Prop Name              | Type            | Default Value | Description                                               |
| ---------------------- | --------------- | ------------- | --------------------------------------------------------- |
| **children**           | React.ReactNode | —             | The content to be rendered within the card body.          |
| **givenCardBodyStyle** | string          | —             | Optional custom class name for overriding default styles. |

### Component Logic

1. **Style Determination:**
   - Uses `makeStyles` to define default styles for the card body.
   - If `givenCardBodyStyle` is provided, it overrides the default style; otherwise, the style from `useStyles` is applied.
2. **Rendering:**
   - Wraps the `children` prop in a Fluent UI `Body1` component with the computed class name, ensuring consistent typography and layout.

---

## Usage

Below is the usage for the `BSCardBody` component:

```tsx
import BSCardBody from "./path/to/BSCardBody";

const MyCardContent = () => (
  <BSCardBody>
    <p>This is some text content inside the card body.</p>
  </BSCardBody>
);
```
