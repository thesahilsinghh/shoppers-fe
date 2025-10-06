import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(createOrderInput: $input) {
      _id
      order_id
      status
      total
      user_id {
        _id
      }
      createdAt
      order_items {
        product_id {
          _id
        }
        quantity
        price
      }
      address {
        flat
        city
        state
        pincode
        country
        contact
        name
      }
    }
  }
`;

export const INITIATE_PAYMENT = gql`
  mutation InitiatePayment($input: CreateOrderInput!) {
    initiatePayment(createOrderInput: $input)
  }
`;
