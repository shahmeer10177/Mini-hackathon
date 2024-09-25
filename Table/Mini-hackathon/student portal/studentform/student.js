// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,  } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcN3bA6bRnqv62nEBQe2S6uM1h4bBgMo4",
    authDomain: "hackathon-4f770.firebaseapp.com",
    projectId: "hackathon-4f770",
    storageBucket: "hackathon-4f770.appspot.com",
    messagingSenderId: "592332489446",
    appId: "1:592332489446:web:22c61bc2200ac616e93127"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =     getAuth();
const db = getFirestore(app);
// console.log("app=>",app);

document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve the form data
    let studentData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        cnic: document.getElementById('cnic').value,
        userType: document.getElementById('userType').value
    };

    // Create a new user with email and password
    createUserWithEmailAndPassword(auth, studentData.email, studentData.password)
        .then((userCredential) => {
            // Get user ID from the result
            const userId = userCredential.user.uid;

            // Save additional student data to Firestore
            const userDoc = doc(db, "students", userId);
            setDoc(userDoc, {
                firstName: studentData.firstName,
                lastName: studentData.lastName,
                email: studentData.email,
                cnic: studentData.cnic,
                userType: studentData.userType,
                uid: userId
            }).then(() => {
                console.log("Student data saved to Firestore.");
                // Redirect to the student list page
                window.location.href = 'studentlist.html';
            }).catch((error) => {
                console.error("Error saving student data to Firestore: ", error);
            });
        })
        .catch((error) => {
            console.error("Error during signup: ", error);
            alert("Signup failed: " + error.message);
        });
});





