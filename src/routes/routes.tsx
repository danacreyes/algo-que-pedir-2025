import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/auth/Login'
import OrderDetails from '../pages/OrderDetails'
import { RouterLayout } from './RouterLayout'
import Profile from '../pages/Profile'
import SearchCriteria from '../pages/SearchCriteria'
import Register from '../pages/auth/Register'
import StoreDetail from '../pages/StoreDetail'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<RouterLayout/>}>
                {/* <Route  path="/tu-ruta" element={<TuPagina/>}/> */}
                <Route  path="/login" element={<Login />}/>
                <Route  path="/register" element={<Register />}/>
                <Route  path="/" element={<Home/>}/>
                <Route  path="/order-details" element={<OrderDetails/>}/>
                <Route  path="/profile" element={<Profile/>}/>
                <Route  path="/search-criteria" element={<SearchCriteria/>}/>
                <Route path="/store-detail" element={<StoreDetail/>}/>
                <Route path="/order-details" element={<OrderDetails/>}/>
            </Route>
        </Routes>
    )
}