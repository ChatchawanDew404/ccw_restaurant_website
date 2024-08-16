let getAllInputBox = document.querySelectorAll(".inputBx");
let submitSignupBtn = document.querySelector(".submitSignup");
// ---------------- 
let getFirstNameInput = document.querySelector("#firstnameInput");
let getLastNameInput = document.querySelector("#lastnameInput");
let getPwdInput = document.querySelector("#passwordInput");
let getEmailInput = document.querySelector("#emailInput");
let getErrEmailTx = getEmailInput.parentElement.querySelector(".errTx");
let getPhoneInput = document.querySelector("#phoneInput");
let getErrPhoneTx = getPhoneInput.parentElement.querySelector(".errTx");
let acceptTheOffer = document.querySelector("#acceptTheOffer");

// Prevents entry into the signup page after the user has finished logging in. (after signup)
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

function generateTokenToAuthentication(userData){
   let getUserDataID = userData.id
   let getAllUserData = JSON.parse(localStorage.getItem("userDataStorage")) || null
   if(getAllUserData != null){
         let checkTokenIsReal = getAllUserData.filter((data) => data.id == getUserDataID )
         if(checkTokenIsReal.length !=0){
             let createToken = localStorage.setItem("token",JSON.stringify(getUserDataID))
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

function generateIDUser() {
  let characterID = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let buildID = "";

  for (i = 0; i <= 13; i++) {
    let randomNumber = Math.floor(Math.random() * characterID.length);
    buildID += characterID[randomNumber];
  }
  return buildID;
}

function checkEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function checkAllInput() {
  let inputSuccess = [];
  getAllInputBox.forEach((allInputBx) => {
    let getErrTx = allInputBx.querySelector(".errTx");
    let getInputValue = allInputBx.querySelector("input");

    if (getInputValue.value == null || getInputValue.value == "") {
      getErrTx.innerHTML = "Please fill in information";
      inputSuccess.push(false);
    } else {
      getErrTx.innerHTML = "";
      inputSuccess.push(true);
    }
  });
  let successAll = inputSuccess.every((t) => t == true);
  return successAll;
}

function saveUserDataToStorage(userData, errEmailInputTx) {
  let getUserDataStorage =
    JSON.parse(localStorage.getItem("userDataStorage")) || null;
  let generateUserDataList = [];
  if (getUserDataStorage == null) {
    let generateUserDataList = [];
    generateUserDataList.push(userData);
    localStorage.setItem(
      "userDataStorage",
      JSON.stringify(generateUserDataList)
    );
    // generate token after sign up
    generateTokenToAuthentication(userData)
     //  reset All input value after finish
     resetInputValue(userData);
  } else {
    let checkDuplicateEmail = getUserDataStorage.filter(
      (data) => data.email == userData.email
    );
    if (checkDuplicateEmail.length != 0) {
      errEmailInputTx.innerHTML =
        "This email is already in the system. Please try again.";
    } else {
      errEmailInputTx.innerHTML = "";
      generateUserDataList = [...getUserDataStorage, userData];
      localStorage.setItem(
        "userDataStorage",
        JSON.stringify(generateUserDataList)
      );
      // generate token after sign up
      generateTokenToAuthentication(userData)
      //  reset All input value after finish
     resetInputValue();
    }
  }
}

function resetInputValue() {
    getFirstNameInput.value = ""
    getLastNameInput.value = ""
    getPwdInput.value = ""
    getEmailInput.value = ""
    getPhoneInput.value = ""
    acceptTheOffer.checked = false
}


submitSignupBtn.addEventListener("click", () => {
  // check all input if inpur is null
  checkAllInput();

  // after user key data we will check more detail
  if (checkAllInput()) {
    const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);

    // check email and phone
    let inputSuccess = [];
    if (!checkEmail(getEmailInput.value)) {
      getErrEmailTx.innerHTML = "Please enter your email address correctly.";
      inputSuccess.push(false);
    } else {
      getErrEmailTx.innerHTML = "";
      inputSuccess.push(true);
    }
    if (!isNumeric(getPhoneInput.value)) {
      getErrPhoneTx.innerHTML = "Please fill in numbers.";
      inputSuccess.push(false);
    } else if (
      getPhoneInput.value.length < 10 ||
      getPhoneInput.value.length > 10
    ) {
      getErrPhoneTx.innerHTML = `Please enter your phone number correctly (${getPhoneInput.value.length}/10).`;
      inputSuccess.push(false);
    } else {
      getErrPhoneTx.innerHTML = "";
      inputSuccess.push(true);
    }
    if (!acceptTheOffer.checked) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please press the button to accept our policy.",
        showConfirmButton: false,
        timer: 2500,
      });
      inputSuccess.push(false);
    } else {
    }

    // if input not have wrong data we will create userData
    let checkInputSuccess = inputSuccess.every((t) => t == true);
    if (checkInputSuccess) {
      let createUserData = {
        id: generateIDUser(),
        firstname: getFirstNameInput.value,
        lastname: getLastNameInput.value,
        email: getEmailInput.value,
        password: getPwdInput.value,
        phone: getPhoneInput.value,
        cart: [],
        wishlist: [],
      };

      // this is manage local storage to get or set all user data
      saveUserDataToStorage(createUserData, getErrEmailTx);
    }
  }
});
