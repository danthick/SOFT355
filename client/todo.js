$(document).ready(function(){
    $('form').on('submit', function(){
        var item1 = $('#item');
        var todoItem ={item: item1.val()};
        if (item1.val() == "" || item1.val() == " "){
            alert("Please enter a todo item!");
        } else {
            $.ajax({
                type: 'POST',
                url: '/todo',
                data: todoItem,
                success: function(data){
                    $("#todoTable").load(" #todoTable");
                }
            })
        }
    });
});