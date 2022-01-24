// Défini des elements du DOM

const $kanapItemImg = document.getElementsByClassName("item__img")
const $kanapItemColors = document.getElementById("colors")

// Récupère ID dans URL

const params = window.location.href
var url = new URL(params)
var id = url.searchParams.get("id")

// Requête API avec ID

const retrieveKanapData = async () => fetch(`http://localhost:3000/api/products/${id}`)
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log("Oh no", err))

// Créer élement IMG, setAttribute avec data API
// Créer un enfant du DOM et retourne l'objet

const createKanapImg = kanap => {
  const $kanapImg = document.createElement("img")
  $kanapImg.setAttribute("src", kanap.imageUrl)

  $kanapItemImg[0].appendChild($kanapImg)

  return $kanapImg
}

// Boucle FOR pour chaque couleur de l'ID data API
// Créer élement option, setAttribute avec data API
// Créer un enfant du DOM

const createKanapColors = kanap => {
  const numberOfColors = kanap.colors.length - 1

  for (let i = 0; i <= numberOfColors; i++) {
    const $kanapColors = document.createElement("option")
    $kanapColors.setAttribute("value", kanap.colors[`${i}`])
    $kanapColors.textContent = kanap.colors[`${i}`]

    $kanapItemColors.appendChild($kanapColors)
  }
}

// Appelle les functions
// Remplis les éléments du DOM avec data API

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

// Créer un tableau cartItems avec item

let cartItems = {
  'item' : []
}

// Vérifie si localStorage contient des données (Ex : Panier d'autres pages)
// Si contient des données, push les données dans le tableau cartItems grâce à la boucle FOR
// Pour ne pas écraser les données du localStorage

if (typeof localStorage.cartItems !== "undefined") {
  const pushItems = JSON.parse(localStorage.getItem("cartItems"))
  let numberOfItems = pushItems.item.length - 1

  for (let n = 0; n <= numberOfItems; n++) {
    cartItems.item.push({"id" : pushItems.item[`${n}`].id, "color" : pushItems.item[`${n}`].color, "quantity" : pushItems.item[`${n}`].quantity})
  }
}

// Récupère color et quantity sélectionnées
// Si quantity = 0, ne rien faire (pour ne créer de ligne vide)
// Si l'ID ET color sont déja dans le tableau, trouve l'index et modifie la quantité et met à jour le localStorage
// Sinon push l'entrée dans le tableau et met à jour le localStorage

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
}

// Récupère le button dans le DOM
// Ècoute son click event et appelle addToCartData

const addToCart = document.getElementById("addToCart")
addToCart.addEventListener("click", addToCartData)

// Récupère les data API dans kanapData
// Appelle createKanapItem avec les data API

const main = async () => {

  const kanapData = await retrieveKanapData()

  createKanapItem(kanapData)

}

main()
