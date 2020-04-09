async function request_all_posts(bool) {
    let posts = await fetch('./posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((resp) => resp.json());

    posts.forEach((post) => {
        let postedOn = new Date(post.date);
        $("#posts").append(`
            <br>
            <div class="hidden card w-100 mb-3 post">
                <div class="bd-highlight card-body">
                    <h6 class="card-title mb-2 text-muted">Posted by <strong>${post.author}</strong> on ${postedOn.toDateString()}</h6>
                    <p class="card-text">${post.content}</p>
                </div>
                
            </div>
        `);
    });
}

$(document).ready(function() {
    $('#comment_form').submit(function() {
        $(this).ajaxSubmit({
            error: function(xhr) {
                console.log(`Error: ${xhr.status}`);
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
                        console.log('added_to_database ' + data.name + data.email + data.content);
                    });
                    
                }
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });
    /*$.ajax({
        method: "GET",
        url: "./posts",
        contentType: "application/json"
        //data: JSON.stringify({author: name , email: email, content: comment})
    })
    .done(function(data) {
        console.log("s");
    });*/

    async function create_post(name, email, comment) {
        let params = {
            "author": name,
            "email": email,
            "content": comment
        };
        console.log('create post requested');
        const response = await fetch('./posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        return await response;
    }
    create_post("alli", "alexa.l.robinson@gmail.com", "hey there");
    request_all_posts();
});