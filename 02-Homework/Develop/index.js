// * Starter Code * 

// const questions = [

// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();

// * New Code *
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter Project Title",
            name: "title"
        },
        {
            type: "input",
            message: "Enter Description",
            name: "description"
        },

        // How to dynamically create license
        {
            type: "list",
            message: "What kind of license should your project have?",
            choices: ["MIT Licese", "GNU GPLv3"],
            name: "lisense"
        },
        {
            type: "input",
            message: "What are the steps required to install your project?",
            name: "installation"
        },
        {
            type: "input",
            message: "Provide instructions and examples for use. Include screenshots as needed.",
            name: "usage"
        },
        {
            type: "input",
            message: "If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so.",
            name: "contributing"
        },
        {
            type: 'input',
            message: "Write tests for your application. Then provide examples on how to run them.",
            name: "tests"
        },

        // this will change to ask for 'username'
        {
            type: "input",
            message: "Enter User GitHub profile picture",
            name: "picture"
        },
        {
            type: "input",
            message: "Enter your contact email",
            name: "email"

        }

    ])

        // .then(function ({ picture }) {
        //     const queryUrl = `https://avatars.githubusercontent.com/${picture}`;

        //     axios.get(queryUrl).then(function (response) {

        //     })
        // })
}

function generateREADME(response) {
    return `
# Your Project Title
${response.title}

## Description
${response.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Installation
 ${response.installation}

## Usage
${response.usage}

## License
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Badges
[![Badge](https://img.shields.io/badge/Repo%20status-Active-green)](https://shields.io/)

## Contributing
${response.contributing}

## Tests
${response.tests}

## Images
![Image of GitHub Profile picture](https://avatars.githubusercontent.com/${response.picture})

## Email
If there are any issues or questions about this project, you may contact me directly, at ${response.email}`

}

async function init() {
    try {
        const response = await promptUser();

        const README = await generateREADME(response)

        await writeFileAsync("README.md", README);

        console.log("Sucessfully wrote to README.md");
    } catch (err) {
        console.log(err);
    }
}

init();