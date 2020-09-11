const vscode = require("vscode");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.remove-console",
    function() {
      const editor = vscode.window.activeTextEditor;
      const range = new vscode.Range(0, 0, editor.document.lineCount, 0);
      const newTextLines = editor.document
        .getText()
        // .replace(/console\.log\(.*?\);{0,}/gs, "");
        .replace(/console\.log\((\W?).*?\1,?\);/gs, "");
      editor.edit(editBuilder => {
        return editBuilder.replace(range, newTextLines);
      });
    }
  );
  context.subscriptions.push(disposable);
}

exports.activate = activate;
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
