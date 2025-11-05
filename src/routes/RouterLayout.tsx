import SimpleBottomNavigation from '../components/BottomNavigator/BottomNavigator'
import { Outlet, useLocation } from 'react-router-dom'

export const RouterLayout = () => {
    const location = useLocation()

    return(
        <div className='app-wrapper'>
            <Outlet />
            { !(location.pathname == '/login' || location.pathname == '/register') ? (
                <SimpleBottomNavigation/>
            ) : null }
        </div>
    )
}