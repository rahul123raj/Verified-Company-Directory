MERN Stack Application

This project is a MERN stack application for company management. It allows users to register, log in, create companies, and manage company data.

## Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download here](https://nodejs.org/)
- **MongoDB**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud or [Download MongoDB](https://www.mongodb.com/try/download/community) for local.
- **Git**: [Download here](https://git-scm.com/)

## Getting Started

1. **Clone the Repository**:
   Open your terminal and run:
   
   git clone https://github.com/rahul123raj/assignment_VisionFirst.git
   cd assignment_VisionFirst
   
2.Set Up MongoDB :-
if you are using mongodb Atlas
this line you can find in server/index.js path :
 mongoose.connect('mongodb+srv://<username>:<password>@cluster0.n3vir.mongodb.net/company_management');
 this is a line of code in this you have to Replace <username> and <password> with your credentials.

3. Install Dependencies :-
   For the server:
   
cd server  # Navigate to your server folder
npm install

For the client :

cd client/myapp  # Navigate to your client folder
npm install

4. Run the Server: Start the server from the server directory:
   
cd server  # Navigate to your server folder
npm start
The server will run on http://localhost:3001.

5. Run the Client:

cd client/myapp  # Navigate to your client folder
npm start
The client will run on http://localhost:3000.

6. Access the Application: Open your browser and navigate to http://localhost:3000 to access the application.
