document.addEventListener(
    "DOMContentLoaded",
    function () {
        var checkButton = document.getElementById("detect");
        checkButton.addEventListener(
            "click",
            function () {
                chrome.tabs.query(
                    { active: true, currentWindow: true },
                    function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            method: "gotMessage",
                        });
                    }
                );
            },
            false
        );
    },
    false
);
