import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
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

  useEffect(() => history.listen(() => setPage(defaultPage)), [history]);

  const doSetPage = useCallback(
    d =>
      setPage({
        ...defaultPage,
        ...d,
        back: d.back || (d.title && { to: '/' }),
      }),
    []
  );

  const context = useMemo(
    () => ({
      ...page,
      setPage: doSetPage,
    }),
    [page, doSetPage]
  );

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function usePage() {
  return useContext(Context);
}
