import SimpleBottomNavigation from '../components/bottomNavigator/BottomNavigator'
import { Outlet } from 'react-router-dom'

export const RouterLayout = () => {
    return(
        <>
            <Outlet />
            <SimpleBottomNavigation/>
        </>
    )
}