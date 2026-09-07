/* =========================
   BLOG POSTS
========================= */

function publishPost() {


    /* GET THE INPUTS */

    const titleInput =
        document.getElementById("postTitle");

    const contentInput =
        document.getElementById("postContent");

    const feed =
        document.getElementById("postFeed");


    /* GET WHAT THE USER TYPED */

    const title =
        titleInput.value.trim();

    const content =
        contentInput.value.trim();


    /* MAKE SURE THERE IS A TITLE */

    if (
        title === ""
    ) {

        alert(
            "Please enter a title for your post."
        );

        titleInput.focus();

        return;

    }


    /* MAKE SURE THERE IS CONTENT */

    if (
        content === ""
    ) {

        alert(
            "Please write something for your post."
        );

        contentInput.focus();

        return;

    }


    /* =========================
       AUTOMATIC DATE
    ========================= */

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


    /* =========================
       CREATE POST
    ========================= */

    const post =
        document.createElement("article");


    post.className =
        "post-card";


    /* =========================
       FORMAT PARAGRAPHS
    ========================= */

    let contentHTML = "";


    const paragraphs =
        content.split(/\n\s*\n/);


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


    /* =========================
       PUT EVERYTHING INTO POST
    ========================= */

    post.innerHTML = `

        <div class="post-date">

            ${date}

        </div>


        <h2 class="post-title">

            ${title}

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


    /* =========================
       PUT NEW POST AT THE TOP
    ========================= */

    feed.prepend(post);


    /* =========================
       CLEAR INPUTS
    ========================= */

    titleInput.value = "";

    contentInput.value = "";

}


/* =========================
   DELETE BLOG POST
========================= */

function deletePost(button) {


    /* ASK FOR CONFIRMATION */

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this post?"
        );


    /* STOP IF THEY CANCEL */

    if (
        !confirmDelete
    ) {

        return;

    }


    /* FIND THE POST */

    const post =
        button.closest(".post-card");


    /* DELETE THE POST */

    if (
        post
    ) {

        post.remove();

    }

}


/* =========================
   VIDEO POSTS
========================= */

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


    /* =========================
       PLAY BUTTON
    ========================= */

    playButton.addEventListener(
        "click",
        function() {


            video.play();


            playButton.style.display =
                "none";


        }
    );


    /* =========================
       IF VIDEO IS PAUSED
       SHOW BUTTON
    ========================= */

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


    /* =========================
       IF VIDEO ENDS
       SHOW BUTTON AGAIN
    ========================= */

    video.addEventListener(
        "ended",
        function() {


            playButton.style.display =
                "flex";


        }
    );


    /* =========================
       CLEAR FILE INPUT
    ========================= */

    event.target.value = "";

}
