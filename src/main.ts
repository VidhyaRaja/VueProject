import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxpQTVIMJSi_1D52lSi2iKXHVnW57peBw",
  authDomain: "photo-sharing-app-d1718.firebaseapp.com",
  projectId: "photo-sharing-app-d1718",
  storageBucket: "photo-sharing-app-d1718.appspot.com",
  messagingSenderId: "554617770963",
  appId: "1:554617770963:web:392c824db1d5acecde9526"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

let app:any;
auth.onAuthStateChanged(async user => {
  if(!app){
    app = createApp(App)
      .use(IonicVue)
      .use(router);
      
    router.isReady().then(() => {
      app.mount('#app');
    });
  }
})
 
