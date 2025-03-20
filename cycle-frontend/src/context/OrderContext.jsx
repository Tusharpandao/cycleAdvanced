import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (orderItems, totalAmount) => {
    const newOrder = {
      id: Date.now(),
      items: orderItems,
      totalAmount,
      date: new Date().toISOString(),
    };
    setOrders(prev => [...prev, newOrder]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}; 