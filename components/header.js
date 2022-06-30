import { useSession, signIn, signOut } from 'next-auth/react';
import { gql } from 'graphql-request';
import Link from 'next/link';


export default function Header({titles}) {
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  if (loading) return null;

  return (
    <header className="bg-gray-100 border-b border-gray-200 shadow-sm py-4 mb-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-3 md:px-6">
        <Link href="/">
          <a>Home</a>
        </Link>

        {session ? (
          <div className="space-x-3">
            <Link href="/account">
              <a>Settings</a>
            </Link>
            <Link href="/class_a1">
              <a>{titles ? titles[0] : 'Class A'}</a>
            </Link>
            <Link href="/class_b2">
              <a className={!titles ? "" : titles[1] == 'hide' ? "hidden" : ""}>{titles ? titles[1] : 'Class B'}</a>
            </Link>
            <Link href="/class_c3">
              <a className={!titles ? "" : titles[2] == 'hide' ? "hidden" : ""}>{titles ? titles[2] : 'Class C'}</a>
            </Link>
            <Link href="/class_d4">
              <a className={!titles ? "" : titles[3] == 'hide' ? "hidden" : ""}>{titles ? titles[3] : 'Class D'}</a>
            </Link>
            <button onClick={signOut}>Sign out</button>
          </div>
        ) : (
          <>
            <button onClick={() => signIn('google')}>Sign in</button>
          </>
        )}
      </div>
    </header>
  );
}
