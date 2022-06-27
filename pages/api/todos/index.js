import { gql } from 'graphql-request';
import { getSession } from 'next-auth/react';

import { graphcmsClient } from '../../../lib/graphcms';

export const GetAllTodosByUser = gql`
  query GetAllTodosByUser($email: String!) {
    todos(where: { nextAuthUser: { email: $email } }, stage: DRAFT, orderBy: createdAt_ASC) {
      id
      description
      completed
    }
  }
`;

const CreateNewTodoForUser = gql`
  mutation CreateNewTodoForUser(
    $description: String!
    $completed: Boolean
    $email: String!
  ) {
    todo: createTodo(
      data: {
        description: $description
        completed: $completed
        nextAuthUser: { connect: { email: $email } }
      }
    ) {
      id
      description
      completed
    }
  }
`;

export default async (req, res) => {
  const session = await getSession({ req });
  console.log(session)
 

  if (!session) { 
    res.status(401).send({
      error: 'Unauthorized',
    });
  }

  switch (req.method.toLowerCase()) {
    case 'get': {
      const { todos } = await graphcmsClient.request(GetAllTodosByUser, {
        email: session.user.email,
      });

      console.log(session.user.email)
      console.log('fetching todos complete');

      console.log(todos);

      let totalCount = 0;
      let completedCount = 0;
      for(let i = 0; i < todos.length; i++) {
        totalCount++;
        if(todos[i].completed) {
          completedCount++;
        }
      }
      console.log(totalCount);
      console.log(completedCount);

      res.status(200).json(todos);
      break;
    }

    case 'post': {
      const { description, completed } = req.body;

      const { todo } = await graphcmsClient.request(CreateNewTodoForUser, {
        description,
        completed,
        email: session.user.email,
      });

      
      console.log('posting todo complete');

      res.status(201).json(todo);
      break;
    }

    default: {
      res.status(405).send();
    }
  }
};
