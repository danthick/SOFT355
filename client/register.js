$(document).ready(function(){
    $('form').on('submit', function(){
        // Define variables within form
        var user = {"firstName": $('#fName').val(), "lastName": $('#lName').val(), "email": $('#email').val(), "password": $('#password').val()};
        var cPassword = {"cPassword": $('#cPassword').val()};
        
        $.ajax({
            type: 'POST',
            url: '/register',
            data: user,
            
            success: function(data){
                // DO SOMETING IF SUCCESS e.g. reload something

                // Re-directing to login page
                window.location = data.redirect
            }
        })
    });
});