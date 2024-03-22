import {createPopper} from '@popperjs/core';
import {animateCounter} from "./animateCounter";

const initExperienceCalculator = (container) => {

    const rangeSlider = container.querySelector(".battleCountSlider input");
    const rangeInput = container.querySelector(".battleCountInput");
    rangeInput.value = rangeSlider.value; // Display the default slider value

    const experienceCounter = container.querySelector("#experienceValue")
    const INTERNAL_FACTOR = 3

    function calculateExperience() {
        const configurationFactor = container.querySelector('input[name=configuration]:checked').value
        const currentValue = Number(experienceCounter.innerHTML) || 0
        const result = rangeSlider.value * INTERNAL_FACTOR * configurationFactor
        animateCounter(currentValue, result, 300, experienceCounter)
    }

    // Update the current slider value (each time you drag the slider handle)
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

    let rad = document.getElementsByName("configuration");
    for (let i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function () {
            calculateExperience()
        });
    }
}

// tooltip
const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

const tooltipElements = document.querySelectorAll('.tankCard');
const tooltipContent = document.getElementById('experienceCalculatorTooltip');

initExperienceCalculator(tooltipContent)

tooltipElements.forEach(button => {
    let showTimeout

    const popperInstance = createPopper(button, tooltipContent, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 40],
                },
            },
        ],
    });

    function show(event) {
        // force hide previous popup before show new
        hide(event, true)
        // Set a timeout to show the tooltip after 500 milliseconds
        showTimeout = setTimeout(() => {
            // Make the tooltip visible
            tooltipContent.setAttribute('data-show', '');

            // Enable the event listeners
            popperInstance.setOptions((options) => ({
                ...options,
                modifiers: [
                    ...options.modifiers,
                    {name: 'eventListeners', enabled: true},
                ],
            }));

            // Update its position
            popperInstance.update();
        }, 500);
    }

    function hide(event, force) {
        /*clearTimeout(showTimeout);

        // Check if the relatedTarget is inside the tooltip
        if (force || !tooltipContent.contains(event.relatedTarget)) {
            // Hide the tooltip if the relatedTarget is not inside the tooltip
            tooltipContent.removeAttribute('data-show');

            // Disable the event listeners
            popperInstance.setOptions((options) => ({
                ...options,
                modifiers: [
                    ...options.modifiers,
                    {name: 'eventListeners', enabled: false},
                ],
            }));
        }*/
    }

    showEvents.forEach((event) => {
        button.addEventListener(event, show);
    });
    hideEvents.forEach((event) => {
        tooltipContent.addEventListener(event, hide);
        button.addEventListener(event, hide);
    });
});
