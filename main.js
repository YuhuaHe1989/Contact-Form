(function(){

'use strict';

$(document).ready(init);
  
var updateIndex;
var lists = localStorage.lists ? JSON.parse(localStorage.lists) : [];
newList();

function init(){

	$('#add').click(addList);
  $('#update').click(update);
  $('#list').on('change','input',ifupdate);
  $('#list').on('click','.remove',removeContact);
  $('.modalSaveBtn').on('click',modalUpdate);
  $('.modalCloseBtn').on('click',modalClose);
  $('#modalWindowClose').on('click',modalClose);
  $('.sort').on('click',sort);
}

function modalClose(){
  //console.log('modalWindowClose');
  lists[updateIndex].update = false;
  //console.log(lists[updateIndex]);
  
  newList();
  saveDataToLocalStorage();
}

function modalUpdate(){
  console.log('update');
  var $modalName = $('#modalInputName').val();
  var $modalEmail = $('#modalInputEmail').val();
  var $modalPhone = $('#modalInputPhone').val();
  var $modalAdress = $('#modalInputAdress').val();

  lists[updateIndex].name = $modalName;
  lists[updateIndex].email = $modalEmail;
  lists[updateIndex].phone = $modalPhone;
  lists[updateIndex].address = $modalAdress;
  lists[updateIndex].update = false;

  $('#myModal').modal('hide');
  newList();
  saveDataToLocalStorage();

}

function sort(){
  var btnIndex = $(this).closest('th').index();

  if(btnIndex === 0){
    lists.sort(function(a,b){
      return a.name > b.name;
    });
  }
  if(btnIndex === 1){
    lists.sort(function(a,b){
      return a.email > b.email;
    });
  }
  if(btnIndex === 2){
    lists.sort(function(a,b){
      return a.phone > b.phone;
    });
  }
  if(btnIndex === 3){
    lists.sort(function(a,b){
      return a.address > b.address;
    });
  }
  //console.log(lists[0].name);
  newList();
  saveDataToLocalStorage();  
}

function ifupdate(event){
  var $target = $(event.target);
  var $targetRow = $target.closest('tr');
  var index = $targetRow.index();

  lists[index].update = $target.is(':checked');
  updateIndex = index;

  newList();
  saveDataToLocalStorage();
}

function update(){
  lists[updateIndex].name = $('#name').val();
  lists[updateIndex].email = $('#email').val();
  lists[updateIndex].phone = $('#phone').val();
  lists[updateIndex].address = $('#address').val();
  lists[updateIndex].update = false;

  updateIndex = 1000000000000;

  newList();
  saveDataToLocalStorage();
}

function removeContact(){
  var targetRow = $(this).closest('tr');
  var index = targetRow.index();

  lists.splice(index,1);
  newList();
  saveDataToLocalStorage();
}

function addList(){

	//retrieve the input value from input box
	var name = $('#name').val();
	var email = $('#email').val();
	var phone = $('#phone').val();
	var address = $('#address').val();

	//create an obj to store the input information
	var list = {
		name: name,
		email: email,
		phone: phone,
		address: address,
    update: false
	};

  $('#name').val('');
  $('#email').val('');
  $('#phone').val('');
  $('#address').val('');

	lists.push(list);

	newList();
	saveDataToLocalStorage();
}

function newList(){
    $('#list').empty();

    if(lists.length){
      $('table.table').show();
    } else {
      $('table.table').hide();
    }

	var contactList = lists.map(function(list){
		//create a new list
		var $tr = $('#sample').clone();
		$tr.removeAttr('id');

		$tr.children('.name').text(list.name);
		$tr.children('.email').text(list.email);
		$tr.children('.phone').text(list.phone);
		$tr.children('.address').text(list.address);

    $tr.find('input').prop('checked', list.update);
      $tr.css({
        "background-color":list.update ? 'yellow' : ''
      });

		$tr.show();

    return $tr;
	});

	$('#list').append(contactList);	
}

function saveDataToLocalStorage(){
	localStorage.lists = JSON.stringify(lists);
}

})();











