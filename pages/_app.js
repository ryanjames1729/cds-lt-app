import { SessionProvider } from 'next-auth/react';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
