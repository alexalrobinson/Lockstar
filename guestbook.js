$(document).ready(function() {
    $('#comment_form').submit(function() {
        $(this).ajaxSubmit({
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
            success: function(response) {
                console.log(response);
                let name = $('#name-guestbook').val();
                let email = $('#email-guestbook').val();
                let comment = $('#comment-guestbook').val();
                $.ajax({
                    method: "POST",
                    url: "./posts",
                    contentType: "application/json",
                    data: JSON.stringify({author: name , email: email, content: comment})
                })
                .done(function(data) {
                    $('#response').html('added_to_database ' + data.author + data.email + data.content);
                });
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });
    
    let posts = "error";
    $.ajax({
        method: "GET",
        url: "./posts",
        contentType: "application/json",
        success: function(resp) {
            posts = resp
        }
    });

    console.log(posts);
});