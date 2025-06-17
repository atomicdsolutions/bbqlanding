import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import PageTransition from '../components/animations/PageTransition';
import '../styles/globals.css'; // Add this import if it's missing

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
    </AuthProvider>
  );
}