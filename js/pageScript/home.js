// -------------- Show All Menu popular (index.html) --------------------
let slideMenuBox = document.querySelector('.menu .popularMenu .swiper-wrapper') 
let popularMenuData = []


async function getJsonData(){
    try{
        let responseData = await fetch('/json/foodData.json')
        let convertData = await responseData.json()
        popularMenuData = convertData.allFood.filter((dataRate) => parseFloat(dataRate.rate) == 5
       )
    }
    catch(err){
        console.log(data)
    }
}

getJsonData().then(() =>{
    showPopularMenu()
})

function showPopularMenu(){
    slideMenuBox.innerHTML = ""
   let createPopularMenuBox = popularMenuData.map((data) =>{
        return `
        <div class="swiper-slide menuBox">
<div class="image"><img src=${data.image} alt=""></div>
<div class="content">
    <div class="categoryMenu">${data.category}</div>
    <div class="nameMenu">${data.name}</div>
    <p class="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, fugiat.</p>
    <div class="priceMenu">${data.price} $</div>
    <div class="rateMenu">
        <i class='bx bxs-star'></i>  
        <i class='bx bxs-star'></i>    
        <i class='bx bxs-star'></i>    
        <i class='bx bxs-star'></i>     
        <i class='bx bxs-star'></i>   
    </div>
</div>
</div>
        `
    }).join('')

    slideMenuBox.innerHTML = createPopularMenuBox
}


// ----------------- Chef Slide (index.html) -----------------------
let slideChefBox = document.querySelector('.chef .chef_slide_box .chefMember .swiper-wrapper')
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


// ----------------- Testimonial Slide  (index.html) -----------------------
let slideTestimonialBox = document.querySelector('.testimonial .testimonial_slide_box .ourTestimonial .swiper-wrapper')
let allTestimonial = []

async function getTestimonialData(){
    try{
        let getData = await fetch('/json/testimonial.json')
        let convertData = await getData.json()
        allTestimonial = convertData.testimonialData

    }catch(err){
        console.log(err)
    }
}

getTestimonialData().then(() =>{
    showTestimonialData()
})

function showTestimonialData(){
    slideTestimonialBox.innerHTML = ""
   let createTestimonialBox = allTestimonial.map((data) =>{
        return `
           <div class="swiper-slide testimonialBox" id=${data.id}>
                                <div class="quoteIcon"><i class='bx bxs-quote-left'></i></div>
                                <div class="content">
                                    <p class="description_text">${data.comment}</p>
                                    </div>
                                <div class="user">
                                    <div class="image"><img src=${data.image} alt=""></div>
                                    <div class="desc">
                                        <h3>${data.username}</h3>
                                        <p>${data.MembershipLevel}</p>
                                    </div>
                                </div>
                        </div>
        `
    })

    slideTestimonialBox.innerHTML = createTestimonialBox
}