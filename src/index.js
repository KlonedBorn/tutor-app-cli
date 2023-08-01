// Copyright (c) 2023 KingK
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const ConsoleApp = require("./cli/main-menu")
const Tutor = require("./documents/Tutor");
const Student = require("./documents/Student")

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

module.exports = {context}

const begin = async () => {
    try {
        const app = new ConsoleApp(context)
        await app.start()
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

begin()