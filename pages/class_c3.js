import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { gql } from 'graphql-request';
import { getSession } from 'next-auth/react';
import { graphcmsClient } from '../lib/graphcms';

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

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
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

  const pageCat = 'C3'

  return (
    <div>
      <Header titles={[user.classA1, user.classB2, user.classC3, user.classD4]}/>

      <div className="max-w-3xl mx-auto px-6 space-y-6">
        <div className="flex flex-row justify-center">
        <Image src="/cds_logo.png" alt="logo" width={200} height={200} />
        </div>
        <h1 className="text-3xl font-bold">My Learning Targets - {user.classC3}</h1>

        {data ? <Todos category={pageCat} /> : <p>Login to manage your LTs</p>}
      </div>
    </div>
  );
}