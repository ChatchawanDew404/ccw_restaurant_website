let getPlaceOrderBtn = document.querySelector('.submitPayment')

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


function checkUserToAlert(){
    let getQuestion = document.querySelector('.loginRegisterQuestion')
    let getText =  getQuestion.querySelector('p')
    let getLink =  getQuestion.querySelector('a')

    if(checkUserToken()){
       getText.innerHTML = "You already have an account."
       getLink.innerHTML = "" 
       getQuestion.style.background = "#affdb2"
    }
}

function showAllMenuItemAndTotalPrice(){
    let getMenuListDisplay = document.querySelector('.checkout .rightBx .showYourOrder .yourOrderBx .showAllMenuPrice')
    let getMenuTotalDisplay = document.querySelector('.checkout .rightBx .showYourOrder .yourOrderBx .showTotal')
    let getSubTotalDisplay = document.querySelector('.checkout .rightBx .showYourOrder .yourOrderBx .showTotal .subTotalPrice')
    let getTotalDisplay = document.querySelector('.checkout .rightBx .showYourOrder .yourOrderBx .showTotal .totalPrice')

    if(checkUserToken()){
        let getUserData = checkUserToken()
        let getUserCartData = getUserData[0].cart
        let getSubTotalCal = 0
        let tax = (7/100)
        let getTotalCal = 0
        // reset all display
        getMenuListDisplay.innerHTML = ""
        getSubTotalDisplay.innerHTML = ""
        getTotalDisplay.innerHTML = ""
        // if user not have menuItem in cart
        if(getUserCartData.length == 0){
            let createListNotHaveMenuBx = `
            <li><p><span class="manuName">----</span></p><span class="price">0.00$</span></li>
            <li><p><span class="manuName">----</span></p><span class="price">0.00$</span></li>
            <li><p><span class="manuName">----</span></p><span class="price">0.00$</span></li>
            `
            getMenuListDisplay.innerHTML = createListNotHaveMenuBx
            getSubTotalDisplay.innerHTML =  "0.00 $"
             getTotalDisplay.innerHTML = "0.00 $"
        }else{
             let createListMenuBx = getUserCartData.map((data) =>{
                getSubTotalCal = getSubTotalCal + parseFloat(data.price).toFixed(2) * parseInt(data.qty)
                 return `
                 <li><p><span class="manuName">${data.name}</span><span class="qty">x ${data.qty} $</span></p><span class="price">${parseFloat(data.price * data.qty).toFixed(2)}$</span></li>
                 `
             }).join('')
             getTotalCal = getSubTotalCal * tax
             getMenuListDisplay.innerHTML = createListMenuBx
             getSubTotalDisplay.innerHTML = parseFloat(getSubTotalCal).toFixed(2) + " $"
             getTotalDisplay.innerHTML = parseFloat(getSubTotalCal + getTotalCal).toFixed(2) + " $"
        }
    }else{
             getSubTotalDisplay.innerHTML =  "0.00 $"
             getTotalDisplay.innerHTML = "0.00 $"
    }
}

// if user login we will show user data (first - lastname,email,phone,...)
function showUserLoginDataToForm(){
     let getFirstNameInput = document.querySelector('#firstNameInput')
     let getLastNameInput = document.querySelector('#LastNameInput')
     let getEmailInput = document.querySelector('#EmailInput')
     let getPhoneInput = document.querySelector('#PhoneInput')

     if(checkUserToken()){
        let getUserData = checkUserToken()[0]
        getFirstNameInput.value = getUserData.firstname
        getLastNameInput.value = getUserData.lastname 
        getEmailInput.value = getUserData.email
        getPhoneInput.value = getUserData.phone
     }
}

function checkInput(){
    let getAllInput = document.querySelectorAll(".inputBx input")
    let checkAllInput = []
    getAllInput.forEach((inputData) =>{
        let getParentBox = inputData.parentElement
        let getErrTx = getParentBox.querySelector('.errTx') 
        if(inputData.value == "" || inputData.value == null){
            getErrTx.innerHTML = "Please fill in all information completely."
            checkAllInput.push(false)
        }else{
             getErrTx.innerHTML = ""
             checkAllInput.push(true)
        }
    })
    let checkAllInputSuccess = checkAllInput.every(v => v === true)
    return checkAllInputSuccess
}

document.addEventListener('click',() =>{
    checkUserToAlert()
    showAllMenuItemAndTotalPrice()
    showUserLoginDataToForm()
})


window.addEventListener('load',()=>{
    checkUserToAlert()
    showAllMenuItemAndTotalPrice()
    showUserLoginDataToForm()
})


// if user click place order Btn we will check account / menuItem / form
getPlaceOrderBtn.addEventListener('click',() =>{
    // check user have account or not
    if(checkUserToken()){
        let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage"))
        let getUserData = checkUserToken()[0]
        // check user have menuItem in cart or not
        if(getUserData.cart.length == 0){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "You have no food items to order.",
                showConfirmButton: false,
                timer: 1500
              });
        }else{
// Check if the user has filled in all the information.
if(checkInput()){

    Swal.fire({
        title: "Are you sure you want to order food?",
        text: "If you press confirm, the order will be processed and cannot be changed.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "confirm"
      }).then((result) => {
        if (result.isConfirmed) {
            let getCompanyNameInput = document.querySelector('#CompanyNameInput')
            let getContryNameInput = document.querySelector('#ContryNameInput')
            let getStreedAddressInput = document.querySelector('#StreedAddressInput')
            let getTownOrCityInput = document.querySelector('#TownOrCityInput')
            let getStateInput = document.querySelector('#StateInput')
            let getZipInput = document.querySelector('#ZipInput')

            let getUserDataIndex = getAllUserData.findIndex((data) => data.id == getUserData.id)
            // clear menu in cart after user place order
            getUserData.cart = []
            getAllUserData[getUserDataIndex] = getUserData
            // update storage
            localStorage.setItem("userDataStorage", JSON.stringify(getAllUserData))
             getCompanyNameInput.value = "" 
             getContryNameInput.value = ""
             getStreedAddressInput.value = "" 
             getTownOrCityInput.value = ""
             getStateInput.value = "" 
             getZipInput.value = ""
          Swal.fire({
            title: "Your order has been successfully processed.",
            icon: "success"
          });
        }
      });
}else{
    Swal.fire({
        position: "center",
        icon: "error",
        title: "The information is incomplete. Please check the information again.",
        showConfirmButton: false,
        timer: 1500
      });
}
        }
    }else{
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Your order cannot be completed because you do not have an account.",
            showConfirmButton: false,
            timer: 1500
          });
    }
 
})