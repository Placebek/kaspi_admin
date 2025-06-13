import { AnimatePresence, motion } from "motion/react";
import { div } from "motion/react-client";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ open }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    const removeToken = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    return (
        <div className="ml-3 absolute">
            <AnimatePresence>
                {open ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="w-[200px] h-[88vh] bg-[#0c89f7] rounded-xl p-3 flex flex-col gap-5 text-white font-semibold"
                        key="box"
                    >
                        <Link
                            to={"/"}
                            className="hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-black"
                        >
                            Главная
                        </Link>
                        <Link
                            to={"/products/add"}
                            className="hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-black"
                        >
                            Добавление товара
                        </Link>
                        <Link
                            to={"/products"}
                            className="hover:bg-green-400 transition-all duration-300 p-2 rounded-lg"
                        >
                            Список товаров
                        </Link>
                        {!token ? (
                            <Link
                                to={"login"}
                                className="hover:bg-green-400 cursor-pointer transition-all duration-300 p-2 rounded-lg"
                            >
                                Войти
                            </Link>
                        ) : (
                            <div
                                onClick={() => removeToken()}
                                className="hover:bg-red-400 cursor-pointer transition-all duration-300 p-2 rounded-lg"
                            >
                                Выйти
                            </div>
                        )}
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

export default Sidebar;
