const phonLoded = async(search) => 
{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data)
}

const displayPhone = (phones) =>
{
    const cardContainer = document.getElementById('card_container');
    cardContainer.textContent = '';
    phones.forEach(phon => {
        
        console.log(phon);
        const divPhon = document.createElement('div');
        divPhon.classList.add('col');
        divPhon.innerHTML = `
        <div class="card">
        <img src="${phon.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phon.phone_name}</h5>
            <p class="card-text">${phon.slug
            }</p>
            </div>
      </div>
        
        `;
        cardContainer.appendChild(divPhon);
    });
}

document.getElementById('search_btn').addEventListener('click', function()
{
    const searchFiled = document.getElementById('search_filed');
    const searchText = searchFiled.value;
    phonLoded(searchText);
    searchFiled.value = '';

})
