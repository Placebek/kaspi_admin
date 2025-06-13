import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addProductService,
    getProductsService,
    updateProductService,
    deleteProductService,
    toggleProductStatusService,
    getProductsWithPaginationService,
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
            const new_data = {
                min_price: data.min_price,
                max_price: data.max_price,
                step: data.step,
            };
            console.log(new_data);
            
            const response = await updateProductService(data.id, new_data, token);
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
    async (data, { rejectWithValue }) => {
        try {
            let new_data = {
                is_active: data.is_active
            }
            let token = localStorage.getItem("access_token");
            const response = await toggleProductStatusService(data.id, new_data , token = token);
            console.log(response);
            return response;
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail ||
                "Ошибка изменения статуса товара";
            return rejectWithValue(errorMessage);
        }
    }
);

export const getProductsWithPagination = createAsyncThunk(
    "product/getWithPagination",
    async ({ page = 0, limit = 20, is_active = null, vender_code=null }, { rejectWithValue }) => {
        try {
            if (is_active === "all") {
                is_active = null;
            } else if (is_active === "active") {
                is_active = true;
            } else if (is_active === "inactive") {
                is_active = false;
            }

            const token = localStorage.getItem("access_token");
            const response = await getProductsWithPaginationService(
                page,
                limit,
                is_active,
                vender_code,
                token
            );
            return response;
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail ||
                "Ошибка получения товаров с пагинацией";
            return rejectWithValue(errorMessage);
        }
    }
);

