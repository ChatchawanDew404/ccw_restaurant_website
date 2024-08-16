let getAccountDisplay = document.querySelector(".account .content")

window.addEventListener("load",displayAccountData())

// Authentication Token
function IfUserAlreadyLogout(){
    // Check if user logout We will not show this page to User. (delete token)
    let getToken = JSON.parse(localStorage.getItem("token")) || null
    let getAllUser = JSON.parse(localStorage.getItem("userDataStorage")) || null
    if(getToken == null){
        window.location.href = "/index.html"
    }
    

// If the user can come to this page Users must have a token that can verify their identity. (token is real ?)
    if(getToken != null && getAllUser != null){
        // Verify the token is true.
      let checkTokenIsReal = getAllUser.filter((data) => data.id == getToken)
      if(checkTokenIsReal == 0){
        window.location.href = "/index.html"
      }
    }
  }
IfUserAlreadyLogout()



function logoutHandle(){
    let checkToken = localStorage.getItem("token") || null
    if(checkToken != null){
        Swal.fire({
            title: "Do you want to log out now?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ok"
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                location.reload()
            }
          });
    }else{
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Something went wrong. Please contact us.",
            showConfirmButton: false,
            timer: 1500
          });
    }
}

function getDataFromToken(){
     let getToken = JSON.parse(localStorage.getItem("token")) || null
     let getAllUser = JSON.parse(localStorage.getItem("userDataStorage")) || null
     if(getToken != null && getAllUser != null){
        let getUserDataFromToken = getAllUser.filter((tokenID) => tokenID.id == getToken)
        return getUserDataFromToken[0] ;
     }
}

function displayAccountData (){
    let getData = getDataFromToken() || null;
    getAccountDisplay.innerHTML =""
    if(getData != null){
        let createUserContent = `
        <div class="image"><img src="/image/logo.png" alt=""></div>
            <ul class="account_data">
              <li><p>ID :</p><p>${getData.id}</p></li>
              <li><p>Firstname :</p><p>${getData.firstname}</p></li>
              <li><p>Lastname :</p><p>${getData.lastname}</p></li>
              <li><p>Email :</p><p>${getData.email}</p></li>
              <li><p>Phone :</p><p>${getData.phone}</p></li>
            </ul>
            <button class="logoutBtn" onclick="logoutHandle()">Logout</button>
        `
        getAccountDisplay.innerHTML = createUserContent
    }else{
        let createUserContent = `
        <div class="image"><img src="/image/logo.png" alt=""></div>
            <ul class="account_data">
              <li><p>ID :</p><p>---</p></li>
              <li><p>Firstname :</p><p>---</p></li>
              <li><p>Lastname :</p><p>---</p></li>
              <li><p>Email :</p><p>---</p></li>
              <li><p>Phone :</p><p>---</p></li>
            </ul>
            <button class="logoutBtn"> --- </button>
        `
        getAccountDisplay.innerHTML = createUserContent
    }
}
