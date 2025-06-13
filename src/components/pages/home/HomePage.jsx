import { useNavigate } from "react-router-dom";
import Header from "../../main/Header"; 
import { useSelector } from "react-redux";

function HomePage() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); 

    const handleViewProducts = () => {
        navigate("/products"); 
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex flex-col items-center justify-center mx-4 sm:mx-8 md:mx-20 mt-10">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                        Добро пожаловать в систему управления товарами
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-2xl">
                        Управляйте своими товарами на Kaspi: устанавливайте минимальные и максимальные цены, 
                        задавайте шаг изменения, активируйте или приостанавливайте товары с лёгкостью.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleViewProducts}
                            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg 
                            hover:bg-blue-600 transition-all duration-200 shadow-lg hover:scale-105 
                            hover:shadow-blue-600"
                        >
                            Перейти к списку товаров
                        </button>
                        {user?.role === "admin" && (
                            <button
                                onClick={() => navigate("/admin")}
                                className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg 
                                hover:bg-green-600 transition-all duration-200 shadow-lg hover:scale-105 
                                hover:shadow-green-600"
                            >
                                Панель администратора
                            </button>
                        )}
                    </div>
                </div>
                <div className="mt-10 w-full max-w-4xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        О приложении
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Наше приложение позволяет эффективно управлять товарами на платформе Kaspi. 
                        Вы можете:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Просматривать и редактировать информацию о товарах.</li>
                        <li>Устанавливать ценовые параметры для автоматического управления ценами.</li>
                        <li>Запускать или приостанавливать товары в один клик.</li>
                        <li>Удалять товары с подтверждением для безопасности.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HomePage;