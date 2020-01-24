// console.log("JS Loaded");

// const testFire = () => {
// 	console.log("gotem");
// };

//change screens for testing
//change 0 for production release
var screen = 0;
//0-Firstname
//1-Lastname
//2-Sid
//3-Grade
//4-Problem
//5-confirm
//6-thanks

var student = {
    timestamp: '',
    firstName: '',
    lastName: '',
    sid: '',
    grade: null,
    problem: [],
    rfid: '',
    notes: 'N/A',
};

var writeData = () => {
    var d = new Date();
    var e = d.valueOf();
    firebase
        .database()
        .ref('students/' + e)
        .set({
            timestamp: d.toDateString() + ' ' + d.toLocaleTimeString(),
            firstName: student.firstName,
            lastName: student.lastName,
            sid: student.sid,
            grade: student.grade,
            problem: student.problem,
            notes: '',
        });
    setTimeout(() => {
        location.reload();
    }, 5000);
};
const submitButton = document.querySelector('#submit-button');

//Updates Student Object
//document.addEventListener("keyup", e => { //every key up
var updates = document.body.querySelectorAll('.update');

for (const button of updates) {
    button.addEventListener('click', e => {
        student.firstName = document.getElementById('first-name').value;
        student.lastName = document.getElementById('last-name').value;
        student.sid = document.getElementById('sid').value;
        //student.rfid = document.getElementById("rfid").value  //RF ID value removed
        confirmData();
        //console.log(student)
    });
}

//Grade Selector - Sets student.grade
const gradeButtons = document
    .getElementById('grade-screen')
    .querySelectorAll('button');
for (const button of gradeButtons) {
    button.addEventListener('click', e => {
        student.grade = parseInt(button.value);
        for (const button2 of gradeButtons) {
            button2.classList.remove('active');
        }
        e.target.classList.add('active');
        console.log(student)
    });
}

//Issue Selector - Adds/Remove Problems to student.problem
const problemButtons = document
    .getElementById('problem-screen')
    .querySelectorAll('button');
for (const button of problemButtons) {
    button.addEventListener('click', e => {
        if (student.problem.includes(button.textContent) == false) {
            student.problem.push(button.textContent);
            e.target.classList.add('active');
        } else {
            student.problem.splice(student.problem.indexOf(button.textContent), 1);
            e.target.classList.remove('active');
        }
        console.log(student)
    });
}

//Confirmation Data
const confirmData = () => {
    var confirmScreen = document.getElementById('confirm');
    confirmScreen.querySelector('.confirm-name').textContent =
        student.firstName + ' ' + student.lastName;
    confirmScreen.querySelector('.confirm-id').textContent = student.sid;
    confirmScreen.querySelector('.confirm-grade').textContent = student.grade;
    confirmScreen.querySelector('.confirm-issue').innerHTML = '';
    for (x = 0; x < student.problem.length; x++) {
        var li = document.createElement('LI');
        var text = student.problem[x];
        li.textContent = text;
        confirmScreen.querySelector('.confirm-issue').appendChild(li);
    }
};

//Screen Selector Logic
const screenControl = con => {
    // console.log(screen)
    if (con == 1) {
        if (screen == 0 && student.firstName != '') {
            screen++;
            getFocus('first-name')
            console.log('NEXT')
        } else if (screen == 1 && student.lastName != '') {

            screen++;
            getFocus('last-name')
            console.log('NEXT')
        } else if (screen == 2 && student.sid != '') {
            screen++;
        } else if (screen == 3 && student.grade != null) {
            screen++;
        } else if (screen == 4 && student.problem.length != 0) {
            screen++;
        } else if (screen == 5) {
            screen++;
        }
    } else {
        screen--;
    }

    screenCheck(screen);
};
//focus textbox
function getFocus(theId) {
    document.getElementById(theId).focus();
}

function focus() {
    if (screen == 0) {
        getFocus('first-name')
        console.log('Focusing FisrtName')
    } else if (screen == 1) {
        getFocus('last-name')
        console.log('Focusing LastName')
    } else if (screen == 2) {
        getFocus('sid')
        console.log('Focusing sid')
    }
}


//screenCheck(screen)
const screenCheck = on => {
    var screens = document.getElementsByClassName('screen');
    //console.log(screens)
    for (x = 0; x < screens.length; x++) {
        //console.log(x)
        if (x == on) {
            screens[x].classList.remove('hide');
        } else {
            screens[x].classList.add('hide');
        }
    }
};

//Next/Back button logic
const nextButtons = document.getElementsByClassName('next');
for (const button of nextButtons) {
    button.addEventListener('click', e => {
        screenControl(1);
        focus();
    });
}
const backButtons = document.getElementsByClassName('back');
for (const button of backButtons) {
    button.addEventListener('click', e => {
        screenControl(-1);
        focus();
    });
}
submitButton.addEventListener('click', writeData);

// //Submit Reset Timer
// const complete = () => {
// 	setTimeout(() => { location.reload() }, 5000)
// }

// submitButton.addEventListener("click", complete)
document.ontouchmove = function(event) {
    event.preventDefault();
}