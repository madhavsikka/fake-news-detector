var corsProxy = "https://agile-mountain-62427.herokuapp.com/";
var appUrl = "https://fake-news-flask.herokuapp.com/predict";
var URL = corsProxy + appUrl;

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendresponse) {
    console.log(message.txt);
    let content = document.getElementsByTagName("body");
    for (elt of content) {
        fetch(URL, {
            method: "post",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: elt.innerText.replace(/(\r\n|\n|\r)/gm, " "),
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                var classification = res.classification;
                let headings = document.getElementsByTagName("h1");
                for (elt of headings) {
                    if (classification === "REAL")
                        elt.style["background-color"] = "#C7EA46";
                    else elt.style["background-color"] = "#FF6961";
                }
            })
            .catch(function (error) {
                console.log("Request failed", error);
            });
    }
}
