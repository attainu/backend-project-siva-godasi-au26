const plus = document.getElementById('plus');
const total = document.getElementById('total')
const minus = document.getElementById('minus')
const pricevalue = document.getElementById('priceValue')
const quantity = document.getElementById('quantity')
const pricehidden = document.getElementById('priceHidden')
plus.addEventListener('click',increasequantity)

function increasequantity(){
   let price = parseInt(pricevalue.value)
   let quan = parseInt(quantity.value)
   const hidden = parseInt(pricehidden.value)
   price +=parseInt(hidden)
   quan +=1

   quantity.value = quan
   pricevalue.value = price
   total.innerHTML = quan
}

minus.addEventListener('click',decreasequantity)
function decreasequantity(){
    let price = parseInt(pricevalue.value)
    let quan = parseInt(quantity.value)
    const hidden = parseInt(pricehidden.value)
    if(quan > 1){
        price -=parseInt(hidden)
        quan -=1
    }
    quantity.value = quan
   pricevalue.value = price
   total.innerHTML = quan
}