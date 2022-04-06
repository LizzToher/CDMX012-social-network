/* eslint-disable import/no-cycle */
/* ------ AQUI VAN ELEMENTOS PARA CREAR POST------ */
// import { onNavigate } from '../main.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { userInfo } from '../lib/firebase-users.js';
// import { orderBy, query, onSnapshot } from '../lib/firebase-imports.js';
import { logOut } from '../lib/firebase-auth.js';
import { savePost, getPost } from '../lib/firebase-posts.js';

export const home = () => {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('works');
  });

  // Header section
  const newsFeedSection = document.createElement('section');
  newsFeedSection.className = 'screenNews';
  newsFeedSection.id = 'newsFeedScreen';
  const newsHeader = document.createElement('header');
  newsHeader.className = 'usernameHeader';
  const userImg = document.createElement('img');
  userImg.className = 'userImg';
  const usernameProfile = document.createElement('p');
  usernameProfile.className = 'username';
  userInfo(userImg, usernameProfile);

  // main section
  // Your posts
  const principal = document.createElement('main');
  principal.className = 'main';
  const activity = document.createElement('p');
  activity.textContent = 'Activity';
  activity.className = 'activity';
  const postSection = document.createElement('section');
  postSection.className = 'sectionContainerPost';
  const userImg2 = document.createElement('img');
  userImg2.className = 'userImg';
  const usernameProfile2 = document.createElement('p');
  usernameProfile2.className = 'usernamePost';
  userInfo(userImg2, usernameProfile2);
  const postText = document.createElement('textarea');
  postText.id = 'postText';
  postText.placeholder = 'What are you playing?';
  const submitPost = document.createElement('button');
  submitPost.id = 'submitPost';
  submitPost.className = 'submitPost';
  submitPost.textContent = 'Post';
  submitPost.addEventListener('click', () => {
    const post = document.getElementById('postText').value;
    const datePost = new Date();
    savePost(post, datePost).then(() => {
      getPost(post).then(() => {
        postText.value = '';
      });
    });
  });

  // list of posts
  const postNews = document.createElement('section');
  postNews.id = 'sectionContainerPost';

  // Footer
  const footerMeet = document.createElement('footer');
  footerMeet.className = 'footer';
  const signOutButton = document.createElement('button');
  signOutButton.className = 'submitPost';
  signOutButton.textContent = 'Sign Out';
  signOutButton.addEventListener('click', () => {
    logOut().then(() => {
      onNavigate('/');
    });
  });

  // appends
  newsHeader.append(userImg, usernameProfile);
  principal.append(activity, postSection);
  postSection.append(userImg2, usernameProfile2, postText, submitPost);
  footerMeet.appendChild(signOutButton);
  newsFeedSection.append(newsHeader, principal, footerMeet);
  return newsFeedSection;
};
