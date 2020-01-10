$(document).ready(function () {
    $('#btn-register').on('click', function (event) {
        // Define variables within form
        var user = {
            "firstName": $('#fName').val(),
            "lastName": $('#lName').val(),
            "email": $('#email').val(),
            "password": $('#password').val()
        };

        // Resetting validity
        $("#cPassword")[0].setCustomValidity('');
        $('#email')[0].setCustomValidity('');
        var uniqueEmail = false;
        event.preventDefault();

        // Checking form validity
        if ($('#register-form')[0].checkValidity()) {
            // Checking password and confirmation of password match
            if ($('#password').val() == $('#cPassword').val()) {
                // Sending AJAX request
                $.ajax({
                    type: 'POST',
                    url: '/register',
                    data: user,
                    success: function (response) {
                        $("#myModal").modal('show');
                    },
                    // If server returns error because email already exists
                    error: function(respsonse){
                        event.preventDefault();
                        $('#email')[0].setCustomValidity('Email address already exists.');
                        $('#email')[0].reportValidity();
                    }
                })
                
            // If passwords don't match
            } else {
                event.preventDefault();
                $("#cPassword")[0].setCustomValidity('Password Must be Matching.');
                $("#cPassword")[0].reportValidity();
                $('#password').val('');
                $('#cPassword').val('');
            }
        }
    });
});