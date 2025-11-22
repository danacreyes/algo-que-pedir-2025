import { FoodGroupValue, IngredientType } from '../domain/ingredient'

export function makeIngredient(overrides: Partial<IngredientType> = {}): IngredientType {
  const ing = new IngredientType(
    overrides.id ?? 1,
    overrides.name ?? 'Ingrediente test',
    overrides.cost ?? 1,
    overrides.foodGroup ?? FoodGroupValue.AZUCARES_Y_DULCES,
    overrides.esOrigenAnimal ?? false,
  )

  return Object.assign(ing, overrides)
}
