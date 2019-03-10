import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from './router';

const Context = createContext();

const defaultPage = {
  title: 'Ferienspiele Rothenbergen',
};

export function PageContextProvider({ children }) {
  const { history } = useRouter();
  const [page, setPage] = useState(defaultPage);

  useEffect(() => history.listen(() => setPage(defaultPage)), []);

  const context = {
    ...page,
    setPage: d => setPage({ ...defaultPage, ...d }),
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function usePage() {
  return useContext(Context);
}
