const firebaseConfig = {
  apiKey: "AIzaSyBFJisG0XmYBL-MnxMaVSeB1sFpa3d6-HA",
  authDomain: "hackfeed-41f24.firebaseapp.com",
  databaseURL: "https://hackfeed-41f24-default-rtdb.firebaseio.com",
  projectId: "hackfeed-41f24",
  storageBucket: "hackfeed-41f24.appspot.com",
  messagingSenderId: "929832595246",
  appId: "1:929832595246:web:b927c5850687e82eeb14bf",
};

firebase.initializeApp(firebaseConfig);
let contactFormDB = firebase.database();

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var data = {
    projectName: document.getElementById("projectName").value,
    techStackUsed: document.getElementById("techStackUsed").value,
    projectDes: document.getElementById("projectDes").value,
    leaderName: document.getElementById("leaderName").value,
  };
  console.log(data);
  let ref = contactFormDB.ref("contactForm");
  ref.push(data);

  document.querySelector(".alert").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 6500);

  document.getElementById("contactForm").reset();
}

function setup() {
  let ref = contactFormDB.ref("contactForm");
  ref.on("value", getData, errData);
}

setup();

function getData(data) {
  var contactForm = data.val();
  var keys = Object.keys(contactForm);
  console.log(keys);
  var formData = "";
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let projectName = contactForm[k].projectName;
    let techStackUsed = contactForm[k].techStackUsed;
    let projectDes = contactForm[k].projectDes;
    let leaderName = contactForm[k].leaderName;
    formData += `<p>${projectName}</p>
    <p>${techStackUsed}</p>
    <p>${projectDes}</p>
    <a href="https://twitter.com/${leaderName}">${leaderName}</a>
    `;
    document.querySelector("#root").innerHTML = formData;
  }
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}
