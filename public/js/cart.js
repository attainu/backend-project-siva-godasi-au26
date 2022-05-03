const plus = document.getElementById('plus');
const total = document.getElementById('total')
const minus = document.getElementById('minus')
const pricevalue = document.getElementById('priceValue')
plus.addEventListener('click',increasequantity)

function increasequantity(){
   const totalvalue = total.value+1
   total.value = totalvalue
}
