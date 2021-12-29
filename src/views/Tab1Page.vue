<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Camera</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="center">
        <ion-button size="large" fill="solid" @click="takePicture">
          <ion-icon :icon="camera"></ion-icon> &nbsp; Camera
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { storage, auth, db } from "../main";
import { camera } from "ionicons/icons";
import { Geolocation } from "@capacitor/geolocation";
import { Camera, CameraResultType } from "@capacitor/camera";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from "@ionic/vue";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonIcon,
  },
  setup() {
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      if (image?.base64String) {
        const user = auth.currentUser;
        const guid = uuidv4();
        const filePath = `${user?.uid}/images/${guid}.${image.format}`;
        const storageRef = storage.ref();
        await storageRef
          .child(filePath)
          .putString(image.base64String, "base64");
        const url = await storageRef.child(filePath).getDownloadURL();
        const loc = await Geolocation.getCurrentPosition();

        await db
          .collection("users")
          .doc(user?.uid)
          .collection("images")
          .add({
            image: url,
            location: { lat: loc.coords.latitude, lon: loc.coords.longitude },
          });
      }
    };
    return {
      camera,
      takePicture,
    };
  },
};
</script>
<style>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>