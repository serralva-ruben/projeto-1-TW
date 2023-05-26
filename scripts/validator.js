export function validateInput(input, value) {
    if (value && value.trim() !== "") {
        // Check if the value is not undefined and not an empty string
        const regexPattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
        const isValid = regexPattern.test(value.trim());

        if (!isValid) {
            input.style.backgroundColor = 'red'; 
        } else {
            input.style.backgroundColor = ''; 
        }
        return isValid;
    }
    return false;
}