let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://Rahul:12345@cluster0.n3vir.mongodb.net/company_management')

  //! register
const userSchema = new mongoose.Schema({
    name: String,
    username : String,
    password : String,
    role : String,
    email: String,
    mobile : String
  });

  const User = mongoose.model('User', userSchema)

  //! register
app.post('/register', async (req, res) => {
        User.create(req.body)
        .then( user => res.json(user))
        .catch(err => res.json(err))
  });


//! Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username: username });
      
      if (user) {
          // Check if the password is correct
          if (user.password === password) {
              const role = user.role === 'IT_ADMIN' ? 'admin' : 'normaluser';
              return res.json({ message: 'success', role: role, id: user._id });
          } else {
              return res.status(401).json({ message: 'Password is incorrect' });
          }
      } else {
          return res.status(404).json({ message: 'User does not exist' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
  }
});


//! create Company

const companySchema = new mongoose.Schema({
  name : String,
  address : String,
  username : String,
  status : String
})

const Company = mongoose.model('Company' , companySchema)

app.post('/company',(req,res) =>{
    Company.create(req.body)
    .then(company => res.json(company))
    .catch(err => res.json(err))
})

//! Company list

app.get('/company',(req,res) => {
  Company.find({})
  .then(company => res.json(company))
  .catch(err => res.json(err))
})

//! Delete Company

app.delete('/company/:id', async (req,res)=>{
  const company = await Company.findByIdAndDelete(req.params.id)
  res.status(200).json(company)
})

//! normal userdata 
app.get('/normaluser/:id', async (req, res) => {
  try {
    const normaluser = await User.findById(req.params.id);
    // console.log(req.params.id)
    if (!normaluser) {
      return res.status(404).json({ message: 'User not found' });
    }
    // console.log("Normal user found:", normaluser)
     res.status(200).json({username : normaluser.username, id : normaluser._id})
    // console.log(data) // Send only created_by field
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error: error.message });
  } 
});


//! Edit company
app.get('/company/:id', async (req,res)=>{
  const company = await Company.findById(req.params.id)
  res.status(200).json(company)
})

app.put('/company/:id', async (req, res) => {
  try {
  
    const { name, address, created_by } = req.body;

    // Find the company by ID and update it
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        address: address,
        created_by: created_by,
      },
      { new: true } // To return the updated document
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Respond with the updated company details
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//! Approved

app.put('/approve/:id', async (req, res) => {
  try {
    const { status } = req.body; // Get the updated status from the request body

    
    const approvedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { status: status }, // Update status in the database
      { new: true } // Return the updated document
    );

    // If no company found, return a 404 error
    if (!approvedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Return the updated company data to the client
    res.status(200).json(approvedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(3001,()=>{
    console.log('server is running')
})