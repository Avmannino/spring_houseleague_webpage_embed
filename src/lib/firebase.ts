import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCIzpi9y2bzF43ZLHbFhyTS5sgIWaUyLnk",
  authDomain: "in-house-spring-league-rsvp.firebaseapp.com",
  databaseURL: "https://in-house-spring-league-rsvp-default-rtdb.firebaseio.com",
  projectId: "in-house-spring-league-rsvp",
  storageBucket: "in-house-spring-league-rsvp.firebasestorage.app",
  messagingSenderId: "155732189459",
  appId: "1:155732189459:web:f6f5b6df6b8a43094fbae6",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
