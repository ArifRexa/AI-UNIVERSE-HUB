/*
https://openapi.programming-hero.com/api/ai/tools

https://openapi.programming-hero.com/api/ai/tool/01

*/

//============================ fetching some data ===========================
const loadData = async () => {
    const spinner = document.getElementById("spinner")
    spinner.classList.remove('hidden')
    document.getElementById("showAllData").classList.add("hidden");
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tools`
        const res = await fetch(url);
        const data = await res.json();
        spinner.classList.add('hidden')
        document.getElementById("showAllData").classList.remove("hidden");
        displayData(data.data.tools.slice(0, 6))
    }
    catch (err) {
        console.log(err)
    }
}

//============================ fetching all data ===========================
const loadDataa = async () => {
    const spinner = document.getElementById("spinner")
    spinner.classList.remove('hidden')
    // document.getElementById("showAllData").classList.add("hidden");
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tools`
        const res = await fetch(url);
        const data = await res.json();
        spinner.classList.add('hidden')
        // document.getElementById("showAllData").classList.remove("hidden");
        displayData(data.data.tools);
    }
    catch (err) {
        console.log(err)
    }
}

//============================ Display All Data ===========================
function displayData(data) {
    const div = document.getElementById("product-container")
    div.innerHTML = ""

    data.forEach(element => {
        const product = document.createElement('div')
        product.innerHTML = `
        <div class="card lg:w-96 md:w-80 w-72  bg-base-100 shadow-xl border h-[470px]">
            <figure class="px-5 pt-5">
                <img src=${element.image} alt="Shoes" class="rounded-xl lg:w-80 md:w-72 lg:h-48 md:h-44 h-40" />
            </figure>
            <div class="card-body">

                <div id="featurs-section">
                    <h2 class="card-title">Features</h2>
                    <ol id="featurs-container" class="list-decimal list-inside ">
                    
                    ${element.features[0] ? `<li>${element.features[0]}</li>` : ""}
                    ${element.features[1] ? `<li>${element.features[1]}</li>` : ""}
                    ${element.features[2] ? `<li>${element.features[2]}</li>` : ""}
                    ${element.features[3] ? `<li>${element.features[3]}</li>` : ""}
                    </ol> 
                </div>


                <hr>
                <div class="flex justify-between items-end gap-2">
                    <div class = " absolute bottom-8 left-8">
                        <h2 class="card-title mt-5">${element.name}</h2>
                        <div class="flex justify-center items-center gap-2">
                            <i class="fa-regular fa-calendar-days"></i>
                            <p>${element.published_in}</p>
                        </div>
                    </div>
                    <div class="card-actions absolute bottom-8 right-8">
                        <label onclick = 'loadDetails(${element.id})' class="btn btn-circle bg-orange-100 border-0" for="my-modal-32">
                        
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 12H19M12 5l7 7-7 7" />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>
        </div>`

        div.appendChild(product)
    });
    const spinner = document.getElementById("spinner")
    spinner.classList.add('hidden')
}

//============================ Fetching Details of every single data ===========================
const loadDetails = async id => {
    let idnt;
    // console.log(id.toString().length);
    if (id.toString().length < 2) {
        idnt = '0' + id;
    }
    else idnt = id;
    const url = `https://openapi.programming-hero.com/api/ai/tool/${idnt}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
}

//============================ Display Details in Modal of every single data ===========================
const displayDetails = data => {

    const modalContainer = document.getElementById("modal-container")
    modalContainer.innerHTML = `
    <div class="flex justify-center">
        <div class="flex md:justify-around md:items-stretch gap-4 py-9 lg:flex-nowrap flex-wrap-reverse w-[300px] md:w-fit">
        
        
            <div class="bg-red-50 p-5 rounded-lg border border-red-300  lg:w-1/2 md:w-full  w-72">
                <h3 id="modal-header" class="text-lg font-bold mb-5">${data.description}</h3>

                <div class="flex justify-start items-stretch md:flex-wrap flex-wrap xl:flex-nowrap gap-3 text-center">
                    <div class="bg-white rounded-lg text-emerald-600 font-bold flex items-center">
                        <p class=" px-5 py-4 text-sm"> ${data?.pricing ? data.pricing[0].price : ""} Basic </p>
                        
                    </div>
                    <div class="bg-white   rounded-lg text-orange-600 font-bold flex items-center">
                    <p class=" px-5 py-4 text-sm"> ${data?.pricing ? data.pricing[1].price : ""}  Pro </p>

                    </div>
                    <div class="bg-white   rounded-lg text-rose-500 font-bold flex items-center">
                        <p class=" px-5 py-4 text-sm"> ${data?.pricing ? data.pricing[2].price : ""}  Pro </p>
                    </div>
                </div>
            
                <div class=" mt-5">
                    <div class="flex justify-start items-start xl:flex-nowrap flex-wrap gap-2">
                        <div>
                            <h3 class="text-lg font-bold">Features</h3>
                            <ul class="list-disc list-inside">
                                ${Object.values(data.features).map(feature => `
                                    <li class="text-sm">  ${feature.feature_name}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold">Integrations</h3>
                            <ul class="list-disc list-inside text-sm">
                                ${data.integrations == null ? "No Data Found" : data.integrations[0] ? `<li>${data.integrations[0]}</li>` : ""}
                                ${data.integrations == null ? "" : data.integrations[1] ? `<li>${data.integrations[1]}</li>` : ""}
                                ${data.integrations == null ? "" : data.integrations[2] ? `<li>${data.integrations[2]}</li>` : ""}
                                ${data.integrations == null ? "" : data.integrations[3] ? `<li>${data.integrations[3]}</li>` : ""}
                                ${data.integrations == null ? "" : data.integrations[4] ? `<li>${data.integrations[4]}</li>` : ""}
                                ${data.integrations == null ? "" : data.integrations[5] ? `<li>${data.integrations[5]}</li>` : ""}
                            </ul>
                        </div>
                    
                    
                    </div>
                    
                </div>
            
            </div>
            <div class="lg:w-1/2 md:w-full w-72 flex items-center  flex-col card  bg-base-100  md:px-5 px-2 md:py-8 py-6 shadow-xl border">
                <figure class="px-2  relative">
                    <img src=${data.image_link[0]} alt="Shoes" class="rounded-xl" />

                    ${data.accuracy.score ? `<p class="absolute right-4 top-2 bg-red-500 px-3 py-1 text-sm text-white rounded-lg">${data.accuracy.score * 100}% accuracy</p>` : ""}
                </figure>
                <h3 class="text-lg font-bold text-center mt-5">${data.input_output_examples == null ? "No Data Found" : data.input_output_examples[0].input}</h3>
                <p class="text-center  w-4/6">${data.input_output_examples == null ? "No Data Found" : data.input_output_examples[0].output.slice(0, 80)}</p>
            </div>
        </div>
    </div>

    `

}

loadData()


//============================ Show All Data Button ===========================

document.getElementById("showAllData").addEventListener("click", () => {
    loadDataa();
    document.getElementById("showAllData").classList.add("hidden")

})


//============================ Sort Data on Date ===========================
document.getElementById('sortByDate').addEventListener('click', function () {
    const sortByDate = async () => {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            const mainData = data.data.tools;
            mainData.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));

            // See More Button Enable & Disable functionality;
            if (mainData.length > 6) {
                document.getElementById("showAllData").classList.add("hidden");
                displayData(mainData);
            }
        } catch (error) {
            console.log('Error may ocuurs;' + error);
        }
    }
    sortByDate();
})
