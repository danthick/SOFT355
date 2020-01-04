$(document).ready(function(){
    $('form').on('submit', function(){
        // Define variables within form
        var email = $('#email')
        var password = $('#password');
        
        $.ajax({
            type: 'POST',
            url: '/login',
            data: email,
            
            success: function(data){
                // DO SOMETING IF SUCCESS e.g. reload something

                // Re-directing to login page
                //window.location = data.redirect
            }
        })
    });
});