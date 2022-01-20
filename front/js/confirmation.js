const params = window.location.href
var url = new URL(params)
var id = url.searchParams.get("id")

document
.getElementById("orderId")
.textContent = id
