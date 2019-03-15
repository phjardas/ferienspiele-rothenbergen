import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from './router';

const site = 'Ferienspiele Rothenbergen';

const Context = createContext();

const defaultPage = {
  site,
  title: null,
};

export function PageContextProvider({ children }) {
  const { history } = useRouter();
  const [page, setPage] = useState(defaultPage);

  useEffect(() => history.listen(() => setPage(defaultPage)), []);

  const context = {
    ...page,
    setPage: d =>
      setPage({
        ...defaultPage,
        ...d,
        back: d.back || (d.title && { to: '/' }),
      }),
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function usePage() {
  return useContext(Context);
}
