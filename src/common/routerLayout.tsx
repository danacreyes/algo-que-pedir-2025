import SimpleBottomNavigation from './BottomNavigator'
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