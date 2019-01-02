//declaring  global variables
const $searchDiv = $('.search-container');
const $body = $('body');
const $gallery = $('.gallery');
const userArray = [];

$searchDiv.html(`<form action="#" method="get">
<input type="search" id="search" class="search-input" placehold="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`);

const search = $('#search-submit')

for(let i = 0; i < 12; i++)
{
  const $card = $('<div class="card"></div>');
  const $cardpic = $('<div class="card-img-container"></div>');
  const $cardinfo = $('<div class="card-info-container">');
  let image,first,last,email,city,state
  $.ajax({
  url: 'https://randomuser.me/api/',
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

$('.card').on('click', function()
{
  const $modalContainer = $('<div class="modal-container"></div>');
  const $modal = $('<div class="modal"></div>');
  const $modalInfo = $('<div class="modal-info-container"></div>');
  const $exitButton = $('<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>')
  let currentUser,first,last,image,email,location, number, birthday;
  userArray.forEach(user =>
    {
      if(user.results[0].name.first === this.id)
      {
        currentUser = user
      }
    });
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
  $body.append($modalContainer);
  $exitButton.on('click', function(){
  $modalContainer.remove()
});




});
// $('.card').each(function(card)
//   {
//     if(card.id === search.val())
//     {
//       console.log(card);
//     }
//   })


// <div class="modal-container">
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//             <h3 id="name" class="modal-name cap">name</h3>
//             <p class="modal-text">email</p>
//             <p class="modal-text cap">city</p>
//             <hr>
//             <p class="modal-text">(555) 555-5555</p>
//             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//             <p class="modal-text">Birthday: 10/21/2015</p>
//         </div>
//     </div>
