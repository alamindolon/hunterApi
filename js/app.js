const phonLoded = async(search, datalimit) => 
{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, datalimit)
}

const displayPhone = (phones, limitdata) =>
{
    // console.log(limitdata);
    const cardContainer = document.getElementById('card_container');
    cardContainer.textContent = '';
  const showAll = document.getElementById('show_all');
//  koy ta phone show korbe
    if(limitdata && phones.length > 10)
    {
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');

    }
    else
    {
        showAll.classList.add('d-none');
    }

    

            // No phon found ar jonno

    const noPhone = document.getElementById('no_found_massage');
    if(phones.length === 0)
    {
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    phones.forEach(phon => {
        
        // console.log(phon);
        const divPhon = document.createElement('div');
        divPhon.classList.add('col');
        divPhon.innerHTML = `
        <div class="card">
        <img src="${phon.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phon.phone_name}</h5>
            <p class="card-text">${phon.slug
            }</p>

         <div class="d-grid gap-2 col-6 mx-auto">

                

                <button onclick = "showDetailsPhone('${phon.slug}')" class="btn btn-primary" type="button">Button onclick</button>
                <button onclick = "showDetailsPhoneModal('${phon.slug}')" class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Button model</button>

               
        </div>
            </div>
      </div>
        
        `;
        cardContainer.appendChild(divPhon);
    });
    // loadding stop 
    toggleSpinner(false);
}
document.getElementById('search_filed').addEventListener('keypress', function(e)
{
    if(e.key === 'Enter')
    {
        processSearch(10);
    }
})

const detailsPhone = async(id) =>
{
    console.log('ID',id);
    console.log('dolon')
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetailsPhone(data.data);
    displayDetailsPhoneModal(data.data);

}
const showDetailsPhone = (data) =>
{
   
   detailsPhone(data);
    
    
}


const displayDetailsPhone = data =>
{
    const phoneDetailsID = document.getElementById('phoneDetails_ID');
    console.log(data)
    console.log('dolon')
    
    phoneDetailsID.innerHTML = `
    
    <img src="${data.image
    }" class="card-img-top" alt="...">
                <div class="card-body">
                <h2>name: ${data.name
                }</h2>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>

    `;
    
}

const showDetailsPhoneModal = data =>
{
    detailsPhone(data);
   
}

const displayDetailsPhoneModal = (phone) =>
{
    console.log(phone);
    const phoneDetailsModal_Label = document.getElementById('phoneDetailsModalLabel');
    phoneDetailsModal_Label.innerText = phone.name;

    const releaseDate = document.getElementById('releaseDateID');
    releaseDate.innerText = phone.releaseDate ? phone.releaseDate : 'no release date ,upcomming model';
}


const processSearch = (datalimit)=>
{

    console.log(datalimit);
    // loading item ar jonno start : ; jokon click korbe tokon a soru hobe and jokon sob gula deka ses hobe tokon stop hobe .
    toggleSpinner(true);

    const searchFiled = document.getElementById('search_filed');
    const searchText = searchFiled.value;
    phonLoded(searchText, datalimit);
    // searchFiled.value = '';
}

document.getElementById('search_btn').addEventListener('click', function()
{
    processSearch(20)

})

document.getElementById('showAll_btn').addEventListener('click', function()
{
    processSearch();
    

})
//spinner guraguri oi ta
const toggleSpinner = isLoading =>
{
    const loadersaction = document.getElementById('loader');
    if(isLoading)
    {
        loadersaction.classList.remove('d-none');
    }
    else{
        loadersaction.classList.add('d-none');
    }
}

phonLoded('samsung');