import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

export default forwardRef(function LinkBehavior({ href, ...other }, ref) {
  if (
    typeof href === "string" &&
    (href.startsWith("http") || href.startsWith("mailto"))
  ) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a ref={ref} href={href} {...other} />;
  }

  return <RouterLink ref={ref} to={href} {...other} />;
});
