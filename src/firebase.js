import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";

var firebaseConfig = {
	apiKey: "AIzaSyC8N28zT2yBkRJp0MLzYOmIjvrCIq6Tzoc",
	authDomain: "dh-zoom.firebaseapp.com",
	databaseURL: "https://dh-zoom.firebaseio.com",
	projectId: "dh-zoom",
	storageBucket: "dh-zoom.appspot.com",
	messagingSenderId: "965718227751",
	appId: "1:965718227751:web:68e85e26469853819f8702",
	measurementId: "G-LYWPB2FGMG",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.database();

export default firebase;
