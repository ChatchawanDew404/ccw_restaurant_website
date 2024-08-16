// ----------------- Testimonial Slide  (Testimonial.html)-----------------------
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