/* =========================
   BLOG POSTS
========================= */

function publishPost() {

    const input =
        document.getElementById("postTitle");

    const feed =
        document.getElementById("postFeed");


    const text =
        input.value.trim();


    if (text === "") {

        return;

    }


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


    const post =
        document.createElement("article");


    post.className =
        "post-card";


    post.innerHTML = `

        <div class="post-date">

            ${date}

        </div>


        <h2 class="post-title">

            New Blog Post

        </h2>


        <p class="post-content">

            ${text}

        </p>

    `;


    /* NEW POST APPEARS FIRST */

    feed.prepend(post);


    /* CLEAR TEXT BOX */

    input.value = "";

}



/* =========================
   VIDEO POSTS
========================= */

function postVideo(event) {


    const file =
        event.target.files[0];


    if (!file) {

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


    /* CREATE VIDEO URL */

    const videoURL =
        URL.createObjectURL(file);


    /* CREATE POST */

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


    /* ADD VIDEO TO TOP */

    feed.prepend(post);


    /* GET VIDEO + PLAY BUTTON */

    const video =
        post.querySelector("video");


    const playButton =
        post.querySelector(".play-button");


    /* CLICK TRIANGLE = PLAY VIDEO */

    playButton.addEventListener(
        "click",
        function() {


            video.play();


            /* HIDE TRIANGLE */

            playButton.style.display =
                "none";


        }
    );


    /* IF VIDEO IS PAUSED, SHOW BUTTON */

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


    /* IF VIDEO ENDS, SHOW BUTTON AGAIN */

    video.addEventListener(
        "ended",
        function() {


            playButton.style.display =
                "flex";

        }
    );


    /* CLEAR INPUT */

    event.target.value = "";

}
