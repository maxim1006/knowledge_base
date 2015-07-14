$(function() {
    var count = 0;
    $('.cube').on('click', function() {
        count++;

        //$.fx.off = true; //отменяет всю анимацию на странице, когда true

        // $(this)
        //     .animate({'width': 400, 'height': 400}, {'queue':false, 'duration': 5000})
        //         .animate({'top': 400, 'left': 400}, 5000);

        // if (count%2 === 0) {
        //     $(this).stop(true, true); //первый аргумент очищает очередь, второй переводит анимацию в конечную фазу.
        // }

        // $(this)
        //     .slideUp(1000)
        //         .queue(function() { //выполниться только после отработки slideUp, в этом и есть прикол)
        //             var n = $(this).queue( "fx" );
        //             console.log(n.length);
        //             console.log( "Animation complete." );
        //             $(this).dequeue(); // Если не ставить deque(), то следующая строка не выполниться
        //         })
        //             .slideDown(1000);

        // $(this)
        //     .slideUp(1000);

        //     $(this)
        //     .fadeIn(1000).promise().done(function(){console.log(123132);}).then();

        // var addText = function() {
        //     $('.cube').text('что-то добавил');
        // };

        // $.when($(this).slideUp(1000).queue(function(){addText();$(this).dequeue();}), $(this).fadeIn(1000)).done(function() {
        //     console.log(1321321);
        // });

    });
});