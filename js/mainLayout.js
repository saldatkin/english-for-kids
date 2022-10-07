import {
  sidebar
} from './constants.js';

export let main; export let header; export let mainContainer; export let headerContainer;
export let navBurger; export let headerTitle; export let playToggle; export let rect1;
export let rect2; export let rect3; export let trainCaption; export let playCaption;
export let overlayDiv; export let navSidebar; export let bottomDiv; export let starsContainer;
export let startPlayBtn; export let resultDiv; export let loseCaption;

export function createMainLayout() {
  overlayDiv = document.createElement('div');
  overlayDiv.classList.add('overlay');
  overlayDiv.classList.add('hidden');
  document.body.append(overlayDiv);

  main = document.createElement('main');
  header = document.createElement('header');
  main.classList.add('main');
  header.classList.add('header');

  document.body.append(header, main);

  mainContainer = document.createElement('div');
  headerContainer = document.createElement('div');
  headerContainer.classList.add('container');
  headerContainer.classList.add('header-container');
  mainContainer.classList.add('container');
  mainContainer.classList.add('main-container');

  header.append(headerContainer);
  main.append(mainContainer);

  navBurger = document.createElement('button');
  headerTitle = document.createElement('h1');
  playToggle = document.createElement('button');
  navBurger.className = 'nav-burger';
  headerTitle.classList.add('header-title');
  playToggle.classList.add('play-toggle');

  headerContainer.append(navBurger, headerTitle, playToggle);

  rect1 = document.createElement('div');
  rect2 = document.createElement('div');
  rect3 = document.createElement('div');
  rect1.classList.add('rectangle', 'rect1');
  rect2.classList.add('rectangle', 'rect2');
  rect3.classList.add('rectangle', 'rect3');

  navBurger.append(rect1, rect2, rect3);

  headerTitle.innerHTML = 'English for Kids';

  trainCaption = document.createElement('span');
  playCaption = document.createElement('span');
  trainCaption.classList.add('play-toggle-caption', 'train');
  playCaption.classList.add('play-toggle-caption', 'play', 'hidden');

  trainCaption.innerHTML = 'train';
  playCaption.innerHTML = 'play';

  playToggle.append(trainCaption, playCaption);

  navSidebar = document.createElement('nav');
  navSidebar.classList.add('nav-sidebar');

  for (let i = 0; i < sidebar.length; i++) {
    const element = sidebar[i];
    const navSidebarElem = document.createElement('div');
    navSidebarElem.innerHTML = element;
    navSidebarElem.classList.add('nav-sidebar-elem');
    navSidebarElem.classList.add(`side-${element}`);
    navSidebar.append(navSidebarElem);
    if (i === 0) {
      navSidebarElem.classList.add('active-item');
    }
  }

  navSidebar.classList.add('hidden');
  main.append(navSidebar);

  bottomDiv = document.createElement('div');
  bottomDiv.classList.add('bottom-div');
  mainContainer.prepend(bottomDiv);
  starsContainer = document.createElement('div');
  starsContainer.classList.add('stars-container');
  bottomDiv.append(starsContainer);

  startPlayBtn = document.createElement('button');
  startPlayBtn.classList.add('start-btn', 'unvisible');
  startPlayBtn.innerHTML = 'start';
  bottomDiv.prepend(startPlayBtn);

  resultDiv = document.createElement('div');
  loseCaption = document.createElement('div');
  resultDiv.classList.add('result-div', 'hidden');
  loseCaption.classList.add('lose-caption');
  document.body.append(resultDiv);
  resultDiv.appendChild(loseCaption);
}
