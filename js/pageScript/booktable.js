let playVideoFromImg = document.querySelector('.showVideo')
let videoContainer = document.querySelector('.videoContainer')
let closeVideo =  document.querySelector('.closeVideo')
// book table input and Btn 
let bookATableBtn = document.querySelector('.submitBooking')
let getnameInput = document.querySelector('#nameInput')
let getEmailInput = document.querySelector('#emailInput')
let getErrEmailTx = getEmailInput.parentElement.querySelector(".errTx");
let getDateInput = document.querySelector('#dateInput')
let getNumberInput = document.querySelector('#numberInput')
let getNumberTx = getNumberInput.parentElement.querySelector(".errTx");
let specialInput = document.querySelector('#specialInput')


function checkEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

function checkInput(){
    let getAllInput = document.querySelectorAll(".inputBx input")
    let checkAllInput = []
    getAllInput.forEach((inputData) =>{
        let getParentBox = inputData.parentElement
        let getErrTx = getParentBox.querySelector('.errTx') 
        if(inputData.value == "" || inputData.value == null){
            getErrTx.innerHTML = "Please fill in information"
            checkAllInput.push(false)
        }else{
             getErrTx.innerHTML = ""
             checkAllInput.push(true)
        }
    })
    let checkAllInputSuccess = checkAllInput.every(v => v === true)
    return checkAllInputSuccess
}

// show Video Popup
playVideoFromImg.addEventListener('click',()=>{
    videoContainer.classList.add('show')
})
closeVideo.addEventListener('click',()=>{
    videoContainer.classList.remove('show')
})


bookATableBtn.addEventListener('click',() =>{
      if(checkInput()){
        if (!checkEmail(getEmailInput.value)) {
         getErrEmailTx.innerHTML = "Please enter your email address correctly.";
  }
  else if(getNumberInput.value <1){
        getNumberTx.innerHTML = "The minimum table reservation is 1 person.";
  }
  else{
    Swal.fire({
        position: "center",
        icon: "success",
        text:"The staff will make a table reservation for you and notify you via the email you have sent.",
        title: "Your information has been sent to our staff.",
        showConfirmButton: false,
        timer: 5000
      });

      bookATableBtn.value = "" 
       getnameInput.value = "" 
       getEmailInput.value = "" 
       getDateInput.value = "" 
       getNumberInput.value = ""
  }
  }    
})


