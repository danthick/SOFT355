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
                    $("#todoTable").load(" #todoTable");
                }
            })
        }
    });

    $('li').on('click', function (e) {
        console.log(e.target.className);
        if (e.target.className == "editButton" || e.target.className == "deleteButton") {} else {
            var todoItem = $(this).contents().get(0).nodeValue
            $.ajax({
                type: 'PUT',
                url: '/todo/complete/' + todoItem,
                data: {
                    item: todoItem
                },
                dataType: "json",
                success: function (data) {
                    $("#todoTable").load(" #todoTable");
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
    $("#" + todoIndex).focus();

    
    $("#" + todoIndex).on('focusout', function () {

        $('li').css("pointer-events", "none");
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
                dataType: "json",
                success: function (data) {
                    $("#todoTable").load(" #todoTable");
                }
            })
            event.preventDefault();

        }
        $('li').css("pointer-events", "auto");
    })
}

function deleteItem(todoItem) {
    console.log(todoItem);
    $.ajax({
        type: 'DELETE',
        url: '/todo/' + todoItem,
        data: todoItem,
        success: function (data) {
            $("#todoTable").load(" #todoTable");
        }
    })
}