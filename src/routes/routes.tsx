import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import OrderDetails from '../pages/OrderDetails'
import { RouterLayout } from './RouterLayout'
import Profile from '../pages/Profile'
import SearchCriteria from '../pages/SearchCriteria'
import StoreRatings from '../pages/StoreRatings'

export const AppRouter = () => {
    return (
        <Routes>
            <Route  path="/" element={<RouterLayout/>}>
                {/* <Route  path="/tu-ruta" element={<TuPagina/>}/> */}
                <Route  path="/" element={<Home/>}/>
                <Route  path="/order-details" element={<OrderDetails/>}/>
                <Route  path="/profile" element={<Profile/>}/>
                <Route  path="/search-criteria" element={<SearchCriteria/>}/>
                <Route  path="/store-ratings" element={<StoreRatings/>}/>
            </Route>
        </Routes>
    )
}