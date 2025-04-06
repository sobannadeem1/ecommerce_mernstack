"use client";
import React, { useState, useEffect } from "react";
import {
  addproduct,
  deleteProduct,
  updateProduct,
  fetchproducts,
} from "@/reducers/productreducer";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "@/reducers/categoryreducer";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [editProductId, setEditProductId] = useState(null);
  const [editDetails, setEditDetails] = useState({});

  const [details, setDetails] = useState({
    name: "",
    quantity: 0,
    price: 0,
    description: "",
    category: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const products = useSelector((state) => state.product?.products || []);

  useEffect(() => {
    dispatch(fetchproducts());
    dispatch(fetchCategories()).then((data) => setCategories(data.payload));
  }, [dispatch]);

  const changeEvent = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleFileChange = (e) => {
    setDetails({ ...details, image: e.target.files[0] });
  };

  const handleAddProduct = async () => {
    if (
      !details.name.trim() ||
      !details.quantity ||
      !details.price ||
      !details.description.trim() ||
      !details.category.trim() ||
      !details.image
    ) {
      return alert("All fields are required!");
    }

    try {
      const formData = new FormData();
      Object.entries(details).forEach(([key, value]) =>
        formData.append(key, value)
      );
      await dispatch(addproduct(formData)).unwrap();
      setDetails({
        name: "",
        quantity: 0,
        price: 0,
        description: "",
        category: "",
        image: null,
      });
      document.getElementById("fileInput").value = "";
      dispatch(fetchproducts());
    } catch (error) {
      console.error(`Failed to add product: ${error.message}`);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(fetchproducts());
    } catch (error) {
      console.error(`Failed to delete product: ${error.message}`);
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setEditDetails({ ...product });
  };

  const handleUpdateProduct = async () => {
    try {
      await dispatch(
        updateProduct({ id: editProductId, updatedData: editDetails })
      ).unwrap();
      setEditProductId(null);
      dispatch(fetchproducts());
    } catch (error) {
      console.error(`Failed to update product: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Manage Products</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter product name"
          name="name"
          onChange={changeEvent}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enter product quantity"
          name="quantity"
          onChange={changeEvent}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enter product price"
          name="price"
          onChange={changeEvent}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Enter product description"
          name="description"
          onChange={changeEvent}
        ></textarea>
      </div>
      <div className="mb-3">
        <select className="form-select" name="category" onChange={changeEvent}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={handleAddProduct}>
        Add Product
      </button>

      <ul className="list-group mt-4">
        {products.products?.length > 0 ? (
          products.products.map((product) => (
            <li
              key={product._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editProductId === product._id ? (
                <div className="w-100">
                  <input
                    type="text"
                    className="form-control mb-1"
                    value={editDetails.name}
                    onChange={(e) =>
                      setEditDetails({ ...editDetails, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="form-control mb-1"
                    value={editDetails.price}
                    onChange={(e) =>
                      setEditDetails({ ...editDetails, price: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="form-control mb-1"
                    value={editDetails.quantity}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        quantity: e.target.value,
                      })
                    }
                  />
                  <textarea
                    className="form-control mb-1"
                    value={editDetails.description}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                  <div className="d-flex">
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={handleUpdateProduct}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditProductId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span>
                    {product.name} - ${product.price} -{" "}
                    {product.category
                      ? product.category.name
                      : "Unknown Category"}
                  </span>
                  <div>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditClick(product)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="text-center mt-3">No products found</p>
        )}
      </ul>
    </div>
  );
};

export default ProductPage;
