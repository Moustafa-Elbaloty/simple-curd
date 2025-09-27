// Main buttons
let btnSearch = document.querySelector(".search-input");
let btnAddCard = document.querySelector(".btn-add");
let btnClose = document.querySelector(".btn-close");
let submitAdd = document.querySelector(".btn-add-submit")

// Pop and containers
let pop = document.querySelector(".card-pop");
let tbody = document.querySelector("tbody");
let container = document.querySelector(".container")

// Action buttons
let btnEdit = document.querySelector(".btn-edit");
let btnPreview = document.querySelector(".btn-preview");


// Add product inputs
let inputName = document.querySelector("input#name")
let inputPrice = document.querySelector("input#price")
let inputStock = document.querySelector("input#stock")
let select = document.querySelector(".categorys")

// Edit product inputs
let inputNameEdit = document.querySelector("#name-edit")
let inputStockEdit = document.querySelector("#stock-edit")
let inputPriceEdit = document.querySelector("#price-edit")
let selectEdit = document.querySelector("#Category-edit select")

// Other elements
let span = document.querySelector("td.product-Stock span");
let names = document.querySelectorAll(".product-name")


let allData = [] // Main data array
let currentRow // Store current row for editing

//search
inpSearch.addEventListener("keyup", () => {
  const value = inpSearch.value.toLowerCase(); //ignor capital  
  const filteredData = allData.filter(el => el.name.toLowerCase().includes(value));
  tbody.innerHTML = "";
  filteredData.forEach(el => createData(el));
});
// Show add  card
btnAddCard.addEventListener("click", () => {
  pop.style.cssText = "opacity:1;  transform: translate(-50%,100px )scale(1);z-index:1"
  editPop.style.cssText = "opacity:0;  transform: translate(-50%,100px )scale(1);z-index:1"
})

// Hide add  card
btnClose.addEventListener("click", () => {
  pop.style.cssText = "opacity:0;  transform: translate(-50%,200px)scale(0)"
})

// Load data from localStorage on page load
if (localStorage.getItem("data")) {
  allData = JSON.parse(localStorage.getItem("data"))
  allData.forEach(el => { createData(el) })
}

//  ADD NEW PRODUCT 
submitAdd.addEventListener("click", () => {

  console.log(names)
  names.forEach(name => {
    if (inputName.value === name.textContent)
      return
  })

  // Validate required fields
  if (inputName.value === "" || inputStock.value === "" || inputPrice.value === "") return

  // Create product object
  let obj = {
    name: inputName.value,
    stock: inputStock.value,
    price: inputPrice.value,
    select: select.value
  }

  // Add to data array and display
  allData.push(obj)
  createData(obj)

  // Save to localStorage and clear inputs
  localStorage.setItem("data", JSON.stringify(allData))
  inputEmpty()
})

//  DOM   
// Create and display product row
function createData(obj) {
  let tr = document.createElement("tr")
  let spanBgcolor = obj.stock >= 15 ? "green" : "red"
  tr.innerHTML = `<td class="product-name">${obj.name}</td>
              <td class="product-category"><span>${obj.select} </span></td>
              <td class="price"> ${obj.price}</td>
              <td class="product-Stock"><span style="background:${spanBgcolor}"></span>${obj.stock}</td>
              <td class="btns">
                <button class="btn-edit"><i class="fa fa-pen"></i>Edit</button>
                <button class="btn-preview">
                  <i class="fa fa-eye"></i>
                  Preview
                </button>
                <button class="btn-delete">
                  <i class="fa fa-trash"></i> Delete
                </button>
              </td>`
  tbody.append(tr)
}

// Clear input 
function inputEmpty() {
  inputName.value = ""
  inputStock.value = ""
  inputPrice.value = ""
}

//  DELETE  
tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    // Get product name from row
    let productName = e.target.closest("tr").firstElementChild.textContent

    // Remove from data array
    allData = allData.filter(el => el.name !== productName)
    console.log(allData)

    // Remove from DOM and update localStorage
    e.target.closest("tr").remove()
    localStorage.setItem("data", JSON.stringify(allData))
  }
})

//  EDIT 
container.addEventListener("click", (e) => {
  // Show edit popup 
  if (e.target.classList.contains("btn-edit")) {
    let editPop = document.querySelector(".card-edit")
    editPop.style.cssText = "right:50%;transform:translate(50%,0)scale(1);"

    // Store current row reference
    currentRow = e.target.closest("tr")

    //  edit form with current values
    inputNameEdit.value = currentRow.querySelector(".product-name").textContent.trim();
    inputStockEdit.value = currentRow.querySelector(".product-Stock").textContent.trim();
    inputPriceEdit.value = parseInt(currentRow.querySelector(".price").textContent);
  }

  // Submit edit changes
  if (e.target.classList.contains("btn-edit-submit")) {
    // Get old name for data array update
    let oldName = currentRow.querySelector(".product-name").textContent.trim();
    let spanBgcolor = inputStockEdit.value >= 15 ? "green" : "red";

    // Update DOM elements
    currentRow.querySelector(".product-name").textContent = inputNameEdit.value
    currentRow.querySelector(".product-Stock").innerHTML = `<span style="background:${spanBgcolor}"></span>${inputStockEdit.value}`;
    currentRow.querySelector(".price").textContent = inputPriceEdit.value
    currentRow.querySelector(".product-category span").textContent = selectEdit.value

    // Update data array
    allData.forEach(el => {
      if (el.name === oldName) {
        el.name = inputNameEdit.value.trim();
        el.stock = parseInt(inputStockEdit.value.trim());
        el.price = parseFloat(inputPriceEdit.value.trim());
        el.select = selectEdit.value.trim();
      }
      // Save to localStorage
      localStorage.setItem("data", JSON.stringify(allData))
    })
  }
})

//  CLOSE POP  
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-close")) {
    // Close any pop
    let parent = e.target.closest("section")
    parent.style.cssText = "right:50%;transform:translate(110%,0)scale(0);"

  }
})
