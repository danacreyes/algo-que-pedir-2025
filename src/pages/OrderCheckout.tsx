import * as React from 'react'
import {
    Box,
    Container,
    Typography,
    Tab,
    Button,
    Card,
    CardMedia,
    CardContent,
    Divider,
    Modal,
    IconButton,
} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'


const OrderCheckout = () => {

    const navigate = useNavigate()


    return (
        <div onClick={() => navigate('/store-detail')}>
        Hola
        </div>
    )
}

export default OrderCheckout
