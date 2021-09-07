# coinAPItest
###  Title:
Avg price and size of transaction from a live coinAPI.

### Description:
What it does: To grab the averge of price and size from the coin API using the most up to date information.

### How to use:
Clone the repository to your machine and run `node app.js` in your terminal and you should see the most up to date information in the .data file.

### Technologies and credits:
I used no dependencies.  I have limited exposure to the backend.  One of my first exposures to the backend was a vanilla javascipt course in node.js (https://www.pirple.com/courses/take/the-nodejs-master-class/lessons/3809402-anatomy-of-a-node-application#) that used no dependencies
including no NPM.  So I used the tools that I knew of and tools that I looked up, to build this project.  I did recently go through a course for node.js, express, sql commands,
sqlite, and db browser, from (https://www.codeacademy.com) but since I rushed through it in 5 weeks, I really need the full 8 weeks to attempt the projects.

### Challenges faced:
I had never tried to hook up to an foreign API before.  My guidience was the one example from the vanilla javascript course.  Learning to use backend tools and techniques
was a learning experience for me.  I did notice that there seemed to be an async function that took longer sometimes to generate data. I needed that data before updating a file with the data fired and I'd end up with undefined. I suspected this and for a while had a hack where I just deleted the file and created a new one (this took longer) and that seemed to help always getting the data written in the file.  I think I have fixed it by putting everything in promise functions and now I can just update the file when I know the data has been recieved. (I know this is much better then delete and create a file.)  I'm thinking there is a way to see this in action with the call stack debug in vsc, but I have yet to figure out how to use the debug for that correctly. I'm thinking code will get easier with practice with Express and other libraries/frameworks, debuging tools, and helpful vsc extentions.  I've already got a lot of helpful extentions and debug practice from working in front end.

### Things I hope for future:  
Since I have had limited exposure,I hope I can show off my skills that I can learn in a short amount of time and produce with little resources. Learning how to write better code comes with practice and exposure. 
