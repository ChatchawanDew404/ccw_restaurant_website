function  checkUserToken(){
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

// show all menu data to Table
function showAllCartDataToTable(){
    // check token before work
     if(checkUserToken()){
        let getTableRow = document.querySelector('.cart .cart_container #cartTable tbody')
        let getUserData = checkUserToken()
        let getUserCartData = getUserData[0].cart
        let createColumnBx = getUserCartData.map((data) =>{
            return `
             <tr>
            <td><div class="image"><img src=${data.image} alt=""></div></td>
            <td><div class="name">${data.name}</div></td>
            <td><div class="category">${data.category}</div></td>
            <td><div class="price">${data.price}$</div></td>
            <td>
              <div class="quantity">
              <div class="del" onclick="manageQtyMenuItem('del',${data.id})">-</div>
              <input type="text" class="number qtyInput" id="qtyInput" value=${data.qty}>
              <div class="add" onclick="manageQtyMenuItem('add',${data.id})">+</div>
            </div>
          </td>
            <td><div class="subTotal">${(parseFloat(data.price) * data.qty).toFixed(2)}$</div></td>
            <td onclick ="deleteMenuItemInCart(${data.id})"><button class="deleteCart"><i class='bx bxs-trash'></i></button></td>
          </tr>
            `
        }).join("")
        
        if(getTableRow != null){
            getTableRow.innerHTML = ""
            getTableRow.innerHTML += createColumnBx 
            showTotalPrice()
        }
     }
}

// show subtotal , total , tax in html
function showTotalPrice(){
    // check token before work
   if(checkUserToken()){
   let getUserData = checkUserToken() 
   let getSubtotal = document.querySelector('.cart .cartCouponAndTotal .cartTotalBx .SubTotalDisplay')
   let getTotal = document.querySelector('.cart .cartCouponAndTotal .cartTotalBx .totalDisplay')
   let getTax = document.querySelector('.cart .cartCouponAndTotal .cartTotalBx .taxDisplay')
   let calculateSubTotal = 0
   let tax = (7/100)
   let getCalOfAllMenuInCart = getUserData[0].cart.map((data) =>{
            calculateSubTotal += data.price * data.qty
   })  
   const taxCalculate = calculateSubTotal * tax 
   getSubtotal.innerHTML = ''
   getTax.innerHTML = ''
   getTotal.innerHTML = ''
   getSubtotal.innerHTML = "$ " + parseFloat(calculateSubTotal).toFixed(2)
   getTax.innerHTML = "$ " + parseFloat(calculateSubTotal + taxCalculate).toFixed(2) + " (7%)"
   getTotal.innerHTML = "$ " + parseFloat(calculateSubTotal + taxCalculate).toFixed(2)
   }
}

// if user click + or - btn
function manageQtyMenuItem(getKey,idMenuItem){
    // check token before work
    if(checkUserToken()){
        let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage"))
        let getUserData = checkUserToken()
        let getUserDataIndex = getAllUserData.findIndex((data) => data.id == getUserData[0].id)
        let getUserCartData = getUserData[0].cart
        let getUserMenuIndex = getUserCartData.findIndex((data) => data.id == idMenuItem)
        if(getKey == 'add'){
            // check qty menu item > 100 ?
            if( getUserCartData[getUserMenuIndex].qty >=100){
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "The maximum number of food item additions is 100.",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }else{
                getUserCartData[getUserMenuIndex].qty += 1
            }
          }else if(getKey == 'del'){
            let getUserMenuIndex = getUserCartData.findIndex((data) => data.id == idMenuItem)
            // check qty menu item < 1 ?
            if( getUserCartData[getUserMenuIndex].qty <= 1){
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "The minimum number of food item additions is 1.",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }else{
                getUserCartData[getUserMenuIndex].qty -= 1
            }
          }
          
        // update user Data
        getAllUserData[getUserDataIndex] = getUserData[0]
        localStorage.setItem("userDataStorage",JSON.stringify(getAllUserData))
    }
}

// if user cancel menu in table
function deleteMenuItemInCart(menuID){
    if(checkToken()){
        let getUserData = checkToken()
    
        Swal.fire({
            title: "Do you want to cancel this food item in your Cart? ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                let getUserCart = getUserData[0].cart
                let cancelCartItem = getUserCart.filter((data) => data.id != menuID)
                let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage")) || null
                let findUserDataIndex = getAllUserData.findIndex((data) => data.id == getUserData[0].id)
                getAllUserData[findUserDataIndex].cart = cancelCartItem
                
                localStorage.setItem("userDataStorage" , JSON.stringify(getAllUserData))
            
              Swal.fire({
                title: "Cancel Success!",
                text: "Your menu has been cancelled.",
                icon: "success"
              });
            }
          });
    }
    // update Table
    showAllCartDataToTable()
}


document.addEventListener('click',() =>{
    showAllCartDataToTable()
})


window.addEventListener('load',()=>{
    showAllCartDataToTable()
})