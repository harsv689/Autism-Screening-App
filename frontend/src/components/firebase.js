// // // import { initializeApp } from "firebase/app";
// // // import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// // // const firebaseConfig = {
// // //     apiKey: "AIzaSyC0AKYjy_5mbjvZ2sUeQFr38LViCZVEKAA",
// // //     authDomain: "smsotp-6f1fa.firebaseapp.com",
// // //     projectId: "smsotp-6f1fa",
// // //     storageBucket: "smsotp-6f1fa.firebasestorage.app",
// // //     messagingSenderId: "70157258180",
// // //     appId: "1:70157258180:web:7a1fb781b7adc269a9e891",
// // //     measurementId: "G-MHMHXSBPZQ"
// // //   };

// // // const app = initializeApp(firebaseConfig);
// // // const auth = getAuth(app);

// // // const initializeRecaptcha = (containerId) => {
// // //   if (!window.recaptchaVerifier) {
// // //     window.recaptchaVerifier = new RecaptchaVerifier(containerId, { size: "invisible" }, auth);
// // //   }
// // //   return window.recaptchaVerifier;
// // // };

// // // export { auth, initializeRecaptcha, signInWithPhoneNumber };

// // import { initializeApp } from "firebase/app";
// // import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyC0AKYjy_5mbjvZ2sUeQFr38LViCZVEKAA",
// //   authDomain: "smsotp-6f1fa.firebaseapp.com",
// //   projectId: "smsotp-6f1fa",
// //   storageBucket: "smsotp-6f1fa.appspot.com", // As provided by Firebase
// //   messagingSenderId: "70157258180",
// //   appId: "1:70157258180:web:7a1fb781b7adc269a9e891",
// //   measurementId: "G-MHMHXSBPZQ",
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);

// // // Initialize Recaptcha
// // const initializeRecaptcha = (containerId) => {
// //   if (!window.recaptchaVerifier) {
// //     window.recaptchaVerifier = new RecaptchaVerifier(
// //       containerId,
// //       { size: "invisible" },
// //       auth
// //     );
// //   }
// //   return window.recaptchaVerifier;
// // };

// // export { auth, initializeRecaptcha, signInWithPhoneNumber };

// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyC0AKYjy_5mbjvZ2sUeQFr38LViCZVEKAA",
//   authDomain: "smsotp-6f1fa.firebaseapp.com",
//   projectId: "smsotp-6f1fa",
//   storageBucket: "smsotp-6f1fa.firebasestorage.app", // Corrected storage bucket
//   messagingSenderId: "70157258180",
//   appId: "1:70157258180:web:7a1fb781b7adc269a9e891",
//   measurementId: "G-MHMHXSBPZQ",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Add this for local testing (disable Recaptcha for testing only)
// auth.settings.appVerificationDisabledForTesting = true;

// // Initialize Recaptcha
// const initializeRecaptcha = (containerId) => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       containerId,
//       { size: "invisible" },
//       auth
//     );
//   }
//   return window.recaptchaVerifier;
// };

// export { auth, initializeRecaptcha, signInWithPhoneNumber };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0AKYjy_5mbjvZ2sUeQFr38LViCZVEKAA",
  authDomain: "smsotp-6f1fa.firebaseapp.com",
  projectId: "smsotp-6f1fa",
  storageBucket: "smsotp-6f1fa.appspot.com", // Use ".appspot.com" here for Firebase Admin SDK compatibility
  messagingSenderId: "70157258180",
  appId: "1:70157258180:web:7a1fb781b7adc269a9e891",
  measurementId: "G-MHMHXSBPZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize authentication for other Firebase uses (if required)

export { auth };
