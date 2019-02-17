import React from 'react';
import Footer from './Footer';
import MainMenu from './MainMenu';

export default function Layout({ children }) {
  return (
    <>
      <MainMenu />
      <main>{children}</main>
      <Footer />
    </>
  );
}
