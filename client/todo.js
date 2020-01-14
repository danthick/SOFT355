// Connecting to web socket server
var socket = new WebSocket("ws://localhost:9000/");
// Getting users email
var email = $("#currentUser").text();

// Function for when message is recieved from server
socket.onmessage = function (e) {
    if (e.data == email) {
        setTimeout(function () {
            $("#changes").css("display", "inherit");
        }, 2000);
    }
};

$(document).ready(function () {
    // When to do item add button is clicked
    $('#addBtn').on('click', function (event) {
        // Get item value and created an item variable
        var item1 = $('#item');
        var todoItem = {
            item: item1.val()
        };
        $('#item')[0].setCustomValidity("");

        // Check user isn't adding a blank item
        if (item1.val() == "" || item1.val() == " ") {
            $('#item')[0].setCustomValidity("Please enter a to do item!");
            $('#item')[0].reportValidity();
            event.preventDefault();
            // Send post request
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

    // If an item is clicked in the list change it's completion status
    $('li').on('click', function (e) {
        // Checkin if edit or delete button is pressed
        if (e.target.className !== "editButton" && e.target.className !== "deleteButton" && e.target.isContentEditable !== true) {
            // Getting item that was clicked on and send a put request to server
            var todoItem = $(this).contents().get(0).nodeValue;
            $.ajax({
                type: 'PUT',
                url: '/todo/complete/' + todoItem,
                data: {
                    item: todoItem
                },
                // On success send web socket update and reload page
                success: function (data) {
                    socket.send(email);
                    location.reload();
                }
            })
        }
    })
});

// Called when the edit button is pressed
function editItem(todoIndex, todoItem) {
    $("#" + todoIndex).text($("#" + todoIndex).contents().get(0).nodeValue + "\n");
    // Making item editable and changing focus
    $("#" + todoIndex).attr("contenteditable", "true");
    $("#editBtn" + todoIndex).attr("contenteditable", "false");
    $("#deleteBtn" + todoIndex).attr("contenteditable", "false");

    // Making the list item none clickeable and focus cursor
    $('li').css("pointer-events", "none");
    $('li').css("pointer-events", "all");
    $("#" + todoIndex).focus();

    // When the focus if off the text box, automatically update
    $("#" + todoIndex).on('blur', function () {
        // Get updated item value
        var newItem = $("#" + todoIndex).contents().get(0).nodeValue;
        newItem = newItem.replace(/(\r\n|\n|\r)/gm, "");
        newItem = newItem.replace(/\s+$/, '');
        // Checking its not blank
        if (newItem == null) {
            $("#" + todoIndex).contents().get(0).setCustomValidity('Item can not be empty');
            $("#" + todoIndex).contents().get(0).reportValidity();
            // Send update request to server
        } else {
            $.ajax({
                type: 'PUT',
                url: '/todo/' + todoItem,
                data: {
                    old: todoItem,
                    new: newItem
                },
            })
            // On success send web socket update and reload page
            socket.send(email);
            setTimeout(function () {
                location.reload(true);
            }, 500);
            
        }
    })
}

// Delete function called when the delete button is pressed
function deleteItem(todoItem) {
    console.log(todoItem);
    // Send delete request to server containing item details
    $.ajax({
        type: 'DELETE',
        url: '/todo/' + todoItem,
        data: todoItem,
        // On success send web socket update and reload page
        success: function (data) {
            socket.send(email);
            location.reload(true);
        }
    })
}