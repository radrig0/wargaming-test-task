import '../css/test.css'
import { createPopper } from '@popperjs/core';

const initExperienceCalculator = () => {

    const slider = document.getElementById("rangeSlider");
    const output = document.getElementById("rangeInput");
    output.innerHTML = slider.value; // Display the default slider value

    const experienceCounter = document.getElementById("experienceValue")
    const INTERNAL_FACTOR = 3

    function calculateExperience() {
        const configurationEls = document.getElementsByName("configuration")
        let configurationFactor = 1
        for (let i = 0; i < configurationEls.length; i++) {
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
        rad[i].addEventListener('change', function () {
            calculateExperience()
        });
    }

    for (let e of document.querySelectorAll('input[type="range"].rangeSlider')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min === '' ? '0' : e.min);
        e.style.setProperty('--max', e.max === '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }
}

initExperienceCalculator()

// tooltip

const updateTooltipData = () => {
    console.log('updateTooltipData');
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

const tooltipElements = document.querySelectorAll('.tankCard');
const tooltipContent = document.querySelector('#experienceCalculatorTooltip');

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

            updateTooltipData();

            // Enable the event listeners
            popperInstance.setOptions((options) => ({
                ...options,
                modifiers: [
                    ...options.modifiers,
                    { name: 'eventListeners', enabled: true },
                ],
            }));

            // Update its position
            popperInstance.update();
        }, 500);
    }

    function hide(event, force) {
        clearTimeout(showTimeout);

        // Check if the relatedTarget is inside the tooltip
        if (force || !tooltipContent.contains(event.relatedTarget)) {
            // Hide the tooltip if the relatedTarget is not inside the tooltip
            tooltipContent.removeAttribute('data-show');

            // Disable the event listeners
            popperInstance.setOptions((options) => ({
                ...options,
                modifiers: [
                    ...options.modifiers,
                    { name: 'eventListeners', enabled: false },
                ],
            }));
        }
    }

    showEvents.forEach((event) => {
        button.addEventListener(event, show);
    });
    hideEvents.forEach((event) => {
        tooltipContent.addEventListener(event, hide);
        button.addEventListener(event, hide);
    });
});
