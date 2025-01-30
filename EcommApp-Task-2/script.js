const menuLine = document.getElementById('menu-line');
const menuItems = document.getElementById('menu-items');
const menuItemsBtn = document.getElementsByTagName('button');
const menubtnIcon = document.querySelector('i')
menuLine.addEventListener('click', () => {
    menuItems.classList.toggle('open');
    const isOpen = menuItems.classList.contains('open');
    menubtnIcon.setAttribute('class', isOpen ? 'bx bx-x-circle' : 'bx bx-menu');
    console.log(isOpen);
})

const menuClose = () => {
    menuItems.classList.remove('open');
}



// Title case function
function titleCase(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() +
            txt.substr(1).toLowerCase();
    });
}

//product page 
let productDisplay = document.querySelector(".productItems");
let categoryList = document.querySelector(".catogety-list");
let allCat = [];
const fetchProduct = async (allCheckCat = []) => {
    productDisplay.innerHTML = '';

    let products = await fetch('https://fakestoreapi.in/api/products');
    let productData = await products.json();
    let ProFinalData = productData.products;
    console.log(ProFinalData);


    // Category Data
    ProFinalData.forEach(element => {
        if (!allCat.includes(titleCase(element.category))) {
            categoryList.innerHTML += `<label>
            <input type="checkbox" onclick='categoryFilter()' value="${element.category}" id="">${titleCase(element.category)}
            </label>`

            allCat.push(titleCase(element.category))
        }
        // product display 
        if (allCheckCat == 0) {
            allCheckCat = allCat
        }
        if (allCheckCat.includes(titleCase(element.category))) {
            productDisplay.innerHTML += ` <div class="items">
                    <img src="${element.image}" alt="product-image">
                    <h3 style="padding-block: 5px;">${element.title}</h3>
                    <p style="padding-block: 5px;">Price: ${element.price} Rs.</p>
                    <p style="padding-block: 5px;">Model: ${element.model}</p>
                </div>`



        }


    });
}
fetchProduct()

let categoryFilter = () => {
    let checkInput = document.querySelectorAll('input[type="checkbox"]');
    let checkData = [];
    checkInput.forEach((e) => {
        if (e.checked) {
            checkData.push(titleCase(e.value));

        }

    })
    // console.log(checkData);
    fetchProduct(checkData)
}

