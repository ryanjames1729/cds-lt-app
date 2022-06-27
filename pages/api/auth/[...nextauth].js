// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/credentials'; 
// import { compare, hash } from 'bcrypt';
import { gql } from 'graphql-request';

import { graphcmsClient } from '../../../lib/graphcms';

const GetNextAuthUserByEmail = gql`
  query GetNextAuthUserByEmail($email: String!) {
    user: nextAuthUser(where: { email: $email }, stage: DRAFT) {
      id
      password
    }
  }
`;

const CreateNextAuthUserByEmail = gql`
  mutation CreateNextAuthUserByEmail($email: String!, $password: String!) {
    newUser: createNextAuthUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;

// export default NextAuth({
//   site: process.env.NEXT_AUTH_URL,

//   secret: process.env.NEXTAUTH_SECRET,
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   debug: process.env.NODE_ENV === 'development',
  
//   providers: [
//     CredentialsProvider({
//       name: 'Email and Password',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'email',
//           placeholder: 'jamie@graphcms.com',
//         },
//         password: {
//           label: 'Password',
//           type: 'password',
//           placeholder: 'Password',
//         },
//       },
//       authorize: async ({ email, password }) => {
//         const { user } = await graphcmsClient.request(GetNextAuthUserByEmail, {
//           email,
//         });

//         if (!user) {
//           const { newUser } = await graphcmsClient.request(
//             CreateNextAuthUserByEmail,
//             {
//               email,
//               password: await hash(password, 12),
//             }
//           );

//           return {
//             id: newUser.id,
//             username: email,
//             email,
//           };
//         }

//         const isValid = await compare(password, user.password);

//         if (!isValid) {
//           throw new Error('Wrong credentials. Try again.');
//         }

//         return {
//           id: user.id,
//           username: email,
//           email,
//         };
//       },
//     }),

//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.userId = token.sub;
//       return Promise.resolve(session);
//     },
//   },
// });



import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
  site: process.env.NEXT_AUTH_URL,
  // secret: process.env.NEXTAUTH_SECRET,
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
  // session: {
  //   strategy: 'jwt',
  // },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here

  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "user"
      return token
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const email = profile.email
        const { user } = await graphcmsClient.request(GetNextAuthUserByEmail, {
          email,
        });

        if (!user) {
          const { newUser } = await graphcmsClient.request(
            CreateNextAuthUserByEmail,
            {
              email,
              password: 'google-login',
            }
          );

          return {
            id: newUser.id,
            username: profile.name,
            email: profile.email,
          }
        }

        return {
          id: user.id,
          username: profile.name,
          email: profile.email,
        }
      }
    },
    async session({ session, token, user }) {
      session.userId = token.sub;
      return Promise.resolve(session);
    },
  },

})
