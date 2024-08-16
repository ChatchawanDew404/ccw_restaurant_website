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

function showAllWishlistDataToTable(){
    if(checkUserToken()){
       let getTableRow = document.querySelector('.wishlist .wishlist_Box #wishlistTable tbody')
       let getUserData = checkUserToken()
       let getUserWishlistData = getUserData[0].wishlist
       let createColumnBx = getUserWishlistData.map((data) =>{
           return `
           <tr>
              <td>
                <div class="image"><img src=${data.image} alt=""></div>
              </td>
              <td class=""><span>${data.name}</span></td>
              <td class="categoryFood"><span>${data.category}</span></td>
              <td class="priceFood"><span>${data.price}$</span></td>
              <td onclick="deleteMenuItemInWishlist(${data.id})"><button class="deleteWishlist"><i class='bx bxs-trash'></i></button></td>
            </tr>
           `
       }).join("")
       
       if(getTableRow != null){
           getTableRow.innerHTML = ""
           getTableRow.innerHTML += createColumnBx 
       }
    }
}

function deleteMenuItemInWishlist(getWishlistID){
    // check token before work
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
    // update Table
    showAllWishlistDataToTable()
}

document.addEventListener('click',() =>{
    showAllWishlistDataToTable()
})


window.addEventListener('load',()=>{
    showAllWishlistDataToTable()
})