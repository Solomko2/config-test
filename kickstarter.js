const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const fs = require('fs');
const rimraf = require('rimraf');

const packageJson = require('./package.json');

async function kickstart() {

    const questions = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: `What's the name of your project? (kebab-cased)`,
            default: 'awesome-project'
        },
        {
            type: 'input',
            name: 'projectAuthor',
            message: `Who's the author?`,
            default: 'John Doe'
        },
        {
            type: 'input',
            name: 'mobileHeaderColor',
            message: 'What color would you like the mobile header to be? (https://bit.ly/1LX2mtq)',
            default: '#ff4970'
        }
    ]);

    const {projectName, projectAuthor, mobileHeaderColor} = questions;

    console.log(projectName, projectAuthor, mobileHeaderColor);

}

kickstart();
