
async function modelFetchBeers() {
    beers = await fetch('https://api.punkapi.com/v2/beers')
        .then(response => response.json())
        .then(data => displayBeers(data))
        .catch(error => console.error('Error fetching beers:', error));
}

var template = (beer) => `
                <div class="col-md-3">
                <div class="card" id="beer">
                    <img class="card-img-top" src="${beer.image_url}" alt="${beer.name}">
                    <div class="card-body">
                        <h5 class="card-title">${beer.name}</h5>
                        <p class="card-text">${beer.description}</p>
                        
                        




                        
                    </div>
                </div>
            </div>
      
            `;

var beers;

function displayBeers(beers) {
    console.log(beers);

    const beerList = document.getElementById('beerList');
    beerList.innerHTML = '';
    beers.forEach(beer => {
        beerList.innerHTML += template(beer);
    });
    return beers;
}


setInterval(() => {
    document.querySelectorAll(".card-img-top").forEach(img => {
        img.style.transform = `rotate(360deg)`;
        
        
        img.style.transition = "transform 1s";
    });
}, 50);


function filterBeers() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredBeers = beers.filter(beer => beer.name.toLowerCase().includes(searchInput));
    displayBeers(filteredBeers);
  }

  document.getElementById('searchInput').addEventListener('input', filterBeers);

