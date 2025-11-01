import { Navigate, Route, Routes } from 'react-router-dom'
import { RouterLayout } from './RouterLayout'
import RequireAuth from './auth/RequireAuth'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Home from '../pages/Home'
import OrderDetails from '../pages/OrderDetails'
import Profile from '../pages/Profile'
import SearchCriteria from '../pages/SearchCriteria'
import StoreDetail from '../pages/StoreDetail'
import OrderCheckout from '../pages/OrderCheckout'

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
                    <Route  path="/profile" element={<Profile/>}/>
                    <Route  path="/search-criteria" element={<SearchCriteria/>}/>
                    <Route path="/store-detail" element={<StoreDetail/>}/>
                    <Route path="/order-chekout" element={<OrderCheckout/>}/>
                    <Route path="/order-details" element={<OrderDetails/>}/>
                </Route>
                
                {/* fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}