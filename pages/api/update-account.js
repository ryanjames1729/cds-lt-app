import { gql } from 'graphql-request';
import { getSession } from 'next-auth/react';

import { graphcmsClient } from '../../lib/graphcms';

const UpdateNextAuthUser = gql`
  mutation UpdateNextAuthUser($email: String!, $bio: String, $classA1: String, $classB2: String, $classC3: String, $classD4: String) {
    user: updateNextAuthUser(data: { bio: $bio, classA1: $classA1, classB2: $classB2, classC3: $classC3, classD4: $classD4 }, where: { email: $email }) {
      id
      email
      bio
    }
  }
`;

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const { bio, classA1, classB2, classC3, classD4 } = JSON.parse(req.body);

    const { user } = await graphcmsClient.request(UpdateNextAuthUser, {
      email: session.user.email,
      bio,
      classA1,
      classB2,
      classC3,
      classD4,
    });

    res.json(user);
  } else {
    res.send({
      error: 'You must be sign in to update your account.',
    });
  }
};
