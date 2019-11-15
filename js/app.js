console.log("JS Loaded");

const testFire = () => {
    console.log("gotem");
};

var screen = 0


var student = {
    timestamp: '',
    firstName: '',
    lastName: '',
    sid: '',
    grade: null,
    problem: [],
    rfid: '',
    notes: ''
}

var writeData = () => {
    var d = new Date()
    var e = d.valueOf()
    firebase.database().ref("students/" + e).set({
        timestamp: d.toDateString() + " " + d.toLocaleTimeString(),
        firstName: student.firstName,
        lastName: student.lastName,
        sid: student.sid,
        grade: student.grade,
        problem: student.problem,
        notes: ''
    });
}
const submitButton = document.querySelector("#submit-button");

//Updates Student Object
//document.addEventListener("keyup", e => { //every key up
var updates = document.body.querySelectorAll(".update")

for (const button of updates) {
    button.addEventListener("click", (e) => {
        student.firstName = document.getElementById("first-name").value
        student.lastName = document.getElementById("last-name").value
        student.sid = document.getElementById("sid").value
            //student.rfid = document.getElementById("rfid").value  //RF ID value removed
        confirmData()
        console.log(student)
    })
}

//Grade Selector - Sets student.grade
const gradeButtons = document.getElementById("grade-screen").querySelectorAll('button')
for (const button of gradeButtons) {
    button.addEventListener("click", e => {
        student.grade = parseInt(button.value)
    })
}

//Issue Selector - Adds/Remove Problems to student.problem
const problemButtons = document.getElementById("problem-screen").querySelectorAll('button')
for (const button of problemButtons) {
    button.addEventListener("click", e => {
        if (student.problem.includes(button.textContent) == false) {
            student.problem.push(button.textContent)
        } else {
            student.problem.splice(student.problem.indexOf(button.textContent), 1)
        }

        console.log(student)
    })
}

//Confirmation Data
const confirmData = () => {
    var confirmScreen = document.getElementById('confirm')
    confirmScreen.querySelector('.confirm-name').textContent = student.firstName + " " + student.lastName
    confirmScreen.querySelector('.confirm-id').textContent = student.sid
    confirmScreen.querySelector('.confirm-grade').textContent = student.grade
    confirmScreen.querySelector('.confirm-issue').textContent = student.problem
}

//Screen Selector Logic
const screenControl = (con) => {
    if (con == 1) {
        screen++
    } else {
        screen--
    }
    screenCheck(screen)
}

const screenCheck = (on) => {
    var screens = document.getElementsByClassName('screen')
    console.log(screens)
    for (x = 0; x < screens.length; x++) {
        console.log(x)
        if (x == on) {
            screens[x].classList.remove('hide')
        } else {
            screens[x].classList.add('hide')
        }
    }
}

//Next/Back button logic
const nextButtons = document.getElementsByClassName('fi-cnsrxl-chevron-solid')
for (const button of nextButtons) {
    button.addEventListener('click', e => { screenControl(1) })
}
const backButtons = document.getElementsByClassName('fi-cnslxl-chevron-solid')
for (const button of backButtons) {
    button.addEventListener('click', e => { screenControl(-1) })
}
submitButton.addEventListener("click", writeData);

//screenCheck(screen)