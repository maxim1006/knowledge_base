$(function() {

//Метод через переменную
/*    var number = 0;
    $('.btn').on('click', function() {
        number++;
        $(this)
            .next()
                .text(number);
    });*/

//Метод через data
    $('.btn')
    .on('click', function() {
        var $this = $(this),
        counter = ($this.data('clickCounter') || 0) + 1;

        $this.data('clickCounter', counter);

        $this
            .next()
                .text(counter);

        if (counter%3 === 0) {
            var properValue = 4000;
            $this
                .trigger('click3', properValue); // могу помимо кастомного эвента передавать параметры
        }

            // $this
            //     .next()
            //         .toggle(counter%3 !== 0);

    })
    .on('click3', function(e, properValue) { // здесь вызываю с заданными параметрами
        $(this)
            .next()
                .text(properValue)
                    .fadeOut();
    });


    //Передаю параметр в .on метод, и он записывается в e.data
    var internalData = 3;
    $(document).on('click', '.btn', internalData, function(e) {
        console.log(e.data);
    });

});