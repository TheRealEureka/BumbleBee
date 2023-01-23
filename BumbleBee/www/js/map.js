/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

var map = L.map('map').setView([48.66093564404043, 6.155520066046425], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([48.66275353645403, 6.156009133844759]).addTo(map);


// Obtenir un flux vidéo à partir de la webcam
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
  // Afficher le flux vidéo dans la balise vidéo
  document.querySelector('#webcam').srcObject = stream;
  // Attendre que la vidéo soit prête
  document.querySelector('#webcam').onloadedmetadata = () => {
    // Lire les codes QR à partir du flux vidéo
    setInterval(() => {
      const video = document.getElementById("webcam");
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const imageData = canvas.getContext("2d").getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
      if (qrCode) {
        document.querySelector('#result').textContent = qrCode.data;
      }
    }, 200);
  };
})
.catch(err => {
  console.error(err);
});