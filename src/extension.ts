// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import {Repository, GitExtension} from './git';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "commitgen" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('commitgen.genMessage', (repository: Repository) => {
		repository = getRepo(repository);
		repository.inputBox.value = "Loading..."
		repository.diff(true).then((data) => {
			const files = data.split('diff --git');
			// For each file remove until the first @@
			const filesWithoutHeader = files.map((file,i) => {
				const filePathA = file.substring(file.indexOf('a/'), file.indexOf(' b/')).replace('a/', '');
				const filePathB = file.substring(file.indexOf('b/'), file.indexOf('\n')).replace('b/', '');
				const code:string = file.substring(file.indexOf('@@')) || '';
				return code.length ? ` file path A: ${filePathA} | file path B: ${filePathB}\n\n${code}` : '';
			}).filter((file) => file !== '');
			let prompt = filesWithoutHeader.join('\n---\n');
			prompt+= "\n\n###\n\n";
			axios({
				method: 'post',
				url: 'https://commitgenerator.vercel.app',
				data: {
					"prompt": prompt,
				  }
			}).then((response) => {
				const commitMessage = response.data.choices[0].text;
				repository.inputBox.value = commitMessage;
			});
				
			
		});
	}, { repository: true });

	context.subscriptions.push(disposable);
	vscode.commands.executeCommand('setContext', 'commitGen.enabled', true);
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) vscode-whatthecommit. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *---------*/
function getRepo(repository: Repository | undefined): Repository {
	if (repository === undefined) {
		let gitExtension = vscode?.extensions?.getExtension<GitExtension>('vscode.git')?.exports;
		let api = gitExtension?.getAPI(1);
		repository = api?.repositories[0];
	}

	return repository as Repository;
}

// This method is called when your extension is deactivated
export function deactivate() {}
