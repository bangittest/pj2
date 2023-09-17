import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCZb9oXMH5hfJmTtlrfPRUna1F_XuHus-4",
    authDomain: "fir-login-with-cdc7d.firebaseapp.com",
    projectId: "fir-login-with-cdc7d",
    storageBucket: "fir-login-with-cdc7d.appspot.com",
    messagingSenderId: "890822971866",
    appId: "1:890822971866:web:dcedc1c9741c9a89ebb0e3"
};

// khởi tạo firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()


const storge = getStorage(app)
export { storge }


//tạo tham chiếu trong toàn bộ ứng dụng


//export ra bên ngoài để sử dụng
