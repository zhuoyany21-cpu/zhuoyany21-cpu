// BLOG POSTS!!!!!!!!!


// LOAD SAVED BLOG POSTS WHEN PAGE OPENS

document.addEventListener(
    "DOMContentLoaded",
    function() {


        loadPosts();


    }
);


// PUBLISH NEW BLOG POST

function publishPost() {


    // GET INPUT!!

    const titleInput =
        document.getElementById("postTitle");

    const contentInput =
        document.getElementById("postContent");

    const feed =
        document.getElementById("postFeed");


    // GET WHAT USER TYPED

    const title =
        titleInput.value.trim();

    const content =
        contentInput.value.trim();


    // MAKE SURE THERE IS A TITLE FOR THE BLOG POST!

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

    const savedPosts =
        JSON.parse(
            localStorage.getItem(
                "blogPosts"
            )
        ) || [];


    // ADD NEW POST TO BEGINNING

    savedPosts.unshift(
        newPost
    );


    // SAVE POSTS

    localStorage.setItem(
        "blogPosts",
        JSON.stringify(
            savedPosts
        )
    );


    // CREATE POST ON PAGE

    createPost(
        newPost,
        feed
    );


    // CLEAR INPUT!

    titleInput.value = "";

    contentInput.value = "";

}


// CREATE POST FUNCTION

function createPost(
    postData,
    feed
) {


    const post =
        document.createElement("article");


    post.className =
        "post-card";


    // SAVE POST ID

    post.dataset.id =
        postData.id;


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


    // ONLY RUN ON BLOG PAGE

    if (
        !feed
    ) {

        return;

    }


    const savedPosts =
        JSON.parse(
            localStorage.getItem(
                "blogPosts"
            )
        ) || [];


    // CREATE EVERY SAVED POST

    savedPosts
        .slice()
        .reverse()
        .forEach(
            function(postData) {


                createPost(
                    postData,
                    feed
                );


            }
        );


}


// DELETE BLOG POST

function deletePost(button) {


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
        post
    ) {


        // GET POST ID

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
            ) || [];


        // REMOVE DELETED POST FROM STORAGE

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

function postVideo(event) {


    const file =
        event.target.files[0];


    if (
        !file
    ) {

        return;

    }


    const feed =
        document.getElementById(
            "videoFeed"
        );


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


    // PLAY BUTTON FOR VIDEO

    playButton.addEventListener(
        "click",
        function() {


            video.play();


            playButton.style.display =
                "none";


        }
    );


    // SHOW PLAY BUTTON WHEN VIDEO IS PAUSED

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


    // VIDEO ENDS, SHOW BUTTON AGAIN

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
