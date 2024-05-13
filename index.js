document.addEventListener("DOMContentLoaded", async () => {
  const request = "https://fakestoreapi.com/products";

  async function getProducts() {
    const response = await fetch(request);
    const data = await response.json();
    return data;
  }

  let box = document.querySelector(".card-container");
  let products = await getProducts(); // Wait for the products to be fetched
  products.forEach((item) => {
    let template = `
      <div class="card">
        <a href="NexGenMart/${item.category}/${item.id}">
          <div class="product-image">
            <img src="${item.image}" alt="" />
          </div>
          <div class="product-details">
            <h4 class="product-name">${item.category}</h4>
            <p class="product-title">${item.title}</p>
            <h3 class="product-price">₹ ${item.price}</h3>
            <div class="product-reviews">
              <div class="ratings">
                <p>Ratings :</p><span>${item.rating.rate}</span>
              </div>
              <div class="counts">
                <p>Buyers :</p>
                <span>${item.rating.count}</span>
              </div>
            </div>
          </div>
        </a>
      </div>`;

    box.innerHTML += template; // Use innerHTML to append the HTML string
  });
  
})
