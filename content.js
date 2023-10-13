chrome.runtime.onMessage.addListener(
    function(request, _, sendResponse) {
      if (request.speed > 0) {
        console.log("Tez: Updating video playback speed to", request.speed);

        v = document.getElementsByTagName('video');
        if (v.length == 0) {
            console.log("Tez: No video element found");
            sendResponse({error: "No video element found"});
            return
        }

        v[0].playbackRate = request.speed;
        sendResponse({speed: request.speed});
      }
    }
  );