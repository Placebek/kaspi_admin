import React, { useEffect } from "react";
import Header from "../../main/Header";
import { useDispatch, useSelector } from "react-redux";
import { RingLoader } from "react-spinners";
import {
    getProducts,
    updateProduct,
    deleteProduct,
} from "../../../store/actions/productAction";
import ProductCard from "./UI/cards/ProductCard";

function ProductsListPage() {
    const dispatch = useDispatch();
    const { products, loading, error, success, message } = useSelector(
        (state) => state.product
    );

    const fetchProducts = async () => {
        try {
            const resultAction = await dispatch(getProducts());
            if (getProducts.fulfilled.match(resultAction)) {
                console.log(
                    "Products fetched successfully:",
                    resultAction.payload
                );
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleUpdateProduct = async (productData) => {
        try {
            const resultAction = await dispatch(updateProduct(productData));
            if (updateProduct.fulfilled.match(resultAction)) {
                console.log(
                    "Product updated successfully:",
                    resultAction.payload
                );
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const resultAction = await dispatch(deleteProduct(productId));
            if (deleteProduct.fulfilled.match(resultAction)) {
                console.log(
                    "Product deleted successfully:",
                    resultAction.payload
                );
                fetchProducts()
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const handleProductUpdate = (productData) => {
            handleUpdateProduct(productData);
        };
        const handleProductDelete = (productId) => {
            handleDeleteProduct(productId);
        };
    }, [dispatch]);

    return (
        <div>
            <Header />
            <div className="flex justify-center mx-20">
                <div>
                    <h1 className="text-center font-semibold text-[30px]">
                        Список товаров
                    </h1>
                    <div className="flex flex-col gap-5 mt-5 justify-center">
                        {loading ? (
                            <p className="flex justify-center">
                                <RingLoader
                                    color="#35a6ff"
                                    size={40}
                                    loading={true}
                                />
                            </p>
                        ) : error ? (
                            <p className="text-red-500 text-center">{error}</p>
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onUpdate={handleUpdateProduct}
                                    onDelete={handleDeleteProduct}
                                />
                            ))
                        ) : (
                            <p className="text-center">Нет доступных товаров</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsListPage;
