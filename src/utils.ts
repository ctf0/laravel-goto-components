import { pathExists } from 'fs-extra';
import pascalcase from 'pascalcase';
import * as vscode from 'vscode';
const path = require('path');

// ======================================================

export function nameToViewPath(name: string): string {
    return `${comp_blade}${name.replace(/\./g, '/')}.blade.php`;
}

export function nameToViewIndexPath(name: string): string {
    return `${comp_blade}${name.replace(/\./g, '/')}/index.blade.php`;
}

export function nameToClassPath(name: string): string {
    return `${comp_class}${pascalcase(name)}.php`;
}

// ======================================================

export function checkForExistence(path: string): bool {
    return pathExists(path);
}

// ======================================================

export function getFileName(fileName) {
    return path.parse(fileName).name;
}
export function getFileBaseName(fileName) {
    return path.parse(fileName).base;
}

// ======================================================

export const PACKAGE_NAME = 'laravelGotoComponent';
export let config: vscode.WorkspaceConfiguration;
export let regex = '';
export let comp_blade = '';

export function readConfig() {
    config = vscode.workspace.getConfiguration(PACKAGE_NAME);
    regex = config.regex;
    comp_blade = config.blade;
    comp_class = config.class;
}
