import { gql } from '@apollo/client';

// $ is what developer will give and normal is what server will accept
export const UpdateUser = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(updateuserinput: $input) {
      _id
      first_name
      last_name
      email
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const CreateProduct = gql`
  mutation CreateProduct($product: CreateProduct!) {
    createProduct(product: $product) {
      _id
      title
      description
      price
      image
      publish
      quantity
      category
    }
  }
`;
export const UpdateProductDetails = gql`
  mutation UpdateProductDetails($id: String!, $update: UpdateProduct!) {
    updateProductDetails(id: $id, update: $update) {
      _id
      title
      description
      price
      image
      publish
      quantity
      category
    }
  }
`;

export const DeleteProduct = gql`
  mutation RemoveProduct($id: String!) {
    removeProduct(id: $id)
  }
`;

export const UpdateProductQuantity = gql`
  mutation UpdateProductQuantity($id: String!, $amount: Float, $isDes: Boolean) {
    updateProductQuantity(id: $id, amount: $amount, isDes: $isDes) {
      _id
      title
      quantity
      price
      category
    }
  }
`;

export const UpdateProductPublishing = gql`
  mutation updaProductisPublish($id: String!) {
    updaProductisPublish(id: $id) {
      _id

    }
  }
`;
