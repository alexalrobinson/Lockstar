$(document).ready(function() {
    $('#comment_form').submit(function() {
        $(this).ajaxSubmit({
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
            success: function(response) {
                console.log(response);
                if(response.responseCode === 0){
                    console.log(response.responseCode);
                    let name = $('#name-guestbook').val();
                    let email = $('#email-guestbook').val();
                    let comment = $('#comment-guestbook').val();
                    console.log(name);
                    console.log(email);
                    console.log(comment);
                    $.ajax({
                        method: "POST",
                        url: "./posts",
                        contentType: "application/json",
                        data: JSON.stringify({author: name , email: email, content: comment})
                    })
                    .done(function(data) {
                        console.log('added_to_database ' + data.status + data.message);
                    });
                    
                }
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });
});