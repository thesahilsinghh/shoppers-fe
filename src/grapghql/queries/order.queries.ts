import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query GetOrders($user_id: String!, $limit: Int) {
    orders(user_id: $user_id, limit: $limit) {
      _id
      order_id
      user_id {
        first_name
        email
        last_name
      }
      order_items {
        product_id {
          title
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
      createdAt
      shippingPrice
      payment_id
      status
      total
    }
  }
`;
