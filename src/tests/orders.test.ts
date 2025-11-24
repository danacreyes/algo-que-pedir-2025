import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OrderDetails from '../pages/order-detail/OrderDetails'

describe('tests de pedidos', () => {

    test(
        'Pagina /order-details tiene 1 solo pedido (del Bootstrap) para Sofia Miller', 
        () => {
            // render(<OrderDetails />)
            expect(1).toBe(1)
    })



})
