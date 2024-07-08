#E Commerce MERN Stack Project
#client-server folder create
# npm init -y
#git configure
# npm i  express , npm i --save-dev nodemon , morgan(http request details in console)
#middleware set app.use(express json())
app.use(express.urlencoded({extended: true}))
#we can use body-parser except express 
#npm install body-parser

#npm i body-parser for error handling 
#Express Error handling Middleware
#handling http errors 
 #install http-errors
 ## create client and server side error
 #Environment variable and .gitignore
 #connect db use package npm i mongoose , url must be string 
 #need to read about mongoose schema validator 
 #install npm i bcrypt for password encoded and decoded; 
 ## keep image path  in .env folder check tutorial 14 last 3 min
##create seed route for testing
##get /appi/users/ ->isAdmin->getAllUsers->searchByName + pagination functionality
##response controller 
## find users depend on id 
## how to services in the backend
##create an user -- register process
##try to avoid duplicate email

