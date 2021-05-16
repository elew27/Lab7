// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let count = 0;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = ++count;
        newPost.addEventListener('click', () =>{
          let entry = {name: "entryPage", id: newPost.id};
          history.pushState(entry, "", "#entry" + newPost.id);
          setState(entry);
        });
        document.querySelector('main').appendChild(newPost);
      });
      document.querySelector('body header img').addEventListener('click', () =>{
        let settings = {name: "settingsPage", id: 0};
        history.pushState(settings, "", "Settings");
        setState(settings);
      });
      document.querySelector('body header h1').addEventListener('click', () =>{
        if(history.state != null && history.state.name != 'home'){
          let home = {name: "homePage", id: -1};
          history.pushState(home, "", location.origin);
          setState(home);
        }
      });
    });
});

window.onpopstate = function(event){
  setState(event.state);
};