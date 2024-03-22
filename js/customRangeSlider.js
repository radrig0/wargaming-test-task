(function () {
    const customRangeSliders = document.querySelectorAll(".rangeSlider");
    customRangeSliders.forEach(customRangeSlider => {
        customRangeSlider.style.setProperty('--value', customRangeSlider.value);
        customRangeSlider.style.setProperty('--min', customRangeSlider.min === '' ? '0' : customRangeSlider.min);
        customRangeSlider.style.setProperty('--max', customRangeSlider.max === '' ? '100' : customRangeSlider.max);
        customRangeSlider.addEventListener('input', () => customRangeSlider.style.setProperty('--value', customRangeSlider.value));
    })
})()