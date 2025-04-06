"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcartbyid, deletecart } from "@/reducers/cartreducer";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import withAuth from "../components/withAuth";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart) || [];
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decode = jwtDecode(token);
        dispatch(getcartbyid(decode.id));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      router.push("/login");
    }
  }, [dispatch]);

  const handleRemove = (id) => () => {
    dispatch(deletecart(id));
  };

  const totalPrice = cart.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + (item.product.price || 0) * (item.quantity || 1);
  }, 0);

  return (
    <section className="container py-5">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {loading && (
        <div className="alert alert-info text-center">Loading...</div>
      )}
      {error && (
        <div className="alert alert-danger text-center">
          Error: {error.message}
        </div>
      )}

      {cart.length === 0 && !loading && (
        <div className="alert alert-warning text-center">
          Your cart is empty. Go to Shopping More Products{" "}
          <button
            onClick={() => router.push("/showproducts")}
            style={{
              border: "none",
              borderRadius: "0.8rem",
              color: "black",
              backgroundColor: "white",
            }}
          >
            Shop
          </button>
        </div>
      )}

      {cart.length > 0 && (
        <div className="card p-4 shadow-lg">
          {cart.map((item, index) => (
            <div
              key={item._id || index}
              className="d-flex align-items-center border-bottom pb-3 mb-3"
            >
              <img
                src={item.product?.image || "https://via.placeholder.com/100"}
                alt={item.product?.name || "Unknown Product"}
                className="rounded me-3"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <h5 className="mb-1">{item.product?.name || "No Name"}</h5>
                <p className="text-muted m-0">
                  ${item.product?.price || "N/A"} x {item.quantity || 1}
                </p>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={handleRemove(item._id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4 className="fw-bold">Total: ${totalPrice.toFixed(2)}</h4>
            <button className="btn btn-primary px-4 py-2">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default withAuth(Cart);
