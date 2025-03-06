import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";

const GTMPageView = () => {
  const location = useLocation();

  useEffect(() => {
    // console.log("🚀 GTMPageView component mounted");
    // console.log("🚀 Current pathname:", location.pathname);

    const sendPageView = () => {
      // console.log("🚀 Sending GTM pageview:", location.pathname);
      TagManager.dataLayer({
        dataLayer: {
          event: "pageview",
          page: location.pathname,
        },
      });
    };

    sendPageView();

    return () => {
      // console.log("🚀 GTMPageView component unmounted");
    };
  }, [location]);

  return null;
};

export default GTMPageView;
