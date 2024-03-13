import * as vscode from 'vscode';
import * as utils from './utils';

export function copyPath() {
    const editor = vscode.window.activeTextEditor;
    const { fileName } = editor.document;
    const name = utils.getFileName(fileName).replace('.blade', '');

    return vscode.env.clipboard.writeText(`<x-${name} />`);
}
