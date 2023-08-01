// Copyright (c) 2023 KingK
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { select } = require("@inquirer/prompts");
const inquirer = require("inquirer");
const Student = require("../documents/Student");
const Session = require("../documents/Session");
const Tutor = require("../documents/Tutor");

class UserDashboard {
  student_menu = {
    message: "| S T U D E N T | D A S H B O A R D |",
    choices: [
      {
        name: "Inbox",
        description: "View incoming orders and sessions",
        value: "inbox",
      },
      {
        name: "Order",
        description: "Create a session order and send to tutor",
        value: "order",
      },
      {
        name: "Logout",
        description: "Return to user menu ",
        value: "logout",
      },
    ],
  };

  tutor_menu = {
    message: "|T U T O R | D A S H B O A R D |",
    choices: [
      {
        name: "Inbox",
        description: "View incoming orders and sessions",
        value: "inbox",
      },
      {
        name: "Logout",
        description: "Return to user menu ",
        value: "logout",
      },
    ],
  };

  constructor(context) {
    this.context = context;
  }

  async login(usr) {
    let bRunning = true;
    const pending_menu = [
      {
        name: "Accept",
        description: "Accept this session; updates status to 'upcoming'",
        value: "accept",
      },
      {
        name: "Decline",
        description: "Decline this session",
        value: "decline",
      },
    ];
    const upcoming_menu = [
      {
        name: "Attend",
        description: "Attend the session (ignores date); updates status to 'completed'",
        value: "attend",
      },
      {
        name: "Cancel",
        description: "Cancel this session and sends a notification to the student",
        value: "cancel",
      },
    ];
    const completed_menu = [
      {
        name: "View",
        description: "View details of the session",
        value: "view",
      },
      {
        name: "Delete",
        description: "Delete record of session",
        value: "delete",
      },
    ];
    while (bRunning) {
      if (usr instanceof Tutor) {
        await select(this.tutor_menu).then(async (option) => {
          switch (option) {
            case "inbox":
              const inbox = {
                type: "list",
                name: "session inbox",
                message: "Select a session to perform actions",
                choices: usr.sessions.map((sess) => {
                  const message = `[${sess.dateOf} - ${sess.timeOf}] ${sess.courseId} ${sess.student} ${sess.state}`;
                  return {
                    name: message,
                    value: sess,
                  };
                }),
              };
              await inquirer.prompt(inbox).then(async (session) => {
                console.log(`Session (${session.uuid}) selected\nStatus:${session.status}`);
                let menu;
                switch (session.status) {
                  case "pending":
                    menu = [
                      {
                        name: "Decline",
                        description: "Decline this session",
                        value: "decline",
                      },
                      {
                        name: "Go back",
                        description: "Return to dashboard",
                        value: "back",
                      },
                    ];
                    break;
                  case "upcoming":
                    menu = upcoming_menu;
                    break;
                  case "completed":
                    menu = completed_menu;
                    break;
                }
                await select(menu).then(async (action) => {
                  switch (action) {
                    case "decline":
                      console.log("Session order declined");
                      session.status = "declined";
                      break;
                    case "attend":
                      console.log("Session running...Done!");
                      session.status = "completed";
                      break;
                    case "cancel":
                      console.log("Session canceled; packaged dropped");
                      session.status = "canceled";
                      break;
                    case "view":
                      console.log(JSON.stringify(session, null, 1));
                      break;
                    case "delete":
                      console.log("Session receipt deleted");
                      session.status = "canceled";
                      break;
                    case "back":
                      break;
                  }
                });
              });
              break;
            case "logout":
              bRunning = false;
              break;
          }
        });
      } else if (usr instanceof Student) {
        await select(this.student_menu).then(async (option) => {
          switch (option) {
            case "inbox":
              const inbox = {
                type: "list",
                name: "session inbox",
                message: "Select a session to perform actions",
                choices: usr.sessions.map((sess) => {
                  return {
                    name: `[${sess.dateOf} - ${sess.timeOf}] ${sess.courseId} ${sess.student} ${sess.state}`,
                    value: sess,
                  };
                }),
              };
              await inquirer
              .prompt(inbox)
              .then(async (session) => {
                console.log(`Session (${session.uuid}) selected\nStatus:${session.status}`);
                let menu;
                switch (session.status) {
                  case "pending":
                    menu = pending_menu;
                    break;
                  case "upcoming":
                    menu = upcoming_menu;
                    break;
                  case "completed":
                    menu = completed_menu;
                    break;
                }
                await select(menu).then(async (action) => {
                  switch (action) {
                    case "accept":
                      console.log("Session order accepted");
                      session.status = "upcoming";
                      break;
                    case "decline":
                      console.log("Session order declined");
                      session.status = "declined";
                      break;
                    case "attend":
                      console.log("Session running...Done!");
                      session.status = "completed";
                      break;
                    case "cancel":
                      console.log("Session canceled; packaged dropped");
                      session.status = "canceled";
                      break;
                    case "view":
                      console.log(JSON.stringify(session, null, 1));
                      break;
                    case "delete":
                      console.log("Session receipt deleted");
                      session.status = "canceled";
                      break;
                  }
                });
              });
              break;
            case "order":
              await this.captureSessionData(usr);
              break;
            case "logout":
              bRunning = false;
              break;
          }
        });
      } else {
        // Handle other user types if necessary
      }
    }
  }

  async captureSessionData(student) {
    const form = [
      {
        type: "list",
        name: "tutor",
        message: "Select preferred tutor:",
        choices: this.context.users.filter((usr) => usr instanceof Tutor).map((usr) => {
          return {
            name: `${usr.username}`,
            value: usr,
          };
        }),
      },
      {
        type: "input",
        name: "duration",
        message: "Enter duration (hh:mm):",
      },
      {
        type: "list",
        name: "courseId",
        message: "Select the course ID:",
        choices: this.context.courses,
      },
      {
        type: "checkbox",
        name: "topics",
        message: "Select topics:",
        choices: this.context.topics,
      },
      {
        type: "input",
        name: "dateOf",
        message: "Enter date (MM/dd/yyyy):",
      },
      {
        type: "input",
        name: "timeOf",
        message: "Enter time (hh:mm):",
      },
      {
        type: "confirm",
        name: "bOnline",
        message: "Is the session online?",
        default: true,
      },
      {
        type: "input",
        name: "location",
        message: "Enter location (if not online):",
        when: (answers) => !answers.bOnline,
      },
    ];
    const sessionData = await inquirer.prompt(form);
    // Creating the Session object
    const session = new Session(
      sessionData.tutor,
      student,
      sessionData.duration,
      sessionData.courseId,
      sessionData.topics,
      sessionData.dateOf,
      sessionData.timeOf,
      sessionData.location,
      sessionData.bOnline
    );

    // Notifying student and tutor
    sessionData.tutor.sessions = [...sessionData.tutor.sessions, session];
    student.sessions = [...student.sessions, session];
  }

  toString() {
    return `UserDashboard(${this.context})`;
  }
}

module.exports = UserDashboard;

// Assuming you have the necessary context with users, topics, and courses defined elsewhere
const context = {
  topics:[
    "Algebra",
    "Calculus 1",
    "Calculus 2",
    "Geometry",
    "Trigonometry",
    "Linear Algebra",
    "Differential Equations",
    "Probability Theory",
    "Statistics",
    "Number Theory",
    "Discrete Mathematics",
    "Mathematical Logic",
    "Complex Analysis",
    "Real Analysis",
    "Graph Theory",
    "Topology",
    "Numerical Methods",
    "Combinatorics",
    "Game Theory",
    "Cryptography",
  ],
  courses:[
    "MATH1001 - Intro to Mathematics",
    "MATH2002 - Calculus and Analytical Geometry",
    "MATH3003 - Linear Algebra and Differential Equations",
    "MATH4004 - Probability and Statistics",
    "MATH5005 - Number Theory",
    "MATH6006 - Advanced Calculus",
    "MATH7007 - Graph Theory and Combinatorics",
    "MATH8008 - Complex Analysis",
    "MATH9009 - Mathematical Logic",
  ],
  users : [
    new Tutor(
      "alex.smith",
      "Passionate about guiding students through the world of mathematics. I aim to foster a growth mindset and encourage critical thinking to empower students in their academic journey.",
      [
        { monday: ["10:30", "14:00"] },
        { tuesday: ["11:00", "14:30"] },
        { wednesday: ["10:45", "14:15"] },
        { thursday: ["11:15", "14:45"] },
        { friday: ["10:00", "13:30"] },
      ],
      ['Probability and Statistics', 'Numerical Analysis', 'Mathematical Modeling']
    ),
    new Student("joel.blenman"),
    new Tutor(
      "sarah.johnson",
      "Committed to helping students build a solid foundation in mathematics. I believe in fostering a positive and encouraging learning environment that allows students to thrive.",
      [
        { monday: ["11:30", "15:00"] },
        { tuesday: ["12:00", "15:30"] },
        { wednesday: ["11:45", "15:15"] },
        { thursday: ["12:15", "15:45"] },
        { friday: ["11:00", "14:30"] },
      ],
      ['Abstract Algebra', 'Game Theory', 'Topology']
    ),
    new Tutor(
      "michael.wong",
      "Enthusiastic about simplifying complex mathematical concepts for students. I strive to build strong problem-solving skills and empower students to approach challenges with confidence.",
      [
        { monday: ["12:30", "16:00"] },
        { tuesday: ["13:00", "16:30"] },
        { wednesday: ["12:45", "16:15"] },
        { thursday: ["13:15", "16:45"] },
        { friday: ["12:00", "15:30"] },
      ],
      ['Number Theory', 'Fourier Analysis', 'Mathematical Programming']
    ),
    new Tutor(
      "jane.doe",
      "Experienced educator dedicated to inspiring students in the field of mathematics. I believe that learning should be an enjoyable journey, and I strive to make complex concepts easily understandable.",
      [
        { monday: ["9:30", "13:00"] },
        { tuesday: ["10:00", "13:30"] },
        { wednesday: ["9:45", "13:15"] },
        { thursday: ["10:15", "13:45"] },
        { friday: ["9:00", "12:30"] },
      ],
      ['Calculus', 'Linear Algebra', 'Differential Equations']
    ),
    new Student("liam.wilson"),
    new Tutor(
      "emma.jones",
      "Passionate about guiding students through the world of mathematics. I aim to foster a growth mindset and encourage critical thinking to empower students in their academic journey.",
      [
        { monday: ["10:30", "14:00"] },
        { tuesday: ["11:00", "14:30"] },
        { wednesday: ["10:45", "14:15"] },
        { thursday: ["11:15", "14:45"] },
        { friday: ["10:00", "13:30"] },
      ],
      ['Probability and Statistics', 'Numerical Analysis', 'Mathematical Modeling']
    ),
    new Student("ava.white"),
    new Student("olivia.jackson"),
    new Student("noah.thomas"),
    new Tutor(
      "sarah.johnson",
      "Committed to helping students build a solid foundation in mathematics. I believe in fostering a positive and encouraging learning environment that allows students to thrive.",
      [
        { monday: ["11:30", "15:00"] },
        { tuesday: ["12:00", "15:30"] },
        { wednesday: ["11:45", "15:15"] },
        { thursday: ["12:15", "15:45"] },
        { friday: ["11:00", "14:30"] },
      ],
      ['Abstract Algebra', 'Game Theory', 'Topology']
    ),
    new Tutor(
      "jane.doe",
      "Experienced educator dedicated to inspiring students in the field of mathematics. I believe that learning should be an enjoyable journey, and I strive to make complex concepts easily understandable.",
      [
        { monday: ["9:30", "13:00"] },
        { tuesday: ["10:00", "13:30"] },
        { wednesday: ["9:45", "13:15"] },
        { thursday: ["10:15", "13:45"] },
        { friday: ["9:00", "12:30"] },
      ],
      ['Calculus', 'Linear Algebra', 'Differential Equations']
    ),
    new Tutor(
      "michael.wong",
      "Enthusiastic about simplifying complex mathematical concepts for students. I strive to build strong problem-solving skills and empower students to approach challenges with confidence.",
      [
        { monday: ["12:30", "16:00"] },
        { tuesday: ["13:00", "16:30"] },
        { wednesday: ["12:45", "16:15"] },
        { thursday: ["13:15", "16:45"] },
        { friday: ["12:00", "15:30"] },
      ],
      ['Number Theory', 'Fourier Analysis', 'Mathematical Programming']
    ),
    new Student("john.doe"),
    new Tutor(
      "alex.smith",
      "Passionate about guiding students through the world of mathematics. I aim to foster a growth mindset and encourage critical thinking to empower students in their academic journey.",
      [
        { monday: ["10:30", "14:00"] },
        { tuesday: ["11:00", "14:30"] },
        { wednesday: ["10:45", "14:15"] },
        { thursday: ["11:15", "14:45"] },
        { friday: ["10:00", "13:30"] },
      ],
      ['Probability and Statistics', 'Numerical Analysis', 'Mathematical Modeling']
    ),
    new Student("emily.smith"),
    new Student("peter.johnson"),
    new Tutor(
      "sarah.johnson",
      "Committed to helping students build a solid foundation in mathematics. I believe in fostering a positive and encouraging learning environment that allows students to thrive.",
      [
        { monday: ["11:30", "15:00"] },
        { tuesday: ["12:00", "15:30"] },
        { wednesday: ["11:45", "15:15"] },
        { thursday: ["12:15", "15:45"] },
        { friday: ["11:00", "14:30"] },
      ],
      ['Abstract Algebra', 'Game Theory', 'Topology']
    ),
    new Tutor(
      "michael.wong",
      "Enthusiastic about simplifying complex mathematical concepts for students. I strive to build strong problem-solving skills and empower students to approach challenges with confidence.",
      [
        { monday: ["12:30", "16:00"] },
        { tuesday: ["13:00", "16:30"] },
        { wednesday: ["12:45", "16:15"] },
        { thursday: ["13:15", "16:45"] },
        { friday: ["12:00", "15:30"] },
      ],
      ['Number Theory', 'Fourier Analysis', 'Mathematical Programming']
    ),
    new Tutor(
      "jane.doe",
      "Experienced educator dedicated to inspiring students in the field of mathematics. I believe that learning should be an enjoyable journey, and I strive to make complex concepts easily understandable.",
      [
        { monday: ["9:30", "13:00"] },
        { tuesday: ["10:00", "13:30"] },
        { wednesday: ["9:45", "13:15"] },
        { thursday: ["10:15", "13:45"] },
        { friday: ["9:00", "12:30"] },
      ],
      ['Calculus', 'Linear Algebra', 'Differential Equations']
    ),
    new Tutor(
      "kyle.king",
      "I am a passionate and creative individual with a love for technology and a drive to innovate. My curiosity and dedication fuel my desire to make a positive impact through my work.",
      [
        { monday: ["8:30", "12:00"] },
        { tuesday: ["9:00", "12:30"] },
        { wednesday: ["8:45", "12:15"] },
        { thursday: ["9:15", "12:45"] },
        { friday: ["8:00", "11:30"] },
      ],
      ['Numerical Analysis', 'Complex Analysis', 'Mathematical Logic']
    ),
    new Tutor(
      "emma.jones",
      "Passionate about guiding students through the world of mathematics. I aim to foster a growth mindset and encourage critical thinking to empower students in their academic journey.",
      [
        { monday: ["10:30", "14:00"] },
        { tuesday: ["11:00", "14:30"] },
        { wednesday: ["10:45", "14:15"] },
        { thursday: ["11:15", "14:45"] },
        { friday: ["10:00", "13:30"] },
      ],
      ['Probability and Statistics', 'Numerical Analysis', 'Mathematical Modeling']
    ),
    new Student("susan.wong"),
  ]
}

const debug = new UserDashboard(context);
debug.login(context.users[1]);
