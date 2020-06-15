// Select DOM elements to work with
const welcomeDiv = document.getElementById("welcomeMessage");
const signInButton = document.getElementById("signIn");
const signOutButton = document.getElementById('signOut');
const cardDiv = document.getElementById("card-div");
const getBlobsButton = document.getElementById("getBlobs");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");
const filecardDiv = document.getElementById("file-card-div");
const filetable = document.getElementById("filetable");


function showWelcomeMessage(account) {
    cardDiv.classList.remove('d-none');
    welcomeDiv.innerHTML = `Welcome ${account.name}`;
    signInButton.classList.add('d-none');
    signOutButton.classList.remove('d-none');
}

function tableCreate(blobList, containerName){
  filecardDiv.classList.remove('d-none');
  var t = $('#filetable').DataTable();
  
    blobList.forEach(async blobUrl => {
      t.row.add( [
        blobUrl.getElementsByTagName('Name')[0].innerHTML,
        containerName,
        blobUrl.getElementsByTagName('Creation-Time')[0].innerHTML,
        blobUrl.getElementsByTagName('Last-Modified')[0].innerHTML,
        blobUrl.getElementsByTagName('Content-Type')[0].innerHTML,
        '<button class="btn btn-primary" onclick="downloadBlob(\'' + blobUrl.getElementsByTagName('Name')[0].innerHTML + '\',\'' + containerName + '\')">Download</button>'
    ] ).draw( false );     
      
    });    
}

function updateUI(data, endpoint) {
  console.log('Graph API responded at: ' + new Date().toString());

  if (endpoint === graphConfig.graphMeEndpoint) {
    const title = document.createElement('p');
    title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
    const email = document.createElement('p');
    email.innerHTML = "<strong>Mail: </strong>" + data.mail;
    const phone = document.createElement('p');
    phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
    const address = document.createElement('p');
    address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
    profileDiv.appendChild(title);
    profileDiv.appendChild(email);
    profileDiv.appendChild(phone);
    profileDiv.appendChild(address);
    
  } else if (endpoint === blobConfig.storageEndpoint) {

    let containerName = data.querySelector("EnumerationResults").getAttribute('ContainerName');
    let blobList = Array.from(data.querySelectorAll("Blob")); //.getAttribute("Url");

    tableCreate(blobList, containerName);
      
  }
}