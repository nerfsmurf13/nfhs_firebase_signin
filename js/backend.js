// var writeData = () => {
// 	var d = new Date()
// 	var e = d.valueOf()
// 	firebase.database().ref("students/" + e).set({
// 		timestamp: d.toDateString() + " " + d.toLocaleTimeString(),
// 		firstName: student.firstName,
// 		lastName: student.lastName,
// 		sid: student.sid,
// 		grade: student.grade,
// 		problem: student.problem,
// 		notes: ''
// 	});
// 	setTimeout(() => { location.reload() }, 5000)
// }

const signInList = document.getElementById('signin-list');

//listen for changes and refresh
// var startListening = function() {
// 	firebase.database().on('value', function(snapshot) {
// 		var warehouse = snapshot.child('prod_id/stats').val();
// 		document.getElementById('qty').innerHTML = warehouse.qty;
// 	});
// };
// startListening();

// var startListening = function() {
// 	firebase
// 		.database()
// 		.ref('students/')
// 		.on('child_changed', function(snapshot) {
// 			//var changedPost = snapshot.val();
// 			console.log('Changes');
// 		});
// };
// startListening();

//Materialize Modals
document.addEventListener('DOMContentLoaded', function () {
	var modals = document.querySelectorAll('.modal');
	M.Modal.init(modals);
});

var removeData = (signinListing) => {
	var e = signinListing;
	firebase
		.database()
		.ref('students/' + e)
		.remove();
	location.reload();
};

var getData = () => {
	firebase
		.database()
		.ref('students/')
		.once('value', function (snapshot) {
			snapshot.forEach(function (signinSnapshot) {
				var signinData = signinSnapshot.val();
				//create basic divs... not very dry...
				//can probably loop though an object to make this dry.
				var listItem = document.createElement('DIV');
				listItem.classList += 'list-item';
				//divs

				var uidDiv = document.createElement('DIV'); //hidden div containing UID info from database
				uidDiv.classList += 'hide';
				uidDiv.innerText = signinSnapshot.key;
				//console.log(signinSnapshot.key);

				var nameDiv = document.createElement('DIV');
				nameDiv.classList += 'name';
				nameDiv.innerText =
					signinData['lastName'] + ', ' + signinData['firstName'];

				var gradeDiv = document.createElement('DIV');
				gradeDiv.classList += 'grade';
				gradeDiv.innerText = signinData['grade'];

				var sidDiv = document.createElement('DIV');
				sidDiv.classList += 'sid';
				sidDiv.innerText = signinData['sid'];
				var copyIcon = document.createElement('I');

				copyIcon.classList += 'fi-xnluxl-copy';

				var problemDiv = document.createElement('DIV');
				problemDiv.classList += 'problem';

				//Below For loop stolen from index for reuse
				// console.log(signinData['problem'].length);
				let problemCount = signinData['problem'].length;
				for (x = 0; x < problemCount; x++) {
					// console.log(signinData['problem'][x]);
					var p = document.createElement('p');
					var text = signinData['problem'][x];
					p.textContent = text;
					//confirmScreen.querySelector('.confirm-issue').appendChild(li)
					problemDiv.appendChild(p);
				}

				var notesDiv = document.createElement('DIV');
				notesDiv.classList += 'notes';
				notesDiv.innerText = signinData['notes'];

				var timeDiv = document.createElement('DIV');
				timeDiv.classList += 'time';
				timeDiv.innerText = signinData['timestamp'];

				var controlsDiv = document.createElement('DIV');
				controlsDiv.classList += 'controls';
				var editIcon = document.createElement('img');
				editIcon.src = './images/edit-svg.svg';
				var saveIcon = document.createElement('img');
				saveIcon.src = './images/approve-svg.svg';
				saveIcon.classList += 'hide';

				var deleteIcon = document.createElement('IMG');
				deleteIcon.src = './images/trash-svg.svg';
				//deleteIcon.addEventListener('click', removeData(uidDiv.innerText)); //wiped entiure firebase database...

				//editIcon.classList += 'fi-xnluxl-copy';

				//controlsDiv.innerText = signinData['sid'];
				//
				listItem.appendChild(uidDiv);
				listItem.appendChild(nameDiv);
				listItem.appendChild(gradeDiv);
				listItem.appendChild(sidDiv);
				sidDiv.appendChild(copyIcon);
				listItem.appendChild(copyIcon);
				listItem.appendChild(problemDiv);
				listItem.appendChild(notesDiv);
				listItem.appendChild(timeDiv);
				listItem.appendChild(controlsDiv);
				controlsDiv.appendChild(editIcon);
				controlsDiv.appendChild(saveIcon);
				controlsDiv.appendChild(deleteIcon);

				//document.getElementById('signin-list').innerHTML = childData['firstName'] + " " + childData['lastName'] + ", " + childData['grade'];
				//document.getElementById('signin-list').appendChild(li);
				signInList.appendChild(listItem);
				deleteIcon.addEventListener('click', () => {
					var confirmDelete = confirm(
						'Are you sure you want to delete ' +
							nameDiv.innerText +
							' from the list?'
					);
					if (confirmDelete) {
						removeData(uidDiv.innerText);
					}
				});
			});
		});
};

//Copy Button Function
function copyFunction(e) {
	const temp = document.createElement('textarea');
	var copyText = e.target.parentElement.parentElement.textContent;
	temp.value = copyText;
	console.log(temp);
	temp.setAttribute('readonly', '');
	temp.style.position = 'absolute';
	temp.style.left = '-9999px';
	document.body.appendChild(temp);
	temp.select();
	document.execCommand('copy');
	document.body.removeChild(temp);
}

document.body.addEventListener('click', (e) => {
	//console.log(e.target);
});

//Copy Buttons
var copyButtons = document.querySelectorAll('.fi-xnluxl-copy');
for (x = 0; x < copyButtons.length; x++) {
	copyButtons[x].addEventListener('click', (e) => {
		//console.log(e.target.parentElement.parentElement.textContent);
		copyFunction(e);
	});
}

getData();
