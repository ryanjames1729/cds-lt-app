import { useSession } from 'next-auth/react';
import { gql } from 'graphql-request';
import { getSession } from 'next-auth/react';
import { graphcmsClient } from '../lib/graphcms';
import Image from 'next/image'
import Link from 'next/link'

import Header from '../components/header';
import Todos from '../components/todos';

const GetUserProfileById = gql`
  query GetUserProfileById($email: String!) {
    user: nextAuthUser(where: { email: $email }, stage: DRAFT) {
      email
      bio
      classA1
      classB2
      classC3
      classD4
    }
  }
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  if (!session) {
    return {
      props: {
        user: null,
      }
    }
  }
  const { user } = await graphcmsClient.request(GetUserProfileById, {
    email: session.user.email,
  });

  return {
    props: {
      user
    },
  };
}

export default function IndexPage({ user }) {
  const { data } = useSession();

  return (
    <>
    <div className="md:h-screen">
      {data ? 
      <Header titles={[user.classA1, user.classB2, user.classC3, user.claddD4]}/>
      : 
      <Header titles={['', '', '', '']}/>
      }
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* <div className="flex flex-row justify-center"> */}
        <div className="grid grid-col">
          <div className="grid grid-row justify-center">
            <div className="grid grid-row justify-center">
              <Image src="/cds_logo.png" alt="logo" width={200} height={200} />
            </div>
            {data ? <><h1 className="text-2xl md:text-4xl text-blue-800 py-2 font-bold">All your learning targets</h1></> : <><h1 className="text-2xl md:text-6xl font-bold text-blue-800 py-4">
            Teach with your <span
              className="text-2xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-800"
            >
              learning targets
            </span>.
          </h1></> }
          
          {data ? <Todos /> : <p>Login to get started.</p>}
          </div>
        </div>
      </div>
      <div>
      <p className={data ? "hidden" : "p-2 absolute bottom-0"}>
        Need some help here? Check out the <Link href="/docs"><a><span className="text-blue-800 hover:underline">app documentation</span></a></Link> to answer your questions.
      </p>
    </div>
    </div>
   
    </>
  );
}
