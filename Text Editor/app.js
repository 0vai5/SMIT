var editor = document.getElementById("editor");

function TextFormat(type) {
  if (type === "bold") {
    editor.style.fontWeight =
      editor.style.fontWeight === "bold" ? "normal" : "bold";
  } else if (type === "italic") {
    editor.style.fontStyle =
      editor.style.fontStyle === "italic" ? "normal" : "italic";
  } else {
    editor.style.textDecoration =
      editor.style.textDecoration === "underline" ? "none" : "underline";
  }
}

function textColor(elemValue) {
  editor.style.color = elemValue;
}

function textSize(value) {
  editor.style.fontSize = `${value}px`;
}

function fontFamily(value) {
  editor.style.fontFamily = value;
}
