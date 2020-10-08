const APIURL = 'http://localhost:3000/api/teddies/'

function createTag (tag, className,content, parent, attributes) {
    const element = document.createElement (tag)
    element.className = className
    element.innerHTML = content
    for (const key in attributes){
        element.setAttribute (key, attributes [key])
    }
    parent.appendChild (element)
    return element
}