# BSNavLink

The `BSNavLink` component is designed to create styled navigational links within the BrightSpace Project.

### Component Props

The `BSNavLink` component accepts the following props:

| Prop Name          | Type    | Default Value | Description                                                      |
| ------------------ | ------- | ------------- | ---------------------------------------------------------------- |
| **text**           | string  | —             | The text to display for the link.                                |
| **route**          | string  | —             | The URL route to navigate to when the link is clicked.           |
| **givenLinkStyle** | string  | —             | Optional custom class name for overriding default styles.        |
| **back**           | boolean | `false`       | If `true`, displays a left arrow indicating backward navigation. |
| **noArrow**        | boolean | `false`       | If `true`, no arrow icon is displayed.                           |

### Component Logic

1. **Routing:**
   - Uses `RouterLink` to navigate to the specified `route` on click.
2. **Style Determination:**

   - If `givenLinkStyle` is provided, it overrides the default style; otherwise, the style from `useStyles` is applied.

3. **Arrow Display:**

   - If `noArrow` is set to `true`, the component renders only the text without any arrow icons.
   - If `noArrow` is `false`:
     - When `back` is `false`, an arrow pointing to the right (`ArrowCircleRight20Regular`) is appended after the text.
     - When `back` is `true`, an arrow pointing to the left (`ArrowCircleLeft20Regular`) is prepended before the text.

---

## Usage

Below is the usage for the `BSNavLink` component:

```tsx
import BSNavLink from "./path/to/BSNavLink";
const MyNavigation = () => (
  <div>
    <BSNavLink text={"Learn More about the resources"} route={"/bs-resource"} />
    <BSNavLink text={"Go Back Home"} route={"/"} back={true} />
    <BSNavLink text={"No arrow link"} route={"/"} noArrow={true} />
  </div>
);
```
