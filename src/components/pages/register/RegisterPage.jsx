import { Link, useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { register } from "../../../store/actions/authAction";
import { useState } from "react";
import Header from "../../main/Header";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [is_load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    kaspi_email: "",
    kaspi_password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const resultAction = await dispatch(register(formData));
      console.log(resultAction);
      setLoad(false);

      if (register.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        setLoad(false);
        setError(resultAction.payload || resultAction.error);
      }
    } catch (error) {
      setLoad(false);
      console.error("Неожиданная ошибка:", error);
    }
  };

  return (
    <div>
      <Header />

      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleRegister}>
          <div className=" rounded-xl flex items-center justify-center p-6 px-16 flex-col gap-5 shadow-xl shadow-blue-200">
            <h1 className="text-center font-semibold text-[30px]">
              Регистрация
            </h1>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                className="border-2 p-2 rounded-xl outline-none"
                placeholder="Введите email с Kaspi"
                name="kaspi_email"
                id="kaspi_email"
                required
                onChange={handleChange}
              />

              <input
                type="password"
                name="kaspi_password"
                id="kaspi_password"
                required
                className="border-2 p-2 rounded-xl outline-none"
                placeholder="Введите пароль"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-300 rounded-xl p-2 px-6 font-semibold text-white hover:scale-105 transition-all duration-300"
            >
              Регистрация
            </button>
            <p className="text-center text-red-400 leading-3">{error}</p>
            <p>
              Уже есть аккаунт?{" "}
              <Link
                to={"/login"}
                className="text-blue-400 hover:underline cursor-pointer transition-all duration-100"
              >
                Войти
              </Link>
            </p>
            <RingLoader color="#35a6ff" size={40} loading={is_load} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
