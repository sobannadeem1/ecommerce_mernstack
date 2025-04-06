"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/reducers/userreducer";
import { fetchproductbyid, fetchproducts } from "@/reducers/productreducer";
import { addtocart } from "@/reducers/cartreducer";
import { useRouter } from "next/navigation";
import withAuth from "../components/withAuth";

const ShowProducts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const productState = useSelector((state) => state.product.products);
  const { products, loading, error } = productState;

  useEffect(() => {
    let isMounted = true;

    dispatch(fetchproducts());
    dispatch(getUser()).then((data) => {
      if (isMounted && data.payload?.user) {
        setUser(data.payload.user);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const addToCartHandler = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add products to the cart.");
      return;
    }

    if (!user || !user._id) {
      alert("User data is missing, please refresh the page.");
      return;
    }

    const cartItem = {
      user: user._id,
      product: product._id,
      quantity: 1,
    };

    dispatch(addtocart(cartItem));
  };

  const productids = (id) => {
    dispatch(fetchproductbyid(id));
    router.push(`/showproducts/${id}`);
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">Featured Products</h2>
        {loading && <p className="text-center text-secondary">Loading...</p>}
        {error && <p className="text-center text-danger">Error: {error}</p>}

        {products?.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map((product) => (
              <div key={product._id} className="col">
                <div className="card shadow-sm border-0 h-100">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">
                      {product.description}
                    </p>
                    <h6 className="fw-bold text-primary">${product.price}</h6>
                  </div>
                  <div className="card-footer bg-white">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => productids(product._id)}
                    >
                      Buy Now
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => addToCartHandler(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted mt-3">No products found</p>
        )}
      </div>
    </section>
  );
};

export default ShowProducts;
