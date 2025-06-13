import React, { useEffect, useState } from "react";
import Header from "../../main/Header";
import { useDispatch, useSelector } from "react-redux";
import { RingLoader } from "react-spinners";
import {
    getProductsWithPagination,
    updateProduct,
    deleteProduct,
    toggleProductStatus
} from "../../../store/actions/productAction";
import ProductCard from "./UI/cards/ProductCard";

function ProductsListPage() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(
        (state) => state.product
    );

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [status, setStatus] = useState("");
    const [article, setArticle] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [is_xl, setXL] = useState(false);

    const fetchProducts = async (
        currentPage = page,
        currentLimit = limit,
        currentStatus = status,
        currentArticle= article
    ) => {
        try {
            const resultAction = await dispatch(
                getProductsWithPagination({
                    page: currentPage,
                    limit: currentLimit,
                    is_active: currentStatus,
                    vender_code: currentArticle
                })
            );
            if (getProductsWithPagination.fulfilled.match(resultAction)) {
                setTotalPages(resultAction.payload.totalPages || 1);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleUpdateStatus = async (productId, isActive) => {
        try {
            const resultAction = await dispatch(toggleProductStatus({ id: productId, is_active: isActive }));
            if (toggleProductStatus.fulfilled.match(resultAction)) {
                fetchProducts(page, limit, status, article);
            }
        }
        catch (error) {
            console.error("Error toggling product status:", error);
        }
    }

    const handleUpdateProduct = async (productData) => {
        try {
            const resultAction = await dispatch(updateProduct(productData));
            if (updateProduct.fulfilled.match(resultAction)) {
                fetchProducts(page, limit, status, article);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const resultAction = await dispatch(deleteProduct(productId));
            if (deleteProduct.fulfilled.match(resultAction)) {
                fetchProducts(page, limit, status, article);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useEffect(() => {
        fetchProducts(page, limit, status, article);
    }, [page, limit, status, article, dispatch]);

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setStatus(value);
        setPage(1);
    };

    const handleArticleChange = (e) => {
        setArticle(e.target.value);
        setPage(1);
    };

    const handleApplyFilters = () => {
        fetchProducts(page, limit, status, article);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center mx-20 mb-10">
                <div className="absolute right-5 bg-white p-3 rounded-lg shadow-md hidden xl:block">
                    <h1 className="text-center font-semibold text-[30px]">
                        Фильтры
                    </h1>
                    <div className="mt-3">
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="mt-2 p-2 border rounded-lg"
                        >
                            <option value="all">Все товары</option>
                            <option value="active">Активные товары</option>
                            <option value="inactive">Неактивные товары</option>
                        </select>
                    </div>
                    <div className="mt-3">
                        <input
                            type="text"
                            placeholder="Поиск по артикулу"
                            value={article}
                            onChange={handleArticleChange}
                            className="p-2 border rounded-lg w-full"
                        />
                    </div>
                    <div className="mt-3">
                        <button
                            onClick={handleApplyFilters}
                            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            Применить фильтры
                        </button>
                    </div>
                </div>
                <div className="absolute right-5 bg-white rounded-lg shadow-md xl:hidden">
                    <div></div>
                    {is_xl ? (
                        <div className="p-3 rounded-lg relative">
                            <button className="absolute top-2 left-2" onClick={()=>setXL(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 15 15"
                                >
                                    <path
                                        fill="#000"
                                        d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
                                    />
                                </svg>
                            </button>
                            <h1 className="text-center font-semibold text-[30px]">
                                Фильтры
                            </h1>
                            <div className="mt-3">
                                <select
                                    value={status}
                                    onChange={handleStatusChange}
                                    className="mt-2 p-2 border rounded-lg"
                                >
                                    <option value="all">Все товары</option>
                                    <option value="active">
                                        Активные товары
                                    </option>
                                    <option value="inactive">
                                        Неактивные товары
                                    </option>
                                </select>
                            </div>
                            <div className="mt-3">
                                <input
                                    type="text"
                                    placeholder="Поиск по артикулу"
                                    value={article}
                                    onChange={handleArticleChange}
                                    className="p-2 border rounded-lg w-full"
                                />
                            </div>
                            <div className="mt-3">
                                <button
                                    onClick={handleApplyFilters}
                                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                >
                                    Применить фильтры
                                </button>
                            </div>
                        </div>
                    ) : (
                        <h2
                            className="cursor-pointer hover:bg-slate-100 transition-all duration-200 rounded-lg p-3 "
                            onClick={() => setXL(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="none"
                                    stroke="#000"
                                    // stroke-linejoin="round"
                                    // stroke-width="4"
                                    d="m6 9l14.4 16.818v12.626L27.6 42V25.818L42 9z"
                                />
                            </svg>
                        </h2>
                    )}
                </div>
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
                            <p className="text-red-500 text-center">
                               {error}
                            </p>
                        ) : products.length > 0 ? (
                            <>
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.product.id}
                                        product={product}
                                        onUpdate={handleUpdateProduct}
                                        onDelete={handleDeleteProduct}
                                        onUpdateStatus={handleUpdateStatus}
                                    />
                                ))}
                                <div className="flex justify-center mt-5 gap-3">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={page === 1}
                                        className={`p-2 rounded-lg ${
                                            page === 1
                                                ? "bg-gray-300"
                                                : "bg-blue-500 text-white hover:bg-blue-600"
                                        }`}
                                    >
                                        Предыдущая
                                    </button>
                                    <span className="self-center">
                                        Страница {page} из {totalPages}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={page === totalPages}
                                        className={`p-2 rounded-lg ${
                                            page === totalPages
                                                ? "bg-gray-300"
                                                : "bg-blue-500 text-white hover:bg-blue-600"
                                        }`}
                                    >
                                        Следующая
                                    </button>
                                </div>
                            </>
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
