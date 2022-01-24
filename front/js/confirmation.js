// Récupère orderId passé dans l'URL

const params = window.location.href
var url = new URL(params)
var id = url.searchParams.get("id")

// Renseigne l'orderId ndas l'HTML

document
.getElementById("orderId")
.textContent = id
