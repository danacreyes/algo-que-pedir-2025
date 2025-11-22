import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import IngredientCriteria from './IngredientCriteria'
import { useUserProfile } from '../../customHooks/useUserProfile'
import { ingredientService } from '../../services/IngredientService'
import { makeIngredient } from '../../tests/ingredientMock'
import { FoodGroupValue } from '../../domain/ingredient'

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
        return {
        ...actual,
        useParams: () => ({ criteria: 'avoid' }), // siempre empiezo con pagina de ingredientes a evitar
    }
})

vi.mock('../../customHooks/useUserProfile', () => ({
    useUserProfile: vi.fn(),
}))

const showToastMock = vi.fn()

describe('Tests para IngredientCriteria', () => {
    const mockIngredients = [
        makeIngredient({
            id: 1,
            name: 'Queso Cheddar',
            cost: 0.5,
            foodGroup: FoodGroupValue.LACTEOS,
            esOrigenAnimal: true,
        }),
        makeIngredient({
            id: 2,
            name: 'Tomate',
            cost: 0.2,
            foodGroup: FoodGroupValue.FRUTAS_Y_VERDURAS,
            esOrigenAnimal: false,
        }),
    ]

    beforeEach(() => {
        vi.clearAllMocks()   // NO usar restoreAllMocks, porque borra los spyOn
        vi.resetAllMocks()

        ;(useUserProfile as Mock).mockReturnValue({
            profile: {
            preferredIngredients: [],
            ingredientsToAvoid: [],
            },
            setProfile: vi.fn(),
            checkChanges: vi.fn(),
            showToast: showToastMock,
        })
    })

    test('CASO FELIZ: carga ingredientes correctamente del backend', async () => {
        vi.spyOn(ingredientService, 'getAllIngredients').mockResolvedValueOnce(mockIngredients)

        render(
            <MemoryRouter>
                <IngredientCriteria />
            </MemoryRouter>
        )

        fireEvent.click(screen.getByText('Añadir ingrediente'))

        expect(await screen.findByLabelText('Queso Cheddar')).toBeTruthy()
        expect(await screen.findByLabelText('Tomate')).toBeTruthy()
    })

    test('CASO TRISTE: no cargar los ingredientes y se llama showToast', async () => {
        vi.spyOn(ingredientService, 'getAllIngredients').mockRejectedValueOnce(new Error('Error forzado, falla backend'))

        render(
            <MemoryRouter>
                <IngredientCriteria />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(showToastMock).toHaveBeenCalledTimes(1)
            expect(showToastMock).toHaveBeenCalledWith('Error al cargar los ingredientes. Intente nuevamente.', 'error')
        })
    })

    test('No puedo agregar un ingrediente preferido cuando criterio = avoid', async () => {
        const queso = makeIngredient({id: 1, name: 'Queso Cheddar', foodGroup: FoodGroupValue.LACTEOS,})
        const tomate = makeIngredient({id: 2, name: 'Tomate', foodGroup: FoodGroupValue.FRUTAS_Y_VERDURAS,})

        // le agrego queso a la lista de ingredientes preferidos del usuario
        ;(useUserProfile as Mock).mockReturnValue({
            profile: {
                preferredIngredients: [queso],    
                ingredientsToAvoid: [],
            },
            setProfile: vi.fn(),
            checkChanges: vi.fn(),
            showToast: showToastMock,
        })

        vi.spyOn(ingredientService, 'getAllIngredients').mockResolvedValueOnce([queso, tomate])

        render(
            <MemoryRouter>
                <IngredientCriteria />
            </MemoryRouter>
        )

        fireEvent.click(screen.getByText('Añadir ingrediente'))

        // tomate tiene que aparecer
        expect(await screen.findByLabelText('Tomate')).toBeTruthy()

        // queso NO tiene que aparecer
        expect(screen.queryByLabelText('Queso Cheddar')).toBeNull()
    })
})
