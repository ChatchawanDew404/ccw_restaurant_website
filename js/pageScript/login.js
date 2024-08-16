let getAllInputBox = document.querySelectorAll(".login .inputBx")
let submitLoginBtn = document.querySelector(".submitLogin")
let getEmailInput = document.querySelector("#emailInput")
let getPwdInput = document.querySelector("#pwdInput")
let getEmailInputErrTx = getEmailInput.parentElement.querySelector(".errTx")
let getPwdInputErrTx = getPwdInput.parentElement.querySelector(".errTx")

// Prevents entry into the login page after the user has finished logging in. (after login)
function IfUserAlreadyRegister(){
    // Check if there is a token or not.
    let getToken = JSON.parse(localStorage.getItem("token")) || null
    let getAllUser = JSON.parse(localStorage.getItem("userDataStorage")) || null
    if(getToken != null && getAllUser != null){
        // Verify the token is true.
      let checkTokenIsReal = getAllUser.filter((data) => data.id == getToken)
      if(checkTokenIsReal != 0){
        window.location.href = "/index.html"
      }
    }
  }
  
  IfUserAlreadyRegister()
  


function generateTokenToAuthentication(){
    let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage")) || null
    if(getAllInputBox != null){
        let checkEmail = getAllUserData.filter((data) => data.email == getEmailInput.value)
        if(checkEmail.length != 0){
            let getUserID = checkEmail[0].id
            let generateToken = localStorage.setItem("token", JSON.stringify(getUserID))
            window.location.href = "/index.html"
            location.reload();
        }else{
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Something went wrong. Please contact the staff at the contact page.",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
}

function checkAllInput(){
    let inputSuccess = []
   getAllInputBox.forEach((inputBx) =>{
    let getInputBx = inputBx.querySelector("input")
    let getErrTx = inputBx.querySelector(".errTx")
    
    if(getInputBx.value == "" || getInputBx.value == null){
        getErrTx.innerHTML = "Please fill in information";
       inputSuccess.push(false);
    }
    else{
        getErrTx.innerHTML = ""
        inputSuccess.push(true);
    }
   })
   let checkInputSuccess = inputSuccess.every((t) => t == true)
   return checkInputSuccess;
}


submitLoginBtn.addEventListener("click",() =>{
   checkAllInput()

   if(checkAllInput()){
       let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage")) || null
       if(getAllUserData != null){
        // convert string data to object array
            let checkEmail = getAllUserData.filter((data) => data.email == getEmailInput.value)
            if(checkEmail.length == 0){
               getEmailInputErrTx.innerHTML = "Invalid email Please try again."
            }else{
               let checkPassword = getAllUserData.filter((data) => data.email == getEmailInput.value && data.password == getPwdInput.value)
                getEmailInputErrTx.innerHTML = ""
               if(checkPassword.length == 0){
                getPwdInputErrTx.innerHTML = "Invalid password Please try again."
               }else{
                getPwdInputErrTx.innerHTML = ""
                //   create token to authentication
                generateTokenToAuthentication()
               }
            }
       }
       else{
        getEmailInputErrTx.innerHTML = "Invalid email Please try again."
        getPwdInputErrTx.innerHTML = "Invalid password Please try again."
       }
   }
})