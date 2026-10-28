import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the scroll position whenever the route changes.
 *
 * html, body and #root all have `overflow-x: hidden` and `height: 100%`
 * (see index.css), which turns each of them into a scroll container, so
 * `window.scrollTo` alone does not move the element that actually scrolls.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.getElementById("root")?.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
