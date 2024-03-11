import escapeStringRegexp from 'escape-string-regexp';
import {
    DocumentLink,
    DocumentLinkProvider,
    ProviderResult,
    TextDocument,
    Uri,
    window,
    workspace,
} from 'vscode';
import * as utils from './utils';

export default class LinkProvider implements DocumentLinkProvider {
    public async provideDocumentLinks(doc: TextDocument): ProviderResult<DocumentLink[]> {
        const editor = window.activeTextEditor;
        const documentLinks: DocumentLink[] = [];

        if (editor) {
            const workspacePath = workspace.getWorkspaceFolder(doc.uri)?.uri.fsPath;

            const text = doc.getText();
            const matches = text.matchAll(new RegExp(utils.regex, 'g'));

            for (const match of matches) {
                const componentName = match[0];
                let componentPath = utils.nameToPath(componentName);

                if (!await utils.checkForExistence(workspacePath + componentPath)) {
                    componentPath = utils.nameToIndexPath(componentName);

                    if (!await utils.checkForExistence(workspacePath + componentPath)) {
                        continue;
                    }
                }

                const range: any = doc.getWordRangeAtPosition(
                    doc.positionAt(match.index + componentName.length),
                    new RegExp(escapeStringRegexp(componentName)),
                );

                documentLinks.push(new DocumentLink(
                    range,
                    Uri.file(workspacePath + componentPath),
                ));
            }
        }

        return documentLinks;
    }
}
