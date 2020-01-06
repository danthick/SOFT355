$(document).ready(function () {
    $('#btn-register').on('click', function (event) {
        // Define variables within form
        var user = {
            "firstName": $('#fName').val(),
            "lastName": $('#lName').val(),
            "email": $('#email').val(),
            "password": $('#password').val()
        };
        var cPassword = {
            "cPassword": $('#cPassword').val()
        };

        // Resetting validity
        $("#cPassword")[0].setCustomValidity('');
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
                        // DO SOMETING IF SUCCESS e.g. reload something

                        // Re-directing to login page
                        //window.location = data.redirect
                        $("#myModal").modal('show');

                    },
                    error: function(respsonse){
                        alert("email already exists")
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