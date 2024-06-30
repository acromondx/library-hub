import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQMM49M6t6Xd2MMHFEHGJL3q0S2fdTOdY",
  authDomain: "vectorvote-8b454.firebaseapp.com",
  projectId: "vectorvote-8b454",
  storageBucket: "vectorvote-8b454.appspot.com",
  messagingSenderId: "677100811847",
  appId: "1:677100811847:web:ab2c3f594d8e7940da2362",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
