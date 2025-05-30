import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addProductService,
    getProductsService,
    updateProductService,
    deleteProductService,
    toggleProductStatusService
} from "../services/productService";

export const addProduct = createAsyncThunk(
    "product/add",
    async (data, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await addProductService(data, token);
            return response;
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail || "Ошибка добавлении товара";
            return rejectWithValue(errorMessage);
        }
    }
);

export const getProducts = createAsyncThunk(
    "product/get",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await getProductsService(token);
            return response;
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail || "Ошибка получения товаров";
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/update",
    async (data, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await updateProductService(data, token);
            return response;
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail || "Ошибка обновления товара";
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await deleteProductService(id, token);
            return response;
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail || "Ошибка удаления товара";
            return rejectWithValue(errorMessage);
        }
    }
);

export const toggleProductStatus = createAsyncThunk(
    "product/toggleStatus",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await toggleProductStatusService(id, token);
            return response;
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail || "Ошибка изменения статуса товара";
            return rejectWithValue(errorMessage);
        }
    }
);