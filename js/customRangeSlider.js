(function () {
    const customRangeSliders = document.querySelectorAll(".rangeSlider");
    customRangeSliders.forEach(customRangeSliderWrapper => {
        const customRangeSlider = customRangeSliderWrapper.getElementsByTagName('input')[0]
        customRangeSlider.style.setProperty('--value', customRangeSlider.value);
        customRangeSlider.style.setProperty('--min', customRangeSlider.min === '' ? '0' : customRangeSlider.min);
        customRangeSlider.style.setProperty('--max', customRangeSlider.max === '' ? '100' : customRangeSlider.max);
        customRangeSlider.addEventListener('input', () => customRangeSlider.style.setProperty('--value', customRangeSlider.value));
    })
})()