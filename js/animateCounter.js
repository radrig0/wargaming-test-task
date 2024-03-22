export const animateCounter = (start, end, duration, element) => {
    let range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let increment = Math.floor((progress / duration) * range);

        element.innerHTML = start + increment;

        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            element.innerHTML = end;
        }
    }

    window.requestAnimationFrame(step);
}