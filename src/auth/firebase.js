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

export const createUser = async (values, navigate, setLoading) => {
  const { firstname, lastname, email, password } = values;
  const displayName = `${firstname} ${lastname}`;
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
    setLoading(false);
    toastErrorNotify(error.message);
  }
};

export const signIn = async (values, navigate, setLoading) => {
  const { email, password } = values;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    setLoading(false);
    toastSuccessNotify("Logged in successfully!");
  } catch (error) {
    setLoading(false);
    toastErrorNotify(error.message);
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
      toastErrorNotify(error.message);
    });
};

export const forgotPassword = ({ email }, setLoading) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      setLoading(false);
      toastWarnNotify("Please check your mail box!");
    })
    .catch((err) => {
      setLoading(false);
      toastErrorNotify(err.message);
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
  try {
    setLoading(false);
    addDoc(blogRef, { ...values });
    toastSuccessNotify("Added Successfully!");
  } catch (error) {
    setLoading(false);
    toastErrorNotify(error.message);
  }
};

export const updateBlog = (values, setLoading, navigate) => {
  try {
    const docRef = doc(db, "blog", values.id);
    updateDoc(docRef, values);
    setLoading(false);
    navigate(-1);
    toastSuccessNotify("Updated Successfully!");
  } catch (error) {
    setLoading(false);
    toastErrorNotify(error.message);
  }
};

export const getDataById = async (id, setDetail) => {
  const docRef = doc(db, "blog", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setDetail({ id: docSnap.id, ...docSnap.data() });
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

export const favoriteAddBlog = (values, currentUser) => {
  try {
    const { favoriteList } = values;
    values?.favoriteList?.push(currentUser?.email);
    const docRef = doc(db, "blog", values.id);
    updateDoc(docRef, { ...values, favoriteList });
  } catch (error) {
    console.log(error.message);
  }
};

export const favoriteNoneBlog = (values, currentUser) => {
  try {
    const { favoriteList } = values;
    const index = values.favoriteList.indexOf(currentUser?.email);
    values?.favoriteList?.splice(index, 1);
    const docRef = doc(db, "blog", values.id);
    updateDoc(docRef, { ...values, favoriteList });
  } catch (error) {
    console.log(error.message);
  }
};

export const commentAddBlog = (detail, values) => {
  try {
    const { commentList } = detail;
    commentList?.push(values);
    const docRef = doc(db, "blog", detail.id);
    updateDoc(docRef, { ...detail, commentList });
  } catch (error) {
    console.log(error.message);
  }
};
