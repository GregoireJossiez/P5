const $cart__items = document.getElementById("cart__items")
const $cart = document.getElementById("cart")

let cart = ""
let number = +""
let price = +""

const retrieveApiData = async () => fetch(`http://localhost:3000/api/products/${itemData.id}`)
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log("Oh no", err))

const createCartItemImg = cartItem => {
  const $cart__item__img = document.createElement("div")
  $cart__item__img.classList.add("cart__item__img")

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

const cartPrice = () => {
  const totalQuantity = document
  .getElementById("totalQuantity")

  if (cart.item.length === 0) {
    totalQuantity.textContent = 0
  } else {
    for (let numberOfArticles = 0; numberOfArticles <= cart.item.length -1; numberOfArticles++) {
      let numberInCart = +cart.item[`${numberOfArticles}`].quantity
      number = number + numberInCart
      totalQuantity.textContent = number
    }
  }

  const totalPrice = document
  .getElementById("totalPrice")
  .textContent = price
}

const quantityInputsChange = async (e) => {
  let targetItem = e.target.closest("article")
  let targetId = targetItem.dataset.id
  let targetColor = targetItem.dataset.color

  let itemIndex = cart.item.findIndex(item => item.id === targetId && item.color === targetColor)

  if (cart.item[`${itemIndex}`].quantity < e.target.value) {
    price = price + itemApiData.price
  } else {
    price = price - itemApiData.price
  }

  cart.item[`${itemIndex}`].quantity = e.target.value

  localStorage.setItem("cartItems", JSON.stringify(cart))

  number = 0

  itemData.id = targetId

  itemApiData = await retrieveApiData()

  cartPrice()
}

const deleteItem = async (e) => {
  console.log("DELETE : ");
  let targetItem = e.target.closest("article")
  console.log(targetItem);
  let targetId = targetItem.dataset.id
  let targetColor = targetItem.dataset.color
  console.log(targetId);

  let itemIndex = cart.item.findIndex(item => item.id === targetId && item.color === targetColor)

  console.log(itemIndex);

  let targetQuantity = document.querySelector(`article[data-id='${targetId}'][data-color='${targetColor}'] input.itemQuantity`)
  let targetPrice = document.querySelector(`article[data-id='${targetId}'] div.cart__item__content__description > p:last-child`)

  console.log("TARGET QUANTITY : ", targetQuantity.value);
  console.log("TARGET PRICE : ", targetPrice.textContent);

  targetPriceValue = targetPrice.textContent.replace(" €", "")

  number = number - targetQuantity.value
  targetQuantPrice = targetPriceValue * targetQuantity.value
  price = price - targetQuantPrice

  console.log(targetQuantPrice);

  $cart__items.removeChild(targetItem)
  cart.item.splice(itemIndex, 1,)

  localStorage.setItem("cartItems", JSON.stringify(cart))

  number = 0

  cartPrice()
}

function contactFormVerification(e) {
  if (e.target.id === "firstName") {
    const firstNameRegEx = /^[a-zA-ZéèàêëïÈÉÊËÌÍÎÏ]+$/u
    if (e.target.value === "") {
      let error = document.getElementById("firstNameErrorMsg")
      error.textContent = ""
    } else if (e.target.value.match(firstNameRegEx) === null) {
      let error = document.getElementById("firstNameErrorMsg")
      error.textContent = "firstName incorrect"
    } else {
      let error = document.getElementById("firstNameErrorMsg")
      error.textContent = ""
    }
  } else if (e.target.id === "lastName") {
    const lastNameRegEx = /^[a-zA-ZéèàêëïÈÉÊËÌÍÎÏ]+$/u
    if (e.target.value === "") {
      let error = document.getElementById("lastNameErrorMsg")
      error.textContent = ""
    } else if (e.target.value.match(lastNameRegEx) === null) {
      let error = document.getElementById("lastNameErrorMsg")
      error.textContent = "lastName incorrect"
    } else {
      let error = document.getElementById("lastNameErrorMsg")
      error.textContent = ""
    }
  } else if (e.target.id === "address") {
    const addressRegEx = /[0-9,'a-zA-Zéèàêëï]/g
    if (e.target.value === "") {
      let error = document.getElementById("addressErrorMsg")
      error.textContent = ""
    } else if (e.target.value.match(addressRegEx) === null) {
      let error = document.getElementById("addressErrorMsg")
      error.textContent = "address incorrect"
    } else {
      let error = document.getElementById("addressErrorMsg")
      error.textContent = ""
    }
  } else if (e.target.id === "city") {
    const cityRegEx = /^[a-zA-ZéèàêëïÈÉÊËÌÍÎÏ]+$/u
    if (e.target.value === "") {
      let error = document.getElementById("cityErrorMsg")
      error.textContent = ""
    } else if (e.target.value.match(cityRegEx) === null) {
      let error = document.getElementById("cityErrorMsg")
      error.textContent = "city incorrect"
    } else {
      let error = document.getElementById("cityErrorMsg")
      error.textContent = ""
    }
  } else {
    const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    if (e.target.value === "") {
      let error = document.getElementById("emailErrorMsg")
      error.textContent = ""
    } else if (e.target.value.match(emailRegEx) === null) {
      let error = document.getElementById("emailErrorMsg")
      error.textContent = "Email incorrect"
    } else {
      let error = document.getElementById("emailErrorMsg")
      error.textContent = ""
    }
  }
}

function postOrder(order) {
  console.log(order);
  const postOrder = fetch('http://localhost:3000/api/products/order', {
  method: 'POST',
  body: JSON.stringify(order),
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  })
  .then(function(response) {
    return response.json();
  })
  .then(function (server) {
    localStorage.clear()
    orderId = server.orderId;
    if (server.orderId != "") {
        location.href = "confirmation.html?id=" + server.orderId;
      }
    console.log(orderId);
  })
  .catch((err) => {
    console.log("Problème avec fetch : " + err.message);
  })

  // if (orderId != "") {
  //     location.href = "confirmation.html?id=" + orderId;
  //   }
}

function createOrder(event) {
  event.preventDefault()
  console.log("order");

  let products = []

  for (let productsN = 0; productsN < cart.item.length -1; productsN++) {
    products.push(cart.item[`${productsN}`])
  }

  const order = {
    contact : {
      firstName : document.getElementById("firstName").value,
      lastName : document.getElementById("lastName").value,
      address : document.getElementById("address").value,
      city : document.getElementById("city").value,
      email : document.getElementById("email").value
    },
    products : products
  }

  console.log(order);

  postOrder(order)
}

const firstName = document
  .getElementById("firstName")
  .addEventListener("focusout", contactFormVerification)

const lastName = document
  .getElementById("lastName")
  .addEventListener("focusout", contactFormVerification)

const address = document
  .getElementById("address")
  .addEventListener("focusout", contactFormVerification)

const city = document
  .getElementById("city")
  .addEventListener("focusout", contactFormVerification)

const email = document
  .getElementById("email")
  .addEventListener("focusout", contactFormVerification)

const orderBtn = document
  .getElementById("order")
  .addEventListener("click", createOrder)

const main = async () => {
  cart = JSON.parse(localStorage.getItem("cartItems"))

  if (cart !== null) {
    const numberOfCartItems = cart.item.length - 1

    for (let i = 0; i <= numberOfCartItems; i++) {
      itemData = cart.item[`${i}`]

      itemApiData = await retrieveApiData()

      quantPrice = itemApiData.price * itemData.quantity

      price = price + quantPrice

      $cart__items.appendChild(createCartItemArticle(itemData))

    }
  }

  cartPrice(cart)

  deleteItemElements = document.getElementsByClassName("deleteItem")
  for (let p = 0; p <= deleteItemElements.length - 1; p++) {
    deleteItemElements[`${p}`].addEventListener("click", deleteItem)
  }

  quantityInputsElements = document.querySelectorAll("div.cart__item__content__settings__quantity > input")
  for (let q = 0; q <= quantityInputsElements.length -1; q++) {
    quantityInputsElements[`${q}`].addEventListener("change", quantityInputsChange)
  }



}

main()
