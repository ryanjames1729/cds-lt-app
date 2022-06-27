import { gql } from 'graphql-request';
import { getSession } from 'next-auth/react';

import { graphcmsClient } from '../../lib/graphcms';

const UpdateNextAuthUser = gql`
  mutation UpdateNextAuthUser($email: String!, $bio: String) {
    user: updateNextAuthUser(data: { bio: $bio }, where: { email: $email }) {
      id
      email
      bio
    }
  }
`;

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const { bio } = JSON.parse(req.body);

    const { user } = await graphcmsClient.request(UpdateNextAuthUser, {
      email: session.user.email,
      bio,
    });

    res.json(user);
  } else {
    res.send({
      error: 'You must be sign in to update your account.',
    });
  }
};
