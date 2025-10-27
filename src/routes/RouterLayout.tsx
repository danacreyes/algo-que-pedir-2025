import SimpleBottomNavigation from '../components/BottomNavigator'
import { Outlet } from 'react-router-dom'

export const RouterLayout = () => {
    return(
        <>
            <Outlet />
            {/* <NavBar /> */}
            <SimpleBottomNavigation/>
        </>
    )
}