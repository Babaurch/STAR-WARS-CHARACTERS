//function fetchPeople() {
    // Make a GET request to the API
    fetch('https://swapi.dev/api/people')
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // Get the list of people from the data
        const people = data.results;
          
        // Iterate over the list of people
        for (const person of people) {
            
          // Create a list item for the person
          const liElement = document.createElement('div');
          liElement.innerHTML = `
            <div class="character">
              <div class="image">
                <img src="https://avatars.dicebear.com/api/avataaars" alt="user-image">
              </div>
              <div class="name">
                <button>
                  ${person.name}  
                </button>
              </div>
            </div>
            `; 
  
          // Add an event listener to the list item to display the person's details when clicked
          liElement.addEventListener('click', () => {
            openPopup();
            const userList = document.getElementById("details");
            userList.innerHTML = '';
            // Display the person's name, gender, and height
            const detailsElement = document.createElement('div');
            detailsElement.innerHTML = `
              <p>Name: ${person.name}</p>
              <p>Gender: ${person.gender}</p>
              <p>Height: ${person.height}</p>
            `;
            userList.appendChild(detailsElement);
            //document.body.appendChild(detailsElement);
          });
          // Add the list item to the list of people
          document.getElementById('container').appendChild(liElement);
        }
      })
      .catch(error => {
        // If there is an error, log it to the console
        console.error(error);
      });

    let popup = document.getElementById("popup");

    function openPopup(){
      popup.classList.add("open-popup")
    };

    function closePopup(){
      popup.classList.remove("open-popup")
    };


  function updateUI(data) {
    // Clear the existing data from the page
    const userUpdate = document.getElementById("container");
    userUpdate.innerHTML = '';

    const people = data;
          
    for (const person of people) {
      const avatarIndex = Math.floor(Math.random() * 82) + 1;
      const liElement = document.createElement('div');
      liElement.innerHTML = `
      <div class="character">
        <div class="image">
          <img src="https://avatars.dicebear.com/api/avataaars/${avatarIndex}.svg" alt="user-image">
        </div>
        <div class="name">
          <button>
            ${person.name}  
          </button>
        </div>
      </div>
      `; 

       // Add an event listener to the list item to display the person's details when clicked
       liElement.addEventListener('click', () => {
        openPopup();
        const userList = document.getElementById("details");
        userList.innerHTML = '';
        // Display the person's name, gender, and height
        const detailsElement = document.createElement('div');
        detailsElement.innerHTML = `
          <p>Name: ${person.name}</p>
          <p>Gender: ${person.gender}</p>
          <p>Height: ${person.height}</p>
        `;
        userList.appendChild(detailsElement);
        //document.body.appendChild(detailsElement);
        });
        userUpdate.appendChild(liElement);
       };
  }


 // Create the pagination controls
//  fetch('https://swapi.dev/api/people?page=1')
//  .then(response => response.json())
//  .then(data => {
//    // Extract metadata from the response
//    const { count, next, previous } = data;
//    const totalPages = Math.ceil(count / 10);  // 10 items per page
 
//    // Create the pagination controls
//    const paginationControls = document.createElement('div');
//    paginationControls.innerHTML = `
//      ${previous ? `<button class="prev">Prev</button>` : ''}
//      <ul class="pages">
//        ${[...Array(totalPages)].map((_, i) => `
//          <li class="page-item">
//            <a class="page-link" href="#" data-page=${i + 1}>${i + 1}</a>
//          </li>
//        `).join('')}
//      </ul>
//      ${next ? `<button class="next">Next</button>` : ''}
//    `;
 
//    // Append the pagination controls to the page
//    document.getElementById("pagination-controls").appendChild(paginationControls);
 
//    if (previous) {
//      paginationControls.querySelector('.prev').addEventListener('click', handlePrevClick);
//    }
//    if (next) {
//     paginationControls.querySelector('.next').addEventListener('click', handleNextClick);
//    }
//    paginationControls.querySelectorAll('.page-link').forEach(link => {
//      link.addEventListener('click', handlePageClick);
//    });
 
//    // Update the UI to display the first page of data
//    updateUI(data.results);
//  });


//  function handlePageClick(e) {
//     // Prevent the default click behavior
//     e.preventDefault();

//     // Get the page number from the clicked element
//     const page = e.target.dataset.page;

//     // Make a new API request to retrieve the specified page of data
//     fetch(`https://swapi.dev/api/people?page=${page}`)
//     .then(response => response.json())
//     .then(data => {
//       // Update the metadata
//       const { count, next, previous } = data;
//       const totalPages = Math.ceil(count / 10);  // 10 items per page

//       // Update the pagination controls
//       updatePaginationControls(totalPages, nextPageUrl, prevPageUrl)

//       // Update the UI to display the new data
//       updateUI(data.results);
//     });
//   };


// function handleNextClick(e) {
//     e.preventDefault();
//   // Make a new API request to retrieve the next page of data
//   fetch('https://swapi.dev/api/people?page=1')  // `next` is the URL of the next page
//     .then(response => response.json())
//     .then(data => {
//       // Update the metadata
//       const { count, next, previous } = data;
//       const totalPages = Math.ceil(count / 10);  // 10 items per page

//       //totalPages = data.count;
//       nextPageUrl = data.next;
//       prevPageUrl = data.previous;
      
//       fetch(nextPageUrl)
//       .then(response => response.json())
//       .then(data => {

//         const { count, next, previous } = data;
//         const totalPages = Math.ceil(count / 10);

//         nextPageUrl = data.next;
//         prevPageUrl = data.previous;

//         updateUI(data.results);  
//       });
//       // Update the pagination controls
//       //updatePaginationControls(totalPages, next, previous);

//       // Update the UI to display the new data
//       //updateUI(data.results);
//     });
// }

////////////////////////////////////////////////////////////
         // Create the pagination controls//
///////////////////////////////////////////////////////////
let currentPage = 1;
let totalPages;
let nextPageUrl;
let prevPageUrl;

function paginateResults(page) {
  currentPage = page;
  document.querySelector('.loading').style.display = 'block';
  // Make an HTTP request to the API for the specified page
  fetch(`https://swapi.dev/api/people?page=${page}`)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Update the global variables with the new data
      const { count, next, previous } = data;
      const totalPages = Math.ceil(count / 10);
      nextPageUrl = data.next;
      prevPageUrl = data.previous;

      // Update the DOM with the new results
      updateUI(data.results);
      updatePaginationControls(totalPages, nextPageUrl, prevPageUrl);
      document.querySelector('.loading').style.display = 'none';
    })
    .catch(error => {
      // If there is an error, log it to the console
      console.error(error);
      document.querySelector('.loading').style.display = 'none';
    });
   
}
     // Initialize the pagination controls
    paginateResults(1); 


function updatePaginationControls(totalPages, nextPageUrl, prevPageUrl) {
  // Clear the existing pagination controls
  paginationControls.innerHTML = '';

  // Create a "Prev" button if there is a previous page
  if (prevPageUrl) {
    const prevButton = document.createElement('button');
    prevButton.classList.add('prev');
    prevButton.textContent = 'Prev';
    prevButton.addEventListener('click', () => paginateResults(currentPage - 1));
    paginationControls.appendChild(prevButton);
  }

  // Create a page link for each page
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.classList.add('page-link');
    pageLink.href ='#';
    pageLink.dataset.page = i;
    pageLink.textContent = i;
    pageLink.addEventListener('click', () => paginateResults(i));
    paginationControls.appendChild(pageLink);
  }
    
      // Create a "Next" button if there is a next page
      if (nextPageUrl) {
        const nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => paginateResults(currentPage + 1));
        paginationControls.appendChild(nextButton);
      }
}
    
    // Initialize the pagination controls
    // paginateResults(1);
    
    const paginationControls = document.createElement('div');
    const parentElement = document.getElementById("pagination-controls");
    parentElement.appendChild(paginationControls);

    const currentPageLink = document.querySelector(`[page-link="${currentPage}"]`);
    currentPageLink.classList.add('current');
    
    
    // document.addEventListener('DOMContentLoaded', () => {
    // const currentPageLink = paginationControls.querySelector(`[pageLink="${currentPage}"]`);
    // currentPageLink.style.color = 'red';
    // currentPageLink.classList.add('current');
    // });