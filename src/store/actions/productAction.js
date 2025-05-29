import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductService } from "../services/productService";


export const addProduct = createAsyncThunk(
  "product/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token') 
      const response = await addProductService(data , token);
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Ошибка добавлении товара";
      return rejectWithValue(errorMessage);
    }
  }
);
