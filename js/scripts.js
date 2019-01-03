//declaring  global variables
const $searchDiv = $('.search-container');
const $body = $('body');
const $gallery = $('.gallery');
const userArray = [];
let int = 0;
let currentUser;
//creating form and search bar dynamicly
$searchDiv.html(`<form action="#" method="get">
<input type="search" id="search" class="search-input" placehold="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`);

const search = $('#search')
//crating 12 users from info grabbed from api
for(let i = 0; i < 12; i++)
{
  const $card = $('<div class="card"></div>');
  const $cardpic = $('<div class="card-img-container"></div>');
  const $cardinfo = $('<div class="card-info-container">');
  let image,first,last,email,city,state
  $.ajax({
  url: 'https://randomuser.me/api/?nat=us',
  dataType: 'json',
  success: function(data) {
  //saving data to array for future use
  userArray.push(data);
  const user = data
  image = user.results[0].picture.large;
  $cardpic.append(`<img class="card-img" src="${image}" alt="profile picture">`);
  first = user.results[0].name.first;
  last = user.results[0].name.last;
  email = user.results[0].email;
  city = user.results[0].location.city;
  $cardinfo.append(`<h3 id="name" class="card-name cap">${first} ${last}</h3>
  <p class="card-email">${email}</p>
  <p class="card-location cap">${city}</p>`);
  $card.attr('id', first  + " " + last)
  }
});
$card.append($cardpic);
$card.append($cardinfo);
$gallery.append($card);
}
//creates div for back/foward buttons for modal window
const $modalChanger = $(`<div class="modal-btn-container">`);
const $backButton = $(`<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>`);
const $forwardButton = $(`<button type="button" id="modal-next" class="modal-next btn">Next</button>`);
$modalChanger.append($backButton);
$modalChanger.append($forwardButton);

// function that builds the model window and takes in a current user
const buildModal = (currentUser) => {
const $modalContainer = $('<div class="modal-container"></div>');
const $modal = $('<div class="modal"></div>');
const $modalInfo = $('<div class="modal-info-container"></div>');
const $exitButton = $('<button type="button" id="modal-close-btn" class="modal-close-btn "><strong>X</strong></button>')

let first,last,image,email,location, number, birthday;

image = currentUser.results[0].picture.large;
$modalInfo.append(`<img class="modal-img" src="${image}" alt="profile picture">`);
first = currentUser.results[0].name.first;
last = currentUser.results[0].name.last;
$modalInfo.append(`<h3 id="name" class="modal-name cap">${first} ${last}</h3>`);
email = currentUser.results[0].email;
$modalInfo.append(`<p class="modal-email">${email}</p>`);
location = currentUser.results[0].location;
$modalInfo.append(`<p class="modal-city cap">${location.city}</p><hr>`);
number = currentUser.results[0].cell;
$modalInfo.append(`<p class="modal-number">${number}</p>`);
$modalInfo.append(`<p class="modal-location cap">${location.street}, ${location.state} ${location.postcode}</p>`);
birthday =currentUser.results[0].dob.date.substring(0,10);
$modalInfo.append(`<p class="modal-dob cap">Birthday: ${birthday.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$2/$3/$1")}</p>`);
$modal.append($exitButton);
$modal.append($modalInfo);
$modalContainer.append($modal);
$modalContainer.append($modalChanger);
$body.append($modalContainer);
$backButton.on('click', function()
{
  if(int > 0)
  {
  $modalContainer.remove();
  currentUser = userArray[int -1];
  buildModal(currentUser);
  int--
}
});
$forwardButton.on('click', function()
{
  if(int < 11)
  {
    $modalContainer.remove();
    currentUser = userArray[int + 1];
    buildModal(currentUser);
    int++
}
});
$exitButton.on('click', function(){
$modalContainer.remove();
});
};
// adds click event listener on each dive to call build window
$('.card').on('click', function()
{
  userArray.forEach((user, index) =>
    {
      if(this.id.includes(user.results[0].name.first))
      {
        currentUser = user
        int = index;
      }
    });

buildModal(currentUser);
});
//stops submit button from reloading the page on search request
$(document).on('submit', function(e)
{
  e.preventDefault();
});

//gives the search input funtionallity by camparing input value to card id's
$('#search-submit').on('click', card =>
{
  console.log('hello')
$('.card').each((index, card)  =>
  {
    //split up id that hold firstname 'space' lastname so users can be found by one or both
    let fullName = card.id.split(' ');
    console.log(fullName)

    if(search.val().toLowerCase().includes(fullName[0]))
    {
      $(card).show();
    }
    else if(search.val().toLowerCase().includes(card.id))
    {
      $(card).show();
    }
    else if(search.val().toLowerCase().includes(fullName[1]))
    {
      $(card).show();
    }
    else if(search.val() === '')
    {
      $(card).show();
    }
    else
    {
      $(card).hide();
    }
  })
});
