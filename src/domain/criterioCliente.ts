import { MenuItemType } from './menuItem'
import { UserProfile, Criterios } from './userProfile'
import { StoreType } from './store'
import { IngredientType } from './ingredient'

// ====================================================================
// 1. INTERFAZ BASE
// ====================================================================

/**
 * Define el contrato para un Criterio de Cliente.
 * Corresponde a la interfaz 'CriterioCliente' de Kotlin.
 */
export interface CriterioCliente {
  puedePedir(plato: MenuItemType, usuario: UserProfile): boolean
}

// ====================================================================
// 2. CRITERIOS SIN ESTADO (STATELESS)
// ====================================================================

/**
 * Vegano: no quiere platos de origen animal.
 * Asume que el plato no es de origen animal si TODOS sus ingredientes no lo son.
 */
export const Vegano: CriterioCliente = {
  puedePedir(plato: MenuItemType, usuario: UserProfile): boolean {
    // Si todos los ingredientes tienen 'esOrigenAnimal' en 'false', el plato es vegano.
    return plato.ingredientes.every(ing => !ing.esOrigenAnimal)
  },
}

/**
 * Exquisito: solo quiere platos de autor.
 */
export const Exquisito: CriterioCliente = {
  puedePedir(plato: MenuItemType, usuario: UserProfile): boolean {
    return plato.esDeAutor
  },
}

/**
 * Conservador: el plato solo tiene ingredientes que son sus preferidos.
 */
export const Conservador: CriterioCliente = {
  puedePedir(plato: MenuItemType, usuario: UserProfile): boolean {
    const preferredIds = new Set(usuario.preferredIngredients.map(ing => ing.id))
    // El plato es apto si TODOS sus ingredientes tienen un ID que está en la lista de preferidos del usuario.
    return plato.ingredientes.every(ing => ing.id !== undefined && preferredIds.has(ing.id))
  },
}

/**
 * Impaciente: solo quiere platos de los locales cercanos.
 * NOTA: La lógica de 'cercanía' (Haversine) no está implementada en los dominios,
 * por lo que se deja un placeholder que asume un cálculo.
 */
export const Impaciente: CriterioCliente = {
  puedePedir(plato: MenuItemType, usuario: UserProfile): boolean {
    // Para simplificar, asumimos que el criterio de 'Impaciente' en Criterios
    // indica la distancia máxima (ej: 5 km).
    // Si no se puede determinar la cercanía, se retorna true como un placeholder temporal.
    // console.warn("ADVERTENCIA: 'Impaciente' requiere lógica de cálculo de distancia (esCercano) no incluida en los dominios.")
    return true
  },
}

/**
 * Generalista: solo le interesa lo basico (siempre puede pedir).
 */
export const Generalista: CriterioCliente = {
  puedePedir(plato: MenuItemType, usuario: UserProfile): boolean {
    return true
  },
}

// ====================================================================
// 3. CRITERIOS CON ESTADO (STATEFUL)
// ====================================================================

/**
 * Fieles: el plato debe estar elaborado por uno de sus locales preferidos.
 * El estado se maneja mediante una lista de IDs de locales preferidos.
 */
export class Fieles implements CriterioCliente {
  // Usamos un Set de numbers para los IDs de los locales favoritos.
  public localesFavoritosIds: Set<number>

  constructor(localesIds: number[] = []) {
    this.localesFavoritosIds = new Set(localesIds)
  }

  agregarLocalFavorito(localId: number) {
    this.localesFavoritosIds.add(localId)
  }

  puedePedir(plato: MenuItemType, usuario: UserProfile): boolean {
    // NOTA: MenuItemType (plato) no incluye 'local', pero Order sí.
    // Asumimos que la tienda del plato se puede obtener. Usamos un placeholder de Store ID.
    const localIdDelPlato = 1 // Placeholder: ID de la tienda del plato.
    return this.localesFavoritosIds.has(localIdDelPlato)
  }
}

/**
 * Consumista: si en la descripción del plato tiene las palabras/frases de sus favoritas.
 */
export class Consumista implements CriterioCliente {
  public frasesFavoritas: Set<string>

  constructor(frases: string[] = []) {
    this.frasesFavoritas = new Set(frases.map(f => f.toLowerCase()))
  }

  agregarFraseFavorita(frase: string) {
    this.frasesFavoritas.add(frase.toLowerCase())
  }

  puedePedir(plato: MenuItemType, usuario: UserProfile): boolean {
    const descripcion = plato.descripcion.toLowerCase()
    // Retorna true si al menos una de las frases favoritas está en la descripción del plato.
    for (const frase of Array.from(this.frasesFavoritas)) {
      if (descripcion.includes(frase)) {
        return true
      }
    }
    return false
  }
}

/**
 * Combinado: El plato debe cumplir con TODOS los criterios internos.
 */
export class Combinado implements CriterioCliente {
  constructor(public criterios: CriterioCliente[]) {}

  puedePedir(plato: MenuItemType, usuario: UserProfile): boolean {
    // Si TODOS los criterios internos retornan 'true', el combinado retorna 'true'.
    return this.criterios.every(criterio => criterio.puedePedir(plato, usuario))
  }
}

/**
 * CambianteSegunEdad: Aplica Exquisito si la edad es par, Conservador si es impar.
 * NOTA: Asume la existencia de un método para obtener la edad en UserProfile (usuario.edad()).
 */
export class CambianteSegunEdad implements CriterioCliente {
  private getEdadDelUsuario(usuario: UserProfile): number {
    // Placeholder para la edad. DEBES reemplazar con la lógica real (ej: calcular edad a partir de fecha de nacimiento).
    return 30
  }
  
  private criterioSegunEdad(usuario: UserProfile): CriterioCliente {
    const edad = this.getEdadDelUsuario(usuario)
    // Edad par -> Exquisito. Edad impar -> Conservador.
    return edad % 2 === 0 ? Exquisito : Conservador 
  }

  puedePedir(plato: MenuItemType, usuario: UserProfile): boolean {
    return this.criterioSegunEdad(usuario).puedePedir(plato, usuario)
  }
}