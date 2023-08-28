const loadPhone = async (searchText='13', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //  console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones)

  const phoneContainer = document.getElementById("phone-container");
  //clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  //display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // console.log("is show all", isShowAll);

  //display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;
    // 3. set inner HTML
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `;
    // 4. append child
    phoneContainer.appendChild(phoneCard);
  });
  //hide loading spinner
  toggleLoadingSpinner(false);
};



//control show details button
const handleShowDetails = async (id) => {
  // console.log('clicked', id)
  //load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  // console.log(phone);


showPhoneDetails(phone)

}


//
const showPhoneDetails =(phone)=> {
  console.log(phone);
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;
const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="">
  <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span class="font-bold">chipSet: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span class="font-bold">slug: </span>${phone?.slug}</p>
  <p><span class="font-bold">Release date: </span>${phone?.releaseDate}</p>
  <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
  <p><span class="font-bold">GPS: </span>${phone?.others?.GPS || 'no GPS available'}</p>
   
  `
// <p><span class="font-bold">GPS: </span>${phone?.others?.GPS? phone.others.GPS : 'no GPS available'}</p>

// show the modal
show_details_modal.showModal();
}



// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};

//spin controlling
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

//handle show all

const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
