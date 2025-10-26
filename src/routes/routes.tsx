import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import OrderDetails from '../pages/OrderDetails'
import { RouterLayout } from '../components/RouterLayout'
import StoreDetail from '../pages/StoreDetail'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<RouterLayout/>}>
                {/* <Route  path="/tu-ruta" element={<TuPagina/>}/> */}
                <Route path="/" element={<Home/>}/>
                <Route path="/store-detail" element={<StoreDetail/>}/>
                <Route path="/order-details" element={<OrderDetails/>}/>
            </Route>
        </Routes>
    )
}