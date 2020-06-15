 
// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
const msalConfig = {
  auth: {
    clientId: "<application_id>",
    authority: "https://login.microsoftonline.com/<tenant_id>",
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  }
};  
  
// Add here scopes for id token to be used at MS Identity Platform endpoints.
const loginRequest = {
  scopes: ["User.Read"]
};

// Add here scopes for access token to be used at MS Graph API endpoints.
const tokenRequest = {
  scopes: ["https://<storage_account_name>.blob.core.windows.net/user_impersonation"]
};