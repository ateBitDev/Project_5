//declaring  global variables
const $searchDiv = $('.search-container');
const $body = $('body');
const $gallery = $('.gallery');
const userArray = [];
let int = 0;
let currentUser;

$searchDiv.html(`<form action="#" method="get">
<input type="search" id="search" class="search-input" placehold="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`);

const search = $('#search')

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
  userArray.push(data);
  const user = data
  image = data.results[0].picture.large;
  $cardpic.append(`<img class="card-img" src="${image}" alt="profile picture">`);
  first = data.results[0].name.first;
  last = data.results[0].name.last;
  email = data.results[0].email;
  city = data.results[0].location.city;
  state = data.results[0].location.state;
  $cardinfo.append(`<h3 id="name" class="card-name cap">${first} ${last}</h3>
  <p class="card-email">${email}</p>
  <p class="card-location">${city}, ${state}</p>`);
  $card.attr('id', first )
  }
});
$card.append($cardpic);
$card.append($cardinfo);
$gallery.append($card);
}

const $modalChanger = $(`<div class="modal-btn-container">`);
const $backButton = $(`<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>`);

const $forwardButton = $(`<button type="button" id="modal-next" class="modal-next btn">Next</button>`);
$modalChanger.append($backButton);
$modalChanger.append($forwardButton);


$('.card').on('click', function()
{
  userArray.forEach((user, index) =>
    {
      if(user.results[0].name.first === this.id)
      {
        currentUser = user
        int = index;
      }
    });
  const buildModal = () => {
  const $modalContainer = $('<div class="modal-container"></div>');
  const $modal = $('<div class="modal"></div>');
  const $modalInfo = $('<div class="modal-info-container"></div>');
  const $exitButton = $('<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>')

  let first,last,image,email,location, number, birthday;


  image = currentUser.results[0].picture.large;
  $modalInfo.append(`<img class="modal-img" src="${image}" alt="profile picture">`);
  first = currentUser.results[0].name.first;
  last = currentUser.results[0].name.last;
  $modalInfo.append(`<h3 id="name" class="modal-name cap">${first} ${last}</h3>`);
  email = currentUser.results[0].email;
  $modalInfo.append(`<p class="modal-text">${email}</p>`);
  location = currentUser.results[0].location;
  $modalInfo.append(`<p class="modal-text cap">${location.city}</p><hr>`);
  number = currentUser.results[0].cell;
  $modalInfo.append(`<p class="modal-text">${number}</p>`);
  $modalInfo.append(`<p class="modal-text">${location.street}, ${location.city}, ${location.state} ${location.postcode}</p>`);
  birthday =currentUser.results[0].dob.date;
  $modalInfo.append(`<p class="modal-text">Birthday: ${birthday.substring(0,10)}</p>`);
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
buildModal(currentUser);
});

$(document).on('submit', function(e)
{
  e.preventDefault();
});


$('#search-submit').on('click', card =>
{
  console.log('hello')
$('.card').each((index, card)  =>
  {
    if(card.id === search.val().toLowerCase())
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
