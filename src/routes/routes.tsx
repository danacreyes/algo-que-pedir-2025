import { Navigate, Route, Routes } from 'react-router-dom'
import { RouterLayout } from './RouterLayout'
import RequireAuth from './auth/RequireAuth'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Home from '../pages/Home'
import OrderDetails from '../pages/order-detail/OrderDetails'
import StoreRatings from '../pages/store-ratings/StoreRatings'
import RateStore from '../pages/store-ratings/rateStore'
import Profile from '../pages/Profile/Profile'
import SearchCriteria from '../pages/SearchCriteria/SearchCriteria'
import IngredientCriteria from '../pages/ingredientCriteria/IngredientCriteria'
import StoreDetail from '../pages/storeDetail/StoreDetail'
import OrderCheckout from '../pages/orderCheckout/OrderCheckout'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<RouterLayout/>}>
                {/* públicas */}
                <Route  path="/login" element={<Login />}/>
                <Route  path="/register" element={<Register />}/>
                
                {/* protegidas */}
                <Route element={<RequireAuth/>}>
                    <Route index element={<Home/>}/>
                    <Route  path="/order-details" element={<OrderDetails/>}/>
                    {/* <Route path="/order/:id" element={<Componente de Max />} /> */}
                <Route  path="/profile" element={<Profile/>}/>
                    <Route  path="/search-criteria" element={<SearchCriteria/>}/>
                    <Route path="/store-detail" element={<StoreDetail/>}/>
                    <Route path="/order-chekout" element={<OrderCheckout/>}/>
                    <Route path="/order-details" element={<OrderDetails/>}/>
                    <Route  path="/store-ratings/" element={<StoreRatings/>}/>
                    <Route  path="/rate-store/:id" element={<RateStore/>}/>
                    <Route  path="/ingredient-criteria/:criteria" element={<IngredientCriteria/>}/>
                </Route>
                
                {/* fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}