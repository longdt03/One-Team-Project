var ws = new WebSocket("ws://127.0.0.1:1234/");
ws.binaryType = "arraybuffer";

ws.onopen = function () {
    alert("Opened");
    ws.send("I'm client");
    document.getElementById("status").innerHTML = "Status: Connected";
};

ws.onmessage = function (evt) {
};

ws.onclose = function () {
    document.getElementById("status").innerHTML = "Status: Disconnect";
    alert("Closed");
};

ws.onerror = function (err) {
    alert("Error: " + err);
};

var btn_shutdown = document.getElementById("shutdown");
btn_shutdown.onclick = function () {
    ws.send("shutdown|5");
};
