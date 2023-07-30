// Copyright (c) 2023 KingK
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { select } = require("@inquirer/prompts");

class ConsoleApp {
    constructor(context) {
        this.context = context // Get data outside of the app
    }

    async start(){
        console.log("Starting console app powered by [Inquirer]...");
        let bRunning = true

        const main_menu = {
            type:"list",
            message:"| M A I N | M E N U|",
            choices: [
                {
                    "name": "Go to User Viewer",
                    "description": "View and modify user data",
                    "value": "viewer"
                },
                {
                    "name": "Create a student",
                    "description": "Create a new student",
                    "value": "student"
                },
                {
                    "name": "Create a tutor",
                    "description": "Create a new tutor",
                    "value": "tutor"
                },
                {
                    name:"Close app",
                    description:"Terminate the app",
                    value:"exit",
                },
            ]
        }

        while(bRunning){
            await select(main_menu).then( (sel) => {
                switch(sel){
                    case "tutor":
                        
                    break;
                    case "student":
                        
                    break;
                    case "viewer":
                        
                    break;
                    case 'exit':
                        bRunning = false
                    break;
                }
            })
        }
        console.log("Closing console...Goodbye!");
    }

    toString() {
        return `ConsoleApp()`;
    }
}

module.exports = ConsoleApp
