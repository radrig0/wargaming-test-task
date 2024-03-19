const slider = document.getElementById("rangeSlider");
const output = document.getElementById("rangeInput");
output.innerHTML = slider.value; // Display the default slider value

const experienceCounter = document.getElementById("experienceValue")
const INTERNAL_FACTOR = 3

function calculateExperience() {
    const configurationEls = document.getElementsByName("configuration")
    let configurationFactor = 1
    for (i = 0; i < configurationEls.length; i++) {
        if (configurationEls[i].checked) {
            configurationFactor = configurationEls[i].value
        }
    }
    experienceCounter.innerHTML = slider.value * INTERNAL_FACTOR * configurationFactor
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.value = this.value;
    calculateExperience()
}

output.oninput = function () {
    slider.value = this.value
    calculateExperience()
}

let rad = document.getElementsByName("configuration");
for (let i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        calculateExperience()
    });
}

for (let e of document.querySelectorAll('input[type="range"].rangeSlider')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}