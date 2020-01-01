$(document).ready(function(){
    $('form').on('submit', function(){
        // Define variables within form
        var user = {"firstName": $('#fName').val(), "lastName": $('#lName').val(), "email": $('#email').val(), "password": $('#password').val()};
        var cPassword = {"cPassword": $('#cPassword').val()};


        // Checking inputs are not empty
        //if (item1.val() == "" || item1.val() == " "){
        //    alert("Please enter a todo item!");
        
        // Calling post request
        //} else {
            $.ajax({
                
                type: 'POST',
                url: '/register',
                data: user,
                
                success: function(data){
                    // DO SOMETING IF SUCCESS e.g. reload something
                }
            })
        //}
    });
});