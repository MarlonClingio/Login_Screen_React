import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtQtFMM9845aLPTJE4Za5_Su9MYCUFMyQ",
  authDomain: "miniblog-1724a.firebaseapp.com",
  projectId: "miniblog-1724a",
  storageBucket: "miniblog-1724a.appspot.com",
  messagingSenderId: "477549769549",
  appId: "1:477549769549:web:57a92afa5e18472bc0fd04"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };