# pear-rich-text
## About
pear-rich-text is a simple and very lightweight web component **UNDER DEVELOPMENT** for adding rich text editors to your web application.
## Installation
To install pear-rich-text, add the following code to your page:
```html
<script src="https://cdn.jsdelivr.net/gh/DeviousPear/pear-rich-text/index.js"></script>
```
If you want to download it directly, download `index.js` and rename it, and include the `<script>` in your page.
## Usage
pear-rich-text is a web component. Once installed in a page, you can simply embed it like this:
```html
<pear-rich-text></pear-rich-text>
```
If you want to add a toolbar, do it something like this:
```html
<pear-rich-text onload="const editor = this"></pear-rich-text>
<div id="toolbar">
    <button onclick="editor.format('b')">Bold</button>
    <button onclick="editor.format('i')">Italics</button>
    <button onclick="editor.removeFormatting()">Clear formatting</button>
</div>
```
## Methods
### `format(type: string)`
`format()` is a simple method for formatting the user's selection. It uses the corresponding HTML tags, so to bold the user's selection, use 
```javascript
editor.format("b")
```
### `clearFormatting()`
`clearFormatting()` is a simple method similar to `format()` except it clears all formatting from the user's selection
```javascript
editor.clearFormatting()
```
### `insertImage(image: Blob)`
`insertImage` inserts an image at the users selection. This image can be set by passing a `Blob` to the method.
```javascript
const res = await fetch("/img.jpg")
const blob = await res.blob()
editor.insertImage(blob)
```
### `exportHTML()`
`exportHTML` returns a HTML string with the contents of what the user has typed.
```javascript
const value = editor.exportHTML()
```