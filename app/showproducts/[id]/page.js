"use client";
import React, { useEffect } from "react";
import { fetchproductbyid } from "@/reducers/productreducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    if (productId) {
      dispatch(fetchproductbyid(productId));
    }
  }, [dispatch, productId]);

  const productState = useSelector((state) => state.product.selectedProduct);

  if (!productState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-5">
      <h2>{productState?.name}</h2>
      <img
        src={productState?.image}
        alt={productState?.name}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
      />
      <p>{productState?.description}</p>
      <h4 className="text-primary">${productState?.price}</h4>
    </div>
  );
};

export default ProductPage;
