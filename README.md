# AD_Graph_BlobViewer
 
 1. Create your Storage Account, and Application ID, redirect uri should be set to http://localhost:3000 for local testing 
 2. Create one or multiple containers in your storage account
 3. Ensure the users who will be using the application have atleast the following RBAC permission at the storage account or container level depending on what they should have access to. If you give permission at the storage account level their permission will be inherited by the containers. (Storage Blob Data Reader - allow read access to the container, and ability to list the files, Storage Blob Data Contributor - allows them to modify, upload, etc...)
 4. Open the authConfig.js and modify the following parameters: ClientID - Application Id you created in Azure AD, Authority: append your tenant id to the end of https://login.microsoftonline.com/, scopes replace <storage_account_name> with your storage account name.
 5. Open blobConfig.js and again replace <storage_account_name> with your storage account name, and the storageContainers should be an array of the containers you've created in your storage account that you'd like to have checked for the table display. example : ['container1test', 'container2test', 'container3test']
 6. npm install
 7. npm start
