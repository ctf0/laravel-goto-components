import escapeStringRegexp from 'escape-string-regexp';
import * as vscode from 'vscode';
import * as utils from '../utils';

export default class LinkProvider implements vscode.DocumentLinkProvider {
    public async provideDocumentLinks(doc: vscode.TextDocument): vscode.ProviderResult<vscode.DocumentLink[]> {
        const editor = vscode.window.activeTextEditor;
        const documentLinks: vscode.DocumentLink[] = [];

        if (editor) {
            const workspacePath = vscode.workspace.getWorkspaceFolder(doc.uri)?.uri.fsPath;

            const text = doc.getText();
            const matches = text.matchAll(new RegExp(utils.regex, 'g'));

            for (const match of matches) {
                const componentName = match[0];
                let componentPath = utils.nameToViewPath(componentName);

                if (!await utils.checkForExistence(workspacePath + componentPath)) {
                    componentPath = utils.nameToViewIndexPath(componentName);

                    if (!await utils.checkForExistence(workspacePath + componentPath)) {
                        componentPath = utils.nameToClassPath(componentName);

                        if (!await utils.checkForExistence(workspacePath + componentPath)) {
                            continue;
                        }
                    }
                }

                const range: any = doc.getWordRangeAtPosition(
                    doc.positionAt(match.index + componentName.length),
                    new RegExp(escapeStringRegexp(componentName)),
                );

                const link = new vscode.DocumentLink(
                    range,
                    vscode.Uri.file(workspacePath + componentPath),
                );
                link.tooltip = componentPath;

                documentLinks.push(link);
            }
        }

        return documentLinks;
    }
}
