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

export const VERIFY_PAYMENT_AND_CREATE_ORDER = gql`
  mutation VerifyPaymentAndCreateOrder(
    $collect_request_id: String!
    $input: CreateOrderInput!
  ) {
    verifyPaymentAndCreateOrder(
      collect_request_id: $collect_request_id
      createOrderInput: $input
    ) {
      _id
      user_id {
        _id
        first_name
        email
      }
      order_id
      status
      total
      createdAt
      order_items {
        product_id {
          _id
          title
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
      payment_id
      shippingPrice
    }
  }
`;
