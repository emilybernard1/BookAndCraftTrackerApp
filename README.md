ADHD TRACKER APP


____________________________
OVERVIEW

-If your ADHD brain is anything like mine, then you have doom boxes of crafts and piles of books around your house that you want to do and read. Yet, you don't always know where things are nor do you always remember whether you ever finished reading that book or putting together that craft. 

-With this app, you'll have a handy database of all of the books you want to read and crafts you want to do once bookcamp is over! 


____________________________
TECHNOLOGIES USED

-Mongoose
-Express
-MongoDB
-Liquidjs
-Node
-Nodemon
-CSS
-HTML


____________________________
USER STORIES

As a user, I want the ability to... 
  - sign up.
  - sign in. 
  - change my password. 
  - sign out. 
  - log my books. 
  - update my books. 
  - view all of my books in a list. 
  - read more details of individual books. 
  - delete my books. 
  - make comments on my books.
  - favorite books that I read and loved. 
  - read a list of all of the books I have favorited. 
  - remove books from my favorites. 
  - log my crafts. 
  - update my crafts. 
  - view all of my crafts in a list. 
  - read more details of individual crafts. 
  - delete my crafts. 
  - make comments on my crafts.
  - favorite crafts that I did and loved. 
  - read a list of all of the crafts I have favorited. 
  - remove crafts from my favorites. 



____________________________
EXAMPLE SEED DATA

```const startBooks = [
        { name: "La Fille qui lisait dans le métro", author: "Christine Féret-Fleury", genre: "French Literature", read: false },
        { name: "The Mystwick School of Music Craft", author: "Jessica Khoury", genre: "Young Adult Fantasy", read: false },
        { name: "An Island Wedding", author: "Jenny Colgan", genre: "Chick Lit", read: false },
        { name: "Hocus Pocus 2", author: "FreeForm Books", genre: "Fantasy", read: true },
  ]
```
    
```const startCrafts = [
    { name: "Create Your Own Succulent Hanger", materials: "Kit", stored: "In the top of my closet", time: "30 min to 1 hour" },
    { name: "Blanket for Ryleigh", materials: "top fabric, bottom fabric, blanket binding", stored: "the skinny part of my closet", time: "2 hours" }
    { name: "Coloring Book for Vivi", materials: "Book, pencils, eraser, black G2-10 pen", stored: "under my desk", time: "so much" }
]
```
  
  
____________________________
SCHEDULE

Monday: Pitch idea, Seed db, Get the back end going
Tuesday: Testing with postman and make sure Back End is good to go
Wednesday: Front End
Thursday: Front End
Friday: Ask all questions I need answered before the weekend
Saturday and Sunday: Polish all details


____________________________
GOALS

Primary: Make sure I really understand and build a solid foundation of how to build a back end
Stretch: Front End Design. I really want to try to dive deeper here this week, because it feels like my weak point. 


____________________________
FUTURE VERSION POSIBILITIES

-Make it so the user can decide anything they want to log/track
-Could make it into more of an online BUJO


____________________________
BACK UP IDEA

My bucketlist Travel and book tracker
Overview:
A tracker app that holds a bucket list of places that the user wants to visit and the books they would like to take with them. 


____________________________
MVP

- An app that looks at least as good as the Fruit App we did in class, with a nav bar at the top, and div boxes that display the users resources and allows the user to edit and delete them as well as make comments.



____________________________
WIREFRAMES

<img width="790" alt="WireFrame1ADHDApp" src="https://user-images.githubusercontent.com/77028684/194731119-d74ba618-0487-4118-a050-38c7325b90d5.png">

<img width="793" alt="WireFrame2ADHDApp" src="https://user-images.githubusercontent.com/77028684/194731127-bbb3d8b3-19e7-4ef9-95e2-f889ca708142.png">

<img width="788" alt="WireFrame3ADHDApp" src="https://user-images.githubusercontent.com/77028684/194731129-bcb76be5-66e7-472d-8903-f484a16e4d5f.png">

<img width="792" alt="WireFrame4ADHDApp" src="https://user-images.githubusercontent.com/77028684/194731132-3d0dcef6-6635-4742-b423-630812b18ee7.png">


_____________________________
ERDs 

User and Books
<img width="780" alt="ERDUsersAndBooks" src="https://user-images.githubusercontent.com/77028684/194770464-81c1ecbf-2119-4190-b187-693cf6c6dbdc.png">

User and Crafts
<img width="783" alt="ERDUsersAndCrafts" src="https://user-images.githubusercontent.com/77028684/194770472-f87f27a1-0976-4da3-9f38-404fd6e16c78.png">

