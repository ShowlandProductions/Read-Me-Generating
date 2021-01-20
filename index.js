// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

//NPM's used
const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
        // Enter your GitHub Username 
        {
            type: 'input',
            name: 'username',
            message: 'Enter your GitHub username.',
            // This function will verify that at least 1 word was entered
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("GitHub username must be entered.");
                }
                return true;
            }
        },
        // GitHub Repo for Read Me
        {
            type: 'input',
            name: 'repository',
            message: 'Name of your Github repository.',
            // Validate that user entered at least one word for the Github Repository
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("You must enter the name of your GitHub repository.");
                }
                return true;
            } 
        },
        // Title of Project
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project.',
            // We need to validate that user entered at least one word
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("Project title must be entered.");
                }
                return true;
            }
        },
        // Description of the Project
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description of your project.',
            // User must enter at least one word
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("Project Description must be entered.");
                }
                return true;
            }
        },
        // Installation Instructions
        {
            type: 'input',
            name: 'installation',
            message: 'Explain how user would install (if necessary) for Installation Section.',
            // Validation not required 
        },
        // Purpose of the project
        {
            type: 'input',
            name: 'usage',
            message: 'Enter your project instructions and examples of it in use for Usage Section.',
        },
        // Selecting a Github license
        {
            type: 'list',
            name: 'license',
            message: 'Choose your license for your project.',
            // https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/licensing-a-repository
            choices: ['afl-3.0', 'apache-2.0', 'artistic-2.0', 'bsl-1.0', 'bsd-2-clause', 'bsd-3-clause', 'bsd-3-clause-clear', 'cc', 'cc0-1.0', 'cc-by-4.0', 'cc-by-sa-4.0', 'wtfpl', 'ecl-2.0', 'epl-1.0', 'epl-2.0', 'eupl-1.1', 'agpl-3.0', 'gpl', 'gpl-2.0', 'gpl-3.0', 'lgpl', 'lgpl-2.1', 'lgpl-3.0', 'isc', 'lppl-1.3c', 'ms-pl', 'mit', 'mpl-2.0', 'osl-3.0', 'postgresql', 'ofl-1.1', 'ncsa', 'unlicense', 'zlib']
            
        },
        // Contributing to a project
        {
            type: 'input',
            name: 'contributing',
            message: 'How can users contribute to your project (if necessary).',
            // Validation not required 
        },
        // Test for project
        {
            type: 'input',
            name: 'tests',
            message: 'Project Tests, and explaination on how to test (if necessary).',
            // Validation not required 
        },
    ];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log('Your markdown file has been created.')
    });
}

// Reference: https://www.npmjs.com/package/util.promisify
const writeFileAsync = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
    // Reference used https://www.w3schools.com/js/js_errors.asp
    try {
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Your responses have been logged. Calling to GitHub...");

        // API.js reference
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);

        // Passing inquirer data and api data to generating markdown
        console.log("Generating your markdown")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);

        // Writing markdown
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};
// Function call to initialize app
init();
