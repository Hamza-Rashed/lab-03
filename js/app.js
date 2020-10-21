'use strict';
let all_arr = [];

function Pets(items) {
  for (const key in items) {
    this[key] = items[key]
  }
  all_arr.push(this)
}

Pets.prototype.render = function () {

  let templateParent = $('<section></section>');
  templateParent.html(`
  <div class = "${this.keyword}">
  <h2>{{title}}</h2>
        <img src='{{image_url}}'>
        <p>{{description}}</p>
        <p>{{horns}}</p>
        </div>
  `);

  let convertToHtml = $(templateParent).html();
  let html = Mustache.render(convertToHtml, this);
  templateParent.html(html);
  $('main').append(templateParent);

};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

let sectionPrent = document.getElementById('select')
$('.page1').click(firstPage)

function firstPage() {
  all_arr = [];
  $('#select').empty();
  $('section').empty();
  $.ajax('../lab-03/data/page-1.json', ajaxSettings).then((data) => {
    data.forEach(all_pets => {
      let pet = new Pets(all_pets);
      pet.render();
      let selectOptions = $(`<option value = "${all_pets.keyword}">${all_pets.keyword}</option>`);
      $('select').append(selectOptions)
    });
  });
}
firstPage();
$('.page2').click(function () {
  all_arr = [];
  $('#select').empty();
  $('section').empty();
  $.ajax('../lab-03/data/page-2.json', ajaxSettings).then((data2) => {
    data2.forEach(all_pets2 => {
      let pet2 = new Pets(all_pets2);
      pet2.render();
      let selectOptions = $(`<option value = "${all_pets2.keyword}">${all_pets2.keyword}</option>`);
      $('select').append(selectOptions)
    });
  });
})

// sort 

$('.title').click(function () {
  $('#select').empty();
  $('section').empty();
  all_arr.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  });

  all_arr.forEach(ele => {
    let petTitle = new Pets(ele);
    petTitle.render();
    let selectOptions = $(`<option value = "${ele.keyword}">${ele.keyword}</option>`);
    $('select').append(selectOptions)
  })
})

$('.horns').click(function () {
  all_arr.sort((a, b) => a.horns - b.horns);
  $('#select').empty();
  $('section').empty();
  all_arr.forEach(ele2 => {
    let petTitle = new Pets(ele2);
    petTitle.render();
    let selectOptions = $(`<option value = "${ele2.keyword}">${ele2.keyword}</option>`);
    $('select').append(selectOptions)
  })
})

// filter
$('select').change(show => {
  let showPicture = show.target.value;
  $('div').css({
    'display': 'none'
  });
  $(`.${showPicture}`).fadeIn(1000);
})

