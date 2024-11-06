var image = document.getElementById('preview');
var toolbox = document.getElementById('toolbox');

function previewImage(event) {
    var input = event.target;
    image.style.display = 'block';
    toolbox.style.display = 'flex';
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            image.src = e.target.result;
            image.style.filter = 'blur(0px)'; // Reset blur when a new image is uploaded
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function changeBlur(value) {
    image.style.filter = `blur(${value}px)`;
}
