// Redefine path to base
var keyStorageAux = "auxBizagiAuthentication";//from submenu workportal ThemeBuilder
var keyRedirectUrl = "_redirectUrl_";
var session = window.sessionStorage.getItem("bizagiAuthentication") || window.sessionStorage.getItem(keyStorageAux) || "{}";

if (window.location.search && session == "{}") {
    if(window.sessionStorage.getItem(keyRedirectUrl) === null || window.sessionStorage.getItem(keyRedirectUrl) === "" || window.sessionStorage.getItem(keyRedirectUrl) === undefined){
        var mustSaveRedirectUrl = true;
        if (window.location.search.indexOf("syncToken") != -1)  // Identify redirect from oAuth ADFS, in this case this redirect uri must not be saved
        {
            mustSaveRedirectUrl = false;
        }
        if (mustSaveRedirectUrl){
            window.sessionStorage.setItem(keyRedirectUrl, window.location.search);
        }
    } 
}

if (window.sessionStorage.getItem(keyStorageAux)) {
    window.sessionStorage.removeItem(keyStorageAux);
}

var bizagiConcurrent;
try{ session = JSON.parse(session); } catch (e) { console.log(e); }


//communicates to parents who have access to the resource(WsFederatedAuthentication)
window.parent.postMessage("Access: true", "*");

// sometimes the load bizagi.loader.js?_4352 get HTTP error 302
if (typeof bizagi === "undefined") {
    window.location.reload();
}

if (session.isAuthenticate) {
    var redirectUrl = window.sessionStorage.getItem(keyRedirectUrl);
    var currentRedirectUrl = window.sessionStorage.getItem('currentRedirectUrl');
    var isWebpartUrl = currentRedirectUrl ? currentRedirectUrl.indexOf('webparts/desktop/portal') >= 0 : false;
    if(redirectUrl) {
        window.location.href = "index.html" + redirectUrl;
        window.sessionStorage.removeItem(keyRedirectUrl);
    } else if (currentRedirectUrl && isWebpartUrl) {
        window.location.href = currentRedirectUrl;
    }
}

// Gets the loader instance, and load the module
var loader = bizagi.loader;
BIZAGI_PATH_TO_BASE = "./";

// add svg icons
var currentlyHTML = document.body.innerHTML;
// generated with genome project
function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
}
var svgIcons16 = '<svg xmlns="http://www.w3.org/2000/svg" display="none" width="0" height="0" id="workportal-icons"><defs><style>.cls-1{fill:#fff;}.cls-2{fill:#b7b7b7;}</style><style>.cls-1,.cls-2{fill:none;}.cls-1{clip-rule:evenodd;}.cls-3{fill:#b3b3b3;}.cls-4{fill:#ccc;}.cls-5{clip-path:url(#clip-path);}.cls-6{clip-path:url(#clip-path-2);}.cls-7{fill:#fff;}</style><clipPath id="icon-radiobutton-selected-disabled-clip-path"><path class="cls-1" d="M8.58,11.78l5.17-5.07a.75.75,0,0,1,1,0,.71.71,0,0,1,0,1l-5.7,5.57a.74.74,0,0,1-1,0L5.21,10.51a.72.72,0,0,1,0-1,.77.77,0,0,1,1,0Z"/></clipPath><clipPath id="icon-radiobutton-selected-disabled-clip-path-2"><rect class="cls-2" x="1" y="0.5" width="18" height="18"/></clipPath><style>.cls-1,.cls-2{fill:none;}.cls-1{clip-rule:evenodd;}.cls-3{fill:#028279;}.cls-4{fill:#3a9e97;}.cls-5{clip-path:url(#clip-path);}.cls-6{clip-path:url(#clip-path-2);}.cls-7{fill:#fff;}</style><clipPath id="icon-radiobutton-selected-clip-path"><path class="cls-1" d="M8.58,11.78l5.17-5.07a.75.75,0,0,1,1,0,.71.71,0,0,1,0,1l-5.7,5.57a.74.74,0,0,1-1,0L5.21,10.51a.72.72,0,0,1,0-1,.77.77,0,0,1,1,0Z"/></clipPath><clipPath id="icon-radiobutton-selected-clip-path-2"><rect class="cls-2" x="1" y="0.5" width="18" height="18"/></clipPath></defs><symbol viewBox="0 0 16 16" id="check-mark"><g id="check-mark-check-mark-16x"><path d="M5.88,12.54a1,1,0,0,1-.71-.3L2.34,9.41A1,1,0,0,1,2.34,8,1,1,0,0,1,3.76,8l2.12,2.12,6.36-6.36a1,1,0,0,1,1.42,0,1,1,0,0,1,0,1.41L6.59,12.24A1,1,0,0,1,5.88,12.54Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-anonymize"><path d="M16,5.5A12.54,12.54,0,0,0,15.91,4a.54.54,0,0,0-.15-.29l-.11-.1a.44.44,0,0,0-.28-.14A5,5,0,0,1,12.42,2,6.07,6.07,0,0,0,8.29,0H7.71A6.07,6.07,0,0,0,3.58,2,5,5,0,0,1,.63,3.45a.61.61,0,0,0-.3.15l-.09.09A.54.54,0,0,0,.09,4,12.54,12.54,0,0,0,0,5.5,10.33,10.33,0,0,0,3.17,13s0,.05.06.07A13.5,13.5,0,0,0,7.82,16L8,16l.18,0a13.5,13.5,0,0,0,4.59-2.9s.05,0,.06-.07A10.33,10.33,0,0,0,16,5.5ZM1.05,4.4A5.92,5.92,0,0,0,4.3,2.67,5.11,5.11,0,0,1,7.72,1h.55A5.09,5.09,0,0,1,11.7,2.67,5.92,5.92,0,0,0,15,4.4c0,.36.05.72.05,1.1a9.31,9.31,0,0,1-2.48,6.37,5.5,5.5,0,0,0-9,0A9.31,9.31,0,0,1,1,5.5C1,5.12,1,4.76,1.05,4.4ZM8,15a12.34,12.34,0,0,1-3.8-2.35,4.48,4.48,0,0,1,7.6,0A12.34,12.34,0,0,1,8,15Z"/><path d="M8,9A3,3,0,1,0,5,6,3,3,0,0,0,8,9ZM8,4A2,2,0,1,1,6,6,2,2,0,0,1,8,4Z"/></symbol><symbol viewBox="0 0 16 16" id="icon-arrow-double-left"><path d="M8,14.5a.47.47,0,0,1-.35-.15l-6-6a.48.48,0,0,1,0-.7l6-6a.48.48,0,0,1,.7,0,.5.5,0,0,1,0,.71L2.71,8l5.64,5.64A.51.51,0,0,1,8.5,14a.51.51,0,0,1-.5.5Z"/><path d="M14,14.5a.47.47,0,0,1-.35-.15l-6-6a.48.48,0,0,1,0-.7l6-6a.48.48,0,0,1,.7,0,.5.5,0,0,1,0,.71L8.71,8l5.64,5.64a.51.51,0,0,1,.15.36.51.51,0,0,1-.5.5Z"/></symbol><symbol viewBox="0 0 16 16" id="icon-arrow-double-right"><path d="M8,14.5a.47.47,0,0,0,.35-.15l6-6a.48.48,0,0,0,0-.7l-6-6a.48.48,0,0,0-.7,0,.5.5,0,0,0,0,.71L13.29,8,7.65,13.64A.51.51,0,0,0,7.5,14a.51.51,0,0,0,.5.5Z"/><path d="M2,14.5a.47.47,0,0,0,.35-.15l6-6a.48.48,0,0,0,0-.7l-6-6a.48.48,0,0,0-.7,0,.5.5,0,0,0,0,.71L7.29,8,1.65,13.64A.51.51,0,0,0,1.5,14a.51.51,0,0,0,.5.5Z"/></symbol><symbol viewBox="0 0 16 16" id="icon-arrow-down"><g id="icon-arrow-down-arrow-down-special"><path d="M8,10.5a.5.5,0,0,1-.35-.14l-4-4a.5.5,0,1,1,.71-.71L8,9.29l3.65-3.65a.51.51,0,0,1,.71,0A.5.5,0,0,1,12.5,6a.47.47,0,0,1-.14.35l-4,4A.5.5,0,0,1,8,10.5Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-arrow-right"><g id="icon-arrow-right-arrow-right-special"><path d="M6,12.5a.5.5,0,0,1-.36-.14.51.51,0,0,1,0-.71L9.29,8,5.64,4.35a.52.52,0,0,1,0-.71.51.51,0,0,1,.71,0l4,4a.51.51,0,0,1,0,.7l-4,4A.47.47,0,0,1,6,12.5Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-bizagi-lines"><g id="icon-bizagi-lines-bizagi-lines-16x"><path d="M13.74,4.46,8.24,1.38a.51.51,0,0,0-.48,0L2.26,4.46A.51.51,0,0,0,2,4.9v6.2a.51.51,0,0,0,.26.44l5.5,3.08a.51.51,0,0,0,.48,0l5.5-3.08A.51.51,0,0,0,14,11.1V4.9A.51.51,0,0,0,13.74,4.46ZM13,10.25,8.5,7.71v-5L13,5.19ZM7.5,7.14l-4-2.24,4-2.23ZM8,13.61l-5-2.8V5.75l9.48,5.35Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-clear-circle"><g id="icon-clear-circle-clear-circle-16x"><path d="M9.41,8l1.3-1.29A1,1,0,1,0,9.29,5.29L8,6.59,6.71,5.29A1,1,0,0,0,5.29,6.71L6.59,8,5.29,9.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L8,9.41l1.29,1.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/><path d="M8,15a7,7,0,1,1,7-7A7,7,0,0,1,8,15ZM8,3a5,5,0,1,0,5,5A5,5,0,0,0,8,3Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-download-report-user"><path d="M15.91,4a.54.54,0,0,0-.15-.29l-.11-.1a.44.44,0,0,0-.28-.14A5,5,0,0,1,12.42,2,6.07,6.07,0,0,0,8.29,0H7.71A6.07,6.07,0,0,0,3.58,2,5,5,0,0,1,.63,3.45a.61.61,0,0,0-.3.15l-.09.09A.54.54,0,0,0,.09,4,12.54,12.54,0,0,0,0,5.5C0,11.05,4,14.55,7.82,16L8,16l.18,0C12,14.55,16,11.05,16,5.5A12.54,12.54,0,0,0,15.91,4ZM8,15c-3.42-1.34-7-4.5-7-9.46,0-.38,0-.74.05-1.1A5.92,5.92,0,0,0,4.3,2.67,5.11,5.11,0,0,1,7.72,1h.55A5.09,5.09,0,0,1,11.7,2.67,5.92,5.92,0,0,0,15,4.4c0,.36.05.72.05,1.1C15,10.46,11.42,13.62,8,15Z"/><path d="M7.65,9.85a.36.36,0,0,0,.16.11.47.47,0,0,0,.38,0h0a.53.53,0,0,0,.15-.11l2-2a.49.49,0,0,0-.7-.7L8.5,8.29V3.5a.5.5,0,0,0-1,0V8.29L6.35,7.15a.49.49,0,0,0-.7.7Z"/><path d="M10.5,11h-5a.5.5,0,0,0,0,1h5a.5.5,0,0,0,0-1Z"/></symbol><symbol viewBox="0 0 16 16" id="icon-download-wp"><g id="icon-download-wp-download-16x"><path d="M14.5,15H1.5a.5.5,0,0,1-.5-.5v-3a.5.5,0,0,1,1,0V14H14V11.5a.5.5,0,0,1,1,0v3A.5.5,0,0,1,14.5,15Z"/><path d="M12.36,5.64a.51.51,0,0,0-.71,0L8.5,8.79V1.5a.5.5,0,0,0-1,0V8.79L4.35,5.64a.5.5,0,1,0-.71.71l4,4a.51.51,0,0,0,.7,0l4-4A.47.47,0,0,0,12.5,6,.5.5,0,0,0,12.36,5.64Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-email"><g id="icon-email-email-16x"><path d="M14.5,6a.5.5,0,0,0-.5.5v4.1c0,1.3-.1,1.4-.6,1.4H2.6c-.2,0-.6,0-.6-1.4V6.5A.5.5,0,0,0,1.5,6a.5.5,0,0,0-.5.5v4.1C1,11.2,1,13,2.6,13H13.4C15,13,15,11.7,15,10.6V6.5A.5.5,0,0,0,14.5,6Z"/><path d="M14.5,3H1.5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.2.4l6.5,4h.6l6.5-4a.5.5,0,0,0,.2-.4v-1A.5.5,0,0,0,14.5,3ZM14,4.2,8,7.9,2,4.2V4H14Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-fit-zoom"><path d="M14,0H2A2,2,0,0,0,0,2V14a2,2,0,0,0,2,2H14a2,2,0,0,0,2-2V2A2,2,0,0,0,14,0Zm1,14a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V2A1,1,0,0,1,2,1H14a1,1,0,0,1,1,1Z"/><path d="M4.21,3.5h1a.5.5,0,0,0,0-1H3a.41.41,0,0,0-.19,0,.51.51,0,0,0-.27.27A.41.41,0,0,0,2.5,3V5.25a.5.5,0,0,0,1,0v-1L5.65,6.35a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7Z"/><path d="M13.19,2.54a.41.41,0,0,0-.19,0H10.75a.5.5,0,0,0,0,1h1L9.65,5.65a.48.48,0,0,0,0,.7.48.48,0,0,0,.7,0L12.5,4.21v1a.5.5,0,0,0,1,0V3a.41.41,0,0,0,0-.19A.51.51,0,0,0,13.19,2.54Z"/><path d="M5.65,9.65,3.5,11.79v-1a.5.5,0,0,0-1,0V13a.41.41,0,0,0,0,.19.51.51,0,0,0,.27.27.41.41,0,0,0,.19,0H5.25a.5.5,0,0,0,0-1h-1l2.14-2.15a.49.49,0,0,0-.7-.7Z"/><path d="M13,10.25a.5.5,0,0,0-.5.5v1L10.35,9.65a.49.49,0,0,0-.7.7l2.14,2.15h-1a.5.5,0,0,0,0,1H13a.41.41,0,0,0,.19,0,.51.51,0,0,0,.27-.27.41.41,0,0,0,0-.19V10.75A.5.5,0,0,0,13,10.25Z"/></symbol><symbol viewBox="0 0 16 16" id="icon-info"><path d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,15a7,7,0,1,1,7-7A7,7,0,0,1,8,15Z"/><path d="M8,5.35a1,1,0,0,0,1-1,1,1,0,0,0-1.66-.69A1,1,0,0,0,7,4.38a.94.94,0,0,0,.29.69A.93.93,0,0,0,8,5.35Z"/><path d="M8.85,11.84a9.47,9.47,0,0,1,0-1.31V8.38c0-.59,0-1.21.08-1.87l-.15-.08a6.31,6.31,0,0,1-1.07.35A12.42,12.42,0,0,1,6.21,7v.48a2.27,2.27,0,0,1,.87.09.29.29,0,0,1,.08.16A21,21,0,0,1,7.22,10a14.27,14.27,0,0,1-.07,1.8A.28.28,0,0,1,7,12a3.35,3.35,0,0,1-.82.12v.47q.7,0,1.62,0c.7,0,1.36,0,2,0v-.5A2.6,2.6,0,0,1,9,12C8.9,12,8.87,11.92,8.85,11.84Z"/></symbol><symbol viewBox="0 0 16 16" id="icon-privacy"><path d="M8,16l-.18,0C4,14.55,0,11.05,0,5.5A12.54,12.54,0,0,1,.09,4a.54.54,0,0,1,.15-.29,1,1,0,0,1,.39-.24A4.91,4.91,0,0,0,3.58,2,6.11,6.11,0,0,1,7.71,0h.58a6.11,6.11,0,0,1,4.13,2,4.91,4.91,0,0,0,2.95,1.47.47.47,0,0,1,.28.14,1,1,0,0,1,.26.39A12.54,12.54,0,0,1,16,5.5c0,5.55-4,9.05-7.82,10.47ZM1.05,4.4C1,4.76,1,5.13,1,5.5c0,5,3.58,8.12,7,9.46,3.42-1.34,7-4.5,7-9.46,0-.37,0-.74-.05-1.1A5.86,5.86,0,0,1,11.7,2.67,5.09,5.09,0,0,0,8.27,1H7.72A5.11,5.11,0,0,0,4.3,2.67,5.86,5.86,0,0,1,1.05,4.4Z"/><path d="M8,13l-.18,0A7,7,0,0,1,3,6.5a7,7,0,0,1,.06-.93.47.47,0,0,1,.14-.3,1,1,0,0,1,.36-.2,2.77,2.77,0,0,0,1.65-.82A3.82,3.82,0,0,1,7.82,3h.36a3.82,3.82,0,0,1,2.61,1.25,2.77,2.77,0,0,0,1.65.82.56.56,0,0,1,.29.14.73.73,0,0,1,.21.36A7,7,0,0,1,13,6.5,7,7,0,0,1,8.18,13ZM4,6c0,.16,0,.33,0,.49A6,6,0,0,0,8,12,6,6,0,0,0,12,6.5c0-.16,0-.33,0-.49a3.8,3.8,0,0,1-1.91-1.07A2.84,2.84,0,0,0,8.16,4H7.83a2.86,2.86,0,0,0-1.9.94A3.8,3.8,0,0,1,4,6Z"/></symbol><symbol viewBox="0 0 16 16" id="icon-process"><g id="icon-process-process-16x"><path d="M12,11V8H8.5V6.83L10.83,4.5,8,1.67,5.17,4.5,7.5,6.83V8H4v3H1v4H7V11H5V9h6v2H9v4h6V11ZM8,3.09,9.41,4.5,8,5.91,6.59,4.5ZM6,12v2H2V12H6Zm8,2H10V12h4Z"/></g></symbol><symbol viewBox="0 0 20 20" id="icon-radiobuton-unselected"><circle class="cls-1" cx="10" cy="10" r="8.5"/><path class="cls-2" d="M10,2a8,8,0,1,1-8,8,8,8,0,0,1,8-8m0-1a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z"/></symbol><symbol viewBox="0 0 20 20" id="icon-radiobutton-selected-disabled"><circle class="cls-3" cx="10" cy="10" r="8.5"/><path class="cls-4" d="M10,2a8,8,0,1,1-8,8,8,8,0,0,1,8-8m0-1a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z"/><g class="cls-5"><g class="cls-6"><rect class="cls-7" y="1.5" width="20" height="17"/></g></g></symbol><symbol viewBox="0 0 20 20" id="icon-radiobutton-selected"><circle class="cls-3" cx="10" cy="10" r="8.5"/><path class="cls-4" d="M10,2a8,8,0,1,1-8,8,8,8,0,0,1,8-8m0-1a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z"/><g class="cls-5"><g class="cls-6"><rect class="cls-7" y="1.5" width="20" height="17"/></g></g></symbol><symbol viewBox="0 0 16 16" id="icon-refresh"><g id="icon-refresh-refresh-16x"><path d="M13.84,7.16a1,1,0,0,0-1,1,4.85,4.85,0,1,1-2.05-4h-1a1,1,0,0,0,0,2H13a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0v.57a6.84,6.84,0,1,0,2.89,5.59A1,1,0,0,0,13.84,7.16Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-upload-wp"><g id="icon-upload-wp-upload-16x"><path d="M14.5,15H1.5a.5.5,0,0,1-.5-.5v-3a.5.5,0,0,1,1,0V14H14V11.5a.5.5,0,0,1,1,0v3A.5.5,0,0,1,14.5,15Z"/><path d="M12.36,4.65l-4-4a.5.5,0,0,0-.7,0l-4,4a.5.5,0,0,0,0,.7.5.5,0,0,0,.71,0L7.5,2.2V9.5a.5.5,0,0,0,1,0V2.2l3.15,3.15A.5.5,0,0,0,12,5.5a.51.51,0,0,0,.36-.15.51.51,0,0,0,0-.7Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-user-report"><g><path d="M15.2,7.5v-2c0-2.1-1.7-3.8-3.8-3.8S7.7,3.4,7.7,5.5v2c0,2.1,1.7,3.8,3.8,3.8S15.2,9.6,15.2,7.5z M13.7,7.5c0,1.2-1,2.2-2.2,2.2s-2.2-1-2.2-2.2v-2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2V7.5z"/> <path d="M9.9,18.8H3.1c-0.1,0-0.2-0.1-0.2-0.1c0,0-0.1-0.1,0-0.2c0.6-2.6,3.6-4.7,7.2-5.2c0.4,0,0.7-0.4,0.7-0.8c0-0.4-0.4-0.7-0.8-0.7c-4.3,0.5-7.7,3-8.5,6.3c-0.1,0.5,0,1.1,0.3,1.5C2,20,2.5,20.2,3.1,20.2h6.9c0.4,0,0.8-0.3,0.8-0.8S10.4,18.8,9.9,18.8z"/> <path d="M22.5,14.6l-2.2-2.9c-0.2-0.3-0.5-0.4-0.9-0.4h-5c-0.6,0-1.1,0.5-1.1,1.1v8.7c0,0.6,0.5,1.1,1.1,1.1h7.2c0.6,0,1.1-0.5,1.1-1.1v-5.8C22.7,15,22.6,14.8,22.5,14.6z M21.2,20.8h-6.5v-8h4.5l2,2.7V20.8z"/> <path d="M19.4,16.2h-3c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h3c0.4,0,0.8-0.3,0.8-0.8S19.9,16.2,19.4,16.2z"/> <path d="M15.7,15c0,0.4,0.3,0.8,0.8,0.8h3c0.4,0,0.8-0.3,0.8-0.8s-0.3-0.8-0.8-0.8h-3C16,14.2,15.7,14.6,15.7,15z"/> <path d="M19.4,18.2h-3c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h3c0.4,0,0.8-0.3,0.8-0.8S19.9,18.2,19.4,18.2z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-user"><g id="icon-user-user-16x"><path d="M8,8A2.5,2.5,0,0,1,5.5,5.5v-1a2.5,2.5,0,0,1,5,0v1A2.5,2.5,0,0,1,8,8ZM8,3A1.5,1.5,0,0,0,6.5,4.5v1a1.5,1.5,0,0,0,3,0v-1A1.5,1.5,0,0,0,8,3Z"/><path d="M12.94,14H3.06a1,1,0,0,1-.78-.37,1,1,0,0,1-.21-.84C2.53,10.6,5,9,8,9s5.47,1.6,5.93,3.79a1,1,0,0,1-.21.84A1,1,0,0,1,12.94,14ZM8,10c-2.46,0-4.59,1.29-4.95,3H13C12.59,11.29,10.46,10,8,10Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-vocabulary"><g id="icon-vocabulary-vocabulary-16x"><path d="M2.23,5A.56.56,0,0,0,2.5,5a.49.49,0,0,0,.42-.24A6,6,0,0,1,12.47,4h-2a.5.5,0,0,0,0,1h3a.5.5,0,0,0,.5-.5v-3a.5.5,0,0,0-1,0V3.12A7,7,0,0,0,2.08,4.27.5.5,0,0,0,2.23,5Z"/><path d="M13.75,11.08a.5.5,0,0,0-.69.15A6,6,0,0,1,3.53,12h2a.5.5,0,0,0,0-1h-3a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,1,0V12.88a7,7,0,0,0,10.9-1.11A.5.5,0,0,0,13.75,11.08Z"/><path d="M14.5,6H1.5a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,.5-.5v-3A.5.5,0,0,0,14.5,6ZM14,9H2V7H14Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-warning"><g id="icon-warning-warning-16x"><path d="M13.48,15h-11a1.46,1.46,0,0,1-1.26-.7,1.5,1.5,0,0,1-.07-1.45l5.48-11a1.49,1.49,0,0,1,2.66,0l5.48,11a1.5,1.5,0,0,1-.07,1.45A1.46,1.46,0,0,1,13.48,15ZM3.35,13h9.3L8,3.65Z"/><path d="M8,9A1,1,0,0,1,7,8V7A1,1,0,0,1,9,7V8A1,1,0,0,1,8,9Z"/><circle cx="8" cy="11" r="1"/></g></symbol></svg>';
var svgIcons24 = '<svg xmlns="http://www.w3.org/2000/svg" display="none" width="0" height="0" id="workportal-icons"><symbol viewBox="0 0 24 24" id="icon-customization"><g><path d="M10,1H4C3.2,1,2.5,1.7,2.5,2.5v19C2.5,22.3,3.2,23,4,23h6c0.8,0,1.5-0.7,1.5-1.5v-19C11.5,1.7,10.8,1,10,1z M10,22H4 c-0.3,0-0.5-0.2-0.5-0.5v-19C3.5,2.2,3.7,2,4,2h6c0.3,0,0.5,0.2,0.5,0.5V4H7C6.7,4,6.5,4.2,6.5,4.5S6.7,5,7,5h3.5v2H8.6 C8.3,7,8.1,7.2,8.1,7.5S8.3,8,8.6,8h1.9v2H7c-0.3,0-0.5,0.2-0.5,0.5S6.7,11,7,11h3.5v2H8.6c-0.3,0-0.5,0.2-0.5,0.5S8.3,14,8.6,14 h1.9v2H7c-0.3,0-0.5,0.2-0.5,0.5S6.7,17,7,17h3.5v2H8.6c-0.3,0-0.5,0.2-0.5,0.5S8.3,20,8.6,20h1.9v1.5C10.5,21.8,10.3,22,10,22z"/><path d="M18.2,1C16.5,1,15,2.5,15,4.2V6v11c0,0.1,0,0.1,0,0.2c0,0,0,0,0,0l2.8,5.5c0.1,0.2,0.3,0.3,0.4,0.3s0.4-0.1,0.4-0.3 l2.8-5.5c0,0,0,0,0,0c0-0.1,0-0.1,0-0.2V6V4.2C21.5,2.5,20,1,18.2,1z M16,6.5h4.5v10H16V6.5z M16,4.2C16,3,17,2,18.2,2 s2.2,1,2.2,2.2v1.2H16V4.2z M18.2,21.4l-1.9-3.9h3.9L18.2,21.4z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-go-to-activity"><path d="M12.5,4h-9A1.5,1.5,0,0,0,2,5.5v9A1.5,1.5,0,0,0,3.5,16h9A1.5,1.5,0,0,0,14,14.5v-9A1.5,1.5,0,0,0,12.5,4Zm-9,1h9a.5.5,0,0,1,.5.5v5H11a.51.51,0,0,0-.45.28L10,12,7.43,7.74A.51.51,0,0,0,7,7.5a.53.53,0,0,0-.43.22L4.73,10.5H3v-5A.5.5,0,0,1,3.5,5Zm9,10h-9a.5.5,0,0,1-.5-.5v-3H5a.51.51,0,0,0,.42-.22L7,8.93l2.59,4.33a.51.51,0,0,0,.43.24h0a.5.5,0,0,0,.43-.28l.86-1.72H13v3A.5.5,0,0,1,12.5,15Z"/><path d="M11.5,1H5V.5A.5.5,0,0,0,4.69,0a.48.48,0,0,0-.54.11l-1,1a.48.48,0,0,0,0,.7l1,1A.47.47,0,0,0,4.5,3a.43.43,0,0,0,.19,0A.5.5,0,0,0,5,2.5V2h6.5a.5.5,0,0,0,0-1Z"/></symbol><symbol viewBox="0 0 96 96" id="icon-laptop-email"><path class="st0" style="opacity:0.34;" d="M88.1,71.7V26.3c0-2.7-2.2-4.9-4.9-4.9H12.5c-2.7,0-4.9,2.2-4.9,4.9v45.4H2.4v2.3c0,2.7,2.2,4.9,4.9,4.9h81.4 c2.7,0,4.9-2.2,4.9-4.9v-2.3H88.1z M54,75H42c-1.9,0-3.4-1.5-3.3-3.4h18.7C57.3,73.5,55.8,75,54,75z M84.1,65.7 c-0.1,1.6-1.4,2.9-3,2.9H14.6c-1.6,0-2.9-1.3-3-2.9V28.5c0.1-1.6,1.4-2.9,3-2.9h66.5c1.6,0,2.9,1.3,3,2.9L84.1,65.7z"/><path class="st1" style="opacity:0.1;enable-background:new;" d="M3.5,77.2h89.1c0.8,0,1.5,0.7,1.5,1.5v0.4c0,0.8-0.7,1.5-1.5,1.5H3.5C2.7,80.6,2,80,2,79.1v-0.4 C2,77.9,2.7,77.2,3.5,77.2z"/><path class="st2" style="opacity:0.18;" d="M47.7,24.2L41.2,8.1c-0.1-0.2-0.2-0.5-0.4-0.7l-9.7,15.4c-0.6,0.8-1.6,1.2-2.6,1L11,19.4c0,0.3,0.1,0.5,0.1,0.8 l6.5,16.1c0.4,1,1.6,1.5,2.6,1.1c0,0,0,0,0,0l26.4-10.6C47.6,26.3,48.1,25.2,47.7,24.2z"/><path class="st2" style="opacity:0.18;" d="M30.7,22l9.7-15.5c-0.6-0.6-1.4-0.8-2.2-0.5L11.9,16.7c-0.8,0.3-1.2,1-1.2,1.8L28.1,23 C29.1,23.2,30.1,22.8,30.7,22z"/><path class="st3" style="opacity:0.18;enable-background:new;" d="M90.9,31.3l-33.3-8c-0.8-0.2-1.7,0.3-1.9,1.1c0,0,0,0,0,0l-5.9,24.4c-0.2,0.8,0.3,1.7,1.2,1.9l33.3,8 c0.8,0.2,1.7-0.3,1.9-1.2l5.9-24.4C92.3,32.4,91.7,31.5,90.9,31.3C90.9,31.3,90.9,31.3,90.9,31.3z M62.3,26.1c0.4,0.1,0.7,0.6,0.6,1 c-0.1,0.4-0.6,0.7-1,0.6c-0.4-0.1-0.7-0.5-0.6-1C61.4,26.2,61.9,26,62.3,26.1C62.3,26.1,62.3,26.1,62.3,26.1z M60.2,25.5 c0.4,0.1,0.7,0.6,0.6,1c-0.1,0.4-0.6,0.7-1,0.6c-0.4-0.1-0.7-0.5-0.6-1C59.3,25.7,59.7,25.4,60.2,25.5 C60.1,25.5,60.1,25.5,60.2,25.5z M61.2,31.4c1.8,0.4,2.9,2.2,2.5,4c-0.4,1.8-2.2,2.9-4,2.5s-2.9-2.2-2.5-4c0,0,0,0,0,0 C57.6,32.1,59.4,31,61.2,31.4L61.2,31.4z M57.6,26.6c-0.4-0.1-0.7-0.6-0.6-1c0.1-0.4,0.6-0.7,1-0.6c0.4,0.1,0.7,0.5,0.6,1 C58.5,26.4,58.1,26.7,57.6,26.6C57.6,26.6,57.6,26.6,57.6,26.6z M73.8,51l-18.7-4.5c-0.6-0.1-0.9-0.7-0.8-1.2 c0.1-0.6,0.7-0.9,1.2-0.8L74.3,49c0.5,0.1,0.9,0.7,0.7,1.2C74.9,50.7,74.4,51.1,73.8,51C73.8,51,73.8,51,73.8,51z M74.5,48 l-18.7-4.5c-0.5-0.1-0.9-0.7-0.8-1.2c0,0,0,0,0,0c0.1-0.5,0.7-0.9,1.2-0.8c0,0,0,0,0,0L75,45.9c0.6,0.1,0.9,0.7,0.8,1.2 C75.6,47.7,75.1,48.1,74.5,48L74.5,48z M79.9,53.3c-1.8-0.4-2.9-2.2-2.5-4s2.2-2.9,4-2.5c1.8,0.4,2.9,2.2,2.5,4c0,0,0,0,0,0 C83.4,52.6,81.7,53.6,79.9,53.3L79.9,53.3z M84.7,43.2l-18.7-4.5c-0.5-0.1-0.9-0.6-0.8-1.2c0,0,0,0,0,0c0.1-0.5,0.6-0.9,1.2-0.8 c0,0,0,0,0.1,0l18.7,4.5c0.6,0.1,0.9,0.7,0.8,1.2C85.8,43,85.3,43.4,84.7,43.2L84.7,43.2z M85.5,40.2l-18.7-4.6 c-0.6-0.1-0.9-0.7-0.8-1.2c0.1-0.6,0.7-0.9,1.2-0.8L86,38.1c0.6,0.1,0.9,0.7,0.8,1.2c-0.1,0.6-0.7,0.9-1.2,0.8L85.5,40.2z"/> </symbol><symbol viewBox="0 0 24 24" id="icon-process-management"><g><path d="M22,1h-4c-0.6,0-1,0.4-1,1v1.5h-2V2c0-0.6-0.4-1-1-1h-4C9.4,1,9,1.4,9,2v1.5H6.9C6.7,2.1,5.5,1,4,1C2.3,1,1,2.3,1,4 s1.3,3,3,3c1.5,0,2.7-1.1,2.9-2.5H9V6c0,0.6,0.4,1,1,1h1.5v2H8C7.7,9,7.5,9.2,7.5,9.5v2.3L4.3,15l3.2,3.2v1.8C6.1,20.3,5,21.5,5,23 h1c0-1.1,0.9-2,2-2s2,0.9,2,2h1c0-1.5-1.1-2.7-2.5-2.9v-1.8l3.2-3.2l-3.2-3.2V10H12h8c0.3,0,0.5-0.2,0.5-0.5V7H22c0.6,0,1-0.4,1-1 V2C23,1.4,22.6,1,22,1z M4,6C2.9,6,2,5.1,2,4s0.9-2,2-2s2,0.9,2,2S5.1,6,4,6z M10,6L9.5,6L10,6V2h4v4L10,6C10,6,10,6,10,6z M8,17.3 L5.7,15L8,12.7l2.3,2.3L8,17.3z M19.5,9h-7V7H14c0.6,0,1-0.4,1-1V4.5h2V6c0,0.6,0.4,1,1,1h1.5V9z M22,6h-4c0,0,0,0,0,0l-0.5,0H18V2 h4V6z"/><path d="M21.6,16.2L21.6,16.2c0.4-1.1,0.5-1.4,0.2-1.8l-0.8-0.9h-0.3c-0.1,0-0.2,0-1.2,0.4l0,0c-0.5-1.1-0.7-1.4-1.1-1.4h-1 c-0.5,0-0.7,0.3-1.1,1.4l0,0c-0.4-0.2-0.8-0.3-1.2-0.4l-0.1,0c-0.2,0-0.3,0.1-0.5,0.2l-0.7,0.7c-0.4,0.4-0.2,0.7,0.2,1.7l0,0 c-1.1,0.4-1.4,0.6-1.4,1.1v1c0,0.5,0.4,0.7,1.4,1l0,0.1c-0.5,1.1-0.6,1.4-0.2,1.7l0.7,0.7l0.4,0.2l0.1,0c0.4-0.1,0.8-0.2,1.1-0.4 c0.4,1.1,0.6,1.4,1.1,1.4h1c0.5,0,0.7-0.3,1.1-1.4l0,0c0.4,0.2,0.7,0.3,1.1,0.4l0.1,0l0.1,0c0.2,0,0.3-0.1,0.5-0.2l0.7-0.7 c0.4-0.4,0.2-0.7-0.2-1.7l0,0c1.1-0.4,1.4-0.6,1.4-1.1v-0.9c0.1-0.2,0.1-0.3,0-0.4C22.8,16.7,22.5,16.5,21.6,16.2z M21.9,18.1 c-0.2,0.1-0.5,0.2-0.9,0.4l-0.2,0.1l-0.3,0.8l0.1,0.2c0.2,0.5,0.3,0.8,0.4,0.9l-0.4,0.4c-0.3-0.1-0.6-0.2-0.9-0.4l-0.2-0.1 l-0.6,0.3l-0.3,0.2v0.2c-0.1,0.4-0.3,0.7-0.3,0.8h-0.6c-0.1-0.2-0.2-0.4-0.4-0.8v-0.3l-1-0.4l-0.2,0.1c-0.3,0.2-0.6,0.3-0.9,0.4 l-0.4-0.4c0.1-0.2,0.2-0.5,0.4-0.9l0-0.1l-0.3-0.9l-0.2-0.1c-0.5-0.2-0.8-0.3-0.9-0.4v-0.6c0.2-0.1,0.5-0.2,0.9-0.4l0.2-0.1 l0.3-0.8l-0.1-0.2c-0.2-0.5-0.3-0.8-0.4-0.9l0.4-0.4c0.3,0.1,0.7,0.2,1,0.4l0.2,0.1l0.6-0.3l0.3-0.2v-0.2c0.1-0.4,0.3-0.7,0.3-0.8 h0.6c0.1,0.2,0.2,0.4,0.4,0.9v0.3l0.9,0.4l0.2-0.1c0.5-0.2,0.8-0.4,0.9-0.4l0.4,0.4c-0.1,0.2-0.2,0.5-0.4,0.9l0,0.4l0.4,0.7 l0.2,0.1c0.4,0.1,0.6,0.2,0.8,0.3V18.1z"/><path d="M17.8,15.8c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S18.8,15.8,17.8,15.8z M17.8,18.7c-0.5,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1 S18.3,18.7,17.8,18.7z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-security"><g><path d="M21,3.4c-3.2-1-8.9-2.4-8.9-2.4L12,1l-0.1,0C11.8,1,6.2,2.4,3,3.4L2.6,3.6v0.4c0,13.4,2.7,16.6,9.2,19L12,23l0.2-0.1 c6.5-2.4,9.2-5.6,9.2-19V3.6L21,3.4z M12,22c-6.1-2.3-8.3-5.4-8.4-17.7c3-0.9,7.6-2.1,8.4-2.3c0.8,0.2,5.4,1.4,8.4,2.3 C20.3,16.5,18.1,19.6,12,22z"/><path d="M11.9,4.1C10.9,4.4,8.3,5,6,5.7L5.6,5.8l0,0.4c0.3,9.5,2.2,11.9,6.2,13.6l0.2,0.1l0.2-0.1c4-1.7,5.9-4.1,6.2-13.6l0-0.4 L18,5.7c-1.2-0.3-2.5-0.7-3.6-1c-0.9-0.2-1.7-0.5-2.2-0.6l-0.1,0L11.9,4.1z M14.1,5.7c1,0.3,2.2,0.6,3.3,0.9 C17,15.8,15,17.4,12,18.7c-3-1.3-5-3-5.3-12.2C8.7,6,11,5.4,12,5.1C12.5,5.2,13.3,5.4,14.1,5.7z"/><path d="M9.4,11.4c-0.2-0.2-0.5-0.2-0.7,0s-0.2,0.5,0,0.7l2.4,2.4l4.4-4.4c0.2-0.2,0.2-0.5,0-0.7s-0.5-0.2-0.7,0L11,13L9.4,11.4z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-user-configuration"><g><path d="M15.5,8.5v-2C15.5,4.6,13.9,3,12,3S8.5,4.6,8.5,6.5v2c0,1.9,1.6,3.5,3.5,3.5S15.5,10.4,15.5,8.5z M12,11 c-1.4,0-2.5-1.1-2.5-2.5v-2C9.5,5.1,10.6,4,12,4s2.5,1.1,2.5,2.5v2C14.5,9.9,13.4,11,12,11z"/><path d="M10.6,14c0.3,0,0.5-0.3,0.4-0.6S10.7,13,10.4,13c-4.1,0.5-7.5,3-8.3,6.1c-0.1,0.5,0,0.9,0.3,1.3C2.7,20.8,3.2,21,3.6,21 h6.9c0.3,0,0.5-0.2,0.5-0.5S10.8,20,10.5,20H3.6c-0.1,0-0.3-0.1-0.4-0.2c-0.1-0.1-0.1-0.3-0.1-0.5C3.8,16.6,6.9,14.4,10.6,14z"/><path d="M21.5,16.2c0.5-1.1,0.6-1.4,0.2-1.8l-0.7-0.7l-0.2-0.1l-0.3-0.1c-0.2,0-0.3,0-1.3,0.5c-0.4-1.1-0.6-1.4-1.1-1.4h-1 c-0.5,0-0.7,0.3-1,1.4c-1-0.4-1.2-0.4-1.3-0.4c-0.2,0-0.4,0.1-0.5,0.2l-0.7,0.7c-0.4,0.4-0.2,0.7,0.3,1.8c-1.1,0.4-1.4,0.6-1.4,1.1 v1c0,0.5,0.3,0.7,1.4,1.1c-0.5,1.1-0.6,1.4-0.2,1.8l0.8,0.8l0.4,0.1c0.1,0,0.3,0,1.3-0.5c0.4,1.1,0.6,1.4,1.1,1.4h1 c0.5,0,0.6-0.3,1-1.4c1,0.4,1.2,0.4,1.3,0.4c0.2,0,0.4-0.1,0.5-0.2l0.7-0.7c0.4-0.4,0.2-0.7-0.3-1.8c1.1-0.4,1.4-0.6,1.4-1.1v-1 C23,16.8,22.6,16.6,21.5,16.2z M22,18l-1,0.4l-0.2,0.1l-0.3,0.6l-0.1,0.2l0.1,0.2c0.2,0.4,0.3,0.7,0.4,0.9L20.6,21 c-0.2-0.1-0.5-0.2-1-0.4l-0.2-0.1l-0.6,0.3l-0.2,0.1l-0.1,0.2c-0.2,0.4-0.3,0.8-0.4,0.9h-0.6c-0.1-0.2-0.2-0.5-0.4-1L17,20.8 l-0.6-0.3l-0.2-0.1l-0.2,0.1C15.4,20.8,15.1,21,15,21l-0.5-0.5c0.1-0.2,0.2-0.5,0.4-1l0.1-0.2l-0.3-0.6l-0.1-0.2l-0.2-0.1 c-0.5-0.2-0.8-0.3-0.9-0.4v-0.6l1-0.4l0.2-0.1l0.3-0.6l0.1-0.2l-0.1-0.2c-0.2-0.4-0.3-0.7-0.4-0.9l0.4-0.4c0.2,0,0.5,0.2,1,0.4 l0.2,0.1l0.6-0.3l0.2-0.1l0.1-0.2c0.1-0.3,0.2-0.6,0.4-0.9H18c0.1,0.2,0.2,0.5,0.4,1l0.1,0.2l0.6,0.3l0.2,0.1l0.2-0.1 c0.5-0.2,0.8-0.4,0.9-0.4l0.4,0.4c-0.1,0.2-0.2,0.5-0.4,1l-0.1,0.2l0.3,0.8L21,17h0.1c0.5,0.2,0.8,0.3,0.9,0.4V18z"/><path d="M17.8,15.7c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2s2-0.9,2-2C19.8,16.6,18.9,15.7,17.8,15.7z M17.8,18.8c-0.6,0-1-0.4-1-1 c0-0.6,0.4-1,1-1s1,0.4,1,1C18.8,18.3,18.3,18.8,17.8,18.8z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-user-deactivated"><g id="icon-user-deactivated-user-deactivated-24x"><path d="M18.46,17.75l1.84-1.84a.5.5,0,0,0-.71-.71L17.75,17,15.91,15.2a.5.5,0,0,0-.71.71L17,17.75,15.2,19.59a.51.51,0,0,0,0,.71.54.54,0,0,0,.36.14.52.52,0,0,0,.35-.14l1.84-1.84,1.84,1.84a.52.52,0,0,0,.35.14.54.54,0,0,0,.36-.14.51.51,0,0,0,0-.71Z"/><path d="M17.75,23A5.25,5.25,0,1,1,23,17.75,5.26,5.26,0,0,1,17.75,23Zm0-9.5A4.25,4.25,0,1,0,22,17.75,4.26,4.26,0,0,0,17.75,13.5Z"/><path d="M12,12A3.5,3.5,0,0,1,8.5,8.5v-2a3.5,3.5,0,0,1,7,0v2A3.5,3.5,0,0,1,12,12Zm0-8A2.5,2.5,0,0,0,9.5,6.5v2a2.5,2.5,0,0,0,5,0v-2A2.5,2.5,0,0,0,12,4Z"/><path d="M9.5,21H3.62a1.48,1.48,0,0,1-1.17-.57,1.53,1.53,0,0,1-.28-1.32c.7-2.82,3.67-5.32,7.22-6.1a.5.5,0,1,1,.22,1c-3.2.7-5.86,2.9-6.47,5.36a.51.51,0,0,0,.1.46.47.47,0,0,0,.38.19H9.5a.5.5,0,0,1,0,1Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-user-report"><g><path d="M15.2,7.5v-2c0-2.1-1.7-3.8-3.8-3.8S7.7,3.4,7.7,5.5v2c0,2.1,1.7,3.8,3.8,3.8S15.2,9.6,15.2,7.5z M13.7,7.5c0,1.2-1,2.2-2.2,2.2s-2.2-1-2.2-2.2v-2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2V7.5z"/> <path d="M9.9,18.8H3.1c-0.1,0-0.2-0.1-0.2-0.1c0,0-0.1-0.1,0-0.2c0.6-2.6,3.6-4.7,7.2-5.2c0.4,0,0.7-0.4,0.7-0.8c0-0.4-0.4-0.7-0.8-0.7c-4.3,0.5-7.7,3-8.5,6.3c-0.1,0.5,0,1.1,0.3,1.5C2,20,2.5,20.2,3.1,20.2h6.9c0.4,0,0.8-0.3,0.8-0.8S10.4,18.8,9.9,18.8z"/> <path d="M22.5,14.6l-2.2-2.9c-0.2-0.3-0.5-0.4-0.9-0.4h-5c-0.6,0-1.1,0.5-1.1,1.1v8.7c0,0.6,0.5,1.1,1.1,1.1h7.2c0.6,0,1.1-0.5,1.1-1.1v-5.8C22.7,15,22.6,14.8,22.5,14.6z M21.2,20.8h-6.5v-8h4.5l2,2.7V20.8z"/> <path d="M19.4,16.2h-3c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h3c0.4,0,0.8-0.3,0.8-0.8S19.9,16.2,19.4,16.2z"/> <path d="M15.7,15c0,0.4,0.3,0.8,0.8,0.8h3c0.4,0,0.8-0.3,0.8-0.8s-0.3-0.8-0.8-0.8h-3C16,14.2,15.7,14.6,15.7,15z"/> <path d="M19.4,18.2h-3c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h3c0.4,0,0.8-0.3,0.8-0.8S19.9,18.2,19.4,18.2z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-user-unassigned"><g id="icon-user-unassigned-user-unassigned-24x"><path d="M12,12A3.5,3.5,0,0,1,8.5,8.5v-2a3.5,3.5,0,0,1,7,0v2A3.5,3.5,0,0,1,12,12Zm0-8A2.5,2.5,0,0,0,9.5,6.5v2a2.5,2.5,0,0,0,5,0v-2A2.5,2.5,0,0,0,12,4Z"/><path d="M13.5,21H3.62a1.48,1.48,0,0,1-1.17-.57,1.53,1.53,0,0,1-.28-1.32c.7-2.82,3.67-5.32,7.22-6.1a.5.5,0,1,1,.22,1c-3.2.7-5.86,2.9-6.47,5.36a.51.51,0,0,0,.1.46.47.47,0,0,0,.38.19H13.5a.5.5,0,0,1,0,1Z"/><path d="M19,20.5a.5.5,0,0,1-.5-.5V18.85a1.48,1.48,0,0,1,1-1.43,1.5,1.5,0,1,0-2-1.42.5.5,0,0,1-1,0,2.5,2.5,0,1,1,3.29,2.37.5.5,0,0,0-.29.48V20A.5.5,0,0,1,19,20.5Z"/><circle cx="19" cy="22" r="0.5"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-vocabulary"><g id="icon-vocabulary-vocabulary-16x"><path d="M2.23,5A.56.56,0,0,0,2.5,5a.49.49,0,0,0,.42-.24A6,6,0,0,1,12.47,4h-2a.5.5,0,0,0,0,1h3a.5.5,0,0,0,.5-.5v-3a.5.5,0,0,0-1,0V3.12A7,7,0,0,0,2.08,4.27.5.5,0,0,0,2.23,5Z"/><path d="M13.75,11.08a.5.5,0,0,0-.69.15A6,6,0,0,1,3.53,12h2a.5.5,0,0,0,0-1h-3a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,1,0V12.88a7,7,0,0,0,10.9-1.11A.5.5,0,0,0,13.75,11.08Z"/><path d="M14.5,6H1.5a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,.5-.5v-3A.5.5,0,0,0,14.5,6ZM14,9H2V7H14Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-warning"><g id="icon-warning-warning-24x"><path d="M12,16a.5.5,0,0,1-.5-.5v-9a.5.5,0,0,1,1,0v9A.5.5,0,0,1,12,16Z"/><circle cx="12" cy="18.5" r="0.5"/><path d="M21.93,23H2.07a1.56,1.56,0,0,1-1.33-.75,1.65,1.65,0,0,1-.06-1.61L10.6,1.35a1.58,1.58,0,0,1,2.8,0l9.92,19.29a1.65,1.65,0,0,1-.06,1.61A1.56,1.56,0,0,1,21.93,23ZM12,1.5a.56.56,0,0,0-.51.3L1.57,21.09a.67.67,0,0,0,0,.63.56.56,0,0,0,.48.28H21.93a.56.56,0,0,0,.48-.28.67.67,0,0,0,0-.63L12.51,1.8A.56.56,0,0,0,12,1.5Z"/></g></symbol><symbol viewBox="0 0 16 16" id="share"><path d="M12.5,10c-0.8,0-1.4,0.3-1.9,0.9L7.8,9.3C7.9,8.9,8,8.4,8,8S7.9,7.1,7.8,6.7l2.9-1.6C11.1,5.7,11.7,6,12.5,6 C13.9,6,15,4.9,15,3.5S13.9,1,12.5,1S10,2.1,10,3.5c0,0.3,0.1,0.5,0.1,0.8L7.3,5.9C6.6,5,5.6,4.5,4.5,4.5C2.6,4.5,1,6.1,1,8 s1.6,3.5,3.5,3.5c1.1,0,2.1-0.5,2.8-1.4l2.9,1.6C10.1,12,10,12.2,10,12.5c0,1.4,1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S13.9,10,12.5,10z M12.5,2C13.3,2,14,2.7,14,3.5S13.3,5,12.5,5S11,4.3,11,3.5S11.7,2,12.5,2z M4.5,10.5C3.1,10.5,2,9.4,2,8c0-1.4,1.1-2.5,2.5-2.5 S7,6.6,7,8C7,9.4,5.9,10.5,4.5,10.5z M12.5,14c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S13.3,14,12.5,14z"/></symbol><symbol viewBox="0 0 24 24" id="transfer-permissions"><g id="transfer-permissions-user-delegate-24x"><path d="M7.17,7.66A2.57,2.57,0,0,1,4.61,5.09v-1a2.57,2.57,0,0,1,5.13,0v1A2.58,2.58,0,0,1,7.17,7.66Zm0-5.16A1.56,1.56,0,0,0,5.61,4.06v1a1.57,1.57,0,1,0,3.13,0v-1A1.57,1.57,0,0,0,7.17,2.5Z"/><path d="M6.66,13.87H2.07a1,1,0,0,1-1-1.23c.47-2.26,3-3.9,6.1-3.9a.5.5,0,0,1,0,1c-2.55,0-4.75,1.33-5.12,3.1l4.61,0a.5.5,0,0,1,.5.5A.51.51,0,0,1,6.66,13.87Z"/><path d="M10.21,15.87a.47.47,0,0,1-.35-.15.5.5,0,0,1,0-.71l1.64-1.64L9.86,11.72a.5.5,0,0,1,0-.71.5.5,0,0,1,.7,0l2,2a.5.5,0,0,1,0,.71l-2,2A.49.49,0,0,1,10.21,15.87Z"/><path d="M16.92,15.78a2.56,2.56,0,0,1-2.56-2.56v-1a2.57,2.57,0,0,1,5.13,0v1A2.57,2.57,0,0,1,16.92,15.78Zm0-5.16a1.56,1.56,0,0,0-1.56,1.56v1a1.57,1.57,0,0,0,3.13,0v-1A1.56,1.56,0,0,0,16.92,10.62Z"/><path d="M22,22H11.82a1,1,0,0,1-.8-.38,1,1,0,0,1-.2-.84c.47-2.27,3-3.91,6.1-3.91s5.64,1.64,6.11,3.91a1,1,0,0,1-.21.84A1,1,0,0,1,22,22Zm-5.11-4.13c-2.55,0-4.76,1.34-5.13,3.11L22,21h0C21.68,19.19,19.48,17.85,16.92,17.85Z"/></g></symbol></svg>';

removeElement(document.body.getElementsByTagName('svg'));
document.body.innerHTML = svgIcons16 + svgIcons24 + currentlyHTML;

/**
 *   this method start the maintenance windows
 * */
var maintenanceWindows = false;
bizagi.loader.startPageMaintenance = function () {
    if (!maintenanceWindows) {
        maintenanceWindows = true;
        loader.startAndThen("maintenance")
            .then(function () {
                var maintenance = new bizagi.maintenance.facade({
                    proxyPrefix: bizagiConfig.proxyPrefix || ""
                });
                maintenance.execute();
            })
    }
};

bizagiConfig.maintenanceWindows = {};
bizagiConfig.maintenanceWindows.isMaintenance = false;
bizagiConfig.maintenanceAlert = {};

/**
 * get the maintenance windows message
 */
var maintenanceWindowGetMessage = function(response) {
    if (response){
        loadedMessageMaintenanceWindow(response);
    }
    else{
        loader.nativeAjax(loader.getPathUrl(bizagiConfig.proxyPrefix + "Rest/MaintenanceWindow/CustomizeMessage"), loadedMessageMaintenanceWindow);
    }
};
/**
 * Set values in BizagiConfig
 * @param {*} response 
 */
var loadedMessageMaintenanceWindow=function (response) {
    bizagiConfig.maintenanceWindows.isMaintenance = true;
    bizagiConfig.maintenanceWindows.data = JSON.parse(response.response);
};

loader.redirectToError = function (data) {
    window.location.href = "error.html?message=" + data.message + "&type=" + data.type + "&message-info1=" + data.messageInfo1 + "&message-info2=" + data.messageInfo2 +"&";
}
loader.nativeAjax(loader.getPathUrl(bizagiConfig.proxyPrefix + "Api/Authentication/BizagiConfig"), function (response) {
    var bizagiConfig = JSON.parse(response.responseText);
    if (bizagiConfig.redirectErrorPage) {
        window.location.href = bizagiConfig.redirectErrorPage;
        return;
    }
    /**
     * This key enable the analysis of invocations of multiaction service,
     * looking for a circular dependencies.
     *
     * @default By default the value depend of environment
     * @type {boolean}
     */
    bizagi.override.detectCircularDependencies = !bizagiConfig.isProduction;

    bizagiConfig.groupByCaseNumber = bizagiConfig.groupByCaseNumber;

    // Store configuration in session storage
    window.sessionStorage.setItem("BizagiConfiguration", response.responseText);

    if (bizagiConfig.code === "FED_AUTHENTICATION_ERROR") {
        window.top.document.location = bizagiConfig.message;
        return;
    }

    if (bizagiConfig.defaultLanguage) {
        bizagiConfig.defaultLanguage = bizagiConfig.defaultLanguage;
        bizagiConcurrent = bizagiConfig.isConcurrentSession;
    } else {
        if (bizagiConfig.code) {
            if (bizagiConfig.code === "AUTHENTICATION_ERROR") {
                window.location.href = "App/Inicio/UserNotValid.aspx";
            } else {
                alert(bizagiConfig.code + "\n" + bizagiConfig.message);
            }
        }
    }
    for (var k in bizagiConfig) { window.bizagiConfig[k] = bizagiConfig[k] };
}, function (response) {
    // Error callback
    if (response.status == 503){
        var resp;
        try {
            resp = JSON.parse(response.response);
            maintenanceWindowGetMessage(response);
        } catch (e) {
            maintenanceWindowGetMessage();
        }
    } else {
        var resp = {},
            data = {
                message: response.responseText,
                type: '',
                messageInfo1: '',
                messageInfo2: '' 
            };
        try {
            resp = JSON.parse(response.responseText);
            data.message = resp.message;
            data.type = resp.type;
            data.messageInfo1 = ' ';
            data.messageInfo2 = ' ';
            loader.redirectToError(data);
            
        } catch (e) {}
        loader.redirectToError(data);
    }
});

loader.preInit(["bizagiDefault", bizagiConfig.environment, undefined, "./"], [
    bizagiConfig.defaultLanguage || session.language || "en", bizagiConfig.log || false, bizagi.override.Inbox_RowsPerPage || "",
    [session.symbol || "$", session.decimalSeparator || ",", session.groupSeparator || ".", session.decimalDigits || "2"],
    [session.shortDateFormat || "dd/MM/yyyy", session.timeFormat || "H:mm", session.longDateFormat || "dddd, dd' de 'MMMM' de 'yyyy"],
    [session.uploadMaxFileSize || bizagiConfig.uploadMaxFileSize || "1048576"], "",
    "ASP.NET_SessionId"
]);

loader.init(function () {
    // Check if Bizagi its a oAuth server provider

    if (!!window.sessionStorage) {
        window.sessionStorage.setItem('XSRFToken', (bizagiConfig.XSRFToken || ""));
    }

    if (bizagiConfig.maintenanceWindows.isMaintenance) {
        setTimeout(bizagi.loader.startPageMaintenance(), 5000);
    }
    else {
        var path = location.pathname.split("/");
        var urlParameters = bizagi.readQueryString();
        var oAuthRequest = (isLoginExternal(path) || (urlParameters.type && (urlParameters.type == "oauth2AsServer" || urlParameters.type == "oauth2AsBridge")));

        function isLoginExternal(path) {
            var _valueLogin = false;

            for (var i = 0; i < path.length; i++) {
                if (path[i] === "loginexternal.html") {
                    _valueLogin = true;
                }
            }
            return _valueLogin;
        };

        if (session.isAuthenticate == "true" && !oAuthRequest) {
            loader.nativeAjax(loader.getPathUrl(bizagiConfig.proxyPrefix + "Rest/Licenses"), function (response) {
                var data = {
                    message: '',
                    type: ''
                }
                try {
                    var objectResponse = JSON.parse(response.response);
                    data.message = objectResponse.message;
                    data.type = objectResponse.type;
                    if (objectResponse.status === "error") {
                        errorLicenses = true;
                        loader.redirectToError(data);
                    }
                }
                catch (err) {
                }
            });

            BIZAGI_ENABLE_FLAT = true;//Flag to smartphone & tablet
            if (!bizagiConfig.themesEnabled) {
                var module = bizagi.detectDevice() !== "desktop" ? "workportalflat" : "workportal";
                loader.start(module).then(function () {

                    // Catch all XHR errors and show a generic Error Message Window
                    bizagi.showErrorAlertDialog = true;

                    $(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
                        var _showMessage = function(message, status, data) {
                                var showGenericMessage = status !== 500 || data.type !== "CaseNumberTooLongException";
                                bizagi.modalError.show(message, undefined, showGenericMessage);
                            },
                            messageToShow = "",
                            data = {};
                        if (jqXHR.readyState === 0) return;
                        if (bizagi.showErrorAlertDialog &&
                            jqXHR.status != 401 && //Dont show message when authentication fails
                            jqXHR.status != 404) {//Dont show message on feature plans
                            
                            if (typeof thrownError == "object") {
                                messageToShow = thrownError.message;
                            } else {
                                // Extract data from jqXHR object
                                messageToShow = thrownError;
                                try {
                                    data = JSON.parse(jqXHR.responseText);
                                } catch (e) {}
                                if (data.message) {
                                    messageToShow += ": " + data.message
                                }
                            }
                            _showMessage(messageToShow, jqXHR.status, data);
                            bizagi.showErrorAlertDialog = true;
                        }

                    });

                    if (bizagiConfig.environment === "debug") {
                        var links = document.getElementsByTagName('link');
                        var typePattern = /^text\/(x-)?less$/;

                        less.sheets = [];

                        for (var i = 0; i < links.length; i++) {
                            if (links[i].rel === 'stylesheet/less' || (links[i].rel.match(/stylesheet/) &&
                                (links[i].type.match(typePattern)) || links[i].href.match(/less.css/))) {
                                less.sheets.push(links[i]);
                            }
                        }

                        less.refresh(true);
                    }

                    var workportal = window.bizagiWorkportal = new bizagi.workportal.facade({
                        proxyPrefix: bizagiConfig.proxyPrefix || ""
                    });

                    workportal.execute();

                    if (bizagiConcurrent === true) {
                        var validNavigation;
                        $(document).on('keydown keyup', function (e) {
                            if (e.which === 116 || e.which === 82 && e.ctrlKey) {
                                validNavigation = true;
                            }
                        });
                        $(window).on('beforeunload', function (e) {
                            if (!validNavigation && typeof $(e.target.activeElement).attr('class') == "undefined") {
                                workportal.dataService.logoutBeforeUnload();
                            }
                        });
                    }
                });
            }
            else {
                loader.start("theme.base").then(function () {
                    if (bizagiConfig.environment === "debug") {
                        var links = document.getElementsByTagName('link');
                        var typePattern = /^text\/(x-)?less$/;

                        less.sheets = [];

                        for (var i = 0; i < links.length; i++) {
                            if (links[i].rel === 'stylesheet/less' || (links[i].rel.match(/stylesheet/) &&
                                (links[i].type.match(typePattern)) || links[i].href.match(/less.css/))) {
                                less.sheets.push(links[i]);
                            }
                        }

                        less.refresh(true);
                    }

                    var workportal = window.bizagiWorkportal = new bizagi.workportal.facade({
                        proxyPrefix: bizagiConfig.proxyPrefix || ""
                    });

                    var desktopWorkportal = new bizagi.workportal.desktop.facade({
                        proxyPrefix: bizagiConfig.proxyPrefix || ""
                    });

                    var servicesPD = new bizagi.workportal.services.behaviors.projectDashboard(self.dataService);
                    servicesPD.setCustomizeTheme();
                });
            }
        } else {
            BIZAGI_ENABLE_FLAT = false;//Flag to load smartphone & tablet old device
            // Initialize login module
            /*if (window.self !== window.top) {
                window.top.document.location = window.self.location;
            }else {
    */
            var path = location.pathname.split("/");
            var loginModule = "";

            if (isLoginExternal(path)) {
                loginModule = "loginexternal";
            } else {
                loginModule = "login";
            }
            loader.start(loginModule).then(function () {
                // Get parameters for Oauth
                var oAuthParameters = {
                    type: urlParameters.type,
                    oAuth2InternalState: urlParameters.oAuth2InternalState,
                    syncToken: urlParameters.syncToken,
                    oauth2sso: urlParameters.oauth2sso
                };
                var login = new bizagi.login.facade({
                    proxyPrefix: bizagiConfig.proxyPrefix || "",
                    oAuthParameters: oAuthParameters
                });
                login.execute();
            });


            // }
        }
    }
});
