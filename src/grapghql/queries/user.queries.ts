import { gql } from '@apollo/client';
export const GetMe_Q= gql`
  query GetMe {
    me {
    user {
        _id
        email
        first_name
        last_name
        role
        isVerified
        createdAt
        updatedAt
        address
    }
    }
  }
`;