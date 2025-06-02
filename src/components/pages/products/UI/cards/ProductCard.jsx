import React, { useState } from "react";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import ConfirmPauseModal from "../modals/ConfirmPauseModal";
import ConfirmStartModal from "../modals/ConfirmStartModal";

function ProductCard({ product, onDelete, onUpdate }) {
    const hasComparisons = product.product.product_comparisons && product.product.product_comparisons.length > 0;
    const [minPrice, setMinPrice] = useState(
        hasComparisons ? product.product.product_comparisons[0].min_price : ""
    );
    const [maxPrice, setMaxPrice] = useState(
        hasComparisons ? product.product.product_comparisons[0].max_price : ""
    );
    const [step, setStep] = useState(
        hasComparisons ? product.product.product_comparisons[0].step : ""
    );
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
    const [isOpenStartModal, setOpenStartModal] = useState(false);
    const [isOpenPauseModal, setOpenPauseModal] = useState(false);

    const handleSave = () => {
        console.log("Сохранено:", { minPrice, maxPrice, step });
        onUpdate({
            ...product,
            product_comparisons: [
                {
                    ...product.product.product_comparisons?.[0],
                    min_price: minPrice,
                    max_price: maxPrice,
                    step: step,
                },
            ],
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setMinPrice(hasComparisons ? product.product_comparisons[0].min_price : "");
        setMaxPrice(hasComparisons ? product.product_comparisons[0].max_price : "");
        setStep(hasComparisons ? product.product_comparisons[0].step : "");
        setIsEditing(false);
    };

    const toggleOpenDeleteWindow = (boolean) => {
        setOpenDeleteModal(boolean);
    };

    const toggleStartDemping = () => {
        setOpenStartModal(true);
    };

    const togglePauseDemping = () => {
        setOpenPauseModal(true);
    };

    const handleStart = () => {
        onUpdate({
            ...product,
            is_active: true,
        });
        setOpenStartModal(false);
    };

    const handlePause = () => {
        onUpdate({
            ...product,
            is_active: false,
        });
        setOpenPauseModal(false);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
                <div
                    className={`border-4 rounded-xl w-full h-min-[200px] h-max-[200px] p-2 ${
                        product.product.is_active ? "border-green-300" : "border-red-300"
                    }`}
                >
                    <div className="flex flex-row gap-3 justify-between">
                        <img
                            src={product.product.image}
                            alt={product.product.product_name}
                            className=" object-cover rounded-lg"
                        />
                        <div className="flex flex-col ">
                            <h2 className="text-[20px] font-semibold">
                                {product.product.name_product}
                            </h2>

                            <p className="text-[18px] font-bold mt-2">
                                Текущая цена: {product.product.price} ₸
                            </p>

                            <p className="text-[16px] text-gray-500">
                                Количество: {product.product.pieces_product} шт.
                            </p>
                            <p className="text-[16px] text-gray-500">
                                Артикул: {product.product.vender_code}
                            </p>
                            <a
                                href={product.product.market_link}
                                className="text-[16px] text-gray-500 hover:underline hover:text-blue-500"
                            >
                                Ссылка на каспи
                            </a>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-3">
                                <div className="flex flex-col gap-3">
                                    <label>Мин. цена</label>
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => {
                                            setMinPrice(e.target.value);
                                            setIsEditing(true);
                                        }}
                                        className="p-2 border rounded-lg max-w-[100px]"
                                        disabled={!hasComparisons}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label>Макс. цена</label>
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => {
                                            setMaxPrice(e.target.value);
                                            setIsEditing(true);
                                        }}
                                        className="p-2 border rounded-lg max-w-[100px]"
                                        disabled={!hasComparisons}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label>Шаг</label>
                                    <input
                                        type="number"
                                        value={step}
                                        onChange={(e) => {
                                            setStep(e.target.value);
                                            setIsEditing(true);
                                        }}
                                        className="p-2 border rounded-lg max-w-[100px]"
                                        disabled={!hasComparisons}
                                    />
                                </div>
                            </div>
                            {isEditing && (
                                <div className="flex gap-3 mt-3">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                    >
                                        Отмена
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between py-5">
                    <div>
                        <button
                            onClick={product.product.is_active ? togglePauseDemping : toggleStartDemping}
                            className={`rounded-lg w-full text-white font-semibold py-2 px-4 transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-2xl hover:shadow-green-600 ${
                                product.product.is_active ? "bg-yellow-400" : "bg-green-400"
                            }`}
                        >
                            {product.product.is_active ? "Приостановить" : "Запустить"}
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => toggleOpenDeleteWindow(true)}
                            className="rounded-lg w-full text-white font-semibold py-2 px-4 transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-2xl hover:shadow-red-600 bg-red-400"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
                {isOpenDeleteModal && (
                    <ConfirmDeleteModal
                        open={isOpenDeleteModal}
                        setOpen={setOpenDeleteModal}
                        onDelete={() => onDelete(product.product.id)}
                    />
                )}
                {isOpenStartModal && (
                    <ConfirmStartModal
                        open={isOpenStartModal}
                        setOpen={setOpenStartModal}
                        id={product.product.id}
                    />
                )}
                {isOpenPauseModal && (
                    <ConfirmPauseModal
                        open={isOpenPauseModal}
                        setOpen={setOpenPauseModal}
                        onConfirm={handlePause}
                    />
                )}
            </div>
            <hr />
        </div>
    );
}

export default ProductCard;