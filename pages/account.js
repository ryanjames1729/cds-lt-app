import { useState } from 'react';
import { gql } from 'graphql-request';
import useSWR, { mutate } from 'swr';

import { getSession } from 'next-auth/react';
import { graphcmsClient } from '../lib/graphcms';
import Header from '../components/header';

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

  console.log('Account serverside: ' + session.user.email)

  const { user } = await graphcmsClient.request(GetUserProfileById, {
    email: session.user.email,
  });

  return {
    props: {
      user
    },
  };
}

export default function AccountPage({ user }) {


  const [bio, setBio] = useState(user?.bio);
  const [classA1, setClassA1] = useState(user?.classA1);
  const [classB2, setClassB2] = useState(user?.classB2);
  const [classC3, setClassC3] = useState(user?.classC3);
  const [classD4, setClassD4] = useState(user?.classD4);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/update-account', {
        method: 'POST',
        body: JSON.stringify({ bio, classA1, classB2, classC3, classD4 }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header titles={[user.classA1, user.classB2, user.classC3, user.classD4]}/>

      <div className="max-w-3xl mx-auto px-6 space-y-6">
        <h1 className="text-3xl font-bold">My Account</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded p-4 border border-gray-200 space-y-3"
        >
          <div className="space-y-3">
            <label htmlFor="bio" className="text-purple-500 font-medium mb-3">
              First Class - A1
            </label>
            <div>
              <textarea
                name="classA1"
                value={classA1}
                onChange={(e) => setClassA1(e.target.value)}
                placeholder="First Class"
                id="classA1"
                rows={1}
                className="shadow-sm block w-full border-gray-200 rounded-md"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label htmlFor="classA1" className="text-purple-500 font-medium mb-3">
              Second Class - B2
            </label>
            <div>
              <textarea
                name="classA1"
                value={classB2}
                onChange={(e) => setClassB2(e.target.value)}
                placeholder="First Class"
                id="classA1"
                rows={1}
                className="shadow-sm block w-full border-gray-200 rounded-md"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label htmlFor="classC3" className="text-purple-500 font-medium mb-3">
              Third Class - C3
            </label>
            <div>
              <textarea
                name="classC3"
                value={classC3}
                onChange={(e) => setClassC3(e.target.value)}
                placeholder="Third Class"
                id="classC3"
                rows={1}
                className="shadow-sm block w-full border-gray-200 rounded-md"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label htmlFor="classD4" className="text-purple-500 font-medium mb-3">
              Fourth Class - D4
            </label>
            <div>
              <textarea
                name="classD4"
                value={classD4}
                onChange={(e) => setClassD4(e.target.value)}
                placeholder="Fourth Class"
                id="classD4"
                rows={1}
                className="shadow-sm block w-full border-gray-200 rounded-md"
              />
            </div>
          </div>


          <div className="space-y-3">
            <label htmlFor="bio" className="text-purple-500 font-medium mb-3">
              Bio
            </label>

            <div>
              <textarea
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Short bio"
                id="bio"
                rows={7}
                className="shadow-sm block w-full border-gray-200 rounded-md"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-purple-500 text-white px-3 py-1.5 rounded w-full"
            >
              Save profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}