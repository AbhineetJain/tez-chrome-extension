var slider = document.getElementById('speed');
var output = document.getElementById('currentSpeed');
var error = document.getElementById('error');

output.innerHTML = slider.value;
chrome.storage.local.get('tezSpeed').then((result) => {
    storedSpeed = 1;
    if (result.tezSpeed) {
        console.log('Last stored speed is ' + result.tezSpeed);
        storedSpeed = result.tezSpeed;
    }
    slider.value = storedSpeed;
    output.innerHTML = storedSpeed;
    handleSpeedChange(slider);
    showSliderProgress();
});

handleSpeedChange = async (input) => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {speed: parseFloat(input.value)});

    console.log("Response from tab:", response);
    if (response.error) {
        error.innerHTML = response.error
        return
    }
    output.innerHTML = response.speed;
    chrome.storage.local.set({ tezSpeed: response.speed }).then(() => {
        console.log('Speed is stored as', response.speed);
    });
  }

slider.oninput = function() {
  showSliderProgress();
  handleSpeedChange(this);
}

function showSliderProgress() {
  const sliderValue = slider.value;
  const progress = ((sliderValue - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, #46b53c ${progress}%, #d0ebcd ${progress}%)`;
}
