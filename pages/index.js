import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'

import Header from '../components/header';
import Todos from '../components/todos';

export default function IndexPage() {
  const { data } = useSession();

  return (
    <>
    <div>
      <Header />

      <div className="max-w-3xl mx-auto px-6 space-y-6">
        <div className="flex flex-row justify-center">
        <Image src="/cds_logo.png" alt="logo" width={200} height={200} />
        </div>
        <h1 className="text-3xl font-bold">My Learning Targets</h1>
        {data ? <Todos /> : <p>Login to manage your LTs</p>}
      </div>
    </div>
    <div>
      <p className="p-2">
        Need some help here? Check out the <Link href="/docs"><a><span className="text-blue-800 hover:underline">app documentation</span></a></Link> to answer your questions.
      </p>
    </div>
    </>
  );
}
