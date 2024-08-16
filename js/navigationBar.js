let generateNavigationBar = document.querySelector('nav')

function stickBar(){
    if (window.pageYOffset >= 30) {
        generateNavigationBar.classList.add("sticky")
      } else {
        generateNavigationBar.classList.remove("sticky");
      }
}

function  checkToken(){
    let getToken = JSON.parse(localStorage.getItem("token")) || null
    let getAllUserData = JSON.parse(localStorage.getItem('userDataStorage')) || null
    if(getToken != null && getAllUserData != null){
        let checkRealToken = getAllUserData.filter((data) => data.id == getToken)
        if(checkRealToken.length != 0){
            // return userData 
             return checkRealToken;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

function manageShowBtnNavigationBar(){
    let haveToken =  checkToken()

    // gei signup login container and authentication box
    let getSignupAndLoginBtnBox = document.querySelector(".signup_And_login_BtnBx")
    let getAuthenticationBtnBox = document.querySelector(".authentication_uer_box")
    if(haveToken){
        getAuthenticationBtnBox.classList.add("haveToken")
        getSignupAndLoginBtnBox.classList.add("haveToken")
    }else{
        getSignupAndLoginBtnBox.classList.remove("haveToken")
        getAuthenticationBtnBox.classList.remove("haveToken")
    }
}

function generateNavigation(){
  generateNavigationBar.innerHTML = `
  <div class="container">
            <a href="" class="logo">
                <img src="./image/logo.png" alt=""> <p>CCW KITCHEN</p></a>

          <div class="rightBx">

            <ul class="navBx">
                <li class="navlink"><a href="/index.html">Home</a></li>
                <li class="navlink"><a href="/about.html">About</a></li>
                <li class="navlink">             
                            <a href="/service.html">Service</a>             
                </li>
                <li class="navlink"><a href="/menu.html">Menu</a></li>
                <li class="navlink dropdownClick">
                    <p class="page">Pages <i class='bx bxs-down-arrow' ></i></p>
                     <div class="dropdownBox">
                        <ul>
                            <li><a href="/outTeam.html">Our Team</a></li>
                            <li><a href="/testimonial.html">Testimonial</a></li>
                            <li><a href="/booktable.html">Booking</a></li>
                        </ul>
                     </div>
                </li>
                <li class="navlink"><a href="/contact.html">Contact</a></li>
            </ul>

            <div class="burgerBar burgetBarClick" onclick="controlAllBtnNavigation('navBurger')">
                <i class='bx bx-menu'></i>
                <i class='bx bx-x'></i>
            </div>

            <div class="signup_And_login_BtnBx">
                    <a href="/signup.html" class="btn signUpBtn">Signup</a>
                    <a href="/login.html" class="btn loginBtn">login</a>
            </div>

            <div class="authentication_uer_box">
                <div class="cart_Bx" onclick="controlAllBtnNavigation('cart')">
                    <span class="cartNum">0</span>
                    <i class='bx bxs-cart-alt cartIcon'></i>
                    <div class="closeSlideBtn"><i class='bx bx-x'></i></div>
                </div>
                <div class="wishlist_Bx" onclick="controlAllBtnNavigation('wishlist')">
                    <span class="wishlistNum">0</span>
                    <i class='bx bxs-heart wishlistIcon'></i>
                    <div class="closeSlideBtn"><i class='bx bx-x'></i></div>
                </div>
                <a href="account.html" class="userAcc_Bx">
                    <i class='bx bxs-user' ></i>
                </a>
            </div>

            <div class="cart_slide">
                <div class="cart_Details">
                   ${showCartItem()}
                </div>

                <div class="showTotalMenu">
                    <p class="tx">Sub Total</p>
                    <p class="price">0.00$</p>
                </div>

                <div class="btnBox">
                    <a href="/viewcart.html">Cart</a>
                    <a href="/checkout.html">Checkout</a>
                </div>
            </div>


            <div class="wishlist_slide">

                <div class="wishlist_detail">
                      ${showWishlistItem()}
                    <div class="wishlistMenu">
                        <div class="image"><img src="./image/menuImg/burger1.png" alt=""></div>
                        <div class="content">
                            <div class="menuName">
                                <p class="name">Chicken Burger</p>
                                <p class="category">burger</p>
                                <p class="price">$0</p>
                            </div>
                            <div class="cancel_wishlist"><i class='bx bx-x'></i></div>
                        </div>
                    </div>     

                </div>
                       <a href="/wishlist.html" class="viewWishlistBtn">View Wishlist</a>
            </div>

          </div>
        </div>
  `
  //the function will manage display (signup, login, account, cart, wishlist) btn in right navbar 
  manageShowBtnNavigationBar()
}

function controlAllBtnNavigation(keyCodeBtn){
  let burgerBtnClick = document.querySelector('.burgerBar')
  let navBar = document.querySelector('.navBx')
  let cartBtn = document.querySelector('.cart_Bx')
  let closeCartBarBtn = document.querySelector('.cart_Bx .closeSlideBtn')
  let cartBar = document.querySelector('.cart_slide')
  let wishlistBtn = document.querySelector('.wishlist_Bx')
  let wishlistSlide = document.querySelector('.wishlist_slide')
  let closeWishlistBarBtn = document.querySelector('.wishlist_Bx .closeSlideBtn')

  if(keyCodeBtn == "navBurger"){
    // show slide if use click btn
    burgerBtnClick.classList.toggle('active')
    navBar.classList.toggle('active')
    // remove show slide
    cartBtn.classList.remove('active')
    cartBar.classList.remove('active')
    wishlistSlide.classList.remove('active')
    wishlistBtn.classList.remove('active')

  }else if(keyCodeBtn =="cart"){
    // show slide if use click btn
    cartBtn.classList.toggle('active')
    cartBar.classList.toggle('active')
    // remove show slide
    wishlistSlide.classList.remove('active')
    wishlistBtn.classList.remove('active')
    burgerBtnClick.classList.remove('active')
    navBar.classList.remove('active')
  }
  else if(keyCodeBtn == "wishlist"){
    // show slide if use click btn
    wishlistSlide.classList.toggle('active')
    wishlistBtn.classList.toggle('active')
    // remove show slide
    cartBtn.classList.remove('active')
    cartBar.classList.remove('active')
    burgerBtnClick.classList.remove('active')
    navBar.classList.remove('active')
  }
}

// ---------------------------------------------------------------------------
//                   [ MANAGE CART ITEM IN NAVIGATION] 
// ---------------------------------------------------------------------------

// -------------- [ Cart Num ]---------------------
function showQtyMenuCart(){
     if(checkToken()){
        let getUserData = checkToken()
        let getCartNum = document.querySelector('.cartNum')
        let totalQtyMenuCart = getUserData[0].cart.reduce((sumData , getData) => {return sumData + parseInt(getData.qty)},0)
        getCartNum.innerHTML = totalQtyMenuCart
     }
} 

// --------- [Show Cart Item & Sub Total] -------------------
function showCartItem(){
   if(checkToken()){
    let getUserData = checkToken()
    let cartContainer = document.querySelector('nav .cart_slide .cart_Details')
    let subTotalMenuBx = document.querySelector('nav .cart_slide .showTotalMenu .price ')
    let subTotal = 0
    let createCartBox = getUserData[0].cart.map((data) =>{
        subTotal += parseFloat(data.price).toFixed(2) * parseInt(data.qty)
        return `
         <div class="cartMenu" id=${data.id}>
                            <div class="image"><img src=${data.image} alt=""></div>
                            <div class="content">
                                <div class="menuName">
                                    <p class="name">${data.name}</p>
                                    <p class="category">${data.category}</p>
                                </div>
                                <p class="quantity">x ${data.qty}</p>
                                <p class="price">$ ${(data.price * data.qty).toFixed(2)}</p>
                                <i class='bx bxs-trash' onclick="cancelMenuItem(${data.id})"></i>
                            </div>
                        </div>
       ` 
    }).join('')
    if(cartContainer != null){
        cartContainer.innerHTML = ""
        subTotalMenuBx.innerHTML =""
        cartContainer.innerHTML += createCartBox
        subTotalMenuBx.innerHTML = "$" + subTotal.toFixed(2)
    }
   }
}

// --------- [Cancel Menu Item] -------------------
function cancelMenuItem(getMenuID){
    if(checkToken() && getMenuID){
        let getUserData = checkToken()

        Swal.fire({
            title: "Do you want to cancel this food item in your cart? ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage")) || null
                let findIndexUser = getAllUserData.findIndex((data) => data.id == getUserData[0].id)
                let deleteCartItem = getUserData[0].cart.filter((data) => data.id != getMenuID)
                getUserData[0].cart = deleteCartItem
                getAllUserData[findIndexUser] = getUserData[0]
                
                // update user Data
                localStorage.setItem("userDataStorage", JSON.stringify(getAllUserData))

              Swal.fire({
                title: "Cancel Success!",
                text: "Your menu has been cancelled.",
                icon: "success"
              });
            }
          });
    }
}

// ---------------------------------------------------------------------------
//                   [ MANAGE WISHLIST ITEM IN NAVIGATION] 
// ---------------------------------------------------------------------------

// --------------[ Wishlist Num ]-------------------
function showQtyMenuWishlist(){
    if(checkToken()){
        let getUserData = checkToken()
       let getWishlistNum = document.querySelector('.wishlistNum')
       getWishlistNum.innerHTML = getUserData[0].wishlist.length
    }
} 

// --------- [Show Wishlist Item] -------------------
function showWishlistItem(){
    if(checkToken()){ 
        let getUserData = checkToken()
        let wishlistContainer = document.querySelector('nav .wishlist_slide .wishlist_detail')
        let getWishlistUserData = getUserData[0].wishlist
        let createWishlistBx = getWishlistUserData.map((data) =>{
            return  `
             <div class="wishlistMenu" id=${data.id}>
                        <div class="image"><img src=${data.image} alt=""></div>
                        <div class="content">
                            <div class="menuName">
                                <p class="name">${data.name}</p>
                                <p class="category">${data.category}</p>
                                <p class="price">$${data.price}</p>
                            </div>
                            <div class="cancel_wishlist" onclick="cancelWishlist(${data.id})"><i class='bx bx-x'></i></div>
                        </div>
                    </div>   `
            
        }).join("")

        if(wishlistContainer != null){
            wishlistContainer.innerHTML = ""
            wishlistContainer.innerHTML += createWishlistBx
        }
   }
}

// --------- [Cancel Wishlist Item] -------------------
function cancelWishlist(getWishlistID){
  if(checkToken()){
    let getUserData = checkToken()

    Swal.fire({
        title: "Do you want to cancel this food item in your wishlist? ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
            let getUserWishlist = getUserData[0].wishlist
            let cancelWishlistItem = getUserWishlist.filter((data) => data.id != getWishlistID)
            let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage")) || null
            let findUserDataIndex = getAllUserData.findIndex((data) => data.id == getUserData[0].id)
            getAllUserData[findUserDataIndex].wishlist = cancelWishlistItem
            
            localStorage.setItem("userDataStorage" , JSON.stringify(getAllUserData))
        
          Swal.fire({
            title: "Cancel Success!",
            text: "Your menu has been cancelled.",
            icon: "success"
          });
        }
      });
}

  }





// if user click screen we will update qty cart and wishlist in navigation bars realtime
document.addEventListener('click',() =>{
    showQtyMenuCart()
    showCartItem()
    showQtyMenuWishlist()
    showWishlistItem()
})

window.addEventListener('load',()=>{
    stickBar()
    generateNavigation()
    showQtyMenuCart()
    showCartItem()
    showQtyMenuWishlist()
    showWishlistItem()
})

window.addEventListener('scroll',() =>{
    stickBar()
})