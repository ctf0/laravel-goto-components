import debounce from 'lodash.debounce';
import { languages, window, workspace, type ExtensionContext } from 'vscode';
import LinkProvider from './linkProvider';
import * as utils from './utils';

let providers: any = [];
export function activate(context: ExtensionContext) {
    utils.readConfig();

    // config
    workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(utils.PACKAGE_NAME)) {
            utils.readConfig();
        }
    });

    initProviders();
    context.subscriptions.push(
        window.onDidChangeActiveTextEditor(() => initProviders()),
    );
}

const initProviders = debounce(() => {
    providers.push(
        languages.registerDocumentLinkProvider('blade', new LinkProvider()),
    );
}, 250);

export function deactivate() {
    providers.map((e) => e.dispose());
    providers = [];
}
