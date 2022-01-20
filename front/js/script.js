const $items = document.getElementById("items")

const ITEMS_PER_PAGE = 8

const retrieveKanapsData = async () => fetch("http://localhost:3000/api/products")
  .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("Oh no", err))

const createKanapArticle = kanap => {
  const $kanapArticle = document.createElement("article")

  const $kanapImg = document.createElement("img")
  $kanapImg.setAttribute("src", kanap.imageUrl)
  $kanapImg.setAttribute("alt", kanap.altTxt)

  const $kanapName = document.createElement("h3")
  $kanapName.classList.add("productName")
  $kanapName.innerText = kanap.name

  const $kanapDescription = document.createElement("p")
  $kanapDescription.classList.add("productDescription")
  $kanapDescription.textContent = kanap.description

  $kanapArticle.appendChild($kanapImg)
  $kanapArticle.appendChild($kanapName)
  $kanapArticle.appendChild($kanapDescription)

  return $kanapArticle
}

const createKanapItem = kanap => {
  const $kanapItem = document.createElement("a")
  $kanapItem.setAttribute("href", `./product.html?id=${kanap._id}`)

  const $kanapArticle = createKanapArticle(kanap)

  $kanapItem.appendChild($kanapArticle)

  return $kanapItem
}

  const main = async () => {
    const kanapsData = await retrieveKanapsData()

    for (let i = 0; i < ITEMS_PER_PAGE; i++) {
        if (kanapsData[i]) {
            $items.appendChild(createKanapItem(kanapsData[i]))
        }
    }
  }

main()
