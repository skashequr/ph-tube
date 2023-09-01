const handleCategory = async () => {
    const resp = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await resp.json();
    // console.log(data)
    const id = data.data


  data.data.forEach(element => {
    // console.log(element.category_id)
    const itemCatagory = document.getElementById("itemCatagory");
    const div = document.createElement("div");
    div.innerHTML = `<button class="bg-[#C0C0C0] p-4 rounded-xl text-black" onclick="handleLoadNews(${element.category_id})">${element.category}</button>` 
    itemCatagory.appendChild(div);
    
  });
  
}


const handleLoadNews = async (CatagoryID) =>{


    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${CatagoryID}`)
    const data = await response.json()
    // console.log(CatagoryID)
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML="";
    
    // console.log(data.data.length)           
    data.data.forEach(element => {
        // console.log(element.authors[0].profile_picture)

        const timeConvertNumber = parseInt(element.others.posted_date?element.others.posted_date:"");
        // console.log(timeConvertNumber)
        const time = secondsToHoursMinutes(timeConvertNumber)
        // if (!typeof time.hours === "number"){
        // //   // time.hours =""
        // console.log(time.hours)
        //   const watchTime = document.getElementById("watch-time")
        //   watchTime.classList.remove("hidden")
        // }
       
        const noDataFound = document.getElementById("noDataFound");
        noDataFound.innerHTML=""
        const div = document.createElement("div");
    div.innerHTML=`
   <div>
    <div class="relative flex max-w-[24rem] h-[400px] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
    <div class="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
      <img
        src="${element.thumbnail}"
        alt="ui/ux review check" class="rounded-2xl h-52 w-80"
      />
      <div class="flex justify-center" > <p id="watch-time" class=" bg-black text-white p-0 rounded-md text-center absolute bottom-3 right-10">${time.hours?time.hours:""} ${time.hours?"hrs":""} ${time.minutes?time.minutes:""} ${time.minutes?"min ago":""}</p></div>
    </div>
    <div class="flex p-5 item-center gap-5">
    <div class="avatar">
    <div class="w-12 h-12 rounded-full">
      <img src="${element.authors[0].profile_picture}" />
    </div>
  </div>
        <div >
            <div class="p-0" >
                <h4 class="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                ${element.title}
                </h4>
            <div class="flex items-center gap-4" >
            <div><p>${element.authors[0].profile_name}</p></div>
            <img src="${element.authors[0].verified? 'veryfi.svg' : ''}">

              </div>
              <p><span>${element.others.views}</span> views</p>
        </div>
    </div>
  </div>
   </div>
    `
    // ./86-PHero-tube-main/Design in png/veryfi.svg            ${element.others.views}
    cardContainer.appendChild(div);
    
    secondsToHoursMinutes(element.others.posted_date)

   
    });
    
        if (data.data.length === 0) {
            const noDataFound = document.getElementById("noDataFound");
            noDataFound.innerHTML=""
            const div = document.createElement("div")
            
            div.innerHTML = `
            <div class="grid grid-cols-1 items-center justify-center flex-col mt-[200px]">
            <div class="flex justify-center items-center">
            <img src="./86-PHero-tube-main/Design in png/camm.svg" alt="">
            </div>
            <div>
            <h1 class="text-center mt-5">Oops!! Sorry, There is no <br> content here</h1>
            </div>
            </div>
            `
            noDataFound.appendChild(div)
            console.log(div)
        } 
    
}


// convert to Seconfd function 
const secondsToHoursMinutes = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  
  return { hours, minutes };
}
handleCategory()
handleLoadNews(1000)






