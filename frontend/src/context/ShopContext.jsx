import { createContext, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Add orders state
  const [orders, setOrders] = useState([]);

  // Function to add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // Function to update cart quantity
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size]) {
      if (quantity <= 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
        toast.success("Item removed from cart");
      } else {
        cartData[itemId][size] = quantity;
        toast.success("Cart updated");
      }
      setCartItems(cartData);
    }
  };

  // Function to get cart item count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  // Function to place an order from cart
  const placeOrder = () => {
    if (Object.keys(cartItems).length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const newOrders = Object.entries(cartItems)
      .map(([itemId, sizes]) => {
        const product = products.find((p) => p._id === itemId);
        return Object.entries(sizes).map(([size, quantity]) => ({
          ...product,
          orderId: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
          size,
          quantity,
          status: "Processing",
          date: new Date().toISOString().split("T")[0],
        }));
      })
      .flat();

    setOrders((prevOrders) => [...prevOrders, ...newOrders]);
    setCartItems({}); // Clear cart after placing order
    toast.success("Order placed successfully");
    navigate("/orders");
  };

  // Function to update an existing order
  const updateOrder = (orderId, updates) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, ...updates } : order
      )
    );
    toast.success("Order updated");
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Restore token from localStorage on app load
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  // Sync context token to localStorage on change
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    navigate,
    orders,
    placeOrder,
    updateOrder,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
