import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Force native absolute scroll to top
    window.scrollTo(0, 0);

    // 2. Intercept local layout scrolling wrapper introduced in Phase 21
    const layoutScrollContainer = document.querySelector('div.overflow-y-auto');
    if (layoutScrollContainer) {
      layoutScrollContainer.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
