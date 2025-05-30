import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import productReducer from './reducers/productReducer'
import authSlice from './reducers/authReducer'


const store = configureStore({
	reducer: {
		auth: authSlice,
		product: productReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),	
})

export default store
