// ----------------- Show All Chef (ourTeam.html) -----------------------
let slideChefBox = document.querySelector('.chef .chef_container_box')
let allChef = []

async function getChefDataJson(){
       try{
        let getData = await fetch('/json/chef.json')
        let convertData = await getData.json()
        allChef = convertData.allChef
       }catch(err){
              console.log(err)
       }
}

getChefDataJson().then(() =>{
    showChefDataInSlide()
})

function showChefDataInSlide(){
    slideChefBox.innerHTML = ""
       let createChefBox = allChef.map((data) =>{
        return `
         <div class="swiper-slide chefBox" id=${data.id}>
                            <div class="image"><img src=${data.image} alt=""></div>
                            <div class="content">
                                <div class="position">${data.position}</div>
                                <div class="username">${data.firstname} ${data.lastname}</div>
                            </div>
                            <div class="follow_chef">
                                <i class='bx bxl-facebook-circle'></i>
                                <i class='bx bxl-twitter' ></i>
                                <i class='bx bxl-instagram' ></i>
                            </div>
                            </div>
                    
        `
       }).join('')
       slideChefBox.innerHTML = createChefBox
}