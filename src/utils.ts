import { pathExists } from 'fs-extra';
import { workspace, WorkspaceConfiguration } from 'vscode';

export function nameToPath(path: string): string {
    return `${comp_path}${path.replace(/\./g, '/')}.blade.php`;
}

export function nameToIndexPath(path: string): string {
    return `${comp_path}${path.replace(/\./g, '/')}/index.blade.php`;
}

export function checkForExistence(path: string): bool {
    return pathExists(path);
}

// ======================================================

export const PACKAGE_NAME = 'laravelGotoComponents';
export let config: WorkspaceConfiguration;
export let regex = '';
export let comp_path = '';

export function readConfig() {
    config = workspace.getConfiguration(PACKAGE_NAME);
    regex = config.regex;
    comp_path = config.path;
}
