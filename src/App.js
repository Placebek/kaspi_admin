import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/login/LoginPage";
import RegisterPage from "./components/pages/register/RegisterPage";
import HomePage from "./components/pages/home/HomePage";
import ProductAddPage from "./components/pages/products/ProductAddPage";
import ProductsListPage from "./components/pages/products/ProductsListPage";

function App() {
    return (
			<div>
                
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/products/add' element={<ProductAddPage />} />
					<Route path='/products' element={<ProductsListPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</div>
		)
}

export default App;
