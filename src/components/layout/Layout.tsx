import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* This div acts as a spacer for the fixed header */}
        <div className="h-24" /> {/* Adjust this height if needed */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;