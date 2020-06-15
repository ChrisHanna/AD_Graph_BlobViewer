// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new Msal.UserAgentApplication(msalConfig);

function signIn() { 
  myMSALObj.loginPopup(loginRequest)
    .then(loginResponse => {
      console.log("id_token acquired at: " + new Date().toString());
      console.log(loginResponse);
      
      if (myMSALObj.getAccount()) {
        showWelcomeMessage(myMSALObj.getAccount());
        seeProfile();
        getBlobs();
      }
    }).catch(error => {
      console.log(error);
    });
}

function signOut() {
  myMSALObj.logout();
}

function getTokenPopup(request) {
  return myMSALObj.acquireTokenSilent(request)
    .catch(error => {
      console.log(error);
      console.log("silent token acquisition fails. acquiring token using popup");
          
      // fallback to interaction when silent call fails
        return myMSALObj.acquireTokenPopup(request)
          .then(tokenResponse => {
            return tokenResponse;
          }).catch(error => {
            console.log(error);
          });
    });
}

function seeProfile() {
  if (myMSALObj.getAccount()) {
    getTokenPopup(loginRequest)
      .then(response => {
        callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        profileButton.classList.add("d-none");
        getBlobsButton.classList.remove("d-none");
      }).catch(error => {
        console.log(error);
      });
  }
}

function getBlobs() {
  if (myMSALObj.getAccount()) {
    console.log(tokenRequest);
    getTokenPopup(tokenRequest)
      .then(response => {
        callBlobStorage(response.accessToken, updateUI);
      }).catch(error => {
        console.log(error);
      });
  }
}

function downloadBlob(blobName, containerName) {
  if (myMSALObj.getAccount()) {
    console.log(blobName);
    getTokenPopup(tokenRequest)
      .then(response => {      
        downloadBlobStorage(response.accessToken, updateUI, blobName, containerName);
      }).catch(error => {
        console.log(error);
      });
  }
}
