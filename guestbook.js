/*let posts;
let postsToShow=5;

let formPost = (author, date, content) => {
    return `<div class="hidden card w-100 mb-3 post">
        <div class="bd-highlight card-body">
            <h6 class="card-title mb-2 text-muted">Posted by <strong>${author}</strong> on ${date}</h6>
            <p class="card-text">${content}</p>
        </div>
    </div>`;
}

async function request_all_posts(bool) {
    posts = await fetch('./posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((resp) => resp.json());
    for(let i = 0; i<postsToShow; i++){
        let postedOn = new Date(posts[i].date);
        $("#posts").append(formPost(posts[i].author, postedOn.toDateString(), posts[i].content));
    }
    postsToShow += 5;
}


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
                    $('#comment_form')[0].reset();
                    create_post(name, email, comment);
                    let currdate = new Date();
                    $('#posts').prepend(formPost(name, currdate.toDateString(), comment));
                }
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });

    $("#see-more").on("click", () => {
        for(let i = postsToShow-5; i<postsToShow && i<posts.length; i++){
            let postedOn = new Date(posts[i].date);
            $("#posts").append(formPost(posts[i].author, postedOn.toDateString(), posts[i].content)); 
        }
        if (postsToShow >= posts.length){
            $("#toggle-posts").prop("hidden", true);
        }
        postsToShow += 5;
    });

    request_all_posts();
});*/