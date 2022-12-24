'use strict'

let name   = document.querySelector('#name');
let price  = document.querySelector('#price');
let amount = document.querySelector('#amount');
let add    = document.querySelector('#add');
let table  = document.querySelector('#table');
let total  = document.querySelector('#total');

add.addEventListener('click',function(){
    let tr = document.createElement('tr')

    allowEdit(createCell(tr, name.value, 'name'));
	allowEdit(createCell(tr, price.value, 'price'));
	allowEdit(createCell(tr, amount.value, 'amount'));
	createCell(tr, price.value * amount.value, 'cost');
	createCell(tr, 'удалить', 'remove').addEventListener('click',function(ev){
        
        if(ev.target.classList == 'remove'){
            tr.closest('tr').remove()
        }
        
        recountTotal();
    })

    table.appendChild(tr)
    recountTotal();
})

function createCell(tr,value,name){
    let td;
    td = document.createElement('td');
    td.textContent = value;
    td.classList.add(name);

    tr.appendChild(td);
    return tr
}

function recountTotal() {
	let costs = table.querySelectorAll('.cost');
    let sum = 0;
	for(let elem of costs){
       
        sum+=+elem.textContent
        
    }
	total.textContent = sum
}

let input;

function allowEdit(td) {
	td.addEventListener('dblclick', addInp)

    td.addEventListener('keypress',remove)

   

}


function addInp(ev){
    if(ev.target.classList == 'name' || ev.target.classList == 'price' || ev.target.classList == 'amount' ){ 
        let text = ev.target.textContent;
        input = document.createElement('input')
        ev.target.textContent = ''
        input.value = text
        ev.target.appendChild(input)
        
    }

    this.removeEventListener('dblclick',addInp)
}


function remove(ev){
    if(ev.key === 'Enter'){
        let td;
        td = ev.target.closest('td')
        td.textContent = input.value
        
        if (td.classList.contains('price') || td.classList.contains('amount')) {
            let prices = document.querySelectorAll('.price')
            let amounts = document.querySelectorAll('.amount')
            for(let price of prices){
                for(let amount of amounts){
                    amount.nextElementSibling.textContent =((sum(+amount.previousElementSibling.textContent,+amount.textContent)))  
                }
                
            }
            recountTotal()
    }

    this.addEventListener('dblclick',addInp)
    }
}

function sum(price,amount){
    console.log(price,amount)
    let total = price * amount
    return total
}