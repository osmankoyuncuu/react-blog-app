import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";

const firebaseConfig = {
  apiKey: "AIzaSyBi1G7aMI-fEQ8F29kbq5LOb0QOFBt3Huk",
  authDomain: "blog-app-40053.firebaseapp.com",
  projectId: "blog-app-40053",
  storageBucket: "blog-app-40053.appspot.com",
  messagingSenderId: "969939112081",
  appId: "1:969939112081:web:051fb14d1f22127b766f30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (values, displayName, navigate, setLoading) => {
  const { firstname, lastname, email, password } = values;
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    setLoading(false);
    navigate("/");
    toastSuccessNotify("Registered successfully!");
  } catch (error) {
    toastErrorNotify(error.message);
    setLoading(false);
  }
};

export const signIn = async (values, navigate, setLoading, displayName) => {
  const { firstname, lastname, email, password } = values;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    setLoading(false);
    toastSuccessNotify("Logged in successfully!");
  } catch (error) {
    toastErrorNotify(error.message);
    setLoading(false);
  }
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setCurrentUser({ email, displayName, photoURL });
    } else {
      setCurrentUser(false);
    }
  });
};

export const logOut = () => {
  signOut(auth);
  toastSuccessNotify("Logged out successfully!");
};

export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const forgotPassword = ({ email }, setLoading) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      toastWarnNotify("Please check your mail box!");
      setLoading(false);
    })
    .catch((err) => {
      toastErrorNotify(err.message);
      setLoading(false);
    });
};

//? FireStore

export const db = getFirestore(app);

const blogRef = collection(db, "blog");

export const useBlogListener = (setBlogList) => {
  useEffect(() => {
    onSnapshot(blogRef, (snapshot) => {
      setBlogList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);
};

export const newBlog = (values, setLoading) => {
  console.log(values);
  try {
    setLoading(false);
    addDoc(blogRef, { ...values });
    toastSuccessNotify("Added Successfully!");
  } catch (error) {
    toastWarnNotify(error.message);
    setLoading(false);
  }
};

export const updateBlog = (values, setLoading, navigate) => {
  console.log(values);
  try {
    const docRef = doc(db, "blog", values.id);
    updateDoc(docRef, values);
    setLoading(false);
    toastSuccessNotify("Updated Successfully!");
    navigate(-1);
  } catch (error) {
    toastWarnNotify(error.message);
    setLoading(false);
  }
};

export const getDataById = async (id) => {
  const docRef = doc(db, "blog", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const deleteBlog = (id) => {
  try {
    deleteDoc(doc(db, "blog", id));
    toastErrorNotify("Deleted Successfully");
  } catch (error) {
    toastWarnNotify(error.message);
  }
};
