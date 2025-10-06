import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type {
  CreateOrderInput,
  Order,
  OrderContextType,
  GetOrdersResponse,
  CreateOrderResponse,
  InitiatePaymentResponse,
} from "../types";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_ORDERS } from "../grapghql/queries/order.queries";
import {
  CREATE_ORDER,
  INITIATE_PAYMENT,
} from "../grapghql/mutations/order.mutations";

// GraphQL Response Types

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // Fetch all orders
  const { data, loading, error, refetch } = useQuery<GetOrdersResponse>(
    GET_ORDERS,
    {
      variables: { user_id: "68e1fbdd138058230eec7c3a", limit: 10 },
    }
  );
  const [createOrderMutation] = useMutation<CreateOrderResponse>(CREATE_ORDER);
  const [initiatePaymentMutation] =
    useMutation<InitiatePaymentResponse>(INITIATE_PAYMENT);

  if (error) {
    console.log(error);
  }

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (data && data.orders) {
      setOrders(data.orders);
    }
  }, [data]);

  const createOrder = async (
    input: CreateOrderInput
  ): Promise<Order | undefined> => {
    try {
      const { data } = await createOrderMutation({ variables: { input } });
      if (!data || !data.createOrder) {
        throw new Error("Failed to create order. No data returned.");
      }
      return data.createOrder;
    } catch (err: any) {
      console.error("Error creating order:", err);
    }
  };

  const initiatePayment = async (
    input: CreateOrderInput
  ): Promise<string | undefined> => {
    try {
      console.log(input);
      const { data } = await initiatePaymentMutation({ variables: { input } });
      if (!data || !data.initiatePayment) {
        throw new Error("Failed to initiate payment. No data returned.");
      }
      return data.initiatePayment;
    } catch (err: any) {
      console.error("Error initiating payment:", err);
      throw err;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error: error ? error.message : null,
        refetchOrders: refetch,
        createOrder,
        initiatePayment,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error(
      "useOrderContext must be used within an OrderContextProvider"
    );
  return context;
};
