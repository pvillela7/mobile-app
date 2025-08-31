import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyCRhx1kLUblgcM0GMdNYw9epZm9afUtDXc",
    authDomain: "[cloud-app-307fd.firebaseapp.com](http://cloud-app-307fd.firebaseapp.com/)",
    projectId: "cloud-app-307fd",
    storageBucket: "cloud-app-307fd.firebasestorage.app",
    messagingSenderId: "677051971279",
    appId: "1:677051971279:web:7b34fd96b100c4d0b929ba"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;