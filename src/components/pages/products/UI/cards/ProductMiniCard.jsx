import React from "react";

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {toggleProductStatus} from '../../../../../store/actions/productAction'
import { useDispatch } from "react-redux";


export default function ProductMiniCard({ product, open, setOpen }) {
    const dispatch = useDispatch();

    const handleStartDemping = () => {
        dispatch(toggleProductStatus(product.product.id));
        setOpen(false);
    }


    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    <ExclamationTriangleIcon
                                        aria-hidden="true"
                                        className="size-6 text-red-600"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold text-gray-900"
                                    >
                                        Подтверждение товара
                                    </DialogTitle>
                                    <div className="mt-2">
                                            <div className="flex flex-row gap-1 p-2 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                                                <div>
                                                    <img
                                                        src={
                                                            product.product.image ||
                                                            "https://via.placeholder.com/150"
                                                        }
                                                        alt={
                                                            product.product.name_product ||
                                                            "Товар"
                                                        }
                                                        className="w-full object-cover rounded-lg mb-4"
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-semibold">
                                                        {product.product.name_product ||
                                                            "Без названия"}
                                                    </h2>
                                                    <p className="text-gray-600 leading-5">
                                                        Арт.:{" "}
                                                        {product.product.vender_code ||
                                                            "N/A"}
                                                    </p>
                                                    <p className="text-gray-600 leading-5">
                                                        Текущая цена:{" "}
                                                        {product.product.price || 0} тг.
                                                    </p>
                                                    <p className="text-gray-600 leading-5">
                                                        Кол. товара:{" "}
                                                        {product.product.pieces_product ||
                                                            0}{" "}
                                                        шт.
                                                    </p>
                                                </div>
                                            </div>
                                        <p className="text-gray-600 leading-5">
                                            Убедитесь, что вы хотите подтвердить
                                            этот товар. И выберите начать
                                            демпинг или отложить его.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Отложить
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => handleStartDemping()}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-green-400 sm:mt-0 sm:w-auto"
                            >
                                Начать
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
