// Goal: replace all images with a block displaying the image's alt text to give a better understanding of how a page would be used with a screen reader.

[...$("img")].forEach(img => {
    let width = img.width, height = img.height, alt = img.alt;
    img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFAQMAAAC3obSmAAAAA1BMVEXDw8PWKQJEAAAACklEQVR4XmOAAwAACgABVbkKvgAAAABJRU5ErkJggg==";
    img.width = width;
    img.height = height;
    let container = document.createElement("div");
    let imgParent = img.parentNode;
    imgParent.insertBefore(container, img);
    imgParent.removeChild(img);
    container.appendChild(img);
    let siblingAlt = document.createElement("p");
    siblingAlt.appendChild(document.createTextNode(alt));
    container.appendChild(siblingAlt);
    container.style = "position: relative; border: 1px solid #ccc;";
    siblingAlt.style = "margin: 0; position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; background-color: white; color: black; padding-left: 5px; padding-right: 5px;";
})
