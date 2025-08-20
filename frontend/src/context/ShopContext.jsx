import { createContext, useEffect, useState } from "react";
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
  const [orders, setOrders] = useState([]);

  // Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
    toast.success("Added to cart");

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  // Calculate total cart amount
const getCartAmount = () => {
  let totalAmount = 0;
  for (const productId in cartItems) {
    const product = products.find((p) => p._id === productId);
    if (product) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          totalAmount += product.price * quantity;
        }
      }
    }
  }
  return totalAmount;
};


  // Update cart quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
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

      if (token) {
        try {
          await axios.post(
            backendUrl + "/api/cart/update",
            { itemId, size, quantity },
            { headers: { token } }
          );
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      }
    }
  };

  // Count cart items
  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          totalCount += cartItems[productId][size];
        }
      }
    }
    return totalCount;
  };

  // Place order from cart
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
    setCartItems({});
    toast.success("Order placed successfully");
    navigate("/orders");
  };

  // Update order
  const updateOrder = (orderId, updates) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, ...updates } : order
      )
    );
    toast.success("Order updated");
  };

  // Fetch products
  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch user cart
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Restore token and fetch cart
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
      getUserCart(localToken); // ✅ fixed
    }
  }, []);

  // Sync token to localStorage
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
  getCartAmount,
  setCartItems,
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
