// Copyright (c) 2023 KingK
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { select } = require("@inquirer/prompts");
const inquirer = require("inquirer");
const Tutor = require("../documents/Tutor")
const Student = require("../documents/Student")
const UserViewer = require("./user-viewer")

class ConsoleApp {
  menu = {
    type: "list",
    message: "| M A I N | M E N U|",
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
        name: "Close app",
        description: "Terminate the app",
        value: "exit",
      },
    ]
  }

  constructor(context) {
    this.context = context // Get data outside of the app
  }

  async start() {
    console.log("Starting console app powered by [Inquirer]...");
    let bRunning = true
    while (bRunning) {
      await select(this.menu).then(async (sel) => {
        switch (sel) {
          case "tutor":
            await this.createTutor()
            break;
          case "student":
            await this.createStudent()
            break;
          case "viewer":
            const user_viewer = new UserViewer(this.context)
            await user_viewer.execute()
            break;
          case 'exit':
            bRunning = false
            break;
        }
      })
    }
    console.log("Closing console...Goodbye!");
  }

  async createTutor() {
    // Days of the week for which we want to get working hours
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    // Helper function to validate time format (##:## - ##:##) in 24-hour format
    const validateTimeFormat = (input) => {
      const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]\s*-\s*(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
      if (!timeRegex.test(input)) {
        return 'Please enter time in the format 01:30 - 18:45 in 24-hour format.';
      }
      return true;
    };

    const questions = [
      {
        type: 'input',
        name: 'username',
        message: 'Enter your username:',
        validate: (input) => {
          if (input.length < 1) {
            return 'Username cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'about',
        message: 'Enter a short about me (max 500 characters):',
        validate: (input) => {
          if (input.length > 500) {
            return 'About me must be 500 characters or less';
          }
          return true;
        },
      },
      {
        type: 'checkbox',
        name: 'expertise',
        message: 'Select your areas of expertise:',
        choices: this.context.topics,
      },
    ];
    // Add question for each working day
    daysOfWeek.forEach((day) => {
      questions.push({
        type: 'input',
        name: `schedule_${day}`,
        message: `Enter working hours (${day}):`,
        validate: validateTimeFormat,
      });
    });

    await inquirer.prompt(questions)
      .then((tutorInfo) => {
        let schedule = {}
        daysOfWeek.forEach(day => {
          const key = `schedule_${day}`;
          schedule += { day: tutorInfo[key] }
        });
        const tutor = new Tutor(
          tutorInfo.username,
          tutorInfo.about,
          schedule,
          tutorInfo.expertise
        )
        this.context.users += tutor
        console.log("Tutor successfully created!");
      })
  }

  async createStudent() {
    const question = [
      {
        type: 'input',
        name: 'username',
        message: 'Enter your username:',
        validate: (input) => {
          if (input.length < 1) {
            return 'Username cannot be empty';
          }
          return true;
        },
      }
    ]
    await inquirer.prompt(question)
      .then(
        (studentInfo) => {
          const student = new Student(studentInfo.username)
          this.context.users += student
          console.log("Student created successfully!");
        }
      )
  }
  toString() {
    return `ConsoleApp()`;
  }
}

module.exports = ConsoleApp