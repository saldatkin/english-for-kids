import {
  sidebar,
  menu,
  constantsArray,
  correctAnswerSound,
  wrongAnswerSound,
  successSound,
  failureSound,
  tableHeaders,
} from "./constants.js";

import {
  mainContainer,
  headerContainer,
  navBurger,
  overlayDiv,
  trainCaption,
  playCaption,
  navSidebar,
  starsContainer,
  startPlayBtn,
  resultDiv,
  loseCaption,
  createMainLayout,
} from "./mainLayout.js";

createMainLayout();

class EnglishForKids {
  constructor() {
    this.current = menu;
    this.isStartPlayBtnActive = false;
    this.randomArr = undefined;
    this.counterCorrectInGame = 0;
    this.counterMistakesInGame = 0;
  }

  init() {
    this.createLayout();
    this.addStartPlayButtonEvents();
    this.addPlayToggleEvents();
    this.addNavigationMouseClickEvents();
    this.makeContent(this.current);
  }

  createLayout() {
    let ul = document.createElement("ul");
    ul.classList.add("item-list");

    mainContainer.appendChild(ul);

    for (let i = 0; i < 8; i++) {
      const li = document.createElement("li");
      li.classList.add("item-div");
      li.tabIndex = 0;

      const front = document.createElement("div");
      const back = document.createElement("div");
      front.classList.add("front");
      back.classList.add("back");

      const itemImageFront = document.createElement("img");
      itemImageFront.classList.add("item-image", "item-image-front");
      const itemImageBack = document.createElement("img");
      itemImageBack.classList.add("item-image", "item-image-back");

      const divCaptionFront = document.createElement("div");
      divCaptionFront.classList.add("div-caption", "div-caption-front");
      const divCaptionBack = document.createElement("div");
      divCaptionBack.classList.add("div-caption", "div-caption-back");

      const divCaptionEng = document.createElement("div");
      divCaptionEng.classList.add("div-caption-eng");
      const divCaptionBY = document.createElement("div");
      divCaptionBY.classList.add("div-caption-by");

      const translateBtn = document.createElement("div");
      translateBtn.classList.add("translate-btn");

      ul.append(li);
      li.append(front, back);
      front.append(itemImageFront, divCaptionFront);
      back.append(itemImageBack, divCaptionBack);
      divCaptionFront.append(divCaptionEng, translateBtn);
      divCaptionBack.append(divCaptionBY);
    }
  }

  makeContent(current) {
    this.current = current;

    const itemImagesFront = document.getElementsByClassName("item-image-front");
    const itemImagesBack = document.getElementsByClassName("item-image-back");

    const divCaptions = document.getElementsByClassName("div-caption-front");

    const divCaptionEng = document.getElementsByClassName("div-caption-eng");
    const divCaptionBY = document.getElementsByClassName("div-caption-by");

    const translateBtns = document.getElementsByClassName("translate-btn");

    const isPlayModeActive = trainCaption.classList.contains("hidden");

    for (let i = 0; i < itemImagesFront.length; i++) {
      const content = this.current[i];
      const imageFront = itemImagesFront[i];
      const imageBack = itemImagesBack[i];
      const captionEng = divCaptionEng[i];
      const caption = divCaptions[i];
      const captionBY = divCaptionBY[i];
      const translateBtn = translateBtns[i];

      if (isPlayModeActive && current !== menu) {
        this.clearStars();
        imageFront.classList.add("wide");
        caption.classList.add("hidden");
      } else if (!isPlayModeActive && current !== menu) {
        imageFront.classList.remove("wide");
        caption.classList.remove("hidden");
      }

      imageFront.src = `${content.img}`;
      imageFront.alt = `${content.word}.img`;
      imageFront.classList.add(`${content.word}-img`);

      imageBack.src = `${content.img}`;
      imageBack.alt = `${content.word}.img`;
      imageBack.classList.add(`${content.word}-img`);

      captionBY.innerText = content.translation;
      captionEng.innerText = content.word;

      const translateImg = document.createElement("img");
      //captionEng.append(translateBtn);
      translateBtn.append(translateImg);
      translateImg.classList.add("translate-img", "arrow");

      if (current === menu) {
        translateImg.classList.add("hidden");
        startPlayBtn.classList.add("hidden");
      }

      startPlayBtn.classList.remove("hidden");
      translateImg.alt = "arrow.svg";
      translateImg.src = "../assets/img/rotate_arrows.png";
    }
  }

  findCurrentObject(array) {
    let currentObject;

    for (let i = 0; i < array; i++) {
      const element = array[i];
      if (element.word === document.querySelector(".active-item")) {
        currentObject = element;
      }
    }
    return currentObject;
  }

  createArrayOfRandomNumbers() {
    let result = [];

    for (let i = 0; result.length < 8; i++) {
      const element = Math.round(Math.random() * 7);
      if (!result.includes(element)) {
        result.push(element);
      }
    }

    return result;
  }

  pronounceWord(randomArr, currentArr) {
    let currentObject;
    let currentAudio;

    setTimeout(() => {
      if (currentArr !== menu && randomArr.length !== 0) {
        currentObject = currentArr[randomArr[0]];
        currentAudio = new Audio(currentObject.audio);
        currentAudio.play();
      }
    }, 500);
  }

  checkAnswer(text) {
    let indexOfClickedCard;

    for (let i = 0; i < this.current.length; i++) {
      const element = this.current[i];
      if (text === element.word) {
        indexOfClickedCard = i;
        break;
      }
    }

    const element = this.current[indexOfClickedCard];

    if (this.randomArr[0] === indexOfClickedCard) {
      this.counterCorrectInGame++;
      element.correct++;
      correctAnswerSound.play();

      this.addCorrectStar();
      if (this.randomArr.length > 0) {
        this.randomArr = this.randomArr.slice(1);
        document
          .querySelectorAll(".item-div")
          [indexOfClickedCard].classList.add("answered");
        this.pronounceWord(this.randomArr, this.current);
      }
    } else {
      this.counterMistakesInGame++;
      element.mistakes++;
      wrongAnswerSound.play();
      this.addWrongStar();
    }
  }

  addCorrectStar() {
    let correctStar = document.createElement("img");
    correctStar.classList.add("star", "correct-star");
    starsContainer.append(correctStar);

    correctStar.src = "../assets/img/star.png";
  }

  addWrongStar() {
    let wrongStar = document.createElement("img");
    wrongStar.classList.add("star", "wrong-star");
    starsContainer.append(wrongStar);

    wrongStar.src = "../assets/img/empty_star.png";
  }

  clearStars() {
    const answered = document.querySelectorAll(".answered");
    this.counterCorrectInGame = answered.length;
    const mistakes = document.querySelectorAll(".wrong-star");
    this.counterMistakesInGame = mistakes.length;
    const starsParent = document.querySelector(".stars-container");

    answered.forEach((item) => {
      item.classList.remove("answered");
    });
    while (starsParent.firstChild) {
      starsParent.firstChild.remove();
    }

    startPlayBtn.classList.remove("repeat");
    startPlayBtn.classList.add("start-btn");
    this.randomArr = this.createArrayOfRandomNumbers();
    this.counterCorrectInGame = 0;
    this.counterMistakesInGame = 0;
    this.isStartPlayBtnActive = false;
  }

  endOfGame() {
    resultDiv.classList.remove("hidden");

    if (this.counterMistakesInGame > 0) {
      resultDiv.classList.add("result", "failure");
      loseCaption.innerText = `You have ${this.counterMistakesInGame} mistakes`;
      failureSound.play();
    } else {
      loseCaption.innerText = "";
      resultDiv.classList.add("result", "win");
      successSound.play();
    }

    setTimeout(() => {
      resultDiv.classList.remove("result", "win", "failure");
      resultDiv.classList.add("hidden");
      this.counterCorrectInGame = 0;
      this.counterMistakesInGame = 0;
      this.isStartPlayBtnActive = false;
      document.querySelectorAll(".div-caption-front").forEach((element) => {
        element.classList.remove("hidden");
      });
      document.querySelectorAll(".item-image").forEach((element) => {
        element.classList.remove("wide");
      });
      this.current = menu;
      this.makeContent(this.current);
    }, 4000);
  }

  createStatsPage() {
    const statsTable = document.createElement("table");
    const rowsNumber = (constantsArray.length - 1) * menu.length;
    const cellsInRowNumber = tableHeaders.length;

    for (let i = 0; i < cellsInRowNumber; i++) {
      const tableHeading = document.createElement("th");
      statsTable.appendChild(tableHeading);
      tableHeading.innerText = tableHeaders[i];
      if (i === 3 || i === 4 || i === 5) {
        tableHeading.setAttribute("data-type", "number");
      }
    }

    for (let rowCurr = 0; rowCurr < rowsNumber; rowCurr++) {
      const row = document.createElement("tr");
      statsTable.appendChild(row);

      for (let cellCurr = 0; cellCurr < cellsInRowNumber; cellCurr++) {
        const cell = document.createElement("td");
        const categoryIndex = Math.floor((rowCurr + 8) / 8);
        const wordIndex = rowCurr % 8;
        const category = constantsArray[categoryIndex];
        const object = category[wordIndex];

        const trained = object.correct + object.mistakes;

        row.append(cell);

        switch (cellCurr) {
          case 0:
            cell.textContent = object.word;
            break;
          case 1:
            cell.textContent = sidebar[categoryIndex];
            break;
          case 2:
            cell.textContent = object.translation;
            break;
          case 3:
            cell.textContent = trained;
            break;
          case 4:
            cell.textContent = object.correct;
            break;
          case 5:
            cell.textContent = object.mistakes;
            break;
          case 6: {
            if (trained === 0) {
              cell.textContent = "0%";
              break;
            } else {
              cell.textContent = `${(object.mistakes / trained) * 100}%`;
            }
            break;
          }
        }
      }
    }
    mainContainer.append(statsTable);

    const statsBtnsDiv = document.createElement("div");
    statsBtnsDiv.classList.add("stats-btns");

    const resetStatsBtn = document.createElement("div");
    const repeatDifficultBtn = document.createElement("div");
    statsBtnsDiv.appendChild(resetStatsBtn);
    statsBtnsDiv.appendChild(repeatDifficultBtn);

    resetStatsBtn.classList.add("stat-btn", "reset-btn");
    repeatDifficultBtn.classList.add("stat-btn", "repeatdiff-btn");

    resetStatsBtn.innerText = "reset";
    repeatDifficultBtn.innerText = "repeat";

    headerContainer.append(statsBtnsDiv);
  }

  addPlayToggleEvents() {
    const playToggleBtn = document.querySelector(".play-toggle");
    const startPlayBtn = document.querySelector(".start-btn");

    playToggleBtn.addEventListener("click", () => {
      playCaption.classList.toggle("hidden");
      startPlayBtn.classList.toggle("unvisible");

      if (startPlayBtn.classList.contains("unvisible")) {
        this.clearStars();
      }

      trainCaption.classList.toggle("hidden");
      const divCaptionsEng = document.querySelectorAll(".div-caption-eng");
      const divCaptionsFront = document.querySelectorAll(".div-caption-front");

      for (let i = 0; i < divCaptionsEng.length; i++) {
        const element = divCaptionsEng[i];
        const captionFront = divCaptionsFront[i];
        if (!sidebar.includes(element.textContent)) {
          if (playCaption.classList.contains("hidden")) {
            captionFront.classList.remove("hidden");
            element
              .closest(".front")
              .querySelector(".item-image")
              .classList.remove("wide");
          } else {
            this.clearStars();
            captionFront.classList.add("hidden");
            element
              .closest(".front")
              .querySelector(".item-image")
              .classList.add("wide");
          }
        }
      }
    });
  }

  addStartPlayButtonEvents() {
    const startPlayBtn = document.querySelector(".start-btn");
    this.randomArr = this.createArrayOfRandomNumbers();

    startPlayBtn.addEventListener("click", () => {
      if (!this.isStartPlayBtnActive) {
        this.isStartPlayBtnActive = true;
        startPlayBtn.classList.add("repeat");
        this.pronounceWord(this.randomArr, this.current);
      } else {
        startPlayBtn.classList.add("repeat");
        this.pronounceWord(this.randomArr, this.current);
      }
    });
  }

  addNavigationMouseClickEvents() {
    navBurger.addEventListener("click", () => {
      navBurger.classList.toggle("cross");
      navSidebar.classList.toggle("hidden");
      overlayDiv.classList.toggle("hidden");
    });
  }

  addMouseLeaveEvents() {
    const itemsDiv = document.querySelectorAll(".item-div");
    const divcaptionsBY = document.querySelectorAll(".div-caption-by");
    const divcaptionsEng = document.querySelectorAll(".div-caption-eng");

    for (let i = 0; i < divcaptionsBY.length; i++) {
      const cardBY = divcaptionsBY[i];
      const cardEng = divcaptionsEng[i];
      const itemDiv = itemsDiv[i];

      itemDiv.addEventListener("mouseleave", () => {
        if (document.querySelector(".active-rotate")) {
          document
            .querySelector(".active-rotate")
            .classList.remove("active-rotate");
        }
        cardBY.classList.remove("hidden");
        cardEng.classList.remove("hidden");
      });
    }
  }

  addMouseClickEvents() {
    const arrows = document.querySelectorAll(".arrow");
    const itemDivs = document.querySelectorAll(".item-div");

    for (let i = 0; i < arrows.length; i++) {
      const arrow = arrows[i];
      const itemDiv = itemDivs[i];
      arrow.addEventListener("click", (event) => {
        event.stopImmediatePropagation();
        itemDiv.classList.add("active-rotate");
      });
    }

    const sidebarElems = document.getElementsByClassName("nav-sidebar-elem");
    for (const element of sidebarElems) {
      const text = element.textContent;
      const current = constantsArray[sidebar.indexOf(text)];

      element.addEventListener("click", () => {
        this.clearStars();
        const activeItem = document.querySelector(".active-item");

        /* if (document.querySelector('.item-list')) {
          const ul2 = document.querySelector('.item-list');
          mainContainer.removeChild(ul2);
        }
*/
        if (activeItem) {
          activeItem.classList.remove("active-item");
        }
        if (element.classList.contains(`side-${text}`)) {
          element.classList.add("active-item");
        }
        if (this.isStartPlayBtnActive) {
          document.querySelector(".start-btn").classList.remove("rotate");
        }
        if (document.querySelector("table")) {
          mainContainer.removeChild(document.querySelector("table"));
          headerContainer.removeChild(document.querySelector(".stats-btns"));
        }
        if (text === "stats") {
          this.createStatsPage();
        } else {
          // this.createLayout();
          this.makeContent(current);
        }
        navBurger.classList.remove("cross");
        navSidebar.classList.add("hidden");
        overlayDiv.classList.add("hidden");
      });
    }

    document.querySelectorAll(".front").forEach((element) => {
      element.addEventListener("click", () => {
        const isTrainModeActive = document
          .querySelector(".play")
          .classList.contains("hidden");
        const caption = element.querySelector(".div-caption");
        const textEng = caption.querySelector(".div-caption-eng").textContent;
        let current;

        if (caption.querySelector(".div-caption-by")) {
          textBY = caption.querySelector(".div-caption-by").textContent;
        } else {
          current = constantsArray[sidebar.indexOf(textEng)];
        }
        const ul2 = document.querySelector(".item-list");
        const activeItem = document.querySelector(".active-item");

        if (!constantsArray.includes(current) && isTrainModeActive) {
          const audio = new Audio(`../assets/audio/${textEng}.mp3`);
          audio.play();
        } else if (constantsArray.includes(current)) {
          if (this.current !== current) {
            this.makeContent(current);
            activeItem.classList.remove("active-item");
            document
              .querySelector(`.side-${textEng}`)
              .classList.add("active-item");
          }
        }
      });
    });

    document.querySelectorAll(".item-div").forEach((element) => {
      element.addEventListener("click", () => {
        const text = element.querySelector(".div-caption-eng").textContent;
        if (this.isStartPlayBtnActive) {
          this.checkAnswer(text);
          if (this.randomArr.length === 0) {
            this.endOfGame();
            this.clearStars();
          }
        }
      });
    });

    overlayDiv.addEventListener("click", (event) => {
      event.preventDefault();
      navBurger.classList.remove("cross");
      navSidebar.classList.add("hidden");
      overlayDiv.classList.add("hidden");
    });
  }
}

const englishForKids = new EnglishForKids();
englishForKids.init();
englishForKids.addMouseClickEvents();
englishForKids.addMouseLeaveEvents();
