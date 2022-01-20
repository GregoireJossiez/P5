const $kanapItemImg = document.getElementsByClassName("item__img")
const $kanapItemColors = document.getElementById("colors")

const params = window.location.href
var url = new URL(params)
var id = url.searchParams.get("id")

const retrieveKanapData = async () => fetch(`http://localhost:3000/api/products/${id}`)
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log("Oh no", err))

const createKanapImg = kanap => {
  const $kanapImg = document.createElement("img")
  $kanapImg.setAttribute("src", kanap.imageUrl)

  $kanapItemImg[0].appendChild($kanapImg)

  return $kanapImg
}

const createKanapColors = kanap => {
  const numberOfColors = kanap.colors.length - 1

  for (let i = 0; i <= numberOfColors; i++) {
    const $kanapColors = document.createElement("option")
    $kanapColors.setAttribute("value", kanap.colors[`${i}`])
    $kanapColors.textContent = kanap.colors[`${i}`]

    $kanapItemColors.appendChild($kanapColors)
  }
}

const createKanapItem = kanap => {

  const $kanapImg = createKanapImg(kanap)

  const $kanapTitle = document.getElementById("title")
  $kanapTitle.textContent = kanap.name

  const $kanapDescription = document.getElementById("description")
  $kanapDescription.textContent = kanap.description

  const $kanapPrice = document.getElementById("price")
  $kanapPrice.textContent = kanap.price

  const $kanapColors = createKanapColors(kanap)

}

let cartItems = {
  'item' : []
}

if (typeof localStorage.cartItems !== "undefined") {
  const pushItems = JSON.parse(localStorage.getItem("cartItems"))
  let numberOfItems = pushItems.item.length - 1

  for (let n = 0; n <= numberOfItems; n++) {
    cartItems.item.push({"id" : pushItems.item[`${n}`].id, "color" : pushItems.item[`${n}`].color, "quantity" : pushItems.item[`${n}`].quantity})
  }
}

function addToCartData(event) {
  const selectedColor = document
  .getElementById("colors").value

  const selectedQuantity = document
  .getElementById("quantity").value

  if (selectedQuantity === "0") {
    console.log("Quantity must be above 0, item not created");
  } else if ((cartItems.item.find(item => item.id === id)) && (cartItems.item.find(item => item.color === selectedColor))) {
    console.log("ketchup");
    let itemIndex = cartItems.item.findIndex(item => item.id === id && item.color === selectedColor)

    console.log(itemIndex);

    const cartItemQuantity = +cartItems.item[`${itemIndex}`].quantity
    const quantityToAdd = +selectedQuantity

    cartItems.item[`${itemIndex}`].quantity = `${cartItemQuantity + quantityToAdd}`

    localStorage.setItem("cartItems", JSON.stringify(cartItems))

  } else {
    console.log("mayonnaise");
    cartItems.item.push({"id" : id, "color" : selectedColor, "quantity" : selectedQuantity})
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }


  console.log(cartItems);

  const cart = JSON.parse(localStorage.getItem("cartItems"))

}

const addToCart = document.getElementById("addToCart")
addToCart.addEventListener("click", addToCartData)

const main = async () => {

  const kanapData = await retrieveKanapData()

  createKanapItem(kanapData)

}

main()
