import React from 'react';
import { useOrders } from '../../context/OrderContext';

const Orders = () => {
  const { orders } = useOrders();

  return (
    <div className="w-full md:w-[90%] mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-bold text-lg">Total: ₹{order.totalAmount}</p>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Items:</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;