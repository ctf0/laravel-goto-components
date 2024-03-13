import * as vscode from 'vscode';
import * as utils from '../utils';

export default class LensProvider implements vscode.CodeLensProvider {
    provideCodeLenses(doc: vscode.TextDocument): Promise<vscode.CodeLens[]> {
        const editor = vscode.window.activeTextEditor;
        const links = [];

        if (editor) {
            const filePath = doc.uri.path;

            if (filePath.endsWith(utils.comp_blade + utils.getFileBaseName(filePath))) {
                links.push(
                    new vscode.CodeLens(new vscode.Range(0, 0, 0, 0), {
                        command : 'lgtc.copyPath',
                        title   : '$(copy) Copy Component Path',
                    }),
                );
            }
        }

        return links;
    }
}
