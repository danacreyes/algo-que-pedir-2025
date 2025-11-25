import { test, expect } from '@playwright/test';

test.describe("Home", () => {

  test.beforeEach(async ({request, page}) => {
    // 1) resetear backend a estado inicial
    await request.post('http://localhost:9000/test/reset')

    await page.addInitScript(() => {
      window.localStorage.setItem('id', '1') // sofia miller
      window.localStorage.setItem('userName', 'Sofía')
      window.localStorage.setItem('email', 'sofiamiller@gmail.com')
    });

    await page.goto("http://localhost:5173/")
  })

  test.afterEach(async () => {

  })

  test("Deberia mostrar los locales disponibles segun criterio de user", async ({page}) => {
    await expect(page).toHaveTitle("Algo que Pedir")
    // sofia miller no tiene locales disponibles por sus criterios
    await expect(page.getByTestId('no-stores-text')).toBeVisible()

    // sacamos todos sus criterios
    await page.getByTestId('nav-link-profile').click()
    await page.getByTestId('search-criteria-link').click()

    await expect(page.getByTestId('vegano-checkbox')).toBeChecked()
    await expect(page.getByTestId('fieles-checkbox')).toBeChecked()

    await page.getByTestId('vegano-checkbox').setChecked(false) // 1-dos formas de hacerlo
    await page.getByTestId('fieles-checkbox').click() // 2-dos formas de hacerlo
    // actualizamos el perfil
    await page.getByTestId('modificar-criteria-btn').click()
    await page.getByTestId('header-back-btn').click()
    await page.getByTestId('guardar-perfil-btn').click()

    // Vuelvo a home y hay locales
    await page.getByTestId('nav-link-home').click()
    await expect(page.getByTestId('no-stores-text')).not.toBeVisible()
    await expect(page.getByTestId('store-name-1')).toBeVisible()

  })

  test("User sin criterios reserva un pedido", async ({page}) => {
    await page.addInitScript(() => {
      window.localStorage.clear()
      window.localStorage.setItem('id', '4') // Buzz
      window.localStorage.setItem('userName', 'Buzz')
      window.localStorage.setItem('email', 'woodyteamo@gmail.com')
    });
    // Recargo para traer las cosas sgun el user Buzz
    await page.reload()
    // Probamos que trae (al menos uno de) los restaurantes disponibles (todos)
    await expect(page.getByTestId('store-card-1')).toBeVisible()
    // Entramos al detalle del local
    await page.getByTestId('store-card-1').click()
    // Elegimos un plato
    await page.getByTestId('dish-card-1').click()
    // Se abre el modal con los datos correctos
    await expect(page.getByTestId('dish-modal')).toBeVisible()
    await expect(page.getByTestId('dish-modal')).toHaveId('modal-1')
    // Sumamos un plato
    expect(page.getByTestId('modal-counter')).toHaveText('1')
    await page.getByTestId('modal-add-btn').click()
    expect(page.getByTestId('modal-counter')).toHaveText('2')
    // Agregamos al pedido
    await page.getByTestId('agregar-a-pedido').click()
    // Vamos a ver el pedido
    await expect(page.getByTestId('ver-pedido-btn')).toContainText('2')
    await page.getByTestId('ver-pedido-btn').click()
    // Chequeamos que los datos sean correctos (id del plato: 1)
    await expect(page.getByTestId('item-quantity-1')).toContainText('2')
    // Lo reservamos
    // estaria bueno que el endpoint devuelva al menos el id de la order para luego usarlo
    await page.getByTestId('reservar-confirmar-pedido-btn').click()
    // Chequeamos que aparezca en la ventana de pedidos pendientes
    await page.getByTestId('nav-link-orders').click()
    await expect(page.getByTestId('restaurant-card-1-18')).toBeVisible()
    // await expect(page.getByTestId('order-detail-2')).toContainText("2 productos")
  })

})