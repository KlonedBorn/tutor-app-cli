// Copyright (c) 2023 KingK
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const inquirer = require("inquirer");
const Tutor = require("../documents/Tutor");
const Student = require("../documents/Student")
const { select } = require("@inquirer/prompts");
const UserDashboard = require("./user-login");

class UserViewer {
    menu = {
        message: "| U S E R | V I E W E R|",
        choices: [
            {
                name: "Details",
                description: "Select a user to see the details of",
                value: "details",
            },
            {
                name: "Login",
                description: "Select a user to login as",
                value: "login",
            },
            {
                name: "Go back",
                description: "Select a user to remove from the system",
                value: "back",
            },
        ]
    }

    constructor(context) {
        this.context = context
    }

    async execute() {
        let bRunning = true
        while (bRunning) {
            await select(this.menu)
                .then(
                    async (select) => {
                        const users_ls = {
                            type: 'list',
                            name: 'users',
                            message: 'Select user to see details of',
                            choices: this.context.users.map((usr, id, arr) => {
                                return {
                                    name: `${usr.username} (${usr instanceof Tutor ? 'Tutor' : 'Student'})`,
                                    value: usr,
                                };
                            }),
                        };
                        switch (select) {
                            case "details":
                                await inquirer
                                    .prompt(users_ls)
                                    .then(
                                        async (user) => {
                                            console.log(
                                                JSON.stringify(user["users"], null, 1)
                                            )
                                        }
                                    );
                                break;
                            case "login":
                                await inquirer
                                    .prompt(users_ls)
                                    .then(
                                        async (user) => {
                                            console.log(`Logging in as ${user["users"].username}`);
                                            const dashboard = new UserDashboard(this.context)
                                            await dashboard.login(user["users"])
                                        }
                                    );
                                break;
                            case "back":
                                bRunning = false
                            break;
                        }
                    }
                )
        }
    }
}

module.exports = UserViewer