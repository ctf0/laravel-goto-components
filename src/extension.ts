import debounce from 'lodash.debounce';
import * as vscode from 'vscode';
import * as cmnds from './cmnds';
import LensProvider from './providers/LensProvider';
import LinkProvider from './providers/LinkProvider';
import * as utils from './utils';

let providers: any = [];
export function activate(context: vscode.ExtensionContext) {
    utils.readConfig();

    // config
    vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(utils.PACKAGE_NAME)) {
            utils.readConfig();
        }
    });

    // command
    context.subscriptions.push(
        vscode.commands.registerCommand('lgtc.copyPath', cmnds.copyPath),
    );

    // links
    initProviders();
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(async (e) => {
            await clearAll();
            initProviders();
        }),
    );
}

const initProviders = debounce(() => {
    providers.push(
        vscode.languages.registerDocumentLinkProvider(['blade', 'php'], new LinkProvider()),
    );

    if (utils.config.showCodeLens) {
        providers.push(vscode.languages.registerCodeLensProvider(['blade'], new LensProvider()));
    }
}, 250);

function clearAll() {
    return new Promise((res, rej) => {
        providers.map((e) => e.dispose());
        providers = [];

        setTimeout(() => res(true), 500);
    });
}
export function deactivate() {
    clearAll();
}
