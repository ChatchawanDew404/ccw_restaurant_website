// select
let selectCategory = document.querySelector("#selectCategory")
let selectRate = document.querySelector("#selectRate")
// input search
let getSearchInputValue = document.querySelector("#searchMenu")
let getInputRecommendSearchContainer = document.querySelector(".menu .searchBox .inputSearchShow")
let getParentSearchContainer = getInputRecommendSearchContainer.parentElement
let searchMenuBtn = document.querySelector('.searchMenuBtn')
// show menu container
let getShowMenuContainer = document.querySelector('.showMenuList')
// popup control
let menuPopupContainer = document.querySelector('.menuPopupContainer')

// ---------------------------------------------------------------------------
//      [ MANAGE  SELECT OPTION & SEARCH INPUT & MENU BOX LIST DISPLAY ]
// ---------------------------------------------------------------------------
let allMenuList = []    // get all menu in json data
let changedMenuList = []  // if user (select category) , (select rate) , (search menu)  this data will change

// get data in json
async function getAllMenuData(){
    let getData = await fetch('/json/foodData.json')
    let convertData = await getData.json()
    allMenuList = convertData.allFood
}

getAllMenuData().then(() =>{
    controlMenuList()
    manageMenuDataBeforeDisplay()
})

// realtime Fill food information in input search box (Input search Box)
getSearchInputValue.addEventListener("input",(e) =>{
    controlMenuList(e.target.value.toLowerCase())
})

// click button to search menu after user select value in input and display menu box result (Input search Box)
searchMenuBtn.addEventListener('click',() =>{
    if(getSearchInputValue.value != null || getSearchInputValue.value != ""){
        // find data in allMenuList by search
        changedMenuList = allMenuList.filter((data) => data.name.toLowerCase().includes(getSearchInputValue.value.toLowerCase())).sort((a, b) => b.rate - a.rate)
        // reload menuBox
        displayMenuDataToBox()
        // after finish search we will close recommend
        getParentSearchContainer.classList.remove("recommendSearch")
    }
})

// category , rate , search (select option in left and search menu in right menu control ) 
function controlMenuList(getSearchInputData = null){
    const allRates = ["0", "0.5", "1", "1.5"," 2", "2.5", "3", "3.5", "4", "4.5","5"]
    const categories = [...new Set(allMenuList.map(item => item.category))];

    selectCategory.innerHTML = ""
    selectRate.innerHTML = ""

    let createCategoryOptions = categories.map((data) =>{
        return `<option value=${data}>${data}</option>`
     })
     
     let createRateOption = allRates.map((data) =>{
         return `<option value=${data}>${data}</option>`
     })

    // check if user use search input we will reset all select to default and reset display menu box
    if(getSearchInputData == null || getSearchInputData == ""){
        // create option to category select box (select option)
        selectCategory.innerHTML = `<option value="all" selected>Category (All)</option>`
        selectCategory.innerHTML += createCategoryOptions 
        selectRate.innerHTML = `<option value="all" selected>Rates (All)</option>`
        selectRate.innerHTML += createRateOption
        // reset display recommend menu
        getParentSearchContainer.classList.remove("recommendSearch")
     }else{
        // Return Selected To Default value(every time when user use search Input) (select option)
        selectCategory.innerHTML = `<option value="all" selected>Category (All)</option>`
        selectCategory.innerHTML += createCategoryOptions 
        selectRate.innerHTML = `<option value="all" selected>Rates (All)</option>`
        selectRate.innerHTML += createRateOption
        // reset display menu box
        manageMenuDataBeforeDisplay() 
        // check data by search data
        changedMenuList = allMenuList.filter((data) => data.name.toLowerCase().includes(getSearchInputData))
        
        getInputRecommendSearchContainer.innerHTML = ""
        // create recommend name menu and show in search inputBox
        if(changedMenuList.length != 0){
            getParentSearchContainer.classList.add("recommendSearch")
            let createRecommendSearchTx = changedMenuList.map((data) =>{
                return `<p onclick="getSearchSelect('${data.name}')">${data.name}</p>`
            }).join('')
            getInputRecommendSearchContainer.innerHTML += createRecommendSearchTx
        }else{
            getParentSearchContainer.classList.remove("recommendSearch")
        }
     }
    
    // if user use select category or rate (select option)
   selectCategory.addEventListener("change",manageMenuDataBeforeDisplay)
   selectRate.addEventListener("change",manageMenuDataBeforeDisplay)
}

//  get select search in recommend search (Input search Box recommend)
function getSearchSelect(nameMenu){
    getSearchInputValue.value =  nameMenu
    getParentSearchContainer.classList.remove("recommendSearch")
}


//  manage array menu before display data in menu Box (manage changedMenuList[])
function manageMenuDataBeforeDisplay(){
    let getCategoryValue = selectCategory.value
    let getRateValue = selectRate.value

    if(getCategoryValue == "all" && getRateValue == "all"){
        changedMenuList  = allMenuList.sort((a, b) => b.rate - a.rate)
        displayMenuDataToBox()
    }else if(getCategoryValue != "all" && getRateValue == "all"){
        changedMenuList = allMenuList.filter((data) => data.category == getCategoryValue).sort((a, b) => b.rate - a.rate)
        displayMenuDataToBox()
    }else if(getCategoryValue == "all" && getRateValue != "all"){
        changedMenuList = allMenuList.filter((data) => data.rate == getRateValue).sort((a, b) => b.rate - a.rate)
        displayMenuDataToBox()
    }
    else{
        changedMenuList = allMenuList.filter((data) => data.category == getCategoryValue && data.rate == getRateValue ).sort((a, b) => b.rate - a.rate)
        displayMenuDataToBox()
    }
}

// generate star in menu box (menu list box)
function generateRateStarBox(rateStar){
    if (rateStar == 5) {
        return `<i class='bx bxs-star'></i>  
                <i class='bx bxs-star'></i>    
                <i class='bx bxs-star'></i>    
                <i class='bx bxs-star'></i>     
                <i class='bx bxs-star'></i>`;
    } else if (rateStar == 4.5) {
        return `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star-half'></i>`;
    } else if (rateStar == 4) {
        return `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>`;
    } else if (rateStar == 3.5) {
        return `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>`;
    } else if (rateStar == 3) {
        return `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`;
    } else if (rateStar == 2.5) {
        return `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`;
    } else if (rateStar == 2) {
        return `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`;
    } else if (rateStar == 1.5) {
        return `<i class='bx bxs-star'></i>
                <i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`;
    } else if (rateStar == 1) {
        return `<i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`;
    } else if (rateStar == 0.5) {
        return `<i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`;
    } else {
        return `<i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`;
    }
}

// show data in html after manage menulist finish (menu list Box)
function displayMenuDataToBox(){
    getShowMenuContainer.innerHTML =  ""
    if(changedMenuList.length != 0){
        getShowMenuContainer.classList.add("haveMenuList")
        let createMenuBox = changedMenuList.map((data) =>{
            return `
             <div class="menuItem">
            <div class="image">
                   <img src=${data.image} alt="">
            </div>
            <div class="content">
                <span class="category">${data.category}</span>
                 <h3 class="name">${data.name}</h3>
                 <p class="price">${data.price}$</p>
                 <div class="rate">
                      ${generateRateStarBox(data.rate)}
                 </div>
                 <div class="controlMenu">
                    <div class="viewMenu" onclick="searchIndexMenuBeforeShowPopup(${data.id})"><i class='bx bx-show-alt'></i></div>
                    <div class="addCart" onclick="addCartBtn(${data.id})"><i class='bx bx-cart-add' ></i></div>
                    <div class="addWishlist" onclick="addWishlistBtn(${data.id})"><i class='bx bx-heart' ></i></div>
                 </div>
            </div>
        </div>
            `
            
        }).join('')
        getShowMenuContainer.innerHTML += createMenuBox
    }else{
        let createAlertNotHaveMenuContent = `
        <div class="image"><img src="./image/nothavemenu.png" alt=""></div>
             <div class="content">
                <h2>Sorry, we do not have the food you searched or filtered for.</h2>
             </div>
        `
        getShowMenuContainer.innerHTML =""
        getShowMenuContainer.classList.remove("haveMenuList")
        getShowMenuContainer.innerHTML = createAlertNotHaveMenuContent
    }
}

// ---------------------------------------------------------------------------------------
//                   [ MANAGE MENU POPUP DISPLAY ] (View menu Btn) (Menu Box List BTN 1/3)
// ----------------------------------------------------------------------------------------
// search index of menu data before show popup
let getMenuDataIndex = null
function searchIndexMenuBeforeShowPopup(getMenuID){
    getMenuDataIndex = changedMenuList.findIndex((data) => data.id == getMenuID)
    showPopup(getMenuDataIndex)
}

// show popup (menuPopup)
function showPopup(getMenuDataIndex){
    menuPopupContainer.classList.add("show")
    let createMenuPopupContent = `
   <div class="menuPopupControl" id=${changedMenuList[getMenuDataIndex].id}>
            <div class="close controlBtn" onclick="closePopup()"><i class='bx bx-x' ></i></div>
            <div class="prev controlBtn" onclick="prevMenuPopup(${getMenuDataIndex})"><i class='bx bx-chevron-left' ></i></div>
            <div class="next controlBtn" onclick="nextMenuPopup(${getMenuDataIndex})"><i class='bx bx-chevron-right'></i></div>
            <div class="menuPopupContent">
                <div class="left">
                    <div class="image"><img src=${changedMenuList[getMenuDataIndex].image} alt=""></div>
                </div>
                <div class="right">
                    <p class="category">${changedMenuList[getMenuDataIndex].category}</p>
                    <h2 class="menuName">${changedMenuList[getMenuDataIndex].name}</h2>
                    <div class="rateBox">
                    ${generateRateStarBox(changedMenuList[getMenuDataIndex].rate)}
                    </div>
                    <p class="price">$${changedMenuList[getMenuDataIndex].price}</p>
                    <p class="detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, ad modi voluptate quam placeat tenetur nihil aliquid ipsum sequi! Odit maiores unde dolorum tenetur laboriosam nulla, fuga laborum repellat fugiat.</p>
                     <div class="inputBx">
                        <div class="minusBtn" onclick="manageChangeQty('minus')">-</div>
                        <input type="number" placeholder="1" min="1" max="100" value="1" id="inputQty">
                        <div class="plusBtn" onclick="manageChangeQty('plus')">+</div>
                    </div>
                    <button class="addToCartBtn" onclick="addMenuToCart(${getMenuDataIndex})">Add To Cart</button>
                </div>
             </div>
         </div>
    `
    menuPopupContainer.innerHTML = createMenuPopupContent
}

// ----------------Manage [Prev , Next , Close Btn in popup] (menu Popup) --------------------
// close popup (close Btn)
function closePopup(){
    menuPopupContainer.classList.remove("show")
}
// // prev menu btn (prev Btn)
function prevMenuPopup(getMenuIndex){
    getMenuIndex = getMenuIndex - 1 
    if(getMenuIndex < 0){
        getMenuIndex = changedMenuList.length - 1
    }
    showPopup(getMenuIndex)
}
// // next menu btn (next Btn)
function nextMenuPopup(getMenuIndex){
    getMenuIndex = getMenuIndex + 1 
    if(getMenuIndex > changedMenuList.length - 1){
        getMenuIndex = 0
    }
    showPopup(getMenuIndex)
}

// ---------------------Manage [- input + btn , Add To Cart Btn] (Menu Popup)----------------------
// if user click plus or minus btn (+ and - Btn between input)
function manageChangeQty(keyBtn){
    let getInputValue = document.querySelector('#inputQty')
    let currentValue = parseInt(getInputValue.value)
     if(keyBtn == "plus"){
        currentValue += 1
        if(currentValue > 100){
            Swal.fire({
              position: "center",
              icon: "error",
              title: "The number of food items can be increased up to 100 items.",
              showConfirmButton: false,
              timer: 1500
            });
            currentValue = 100
        }
     }else if(keyBtn == "minus"){
        currentValue -= 1
        if(currentValue < 1){
            currentValue = 1
        }
     }
     getInputValue.value = currentValue
}


// ---------------- [CHECK TOKEN] -------------
function checkUserTokenIsReal(getAllUserData){
    let getToken = JSON.parse(localStorage.getItem('token')) || null
    if(getToken == null && getAllUserData == null){
        alertNotHaveAccount()
        return false
    }else{
        // check token user is real
        let userTokenReal = getAllUserData.filter((data) => data.id == getToken) 
        if(userTokenReal.length == 0){
            alertNotHaveAccount()
            return false
        }else{
            return userTokenReal
        }
    }
}

// if user click add menu to cart (Add To Cart Btn)
function addMenuToCart(getMenuDataIndex){
    let getInputValue = document.querySelector('#inputQty')
    let currentValue =  parseInt(getInputValue.value)
    // get userData
    let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage")) || null
    let userTokenReal = checkUserTokenIsReal(getAllUserData)

    if(currentValue > 100){
        Swal.fire({
            position: "center",
            icon: "error",
            title: "The number of food items can be increased up to 100 items.",
            showConfirmButton: false,
            timer: 1500
          });
          getInputValue.value = 100
    }else if(currentValue < 1){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Minimum number of food items added to cart is 1.",
                showConfirmButton: false,
                timer: 1500
              });
              getInputValue.value = 1
            }
    else{
        // get user data and token to check before add menu
        if(userTokenReal){
            // create data to get in local storage
        let calculateSubTotal = changedMenuList[getMenuDataIndex].price * currentValue
        let getUserCartData = userTokenReal[0].cart
        let createMenuData = {
            id:changedMenuList[getMenuDataIndex].id,
            image:changedMenuList[getMenuDataIndex].image,
            name:changedMenuList[getMenuDataIndex].name,
            category:changedMenuList[getMenuDataIndex].category,
            price:changedMenuList[getMenuDataIndex].price,
            qty:parseInt(getInputValue.value),
            subTotal:parseFloat(calculateSubTotal)
        }
            // if user cart not have data (first menu data)
            if(getUserCartData.length == 0){
                getUserCartData.push(createMenuData)
                localStorage.setItem("userDataStorage",JSON.stringify(getAllUserData))
                alertSuccessAddToCart()
            }else{
                // if cart have data we will check duplicate menu data (second data ++)
                let checkDuplicateMenuInCart = getUserCartData.filter((data) => data.id == changedMenuList[getMenuDataIndex].id)
                if(checkDuplicateMenuInCart.length == 0){
                    getUserCartData.push(createMenuData)
                    localStorage.setItem("userDataStorage",JSON.stringify(getAllUserData))
                    alertSuccessAddToCart()
                }else{
                    // update duplicate menu data and limit qty menu <= 100
                    let checkQtyData = parseInt(checkDuplicateMenuInCart[0].qty) >= 100 ? 100 : parseInt(getInputValue.value) + parseInt(checkDuplicateMenuInCart[0].qty) >= 100 ? 100 : parseInt(getInputValue.value) + parseInt(checkDuplicateMenuInCart[0].qty)
                    let updateData = {
                        id:changedMenuList[getMenuDataIndex].id,
                        image:changedMenuList[getMenuDataIndex].image,
                        name:changedMenuList[getMenuDataIndex].name,
                        category:changedMenuList[getMenuDataIndex].category,
                        price:changedMenuList[getMenuDataIndex].price,
                        qty:parseInt(checkQtyData),
                        subTotal:parseFloat(calculateSubTotal) + parseFloat(checkDuplicateMenuInCart[0].subTotal)
                    }             
                    const findIndexMenu = getUserCartData.findIndex((data) => data.id == updateData.id)
                    getUserCartData[findIndexMenu] = updateData
                    // alert message user after user add menu item to cart
                    if(parseInt(checkDuplicateMenuInCart[0].qty) >= 100){
                        checkQtyData = 100
                        alertWarningMaximumMenuInCart("max") 
                    }
                    else if(parseInt(getInputValue.value) + parseInt(checkDuplicateMenuInCart[0].qty) >= 100){
                        checkQtyData = 100
                        alertWarningMaximumMenuInCart("min",checkQtyData) 
                    }
                    else{
                         checkQtyData = parseInt(getInputValue.value) + parseInt(checkDuplicateMenuInCart[0].qty)
                         alertWarningMaximumMenuInCart("min",checkQtyData) 
                    }     
                    localStorage.setItem("userDataStorage",JSON.stringify(getAllUserData))
                }
            }
        }
        getInputValue.value = 1
    }
}


// if user not have account or have fake token (Sweet alert popup alert)
function alertNotHaveAccount(qty = null){
        Swal.fire({
            icon: "warning",
            title: "Please register or log in to order the food.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Register",
            denyButtonText: `Login`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              window.location = "/signup.html"
            } else if (result.isDenied) {
              window.location = "/login.html"
            }
          });
}

// if user add menu to cart success or maximum alert
function alertSuccessAddToCart(){
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully added to cart.",
            showConfirmButton: false,
            timer: 1500
          });
}

// if user add menu item we will check qty menuItem before alert message (update menu cart)
function alertWarningMaximumMenuInCart(minMaxKey,qty = null){
    console.log(qty)
    if(minMaxKey == "min" , qty != null){
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Successfully added to cart \n (${qty} / 100)`,
            showConfirmButton: false,
            timer: 1500
          });
    }
    else if(minMaxKey == "max"){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "The maximum number of food item additions is 100.",
            showConfirmButton: false,
            timer: 1500
          });
    }
    
}
// ---------------------------------------------------------------------------
//                   [ MANAGE ADD TO CART BTN] (Menu Box List BTN 2/3)
// ---------------------------------------------------------------------------
function addCartBtn(getMenuID){
    let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage")) || null
    let userTokenReal = checkUserTokenIsReal(getAllUserData)
    // if have token we will get user cart to add new menu data
    if(userTokenReal){
        let getUserCartData = userTokenReal[0].cart
        let getMenuDataIndex = changedMenuList.findIndex((data) => data.id == getMenuID)
        let checkMenuInCartHaveOrNot = getUserCartData.filter((data) => data.id == getMenuID ) 
        let createMenuData = {
            id:changedMenuList[getMenuDataIndex].id,
            image:changedMenuList[getMenuDataIndex].image,
            name:changedMenuList[getMenuDataIndex].name,
            category:changedMenuList[getMenuDataIndex].category,
            price:changedMenuList[getMenuDataIndex].price,
            qty:1,
            subTotal:changedMenuList[getMenuDataIndex].price
        }

        if(checkMenuInCartHaveOrNot.length == 0){
            Swal.fire({
                title: "Would you like to add this food item to your shopping cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ok"
              }).then((result) => {
                if (result.isConfirmed) {
                    getUserCartData.push(createMenuData)
                    localStorage.setItem("userDataStorage",JSON.stringify(getAllUserData))
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully added food items to cart.",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
              });
        }else{
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "You already have this food item in your shopping cart.",
                showConfirmButton: false,
                timer: 1500
              });
        }
       
    }
}
// ---------------------------------------------------------------------------
//                   [ MANAGE ADD TO WISHLIST BTN] (Menu Box List BTN 3/3)
// ---------------------------------------------------------------------------
function addWishlistBtn(getMenuID){
    let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage")) || null
    let userTokenReal = checkUserTokenIsReal(getAllUserData)
    // if have token we will get user cart to add new menu data
    if(userTokenReal){
        let getUserWishlistData = userTokenReal[0].wishlist
        let getMenuDataIndex = changedMenuList.findIndex((data) => data.id == getMenuID)
        let checkMenuInWishlistHaveOrNot = getUserWishlistData.filter((data) => data.id == getMenuID ) 
        let createMenuData = {
            id:changedMenuList[getMenuDataIndex].id,
            image:changedMenuList[getMenuDataIndex].image,
            name:changedMenuList[getMenuDataIndex].name,
            category:changedMenuList[getMenuDataIndex].category,
            price:changedMenuList[getMenuDataIndex].price,
            qty:1,
            subTotal:changedMenuList[getMenuDataIndex].price
        }
        if(checkMenuInWishlistHaveOrNot.length == 0){
            Swal.fire({
                title: "Would you like to add this food item to your wishlist.?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ok"
              }).then((result) => {
                if (result.isConfirmed) {
                    // add menu to user wishlist
                    getUserWishlistData.push(createMenuData)
                    localStorage.setItem("userDataStorage",JSON.stringify(getAllUserData))
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully added food items to wishlist.",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
              });
        }else{
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "You already have this food item in your wishlist.",
                showConfirmButton: false,
                timer: 1500
              });
        }
       
    }
}