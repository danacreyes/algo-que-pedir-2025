import SimpleBottomNavigation from '../components/BottomNavigator/BottomNavigator'
import { Outlet, useLocation } from 'react-router-dom'

export const RouterLayout = () => {
    const location = useLocation()

    // if (location.pathname == '/login' || location.pathname == '/register') {
    //     return <Outlet />
    // }
    return(
        <>
            <Outlet />
            {/* <NavBar /> */}
            { !(location.pathname == '/login' || location.pathname == '/register') ? (
                <SimpleBottomNavigation/>
            ) : null }
        </>
    )
}