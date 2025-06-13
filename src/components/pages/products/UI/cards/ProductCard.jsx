import React, { useState } from "react";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import ConfirmPauseModal from "../modals/ConfirmPauseModal";
import ConfirmStartModal from "../modals/ConfirmStartModal";

function ProductCard({ product, onDelete, onUpdate, onUpdateStatus }) {
    const hasComparisons =
        product.product.product_comparisons &&
        product.product.product_comparisons.length > 0;
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
        const data = {
            id: product.product.id,
            min_price: parseInt(minPrice),
            max_price: parseInt(maxPrice),
            step: parseInt(step),
        };
        onUpdate(data);

        setIsEditing(false);
    };

    const handleCancel = () => {
        setMinPrice(
            hasComparisons ? product.product.product_comparisons[0].min_price : ""
        );
        setMaxPrice(
            hasComparisons ? product.product.product_comparisons[0].max_price : ""
        );
        setStep(hasComparisons ? product.product.product_comparisons[0].step : "");
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

    // const handleStart = () => {
    //     onUpdate({
    //         ...product,
    //         is_active: true,
    //     });
    //     setOpenStartModal(false);
    // };

    // const handlePause = () => {
    //     onUpdate({
    //         ...product,
    //         is_active: false,
    //     });
    //     setOpenPauseModal(false);
    // };

    return (
        <div className="flex flex-col gap-3 ">
            <div className="flex lg:flex-row flex-col lg:gap-3 gap-1 sm:w-[60vw] w-[80vw] justify-between ">
                <div
                    className={`border-2 rounded-xl h-min-[100px] h-max-[200px] p-1 ${
                        product.product.is_active
                            ? "border-green-300"
                            : "border-red-300"
                    }`}
                >
                    <div className="flex lg:flex-row flex-col gap-3 lg:justify-between justify-center">
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col  ">
                                <h2 className="text-[15px] font-semibold">
                                    {product.product.name_product}
                                </h2>
                                <p className="text-[12px] font-bold hidden sm:block">
                                    Текущая цена: {product.product.price} ₸
                                </p>
                                <h3 className={`text-[12px] ${product.product.price === product.product.price_first_market ? 'text-green-300 font-semibold' : 'text-red-500  font-semibold animate-pulse'}`}>Цена первого магазина: {product.product.price_first_market} ₸</h3>
                                <p className="text-[12px] text-gray-500">
                                    Артикул: {product.product.vender_code}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <div className="sm:flex sm:flex-row grid grid-cols-3 sm:gap-3 gap-1">
                                    <div className="flex flex-col sm:gap-1 text-[12px]">
                                        <label>Мин. цена</label>
                                        <input
                                            type="number"
                                            value={minPrice}
                                            onChange={(e) => {
                                                setMinPrice(e.target.value);
                                                setIsEditing(true);
                                            }}
                                            className="p-1 border rounded-lg max-w-[100px]"
                                            disabled={!hasComparisons}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:gap-1 text-[12px]">
                                        <label>Макс. цена</label>
                                        <input
                                            type="number"
                                            value={maxPrice}
                                            onChange={(e) => {
                                                setMaxPrice(e.target.value);
                                                setIsEditing(true);
                                            }}
                                            className="p-1 border rounded-lg max-w-[100px]"
                                            disabled={!hasComparisons}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:gap-1 text-[12px]">
                                        <label>Шаг</label>
                                        <input
                                            type="number"
                                            value={step}
                                            onChange={(e) => {
                                                setStep(e.target.value);
                                                setIsEditing(true);
                                            }}
                                            className="p-1 border rounded-lg max-w-[100px]"
                                            disabled={!hasComparisons}
                                        />
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="flex gap-3 mt-3">
                                        <button
                                            onClick={handleSave}
                                            className="bg-green-500 text-white text-[12px] px-4 py-1 rounded-lg hover:bg-green-600"
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="bg-gray-500 text-white text-[12px] px-4 py-1 rounded-lg hover:bg-gray-600"
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex lg:flex-col flex-row text-[12px] justify-center gap-3 p-2 px-32 lg:px-2">
                    <div>
                        <button
                            onClick={
                                product.product.is_active
                                    ? togglePauseDemping
                                    : toggleStartDemping
                            }
                            className={`rounded-lg w-full text-white font-semibold py-2 px-4 transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-2xl hover:shadow-green-600 ${
                                product.product.is_active
                                    ? "bg-yellow-400"
                                    : "bg-green-400"
                            }`}
                        >
                            {product.product.is_active
                                ? "Приостановить"
                                : "Запустить"}
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
                        onUpdate={() => onUpdateStatus(product.product.id, true)}
                    />
                )}
                {isOpenPauseModal && (
                    <ConfirmPauseModal
                        open={isOpenPauseModal}
                        setOpen={setOpenPauseModal}
                        onUpdate={()=> onUpdateStatus(product.product.id, false)}
                    />
                )}
            </div>
            <hr />
        </div>
    );
}

export default ProductCard;
