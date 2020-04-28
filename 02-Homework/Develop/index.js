// const questions = [

// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();

// write code below
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

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
            message: "Enter License",
            name: "license"
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
        {
            type: "input",
            message: "Enter User GitHub profile picture",
            name: "picture"
        },
        {
            type: "input",
            message: "Enter User GitHub email",
            name: "email"

        }

    ])
}

function generateREADME(response) {
    return `
# Your Project Title
${response.title}

## Description
${response.description}

## Table of Contents
* [Installation] (#installation)
* [Usage] (#usage)
* [Credits] (#credits)
* [License] (#license)

## Installation
 ${response.installation}

## Usage
${response.usage}

## License
${response.license}
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Badges
https://img.shields.io/badge/Repo%20status-Active-green

## Contributing
${response.contributing}

## Tests
${response.tests}

## Images
![Image of GitHub Profile picture](${response.picture})

## Email
${response.email}`

}

async function init() {
    try {
        const response = await promptUser();

        const README = await generateREADME(response)

        await writeFileAsync("README.md", README);

        console.log("Sucessfull wrote to README.md");
    } catch (err) {
        console.log(err);
    }
}

init();