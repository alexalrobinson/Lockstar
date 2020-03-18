import('bootstrap');
var $ = require("jquery");
window.jQuery = $;
window.$ = $;
import './styles/main.scss';
import logo from './images/lock_starlogo.jpg';
import van from './images/van.jpg';
import carousel1 from './images/carousel1.jpg';
import carousel2 from './images/carousel2.jpg';
import carousel3 from './images/carousel3.jpg';
import carousel4 from './images/carousel4.jpg';

document.getElementById("logo").src = logo;
document.getElementById("carousel1").src = carousel1;
document.getElementById("carousel2").src = carousel2;
document.getElementById("carousel3").src = carousel3;
document.getElementById("carousel4").src = carousel4;

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