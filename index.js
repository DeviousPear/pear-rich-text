window.customElements.define("text-editor", class extends HTMLElement {
    constructor() {
        super()
    }
    cleanup() {
        this.writer.innerHTML = this.writer.innerHTML
            .replaceAll("<span>", "").replaceAll("</span>", "")
    }
    /**
     * 
     * @param {string} elementType 
     * @param {object} properties 
     */
    format(elementType, properties) {
        const selection = window.getSelection();
        if (selection.isCollapsed) {
            const elem = document.createElement(elementType)
            selection.getRangeAt(0).surroundContents(elem)
        } else if (selection.focusNode.parentElement.closest(elementType)) {
            const thign = selection.focusNode.parentElement.closest(elementType)
            const selected = selection.getRangeAt(0)
            const beforeRange = document.createRange()
            beforeRange.setEnd(selected.startContainer, selected.startOffset)
            beforeRange.setStart(selected.startContainer.parentElement.closest(elementType), 0)
            const beforeNode = document.createElement(elementType)
            beforeNode.appendChild(beforeRange.extractContents())
            beforeRange.insertNode(beforeNode)
            const afterRange = document.createRange()
            afterRange.setStart(selected.endContainer, selected.endOffset)
            afterRange.setEndAfter(thign.lastChild)
            const afterNode = document.createElement(elementType)
            afterNode.appendChild(afterRange.extractContents())
            afterRange.insertNode(afterNode)
            const newNode = document.createElement("span")
            newNode.innerHTML = thign.innerHTML
            thign.outerHTML = newNode.outerHTML
        } else {
            const range = selection.getRangeAt(0)
            const contents = range.extractContents()
            if (contents.querySelector(elementType)) {
                Array.from(contents.children).forEach(i => {
                    if (i.nodeName.toLowerCase() == elementType) {
                        const node = document.createDocumentFragment()
                        Array.from(i.children).forEach(child => {
                            node.appendChild(child)
                        })
                        if (i.children.length == 0) {
                            node.append(document.createTextNode(i.textContent))
                        }
                        contents.replaceChild(node, i)
                    } else if (i.querySelector(elementType)) {
                        console.log("doing the replaceall")
                        i.innerHTML = i.innerHTML.replace(`<${elementType}>`, "")
                        i.innerHTML = i.innerHTML.replace(`</${elementType}>`, "")
                    }

                })
                range.insertNode(contents)
            }
            else {
                const node = document.createElement(elementType);
                if (elementType == "a") {
                    node.target = "__blank"
                    if (contents.textContent.trim().match(/http(s)?:\/\/*.*/)) {
                        node.href = contents.textContent.trim()
                    } else {
                        let url = prompt("URL")
                        if (url) {
                            node.href = url
                        } else {
                            let span = document.createElement("span")
                            span.appendChild(contents)
                            range.insertNode(span)
                            return
                        }
                    }

                }
                node.appendChild(contents)
                range.insertNode(node)

            }
        }
        this.cleanup()
    }
    removeFormatting() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0)
        const contents = range.extractContents()
        Array.from(contents.children).forEach(i => {
            console.log(i.textContent)
            contents.replaceChild(document.createTextNode(i.textContent), i)
        })
        range.insertNode(contents)
    }
    insertImage(blob) {
        const url = URL.createObjectURL(blob)
        const img = new Image()
        img.src = url
        img.style.height = "300px"
        try {
            window.getSelection().getRangeAt(0).insertNode(img)
        } catch {
            this.writer.appendChild(img)
        }

    }
    connectedCallback() {
        const writer = document.createElement("div")
        this.writer = writer
        writer.contentEditable = true
        this.writer.addEventListener("drop", async (event) => {
            console.log(event)
            event.preventDefault()
            if (event.dataTransfer.files.length !== 0) {
                Array.from(event.dataTransfer.files).forEach(file => {
                    this.insertImage(file)
                })
            }
        })
        this.writer.addEventListener("paste", (event) => {
            if (event.clipboardData.files.length !== 0) {
                Array.from(event.clipboardData.files).forEach(file => {
                    this.insertImage(file)
                })
            }
        })
    }
    exportHTML() {
        return this.writer.innerHTML
    }

})