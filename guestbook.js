async function request_all_posts(bool) {
    let posts = await fetch('https://pacific-badlands-30319.herokuapp.com/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((resp) => resp.json());
    console.log(posts);
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
            url: "https://pacific-badlands-30319.herokuapp.com/submit",
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
    /*async function request_all_posts(bool) {
        console.log('all posts requested');
        let val = await fetch('https://pacific-badlands-30319.herokuapp.com/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json());
        console.log(val);
        return val;
    }*/
    /*
    async function create_post(name, email, comment) {
        let params = {
            "name": name,
            "email": email,
            "comment": comment
        };
        console.log('create post requested');
        const response = await fetch('https://pacific-badlands-30319.herokuapp.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        return await response;
    }*/

    request_all_posts();
});