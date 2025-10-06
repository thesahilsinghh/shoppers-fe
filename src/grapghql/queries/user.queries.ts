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

export const GET_PRODUCTS_QUERY = gql`
   query GetAllProducts($filters: FilterProducts!) {
    allProducts(filters: $filters) {
      _id
      title
      category
      price
      quantity
      publish
      description
      image
    }
  }
`;