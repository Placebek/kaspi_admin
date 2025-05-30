import { createSlice } from "@reduxjs/toolkit";
import {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
} from "../actions/productAction";

const initialState = {
    products: [],
    loading: false,
    error: null,
    success: false,
    message: "",
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProductState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = "";
        },
        resetProductError: (state) => {
            state.error = null;
        },
        resetProductSuccess: (state) => {
            state.success = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = "";
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
                state.success = true;
                state.message = "Товар успешно добавлен";
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = "";
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = "";
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.success = true;
                state.message = "Товары успешно получены";
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = "";
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = "";
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.success = true;
                state.message = "Товар успешно обновлен";
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = "";
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = "";
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    (product) => product.id !== action.payload.id
                );
                state.success = true;
                state.message = "Товар успешно удален";
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = "";
            })
            .addCase(toggleProductStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = "";
            })
            .addCase(toggleProductStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index].is_active = action.payload.is_active;
                }
                state.success = true;
                state.message = "Статус товара успешно обновлен";
            })
            .addCase(toggleProductStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = "";
            });
    },
});

export const { resetProductState, resetProductError, resetProductSuccess } =
    productSlice.actions;
export default productSlice.reducer;
