var vscode = require('vscode')

/**
 * Get the nearest empty line below the cursor, or the last line in the file.
 * @param {TextEditor} editor The active text editor
 * @returns {TextLine}
 */
function emptyLineBelow(editor) {
    const document = editor.document
    var line = editor.selection.active.line

    

    max = document.lineCount - 1
    if (line < max)
    {
        if (document.lineAt(line).isEmptyOrWhitespace != document.lineAt(line + 1).isEmptyOrWhitespace)
            line = line + 1

        if (!document.lineAt(line).isEmptyOrWhitespace)
            while (line < max && !document.lineAt(++line).isEmptyOrWhitespace) { } // find for empty
        else
            while (line < max && document.lineAt(++line).isEmptyOrWhitespace) { } // find for non-empty
    }
    return document.lineAt(line)
}

/**
 * Get the nearest empty line above the cursor, or the first line in the file.
 * @param {TextEditor} editor The active text editor
 * @returns {TextLine}
 */
function emptyLineAbove(editor) {
    const document = editor.document
    var line = editor.selection.active.line

    min = 0
    if(line > min)
    {
        if (document.lineAt(line).isEmptyOrWhitespace != document.lineAt(line - 1).isEmptyOrWhitespace)
            line = line - 1
        if (!document.lineAt(line).isEmptyOrWhitespace)
            while (line > min && !document.lineAt(--line).isEmptyOrWhitespace) { }
        else
            while (line > min && document.lineAt(--line).isEmptyOrWhitespace) { }
        }
    return document.lineAt(line)
}

/**
 * Move the cursor to a new position, unselecting selected text.
 * @param {TextEditor} editor The active text editor
 * @param {Position} newPosn The new position
 */
function changeActive(editor, newPosn) {
    // const anchor = editor.selection.anchor
    var newSelection = new vscode.Selection(newPosn, newPosn)
    editor.selection = newSelection
    editor.revealRange(new vscode.Range(newPosn, newPosn))
}

/**
 * Move the cursor to a new position, preserving text selection.
 * @param {TextEditor} editor The active text editor
 * @param {Positon} newPosn The new position
 */
function changeActiveSelect(editor, newPosn) {
    const anchor = editor.selection.anchor
    var newSelection = new vscode.Selection(anchor, newPosn)
    editor.selection = newSelection
    editor.revealRange(new vscode.Range(newPosn, newPosn))
}

/**
 * Move the cursor down by one `paragraph`.
 * @param {TextEditor} editor The active text editor
 */
function blockTravelDown(editor) {
    const line = emptyLineBelow(editor)
    const newPosn = new vscode.Position(line.lineNumber, 0) // End of line, in case is last line
    changeActive(editor, newPosn)
}

/**
 * Move the cursor down by one `paragraph`, selecting text.
 * @param {TextEditor} editor The active text editor
 */
function blockSelectDown(editor) {
    const line = emptyLineBelow(editor)
    const newPosn = new vscode.Position(line.lineNumber, 0) // End of line, in case is last line
    changeActiveSelect(editor, newPosn)
}

/**
 * Move the cursor up by one `paragraph`
 * @param {TextEditor} editor The active text editor
 */
function blockTravelUp(editor) {
    const line = emptyLineAbove(editor)
    const newPosn = new vscode.Position(line.lineNumber, 0) // Beginning of line, in case is first line
    changeActive(editor, newPosn)
}

/**
 * Move the cursor up by one `paragraph`, selecting text.
 * @param {TextEditor} editor The active text editor
 */
function blockSelectUp(editor) {
    const line = emptyLineAbove(editor)
    const newPosn = new vscode.Position(line.lineNumber, 0) // Beginning of line, in case is first line
    changeActiveSelect(editor, newPosn)
}

exports.blockTravelUp = blockTravelUp
exports.blockTravelDown = blockTravelDown
exports.blockSelectUp = blockSelectUp
exports.blockSelectDown = blockSelectDown
