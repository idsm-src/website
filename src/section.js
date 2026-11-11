import React from "react";

import { trackPageView } from "./matomo.js"


// whether the part of the website a page belongs to is the one shown, see sections in Website.js
const SectionContext = React.createContext(true);


// a function giving the part of the website a page belongs to another search part of its URL while it is hidden,
// without leaving the part shown, so that the menu and its page keep the state reached meanwhile
const KeepSearchContext = React.createContext(() => {});


// Give the page its title and count its view each time its part of the website is shown, since a part stays while
// another one is shown
function usePageView(title) {
  const shown = React.useContext(SectionContext);

  React.useEffect(() => {
    if(shown) {
      document.title = title;
      trackPageView();
    }
  }, [shown, title]);
}


export { KeepSearchContext, SectionContext, usePageView };
