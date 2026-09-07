function publishPost() {

    const input =
        document.getElementById("postInput");

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


    feed.prepend(post);


    input.value = "";

}


/* =========================
   LOAD VIDEO
========================= */

function loadVideo(event) {

    const file =
        event.target.files[0];


    if (!file) {

        return;

    }


    const video =
        document.getElementById("videoPlayer");


    const placeholder =
        document.getElementById(
            "videoPlaceholder"
        );


    const videoURL =
        URL.createObjectURL(file);


    video.src =
        videoURL;


    video.style.display =
        "block";


    placeholder.style.display =
        "none";


    video.load();

}
