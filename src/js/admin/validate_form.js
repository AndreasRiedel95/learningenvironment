function validateField(field) {
    var fieldValid = true;
    var fieldLabel;

    if (field.value !== '') {
        field.previousElementSibling.classList.remove('--error');
    } else if (fieldValid) {
        field.previousElementSibling.classList.add('--error');
        fieldValid = false;
    }
    return fieldValid;
}

document.form1.addEventListener("submit", function(event) {
    let form = document.querySelector('form')
    var fields = document.querySelectorAll('.validate-me-js');
    fields.forEach((field) => {
        var fieldValid = validateField(field);
        if (!fieldValid) {
            event.preventDefault();
            return false;
        }
    });
});

window.validateField = validateField;
