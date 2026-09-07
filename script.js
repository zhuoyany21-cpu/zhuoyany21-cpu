```javascript
// BLOG POSTS!!!!!!!!!


// LOAD SAVED BLOG POSTS WHEN PAGE OPENS

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadPosts();

    }
);


// PUBLISH POST

function publishPost() {


    // GET INPUT!!

    const titleInput =
        document.getElementById("postTitle");

    const contentInput =
        document.getElementById("postContent");

    const feed =
        document.getElementById("postFeed");


    // GET WHAT USER TYPED (me)

    const title =
        titleInput.value.trim();

    const content =
        contentInput.value.trim();


    // MAKE SURE THERE IS A TLTE FOR THE BLOG POST!

    if (
        title === ""
    ) {

        alert(
            "Please enter a title for your post."
        );

        titleInput.focus();

        return;

    }


    // MUST HAVE CONTENT INSIDE THE POST!

    if (
        content === ""
    ) {

        alert(
            "Please write something for your post."
        );

        contentInput.focus();

        return;

    }


    // needed a way to insert date without having to manually do it like the title! (not sure if it works, hopefully it does)
    // tested it and it does in fact work!! (asked claude how to do it)

   
    // AUTO INSERT DATE

    const today =
        new Date();


    const date =
        today.toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );


    // CREATE POST INFORMATION

    const newPost = {

        id:
            Date.now(),

        title:
            title,

        content:
            content,

        date:
            date

    };


    // GET SAVED POSTS

    let savedPosts =
        JSON.parse(
            localStorage.getItem(
                "blogPosts"
            )
        );


    // IF THERE ARE NO SAVED POSTS YET

    if (
        !savedPosts
    ) {

        savedPosts =
            [];

    }


    // ADD NEW POST TO THE TOP

    savedPosts.unshift(
        newPost
    );


    // SAVE THE POSTS

    localStorage.setItem(
        "blogPosts",
        JSON.stringify(
            savedPosts
        )
    );


    // CREATE THE POST ON THE PAGE

    createPost(
        newPost
    );


    // CLEAR INPUT!

    titleInput.value = "";

    contentInput.value = "";

}


// CREATE POST

function createPost(postData) {


    const feed =
        document.getElementById(
            "postFeed"
        );


    const post =
        document.createElement(
            "article"
        );


    post.className =
        "post-card";


    // SAVE POST ID

    post.dataset.id =
        postData.id;


    // THE PARAGRAPH FORMAT

    let contentHTML =
        "";


    const paragraphs =
        postData.content.split(
            /\n\s*\n/
        );


    paragraphs.forEach(
        function(paragraph) {


            if (
                paragraph.trim() !== ""
            ) {

                contentHTML +=

                    "<p>" +

                    paragraph
                        .trim()
                        .replace(
                            /\n/g,
                            "<br>"
                        ) +

                    "</p>";

            }

        }
    );


    // PUT EVERYTHING INTO THE POST!!!!!!!!!!!

    post.innerHTML = `

        <div class="post-date">

            ${postData.date}

        </div>


        <h2 class="post-title">

            ${postData.title}

        </h2>


        <div class="post-content">

            ${contentHTML}

        </div>


        <button
            class="delete-post-button"
            onclick="deletePost(this)">

            Delete Post

        </button>

    `;


    // didnt know whether to put new post at the bottom or top. thought to many other wesbsites, new post on top was final decision
    // NEW POST GOES ON TOP 

    feed.prepend(
        post
    );


}


// LOAD SAVED POSTS

function loadPosts() {


    const feed =
        document.getElementById(
            "postFeed"
        );


    // MAKE SURE WE ARE ON THE BLOG PAGE

    if (
        !feed
    ) {

        return;

    }


    // GET SAVED POSTS

    const savedPosts =
        JSON.parse(
            localStorage.getItem(
                "blogPosts"
            )
        );


    // STOP IF THERE ARE NO SAVED POSTS

    if (
        !savedPosts
    ) {

        return;

    }


    // DISPLAY SAVED POSTS
    // going backwards keeps the newest post on top

    for (
        let i =
            savedPosts.length - 1;

        i >= 0;

        i--
    ) {

        createPost(
            savedPosts[i]
        );

    }


}


// following up on the blog.html, needed a spot the delete the post in case of mess up
// DELETE BLOG POST

function deletePost(button) {

   // confirm to delete, could have been accident!!!
   
   // ASK FOR DELETION CONFIRMATION

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this post?"
        );


    // DO NOT DELETE IF CONFIRMATION WAS NO

    if (
        !confirmDelete
    ) {

        return;

    }


    // FIND THE POST

    const post =
        button.closest(
            ".post-card"
        );


    // this migth have been redundant but maybe not. put the delete post before
    // DELETE THE POST

    if (
        post
    ) {


        const postID =
            post.dataset.id;


        // DELETE FROM PAGE

        post.remove();


        // GET SAVED POSTS

        let savedPosts =
            JSON.parse(
                localStorage.getItem(
                    "blogPosts"
                )
            );


        if (
            !savedPosts
        ) {

            savedPosts =
                [];

        }


        // REMOVE DELETED POST

        savedPosts =
            savedPosts.filter(
                function(savedPost) {

                    return String(
                        savedPost.id
                    ) !== String(
                        postID
                    );

                }
            );


        // SAVE UPDATED POSTS

        localStorage.setItem(
            "blogPosts",
            JSON.stringify(
                savedPosts
            )
        );


    }

}


// VIDEO POSTS
// realized too late that this was not neccessary, however claude helped with most of this, most difficult was connectino to my own files


function postVideo(event) {


    const file =
        event.target.files[0];


    if (
        !file
    ) {

        return;

    }


    const feed =
        document.getElementById("videoFeed");


    const today =
        new Date();


    const date =
        today.toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );

   // this is the point where i thought to myself "why did i do this"
   
    const videoURL =
        URL.createObjectURL(file);


    const post =
        document.createElement("article");


    post.className =
        "video-post";


    post.innerHTML = `

        <div class="video-post-date">

            ${date}

        </div>


        <div class="video-wrapper">

            <video>

                <source
                    src="${videoURL}"
                    type="${file.type}">

            </video>


            <button
                class="play-button"
                aria-label="Play video">

            </button>

        </div>

    `;


    feed.prepend(post);


    const video =
        post.querySelector("video");


    const playButton =
        post.querySelector(".play-button");


   
// PLAY BUTTON FOR VID
// not sure if works yet, havent tested it yet, havent inserted a vidio yet

    playButton.addEventListener(
        "click",
        function() {

            video.play();

            playButton.style.display =
                "none";

        }
    );


   // SHOW PLAY BUTTON WHEN VIDEO IS PAUSED
   // needed a way to turn vid back on (claude suggested)

    video.addEventListener(
        "pause",
        function() {

            if (
                !video.ended
            ) {

                playButton.style.display =
                    "flex";

            }

        }
    );


   // VID ENDS, SHOW BUTTON AGAIN
   // needed a way to restart video (claude suggested)

    video.addEventListener(
        "ended",
        function() {

            playButton.style.display =
                "flex";

        }
    );


    // CLEAR THE FILE INPUT

    event.target.value = "";

}


// NOT SURE WHETHER OR NOT TO HAVE DELETE VIDEO, MIGHT NOT POST VIDEO EITHER WAY (MAYBE)
```
