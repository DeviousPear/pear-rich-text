# pear-rich-text
## About
pear-rich-text is a simple and very lightweight web component **UNDER DEVELOPMENT** for adding rich text editors to your web application.
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