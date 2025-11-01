import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import OrderDetails from '../pages/order-detail/OrderDetails'
import { RouterLayout } from './RouterLayout'
import StoreRatings from '../pages/store-ratings/StoreRatings'
import RateStore from '../pages/store-ratings/rateStore'
import Profile from '../pages/profile/Profile'
import SearchCriteria from '../pages/searchCriteria/SearchCriteria'
import IngredientCriteria from '../pages/ingredientCriteria/IngredientCriteria'

export const AppRouter = () => {
    return (
        <Routes>
            <Route  path="/" element={<RouterLayout/>}>
                {/* <Route  path="/tu-ruta" element={<TuPagina/>}/> */}
                <Route  path="/" element={<Home/>}/>
                <Route  path="/order-details" element={<OrderDetails/>}/>
                {/* <Route path="/order/:id" element={<Componente de Max />} /> */}
                <Route  path="/profile" element={<Profile/>}/>
                <Route  path="/search-criteria" element={<SearchCriteria/>}/>
                <Route  path="/store-ratings/" element={<StoreRatings/>}/>
                <Route  path="/rate-store/:id" element={<RateStore/>}/>
                <Route  path="/ingredient-criteria/:criteria" element={<IngredientCriteria/>}/>
            </Route>
        </Routes>
    )
}