$(function() {
    $('#add').click( function() {

       var Description = $('#description').val();

      if($("#description").val() === '') {

        $('#alert').html("<strong>Внимание!</strong> Введите запись в текстовое поле.");

        $('#alert').fadeIn().delay(1000).fadeOut();

        return false;

       }

       $('#todos').prepend("<li><input id='check' name='check' type='checkbox'/>" + Description + "</li>");

       $('#form')[0].reset();

       var todos = $('#todos').html();

       localStorage.setItem('todos', todos);

       return false;

    });


    if(localStorage.getItem('todos')) {

    $('#todos').html(localStorage.getItem('todos'));

    }


    $('#clear').click( function() {

    window.localStorage.clear();

    location.reload();

    return false;

    });
});