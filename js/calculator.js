const technologiesSelect = document.querySelector('#calculator-form-technologies');


const technologiesMultiSelect = new Choices(technologiesSelect, {
    allowSearch: false,
    silent: false,
    renderChoiceLimit: -1,
    maxItemCount: -1,
    removeItems: true,
    removeItemButton: true,
    editItems: false,
    duplicateItemsAllowed: false,
    delimiter: ",",
    paste: true,
    searchEnabled: false,
    searchChoices: true,
    searchResultLimit: -1,
    position: "auto",
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    placeholder: true,
    noChoicesText: "No available options",
    itemSelectText: "Click to select",
    classNames: {
        containerInner: "choices__inner tech-input-container",
        input: "choices__input",
    },
});

calculateSum();

const calculatorform = document.querySelector('.calculator-form');

calculatorform.addEventListener('submit', function(event) {
    event.preventDefault();
    calculateSum();
});

function calculateSum() {
    // Selectors
    const websiteTipeSelect = document.querySelector('#calculator-form-website-tipe');
    const websiteCart = document.querySelector('#calculator-form-input-cart input:checked');
    const websiteEmail = document.querySelector('#calculator-form-input-email input:checked');



    // Values
    const websiteTipeValue = extractPriceFromValue(websiteTipeSelect.value);
    const technologiesValue = getTechnologiesSum(technologiesMultiSelect.getValue());
    const websiteCartValue = convertCartOptionToPrice(websiteCart.value);
    const websiteEmailValue = convertEmailOptionToPrice(websiteEmail.value);


    const totalSum = websiteTipeValue + technologiesValue + websiteCartValue + websiteEmailValue;

    renderSum(totalSum);
}

function renderSum(sum) {
    const costElement = document.querySelector('.calculator-form-total');
    
    costElement.textContent = 'Calculating ...';
    setTimeout(function () {
        costElement.textContent = sum + '$'
    }, 1500);
}

function convertCartOptionToPrice(option) {
    if (option === 'Yes') {
        return 350;
    }
    return 0;
}



function convertEmailOptionToPrice(option) {
    if (option === 'Yes') {
        return 500;
    }
    return 0;
}


function getTechnologiesSum(technologiesArr) {
    let totalSum = 0;

    technologiesArr.forEach(function(tech) {
        totalSum = totalSum + extractPriceFromValue(tech.value)
    })
    return totalSum;
}


function extractPriceFromValue(str) {
    const price = str.match(/:\d+/);

    if (price) {
        return Number(price[0].slice(1)) || 0;
    }

    return 0;
}