import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import OrderDetails from '../pages/OrderDetails'
import { RouterLayout } from './RouterLayout'

export const AppRouter = () => {
    return (
        <Routes>
            <Route  path="/" element={<RouterLayout/>}>
                {/* <Route  path="/tu-ruta" element={<TuPagina/>}/> */}
                <Route  path="/" element={<Home/>}/>
                <Route  path="/order-details" element={<OrderDetails/>}/>
            </Route>
        </Routes>
    )
}