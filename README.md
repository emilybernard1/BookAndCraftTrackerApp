# CRAFT AND BOOK TRACKER APP
-----------------
Deployed Site Link: https://booksandcrafts.fly.dev/


## OVERVIEW
-----------------
- If your brain is anything like mine, then you have doom boxes of crafts and piles of books around your house that you want to do and read. Yet, you don't always know where things are nor do you always remember whether you ever finished reading that book or putting together that craft. 

- With this app, you'll have a handy database of all of the books you want to read and crafts you want to do once bootcamp is over! 



### TECHNOLOGIES USED
------------------
  - Mongoose
  - Express
  - MongoDB
  - Liquidjs
  - Node
  - Nodemon
  - CSS
  - HTML5
  - Bootstrap



### USER STORIES
-----------------
As a user, I want the ability to... 
  - sign up.
  - sign in. 
  - change my password. 
  - sign out. 
  - log my books. 
  - update my books. 
  - view all of my books in an index. 
  - read more details of individual books. 
  - delete my books. 
  - make comments on my books.
  - favorite books that I read and loved. 
  - log my crafts. 
  - update my crafts. 
  - view all of my crafts in an index. 
  - read more details of individual crafts. 
  - delete my crafts. 
  - make comments on my crafts.



### EXAMPLE SEED DATA
-------------------
```
const startBooks = [
        { name: "La Fille qui lisait dans le métro", author: "Christine Féret-Fleury", genre: "French Literature", pages: 170, read: false },
        { name: "The Mystwick School of Music Craft", author: "Jessica Khoury", genre: "Young Adult Fantasy", pages: 357,  read: false },
        { name: "An Island Wedding", author: "Jenny Colgan", genre: "Chick Lit", pages: 386, read: false },
        { name: "Hocus Pocus 2", author: "FreeForm Books", genre: "Fantasy", pages: 318, read: true },
  ]
```
    
```
const startCrafts = [
    { name: "Create Your Own Succulent Hanger", materials: "Kit", stored: "In the top of my closet", time: "30 min to 1 hour" },
    { name: "Blanket for Ryleigh", materials: "top fabric, bottom fabric, blanket binding", stored: "the skinny part of my closet", time: "2 hours" }
    { name: "Coloring Book for Vivi", materials: "Book, pencils, eraser, black G2-10 pen", stored: "under my desk", time: "so much" }
]
```
  
  

### SCHEDULE
------------------
- Monday: Pitch idea, Seed db, Get the back end going

- Tuesday: Testing with postman and make sure Back End is good to go

- Wednesday: Front End

- Thursday: Front End

- Friday: Ask all questions I need answered before the weekend

- Saturday and Sunday: Polish all details




### GOALS
---------------
- Primary: Make sure I really understand and build a solid foundation of how to build a back end

- Stretch: Front End Design. I really want to try to dive deeper here this week, because it feels like my weak point. Adding Cover Art for the books. 




### FUTURE VERSION POSIBILITIES
----------------------------
- Make it so the user can decide anything they want to log/track

- Could make it into more of an online BUJO




### MVP
--------------
- An app that looks at least as good as the Fruit App we did in class, with a nav bar at the top, and div boxes that display the users resources and allows the user to edit and delete them as well as make comments.


### Routes
---------------
<img width="505" alt="RoutesTableProject2" src="https://user-images.githubusercontent.com/77028684/195872991-bd8c3328-89b0-4ed9-acfd-b822e9d30e55.png">



### WIREFRAMES
--------------
<img width="790" alt="WireFrame1ADHDApp" src="https://user-images.githubusercontent.com/77028684/194731119-d74ba618-0487-4118-a050-38c7325b90d5.png">

<img width="793" alt="WireFrame2ADHDApp" src="https://user-images.githubusercontent.com/77028684/194731127-bbb3d8b3-19e7-4ef9-95e2-f889ca708142.png">

<img width="782" alt="BooksPage" src="https://user-images.githubusercontent.com/77028684/194932640-73ed6762-9133-45a6-82da-a55955d5c504.png">

<img width="784" alt="SingleBook" src="https://user-images.githubusercontent.com/77028684/194932654-9686a2bb-bb5c-4e5c-9488-d498bf90e410.png">

<img width="786" alt="CraftsPage" src="https://user-images.githubusercontent.com/77028684/194932667-9c2e6612-f8fa-4acf-bb88-5f512f549a3a.png">

<img width="774" alt="SingleCraft" src="https://user-images.githubusercontent.com/77028684/194932684-6f6abc36-d69e-4a7f-9209-fc62345bea89.png">



### ERDs 
---------------
### User to Crafts and Books

<img width="631" alt="ERDUsersToCraftsAndBooks" src="https://user-images.githubusercontent.com/77028684/194931128-01ca3481-9e10-419a-87f0-0c790023be1c.png">

