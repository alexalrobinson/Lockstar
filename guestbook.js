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
                    url: "./api/comments",
                    contentType: "application/json",
                    data: JSON.stringify({name: name , email: email, content: comment})
                })
                .done(function(data) {
                    $('#response').html('added_to_database ' + data.name + data.email + data.comment);
                });
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });
});