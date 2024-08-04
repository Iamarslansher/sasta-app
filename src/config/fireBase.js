import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  // addDoc,
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";

const firebaseConfig = {
  apiKey: "AIzaSyBo6CS91m7nfp9KqyGrm9ZwL4kTqW5P8DE",
  authDomain: "admin-client-2b653.firebaseapp.com",
  projectId: "admin-client-2b653",
  storageBucket: "admin-client-2b653.appspot.com",
  messagingSenderId: "1068247096422",
  appId: "1:1068247096422:web:e3c9c643c62dc75103e1a7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// AUTHENTECATIONS
export const sign_Up = async (clientInfo, navigate) => {
  const { username, email, password, role } = clientInfo;
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const data = { username, role, email, id: result.user.uid };
    await setDoc(doc(db, "users/", result.user.uid), data);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/clientdashboard");

    // navigate(`/${role}dashboard`);
  } catch (error) {
    return alert(error.message);
  }
};

export const signIn = async (clientInfo, navigate) => {
  const { email, password, role } = clientInfo;
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    const id = result.user.uid;
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(async (dc) => {
      if (id === dc.id) {
        const data = dc.data();
        console.log(data.role);
        if (data.role === "admin") {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/admindashboard");
          return;
        }
        localStorage.setItem("user", JSON.stringify(data));
        navigate(`/${role}dashboard`);
      }
    });
  } catch (error) {
    return alert(error.message);
  }
};

// ===PRODUCTS====
// ADD-PRODUCT
export async function productDetail(itemInfo, navigate) {
  try {
    const { title, description, price, image } = itemInfo;

    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const imgUrl = await getDownloadURL(storageRef);
    const user = JSON.parse(localStorage.getItem("user"));
    const docRef = doc(collection(db, "products"));
    const data = {
      title,
      description,
      price,
      image: imgUrl,
      userId: user.id,
      productId: docRef.id,
      timestamp: new Date(),
    };
    await setDoc(docRef, data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/admindashboard");
  } catch (e) {
    alert(e.message);
  }
}

// DELETE-PRODUCT
export async function deleteProduct(info, navigate) {
  try {
    const { id } = info;
    const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach(async (dc) => {
      if (id === dc.id) {
        console.log("matched");
        await deleteDoc(doc(db, "products/", id));
        navigate("/admindashboard");
      }
    });
  } catch (error) {
    alert(error.message);
  }
}

// GET-PRODUCTS

export async function getingProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      products.push(product);
    });
    return products;
  } catch (error) {
    console.log(error.message);
  }
}

// UPDATE-PROFILE

export const uploadImage = async (data, navigate) => {
  try {
    const { image } = data;

    const imageRef = ref(storage, `profileImge/${image.name}`);

    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    const role = user.role;
    await uploadBytes(imageRef, image);
    const profileImgUrl = await getDownloadURL(imageRef);
    const washingtonRef = doc(db, "users", id);
    await updateDoc(washingtonRef, {
      profileImgUrl,
    });
    let UpdateUser = { ...user, profileImgUrl };
    localStorage.setItem("user", JSON.stringify(UpdateUser));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Profile updated successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate(`/${role}dashboard`);

    // navigate("/admindashboard");
  } catch (e) {
    alert(e.message);
  }
};

//  ORDER-DETAILS

export async function orderDetails(order, navigate) {
  try {
    const {
      name,
      contact,
      location,
      paymentMethod,
      productId,
      userId,
      title,
      price,
      image,
    } = order;
    const docRef = doc(collection(db, "ordersDetails"));
    const data = {
      name,
      contact,
      location,
      paymentMethod,
      productId,
      userId,
      title,
      price,
      image,
      date: new Date().toLocaleString(),
    };
    await setDoc(docRef, data);
    Swal.fire({
      title: "Thank You!😊",
      text: "Your order is on the way.",
      imageUrl:
        "https://cdn.dribbble.com/users/1024957/screenshots/6800596/01.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    navigate("/clientdashboard");
  } catch (error) {
    console.log(error.message);
  }
}

//  ALL-ORDERS

export async function allOrders() {
  try {
    const querySnapshot = await getDocs(collection(db, "ordersDetails"));
    const orders = [];
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      orders.push(order);
    });
    return orders;
  } catch (error) {
    console.log(error.message);
  }
}

//  FEEDBACKS

export async function feedback(userFeedback) {
  try {
    const docRef = doc(collection(db, "userFeedbacks"));
    const data = {
      userFeedback,
      feedbackId: docRef.id,
      date: new Date().toLocaleString(),
    };
    await setDoc(docRef, data);
    Swal.fire({
      title: "Thank You!😊",
      text: "Thank you so much for taking the time to leave us this amazing review! ",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_dG3xsqbAU6MBZ_o7SXGArOnvAh7ebyyTCA&s",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// ALL-FEEDBACKS
export async function allFeedbacks() {
  try {
    const querySnapshot = await getDocs(collection(db, "userFeedbacks"));
    const feedbacks = [];
    querySnapshot.forEach((doc) => {
      const feedback = doc.data();

      feedbacks.push(feedback);
    });
    return feedbacks;
  } catch (error) {
    alert(error.message);
  }
}
