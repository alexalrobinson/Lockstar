import('bootstrap');
import './styles/main.scss';
import logo from './images/lock_starlogo.jpg';
import van from './images/van.jpg';
import carousel1 from './images/carousel1.jpg';
import carousel2 from './images/carousel2.jpg';
import carousel3 from './images/carousel3.jpg';
import carousel4 from './images/carousel4.jpg';
import aloa from './images/aloa.jpg';

document.getElementById("logo").src = logo;
document.getElementById("van").src = van;
//document.getElementById("carousel1").src = carousel1;
//document.getElementById("carousel2").src = carousel2;
document.getElementById("carousel3").src = carousel3;
//document.getElementById("carousel4").src = carousel4;
document.getElementById("aloa").src = aloa;

let posts;
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

$(document).ready(() => {
    $('#comment_form').submit(() => {
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
                    $('#status').append("<br>Your message was posted successfully to the guestbook, thank you for using Lockstar!");
                }
            }
        });
        //disables the page refresh
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
});