"use client";
import React, { useEffect, useState } from "react";
import {
  addCategory,
  fetchCategories,
  deleteCategory,
  updateCategory,
} from "@/reducers/categoryreducer";
import { useDispatch, useSelector } from "react-redux";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log("Categories updated:", categories);
  }, [categories]);

  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const addcategory = async () => {
    if (!categoryName.trim()) return alert("Category name is required!");

    try {
      await dispatch(addCategory({ name: categoryName })).unwrap();
      setCategoryName("");
    } catch (error) {
      console.log(`Failed to add category: ${error.message}`);
    }
  };

  const deletecategory = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
    } catch (error) {
      console.log(`Failed to delete category: ${error.message}`);
    }
  };

  const updatecategory = async () => {
    if (!editName.trim()) return alert("Category name is required!");

    try {
      await dispatch(
        updateCategory({ id: editId, updatedData: { name: editName } })
      ).unwrap();
      setEditId(null);
      setEditName("");
    } catch (error) {
      console.log(`Failed to update category: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Manage Categories</h2>

      <input
        type="text"
        placeholder="Enter category name"
        value={categoryName}
        name="name"
        id="name"
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button onClick={addcategory}>Add Category</button>

      <ul>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id}>
              {editId === category._id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button onClick={updatecategory}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{category.name}</span>
                  <button
                    onClick={() => {
                      setEditId(category._id);
                      setEditName(category.name);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deletecategory(category._id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryPage;
