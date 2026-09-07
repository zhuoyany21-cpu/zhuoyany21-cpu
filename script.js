// BLOG POSTS!!!!!!!!!



/* LOAD POSTS WHEN THE PAGE OPENS */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadPosts();

    }
);



/* GET SAVED POSTS */

function getSavedPosts() {

    const savedPosts =
        localStorage.getItem(
            "blogPosts"
        );


    if (
        !savedPosts
    ) {

        return [];

    }


    try {

        return JSON.parse(
            savedPosts
        );

    } catch (
        error
    ) {

        console.log(
            "Could not load saved posts."
        );

        return [];

    }

}



/* SAVE POSTS */

function savePosts(
    posts
) {

    try {

        localStorage.setItem(
            "blogPosts",
            JSON.stringify(posts)
        );

        return true;

    } catch (
        error
    ) {

        console.log(
            "Could not save posts."
        );

        return false;

    }

}



/* PUBLISH A NEW BLOG POST */

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


    // CREATE A UNIQUE ID FOR THE POST

    const postData = {

        id:
            Date.now(),

        date:
            date,

        title:
            title,

        content:
            content

    };


    // CREATE THE POST FIRST!!!!

    createPost(
        postData,
        true
    );


    // SAVE THE NEW POST

    const posts =
        getSavedPosts();


    posts.unshift(
        postData
    );


    const saved =
        savePosts(
            posts
        );


    // TELL ME IF THE POST COULD NOT BE SAVED

    if (
        !saved
    ) {

        console.log(
            "The post appeared, but could not be saved."
        );

    }


    // CLEAR INPUT!

    titleInput.value = "";

    contentInput.value = "";

}



/* CREATE THE BLOG POST ON THE PAGE */

function createPost(
    postData,
    addToPage
) {

    const feed =
        document.getElementById("postFeed");


    if (
        !feed
    ) {

        return;

    }


    // THE PARAGRAPH FORMAT

    let contentHTML = "";


    const paragraphs =
        postData.content.split(
            /\n\s*\n/
        );


    paragraphs.forEach(
        function(paragraph) {


            if (
                paragraph.trim() !== ""
            ) {


                contentHTML += `

                    <p>

                        ${paragraph
                            .trim()
                            .replace(
                                /\n/g,
                                "<br>"
                            )}

                    </p>

                `;


            }

        }
    );


    // PUT EVERYTHING INTO THE POST!!!!!!!!!!!

    const post =
        document.createElement(
            "article"
        );


    post.className =
        "post-card";


    post.dataset.id =
        postData.id;


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
    //NEW POST GOES ON TOP

    if (
        addToPage
    ) {

        feed.prepend(
            post
        );

    }

}



/* LOAD SAVED POSTS */

function loadPosts() {

    const posts =
        getSavedPosts();


    if (
        posts.length === 0
    ) {

        return;

    }


    // LOAD POSTS IN THE CORRECT ORDER

    posts
        .slice()
        .reverse()
        .forEach(
            function(postData) {

                createPost(
                    postData,
                    true
                );

            }
        );

}



/* following up on the blog.html, needed a spot the delete the post in case of mess up
// DELETE BLOG POST */

function deletePost(
    button
) {


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


    if (
        !post
    ) {

        return;

    }


    // GET THE POST ID

    const postID =
        post.dataset.id;


    // GET ALL SAVED POSTS

    const posts =
        getSavedPosts();


    // REMOVE THE POST FROM SAVED POSTS

    const updatedPosts =
        posts.filter(
            function(savedPost) {

                return String(
                    savedPost.id
                ) !== String(
                    postID
                );

            }
        );


    // SAVE THE UPDATED POSTS

    savePosts(
        updatedPosts
    );


    // this migth have been redundant but maybe not. put the delete post before
    // DELETE THE POST

    post.remove();

}



/* VIDEO POSTS */
// realized too late that this was not neccessary, however claude helped with most of this, most difficult was connectino to my own files


function postVideo(
    event
) {


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
        URL.createObjectURL(
            file
        );


    const post =
        document.createElement(
            "article"
        );


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


    feed.prepend(
        post
    );


    const video =
        post.querySelector(
            "video"
        );


    const playButton =
        post.querySelector(
            ".play-button"
        );



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
