import {animateCounter} from "./animateCounter";

const FIGHTS_QUANTIFIER = 3

export const experienceCalculator = (container) => {

    const rangeSlider = container.querySelector(".battleCountSlider input");
    const rangeInput = container.querySelector(".battleCountInput");
    rangeInput.value = rangeSlider.value; // Display the default slider value

    const experienceCounter = container.querySelector(".experienceCounter")


    function calculateExperience() {
        const equipmentQuantifier = container.querySelector('input[name=configuration]:checked').value
        const currentValue = Number(experienceCounter.innerHTML) || 0
        const result = rangeSlider.value * FIGHTS_QUANTIFIER * equipmentQuantifier
        animateCounter(currentValue, result, 300, experienceCounter)
    }

    rangeSlider.oninput = function () {
        rangeInput.value = this.value;
        calculateExperience()
    }

    rangeInput.oninput = function () {
        rangeSlider.value = this.value
        const event = new Event("input");
        rangeSlider.dispatchEvent(event)
        calculateExperience()
    }

    // TODO: add event delegation
    let rad = document.getElementsByName("configuration");
    for (let i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function () {
            calculateExperience()
        });
    }
}