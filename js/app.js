loadComplete = () => {
    $(".preloader").fadeOut(500)
    $(".quickPosts").fadeOut(500);
    $(".content").fadeIn(500)
}

$(window).on('load', function () {
    setTimeout(function () {
        loadComplete()
    }, 3000);
});

let xml = ["<h1>Loading Data Please Wait</h1>"]
$(".quickPosts").html(xml.join(''))
let colors = ["alert-primary", "alert-secondary", "alert-success", "alert-danger", "alert-warning", "alert-info", "alert-dark"]
let prev = 0
let newn = 0

getnumber = () => {
    newn = getRandomInt(6)
    while (newn == prev) {
        newn = getRandomInt(6)
    }
    prev = newn
    return newn
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

loadData = () => {
    $.get('https://www.tecinpact.tk/index.xml', function (data) {
        xml = ["<h1>Quick Post View</h1><br>"];
        $(data).find("item").each(function () { // or "item" or whatever suits your feed
            var el = $(this);

            var retstring = `
            <div class="alert ${colors[getnumber()]}" role="alert">
            <div class="media">
                <img src="img/folder.png" width="20%" class="align-self-center mr-3" alt="...">
                <div class="media-body">
                    <h5 class="mt-0">${el.find("title").text()}</h5>
                    <small>${el.find("pubDate").text()}</small>
                    <p>${el.find("description").text()}</p>
                    <hr>
                    <a href="${el.find('link').text()}" class="alert-link">Visit Post</a>
                </div>
            </div>
        </div>`;

            xml.push(retstring)
        });
        $(".quickPosts").html(xml.join(''))
    });
}

let QP = 0;

viewQP = () => {
    loadData();
    if (QP == 0) {
        $(".links").fadeOut(500);
        $(".quickPosts").fadeIn(500);
        QP = 1
    } else {
        $(".links").fadeIn(500);
        $(".quickPosts").fadeOut(500);
        QP = 0
    }
}

loadData()