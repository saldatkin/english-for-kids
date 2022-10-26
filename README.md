
# English for Kids :orange_book::speech_balloon:

**English for kids** - an application for learning English words for kids. This app was created to perform a task on the **[Rolling Scopes School](https://rs.school/)** course.


### Deploy link: :computer: 
🔗 **[English for Kids](https://saldatkin.github.io/english-for-kids/html/main.html)**

### Technologies: :gear:
JavaScript, HTML, CSS, Git, Webpack, Cypress.


### Application Structure: :card_index_dividers:
- **Main Page**: :small_orange_diamond: 
   - there are links to the pages with categories of words on the main page of the application;
   - each link contains a thematic image and a category name;
   - links are duplicated in the animated sidebar menu, which appears and disappears by clicking the icon in the upper left corner of the page;
   - on the main page and category pages of the application, there is a Train / Play button;
- **Category Page**: :small_orange_diamond: 
   - category page includes category name and word cards related to category theme;
   - each card has a thematic picture and an English word;
- **Statistics Page**: :small_orange_diamond: 
   -  statistics page contains a list of all categories, all words in each category, and a translation of each word;
   -  statistics are displayed next to each word - how many times a card with a given word was clicked in training mode, how many times this word was guessed in game mode, how many mistakes were made, the percentage of correct answers for each word in game mode.


### How Application work: :man_technologist:
The application works in training and game modes. Switching between training and playing modes is triggered by clicking the Train / Play button.
- **Training Mode**: :repeat:
    - when you click on the card, the word is pronounced in English;
    - each card has a button on the right bottom corner. When you click on that button the card flips over. The back side of the card has a translation of the word.
- **Game Mode**: :arrow_forward:
    - features described above for the training mode are disabled for the game mode. The "Start game" button is displayed.
    - after clicking on the "Start game" button, the random word from those on the page is pronounced. For each page, and for each game, random words are generated anew;
    - after the first click on the "Start game" button, the button changes to the "Repeat" icon. When you click on the "Repeat" button, the word is pronounced again;
    - the sound signal "error" is played if the user clicks on the wrong active card;
    - the sound signal “correct” is played if the user clicks on the correct active card. After that, a new random word from those that have not yet been guessed is pronounced;
    - a card with correctly guessed word becomes inactive.
    - after the start of the game, each click on the active card is displayed in the form of stars.
    - if all words are guessed correctly, the “success” signal is played, if there were errors while guessing the words, the “failure” signal is played, cards with words are removed;
    - afterward, the application automatically redirects to the main page with a list of categories.

### App screenshot: :camera:  
![image](https://user-images.githubusercontent.com/97672745/198045571-5b564ce1-30fd-44ce-ace0-cbb0a598e13a.png)
