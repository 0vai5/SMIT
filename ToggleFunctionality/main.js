var passInput = document.getElementById("pass")

function togglePass (icon) {
    if( icon.classList.contains("fa-eye") ) {
        icon.classList.replace("fa-eye", "fa-eye-slash")
        passInput.type = "text"
    } else {
        icon.classList.replace("fa-eye-slash", "fa-eye")
        passInput.type = "password"
    }
}