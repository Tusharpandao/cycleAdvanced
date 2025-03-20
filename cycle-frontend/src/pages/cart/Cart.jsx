import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import logo from "../../assets/logo.png"
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { userName, userEmail } = useAuth();
  let [totalPrice, setTotalPrice] = useState(0);
  let [itemToRemoveId, setItemToRemoveId] = useState(null);
  let [totalItemsQuantity, setTotalItemsQuantity] = useState(0);
  let [promoCode, setPromoCode] = useState("");
  let [discountApplied, setDiscountApplied] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    // Calculate total price for all items in the cart (initial and after discount)
    const calculateTotalPrice = () => {
      let total = 0;
      cart.forEach((cartItem) => {
        total += cartItem.price * cartItem.quantity;
      });

      if (discountApplied && promoCode.toUpperCase() === "NEW50") {
        total = total / 2; // Apply discount if valid code is entered
      }

      setTotalPrice(total);
    };

    calculateTotalPrice();

    const getTotalQuantity = () => {
      let totalQuantity = 0;
      cart.forEach((item) => {
        totalQuantity += item.quantity;
      });
      return totalQuantity;
    };
    setTotalItemsQuantity(getTotalQuantity);
  }, [cart, promoCode, discountApplied, totalItemsQuantity]);

  const handleInc = (item) => {
    if (item.quantity < item.stock) {
      updateQuantity(item.id, item.quantity + 1);
    } else {
      alert("You have reached the maximum amount available for this product.");
    }
  };

  const handleDec = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      // let confirmation = window.confirm(
      //   `You have reached the minimum quantity for this product. Are you sure you want to remove it?`
      // );
      Swal.fire({
        title: "Are you sure you want to remove it?",
        text: "You have reached the minimum quantity for this product.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, calculate",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (!result.isConfirmed) {
          return;
        }

        setItemToRemoveId(item.id);
      })
      // if (confirmation) {
      //   setItemToRemoveId(item.id);
      // }
    }
  };

  useEffect(() => {
    if (itemToRemoveId !== null) {
      removeFromCart(itemToRemoveId);
      setItemToRemoveId(null);
    }
  }, [itemToRemoveId, removeFromCart]);

  // const applyPromoCode = () => {
  //   if (promoCode.toUpperCase() === "NEW50") {
  //     if (!discountApplied) {
  //       let discountedPrice = totalPrice / 2;
  //       // Apply discount
  //       setTotalPrice(discountedPrice);
  //       setDiscountApplied(true);
  //       toast.success("Promo Code Applied");
  //     } else {
  //       toast.error("Promo Code Already Applied");
  //     }
  //   } else {
  //     // Remove the discount and reset total price if the promo code is invalid
  //     setTotalPrice(cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0));
  //     setDiscountApplied(false);
  //     toast.error("Invalid promo code");
  //   }
  // };

  let continueShopping = () => {
    navigate(-1);
  };
  const loadRazorpay = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    return new Promise((resolve) => {
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };
  
  const handleCheckout = async () => {
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      toast.error("Failed to load Razorpay. Please try again.");
      return;
    }
  
    const options = {
      key: "rzp_test_5C7srwxYlDtKK8",
      amount: totalPrice * 100,
      currency: "INR", 
      name: "Cycle Pricing Engine",
      description: "Purchase from Cycle Pricing Engine",
      image: logo, 
      handler: function (response) {
        console.log("Payment successful:", response);
        // Add items to orders
        addOrder(cart, totalPrice);
        // Clear the cart
        clearCart();
        toast.success("Payment Successful! Order has been placed.");
        // Navigate to orders page
        navigate('/orders');
      },
      prefill: {
        name: userName,
        email: userEmail, 
      },
      theme: {
        color: "#28544B",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  return (
    <>
      {cart.length === 0 ? (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-semibold   ">Your cart is empty!</h2>
          <p className="text-gray-500">Explore our products and add items to your cart</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="w-full md:w-[90%] mx-auto mt-10 bg-gray-400">
          <div className="flex flex-col md:flex-row shadow-md my-10 md:items-center">
            <div className="w-full lg:w-3/4 bg-white px-4 md:px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-xl md:text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-xl md:text-2xl">{cart.length} Items</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                  Total
                </h3>
              </div>
              {/* Products container  start*/}
              {cart.map((cartItem) => (
                <div
                  className="flex flex-col md:flex-row items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-3 "
                  key={cartItem.id}
                >
                  <div className="flex w-full md:w-2/5 ">
                    {/* <!-- product --> */}
                    <div className="w-20">
                      <img className="h-24" src={cartItem.thumbnail} alt="" />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{cartItem.title}</span>
                      <span className="text-red-500 text-xs">
                        {cartItem.brand}
                      </span>
                      <button
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        onClick={() => removeFromCart(cartItem.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center w-full md:w-1/5 mt-4 md:mt-0">
                    <button
                      className="border px-2 py-1 "
                      onClick={() => handleDec(cartItem)}
                    >
                      -
                    </button>
                    <button className="px-2">{cartItem.quantity}</button>
                    <button
                      className="border px-2 py-1 "
                      onClick={() => handleInc(cartItem)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-center w-full md:w-1/5 font-semibold text-sm mt-4 md:mt-0">
                    ₹{cartItem.price.toFixed(2)}
                  </span>
                  <span className="text-center w-full md:w-1/5 font-semibold text-sm mt-4 md:mt-0">
                    ₹{(cartItem.price * cartItem.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              {/* Products container end*/}
              <button className="flex items-center font-semibold text-indigo-600 text-sm mt-10" onClick={() => { { continueShopping() } }} >
                <FaLongArrowAltLeft size={20} />
                Continue Shopping
              </button>
            </div>

            <div
              id="summary"
              className="w-full lg:w-fit px-8 py-10 bg-[#f6f6f6] md:mx-auto"
            >
              <h1 className="font-semibold text-xl md:text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  {totalItemsQuantity} Items{" "}
                </span>
                <span className="font-semibold text-sm">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping 100.00 ₹ </option>
                </select>
              </div>
              {/*
              <div className="py-10">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Promo Code
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
                onClick={applyPromoCode}
              >
                Apply
              </button>
              */}
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
