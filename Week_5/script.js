
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getDatabase, ref, set, get, update, remove} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBl6jEiVfPe9Ggm8th0qmNe3RnMQlxh0_g",
    authDomain: "mobile-program-8d0c2.firebaseapp.com",
    projectId: "mobile-program-8d0c2",
    storageBucket: "mobile-program-8d0c2.firebasestorage.app",
    messagingSenderId: "165388755350",
    appId: "1:165388755350:web:72b7271b0c8992ac47bdb7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log(db);



//Function to write user data to Firebase Realtime Database
function writeUserData(userId, firstname, lastname, age, phonenumber, email, address, gender, city, country, street) {
    // Get the database instance
    // const db = getDatabase();
  
    // Create a reference/points to 'users/{userId}' and set the data (name and email)
 set(ref(db, 'users/' + userId), {
      firstname: firstname,      
      lastname: lastname,
      age: age,
      phonenumber: phonenumber,
      email: email,
      address: address,
      gender: gender,
      city: city,
      country: country,
      street: street,


      
    });
  }
// writeUserData(1, "Nischal", "Paudel", "22", "9809522002", "paudelnischal@gmail.com", "Baneshwor", "Male", "Kathmandu", "Nepal", "Thapagaun")

// ref(db, 'users') points to the users path.
// get(userRef) gets the data at that path.
// snapshot.forEach(...) loops over each child node (each user).
// childsnapshot.val() gives the actual data (name and email), which is printed.
function readUser(){
    const userRef = ref(db,'users')

    get(userRef).then((snapshot)=>{
        snapshot.forEach((childsnapshot)=>{
            console.log(childsnapshot.val());
        })
    })
}
// readUser();


function updateUserData(userId, updatedData) {
  const userRef = ref(db, 'users/' + userId);  
  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}
// Example usage:
// updateUserData(1, {firstname: "Prabeshupdated", lastname: "Neupane"});




function deleteUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

// // // // // // // // // Example usage:
// deleteUserData(1);

// // //console.log("Added! Good")