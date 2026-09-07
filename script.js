```javascript
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


    /* DON'T PUBLISH EMPTY POSTS */

    if (text === "") {

        return;

    }


    /* GET TODAY'S DATE */

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


    /* SPLIT THE POST */

    const lines =
        text.split("\n");


    /*
        FIRST LINE = TITLE
        EVERYTHING ELSE = CONTENT
    */

    const title =
        lines[0].trim();


    const content =
        lines
            .slice(1)
            .join("\n")
            .trim();


    /* CREATE THE POST */

    const post =
        document.createElement("article");


    post.className =
        "post-card";


    /* CREATE CONTENT */

    let contentHTML = "";


    /*
        EMPTY LINE = NEW PARAGRAPH
    */

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
                            .replace(/\n/g, "<br>")}
                    </p>

                `;

            }

        }
    );


    /* PUT EVERYTHING INSIDE THE POST */

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

    `;


    /* PUT NEW POST AT THE TOP */

    feed.prepend(post);


    /* CLEAR THE TEXT BOX */

    input.value = "";

}



/* =========================
   VIDEO POSTS
========================= */

function postVideo(event) {


    const file =
        event.target.files[0];


    /* DON'T DO ANYTHING IF
       NO FILE WAS SELECTED */

    if (!file) {

        return;

    }


    const feed =
        document.getElementById("videoFeed");


    /* GET TODAY'S DATE */

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


    /* CREATE A TEMPORARY URL
       FOR THE VIDEO */

    const videoURL =
        URL.createObjectURL(file);


    /* CREATE VIDEO POST */

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


    /* ADD VIDEO TO THE TOP */

    feed.prepend(post);


    /* FIND VIDEO */

    const video =
        post.querySelector("video");


    /* FIND PLAY BUTTON */

    const playButton =
        post.querySelector(".play-button");


    /* =========================
       PLAY VIDEO
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
       VIDEO PAUSED
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
       VIDEO ENDED
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
```
