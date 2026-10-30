import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the scroll position whenever the route changes.
 *
 * Only the window scrolls (see index.css), so `window.scrollTo` is enough.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
