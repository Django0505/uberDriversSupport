var socket = io();

socket.on('query_added', function(obj){
    var query = "<a class='queryBox list-group-item'><strong>Driver: </strong>"+obj.username+"</br><strong>Query: </strong>"+obj.query+"</a>";

    $(".list-group").prepend(query);
    $(".queryBox:first-child").css({
                                       'background-color' : 'red',
                                       'color' : '#fff'
                                  });
});
