function callBlobStorage(token, callback) {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;

  var d = new Date();
  var n = d.getUTCDate();  

  headers.append("Authorization", bearer);
  headers.append("x-ms-version", "2017-11-09");
  headers.append("x-ms-date", d.toUTCString());

  const options = {
      method: "GET",
      headers: headers
  };

  console.log(blobConfig.storageContainers);
  console.log('request made to Blob Storage API at: ' + new Date().toString() + token);
  
  var arrayLength = blobConfig.storageContainers.length;
  for (var i = 0; i < arrayLength; i++) {
  fetch(blobConfig.storageEndpoint + blobConfig.storageContainers[i]  +"/?restype=container&comp=list", options)
    .then(response => response.text())
    .then(response => new window.DOMParser().parseFromString(response, "text/xml"))
    .then(response => callback(response, blobConfig.storageEndpoint)); 
  } 
}

function downloadBlobStorage(token, callback, blobName, containerName) {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;

  var d = new Date();
  var n = d.getUTCDate();  

  headers.append("Authorization", bearer);
  headers.append("x-ms-version", "2017-11-09");
  headers.append("x-ms-date", d.toUTCString());
  headers.append("x-ms-blob-content-disposition", "attachment");

  const options = {
      method: "GET",
      headers: headers
  };

  console.log('request made to Download Blob at: ' + new Date().toString() + token);
  
  fetch(blobConfig.storageEndpoint + containerName + "/" + blobName , options)
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(uril => {
        var link = document.createElement("a");
        link.href = uril;
        link.download = blobName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  });
   
}