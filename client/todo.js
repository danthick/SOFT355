var socket = new WebSocket("ws://localhost:9000/");
var email = $("#currentUser").text();

socket.onmessage = function (e) {
    if (e.data == email) {
        setTimeout(function () {
            $("#changes").css("display", "inherit");
        }, 2000);
    }
};
$(document).ready(function () {
    $('#addBtn').on('click', function (event) {
        var item1 = $('#item');
        var todoItem = {
            item: item1.val()
        };
        $('#item')[0].setCustomValidity("");
        if (item1.val() == "" || item1.val() == " ") {
            $('#item')[0].setCustomValidity("Please enter a to do item!");
            $('#item')[0].reportValidity();
            event.preventDefault();
        } else {
            $.ajax({
                type: 'POST',
                url: '/todo',
                data: todoItem,
                success: function (data) {
                    socket.send(email);
                    location.reload(true);
                }
            })
        }
    });

    $('li').on('click', function (e) {
        console.log(e.target.className);
        if (e.target.className !== "editButton" && e.target.className !== "deleteButton" && e.target.isContentEditable !== true) {
            var todoItem = $(this).contents().get(0).nodeValue
            $.ajax({
                type: 'PUT',
                url: '/todo/complete/' + todoItem,
                data: {
                    item: todoItem
                },
                success: function (data) {
                    socket.send(email);
                    location.reload();
                }

            })
        }
    })
});

function editItem(todoIndex, todoItem) {
    var item = $("#" + todoIndex);
    // Making item editable and changing focus
    $("#" + todoIndex).attr("contenteditable", "true");
    $("#editBtn" + todoIndex).attr("contenteditable", "false");
    $("#deleteBtn" + todoIndex).attr("contenteditable", "false");

    $('li').css("pointer-events", "none");
    $('li').css("pointer-events", "all");
    $("#" + todoIndex).focus();


    $("#" + todoIndex).on('focusout', function () {
        var newItem = $("#" + todoIndex).contents().get(0).nodeValue;
        if (newItem == null) {
            $("#" + todoIndex).contents().get(0).setCustomValidity('Password Must be Matching.');
            $("#" + todoIndex).contents().get(0).reportValidity();
        } else {
            $.ajax({
                type: 'PUT',
                url: '/todo/' + todoItem,
                data: {
                    old: todoItem,
                    new: newItem
                },
            })
            socket.send(email);
            location.reload(true);
        }
    })
}

function deleteItem(todoItem) {
    console.log(todoItem);
    $.ajax({
        type: 'DELETE',
        url: '/todo/' + todoItem,
        data: todoItem,
        success: function (data) {
            socket.send(email);
            location.reload(true);
        }
    })
}