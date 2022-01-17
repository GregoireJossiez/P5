const $cart__items = document.getElementById("cart__items")
const $cart = document.getElementById("cart")

let price = +""

const retrieveApiData = async () => fetch(`http://localhost:3000/api/products/${itemData.id}`)
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log("Oh no", err))

const createCartItemImg = cartItem => {
  const $cart__item__img = document.createElement("div")
  $cart__item__img.classList.add("cart__item__img")

  console.log(itemApiData);

  const $img = document.createElement("img")
  $img.setAttribute("src", itemApiData.imageUrl)
  $img.setAttribute("alt", itemApiData.altTxt)

  $cart__item__img.appendChild($img)

  return $cart__item__img
}

function createCartItemContentDescription() {
  const $cart__item__content__description = document.createElement("div")
  $cart__item__content__description.classList.add("cart__item__content__description")

  const $itemName = document.createElement("h2")
  $itemName.textContent = itemApiData.name

  const $itemColor = document.createElement("p")
  $itemColor.textContent = itemData.color
  const $itemPrice = document.createElement("p")
  $itemPrice.textContent = itemApiData.price + " €"

  $cart__item__content__description.appendChild($itemName)
  $cart__item__content__description.appendChild($itemColor)
  $cart__item__content__description.appendChild($itemPrice)

  return $cart__item__content__description
}

const createCartItemContentSettingsQuantity = cartItem => {
  const $cart__item__content__settings__quantity = document.createElement("div")
  $cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity")

  const $pQuantity = document.createElement("p")
  $pQuantity.textContent = "Qté :"

  const $itemQuantity = document.createElement("input")
  $itemQuantity.setAttribute("type", "number")
  $itemQuantity.classList.add("itemQuantity")
  $itemQuantity.setAttribute("name", "itemQuantity")
  $itemQuantity.setAttribute("min", "1")
  $itemQuantity.setAttribute("max", "100")
  $itemQuantity.setAttribute("value", itemData.quantity)

  $cart__item__content__settings__quantity.appendChild($pQuantity)
  $cart__item__content__settings__quantity.appendChild($itemQuantity)

  return $cart__item__content__settings__quantity
}

const createCartItemContentSettingsDelete = cartItem => {
  const $cart__item__content__settings__delete = document.createElement("div")
  $cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete")

  const $deleteItem = document.createElement("p")
  $deleteItem.classList.add("deleteItem")
  $deleteItem.textContent = "Supprimer"

  $cart__item__content__settings__delete.appendChild($deleteItem)

  return $cart__item__content__settings__delete
}

const createCartItemContentSettings = cartItem => {
  const $cart__item__content__settings = document.createElement("div")
  $cart__item__content__settings.classList.add("cart__item__content__settings")

  const $cart__item__content__settings__quantity = createCartItemContentSettingsQuantity(cartItem)
  const $cart__item__content__settings__delete = createCartItemContentSettingsDelete(cartItem)

  $cart__item__content__settings.appendChild(createCartItemContentSettingsQuantity($cart__item__content__settings__quantity))
  $cart__item__content__settings.appendChild(createCartItemContentSettingsDelete($cart__item__content__settings__delete))

  return $cart__item__content__settings
}

const createCartItemContent = cartItem => {
  const $cart__item__content= document.createElement("div")
  $cart__item__content.classList.add("cart__item__content")

  const $cart__item__content__description = createCartItemContentDescription(cartItem)
  const $cart__item__content__settings = createCartItemContentSettings(cartItem)

  $cart__item__content.appendChild(createCartItemContentDescription($cart__item__content__description))
  $cart__item__content.appendChild(createCartItemContentSettings($cart__item__content__settings))

  return $cart__item__content
}

const createCartItemArticle = cartItem => {
  const $cartItemArticle = document.createElement("article")
  $cartItemArticle.classList.add("cart__item")
  $cartItemArticle.setAttribute("data-id", cartItem.id)
  $cartItemArticle.setAttribute("data-color", cartItem.color)

  const $cart__item__img = createCartItemImg(cartItem)
  const $cart__item__content = createCartItemContent(cartItem)

  $cartItemArticle.appendChild(createCartItemImg($cart__item__img))
  $cartItemArticle.appendChild(createCartItemContent($cart__item__content))

  return $cartItemArticle
}

const cartPrice = (cart) => {
  const totalQuantity = document
  .getElementById("totalQuantity")
  .textContent = cart.item.length

  const totalPrice = document
  .getElementById("totalPrice")
  .textContent = price
}

const main = async () => {
  const cart = JSON.parse(localStorage.getItem("cartItems"))

  console.log("#################################");
  console.log(cart);

  if (cart !== null) {
    const numberOfCartItems = cart.item.length - 1

    for (let i = 0; i <= numberOfCartItems; i++) {
      itemData = cart.item[`${i}`]

      itemApiData = await retrieveApiData()

      quantPrice = itemApiData.price * itemData.quantity

      price = price + quantPrice

      console.log(price);

      $cart__items.appendChild(createCartItemArticle(itemData))

    }
  }

  cartPrice(cart)

}

main()
