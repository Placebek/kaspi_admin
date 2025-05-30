import React, { useState } from "react";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

function ProductCard({ props, onDelete, onUpdate }) {
    const [minPrice, setMinPrice] = useState(
        props.product.product_comparisons[0].min_price
    );
    const [maxPrice, setMaxPrice] = useState(
        props.product.product_comparisons[0].max_price
    );
    const [step, setStep] = useState(props.product.product_comparisons[0].step);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenDeleteModal, setOpenDeleteModal] = useState(false)

    const handleSave = () => {
        console.log("Сохранено:", { minPrice, maxPrice, step });
        onUpdate()
        setIsEditing(false);
    };

    const toggleOpenDeleteWindow = (boolean) => {
        setOpenDeleteModal(boolean)
    }

    const handleCancel = () => {
        setMinPrice(props.product.product_comparisons[0].min_price);
        setMaxPrice(props.product.product_comparisons[0].max_price);
        setStep(props.product.product_comparisons[0].step);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
                <div
                    className={`border-4 rounded-xl w-full h-min-[200px] h-max-[200px] p-2 ${
                        props.product.is_active
                            ? "border-green-300"
                            : "border-red-300"
                    }`}
                >
                    <div className="flex flex-row gap-3 justify-between">
                        <img
                            src={props.product.image}
                            alt={props.product.product_name}
                            className=" object-cover rounded-lg"
                        />
                        <div className="flex flex-col ">
                            <h2 className="text-[20px] font-semibold">
                                {props.product.name_product}
                            </h2>

                            <p className="text-[18px] font-bold mt-2">
                                Текущая цена: {props.product.price} ₸
                            </p>

                            <p className="text-[16px] text-gray-500">
                                Количество: {props.product.pieces_product} шт.
                            </p>
                            <p className="text-[16px] text-gray-500">
                                Артикул: {props.product.vender_code}
                            </p>
                            <a
                                href={props.product.market_link}
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
                                    />
                                </div>
                            </div>
                            <div>
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
                </div>
                <div className="flex flex-col justify-between py-5">
                    <div>
                        <button className={`rounded-lg w-full text-white font-semibold py-2 px-4 transition-all duration-200 shadow-lg hover:scale-105  hover:shadow-2xl hover:shadow-green-600 ${props.product.is_active? 'bg-yellow-400': 'bg-green-400'}`}>
                            {props.product.is_active? 'Приостановить': 'Запустить'}

                        </button>
                        
                    </div>
                    <div>
                        <button onClick={() => toggleOpenDeleteWindow(true)} className="rounded-lg w-full text-white font-semibold py-2 px-4 transition-all duration-200 shadow-lg hover:scale-105  hover:shadow-2xl hover:shadow-red-600 bg-red-400 ">
                            Удалить
                        </button>
                    </div>
                </div>
                {isOpenDeleteModal? (<p><ConfirmDeleteModal open={isOpenDeleteModal} setOpen={setOpenDeleteModal} /></p>): ''}
            </div>
            <hr />
        </div>
    );
}

export default ProductCard;
