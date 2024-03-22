import {createPopper} from '@popperjs/core';
import {experienceCalculator} from './experienceCalculator'

// tooltip
const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

const tooltipElements = document.querySelectorAll('.tankCard');
const tooltipContent = document.getElementById('experienceCalculatorTooltip');

experienceCalculator(tooltipContent)

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
                    {
                        name: 'preventOverflow',
                        options: {
                            padding: 20,
                        }
                    }
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
                    {name: 'eventListeners', enabled: false},
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
