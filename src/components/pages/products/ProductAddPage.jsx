import { useState } from "react";
import Header from "../../main/Header";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../store/actions/productAction";
import { toast } from "react-toastify";
import ProductMiniCard from "./UI/cards/ProductMiniCard";

function ProductAddPage() {
    const dispatch = useDispatch();
    const { products, loading, error, success, message } = useSelector(
        (state) => state.product
    );
    const [formData, setFormData] = useState({
        vender_code: "",
        min_price: "",
        max_price: "",
        step: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setOpen] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.vender_code) {
            toast.error("Пожалуйста, введите артикул");
            return false;
        }
        const minPrice = parseInt(formData.min_price) || 0;
        const maxPrice = parseInt(formData.max_price) || 0;
        const step = parseInt(formData.step) || 0;

        if (minPrice >= maxPrice) {
            toast.error("Минимальная цена должна быть меньше максимальной");
            return false;
        }
        if (step <= 0) {
            toast.error("Шаг цены должен быть больше 0");
            return false;
        }

        return true;
    };

    const to_check_product = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const productData = {
                vender_code: formData.vender_code,
                min_price: parseInt(formData.min_price) || 0,
                max_price: parseInt(formData.max_price) || 0,
                step: parseInt(formData.step) || 0,
            };

            const resultAction = await dispatch(addProduct(productData));
            if (addProduct.fulfilled.match(resultAction)) {
                toast.success("Товар успешно добавлен для демпинга");
                setFormData({
                    vender_code: "",
                    min_price: "",
                    max_price: "",
                    step: "",
                });
            } else {
                toast.error(
                    "Ошибка при добавлении товара: " +
                        (resultAction.error?.message || "Неизвестная ошибка")
                );
            }
        } catch (error) {
            toast.error("Ошибка при добавлении товара: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center font-mono text-2xl items-center my-10 flex-col gap-3">
                <h1>Добавление товара для демпинга</h1>
                <div className="flex flex-col gap-3 mt-5 text-xl w-96">
                    <label htmlFor="vender_code" className="text-xl">
                        Введите артикул из каспи кабинета
                    </label>
                    <input
                        type="text"
                        name="vender_code"
                        id="vender_code"
                        value={formData.vender_code}
                        onChange={handleInputChange}
                        className="border-2 p-2 rounded-2xl placeholder:font-italic"
                        placeholder="0000"
                        aria-label="Артикул товара"
                    />
                    <label htmlFor="min_price" className="text-xl">
                        Введите <span className="font-bold">минимальный</span>{" "}
                        порог цен (тг.)
                    </label>
                    <input
                        type="number"
                        min={0}
                        name="min_price"
                        id="min_price"
                        value={formData.min_price}
                        onChange={handleInputChange}
                        className="border-2 p-2 rounded-2xl"
                        placeholder="0"
                        aria-label="Минимальная цена"
                    />
                    <label htmlFor="max_price" className="text-xl">
                        Введите <span className="font-bold">максимальный</span>{" "}
                        порог цен (тг.)
                    </label>
                    <input
                        type="number"
                        min={0}
                        name="max_price"
                        id="max_price"
                        value={formData.max_price}
                        onChange={handleInputChange}
                        className="border-2 p-2 rounded-2xl"
                        placeholder="0"
                        aria-label="Максимальная цена"
                    />
                    <label htmlFor="step" className="text-xl">
                        Введите шаг (тг.)
                    </label>
                    <input
                        type="number"
                        min={0}
                        name="step"
                        id="step"
                        value={formData.step}
                        onChange={handleInputChange}
                        className="border-2 p-2 rounded-2xl"
                        placeholder="0"
                        aria-label="Шаг цены"
                    />
                    <div>
                        {success && products && products.length > 0 && (
                            <div>
                                <ProductMiniCard
                                    product={products[0]}
                                    open={isOpen}
                                    setOpen={setOpen}
                                />
                            </div>
                        )}
                        {error && (
                            <p className="text-red-500">
                                {message ||
                                    "Произошла неизвестная ошибка при добавлении товара."}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={to_check_product}
                        disabled={isLoading}
                        className={`p-2 px-4 rounded-xl bg-blue-300 flex flex-row gap-2 justify-center items-center text-white hover:text-gray-200 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        aria-label={
                            isLoading ? "Проверка товара" : "Проверить товар"
                        }
                    >
                        <span>{isLoading ? "Проверка..." : "Проверить"}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <g
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                            >
                                <path
                                    d="m4 12.9l3.143 3.6L15 7.5"
                                    opacity="0.5"
                                />
                                <path d="m20 7.563l-8.571 9L11 16" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductAddPage;
