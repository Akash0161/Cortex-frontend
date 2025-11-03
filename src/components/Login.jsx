import React, {useState } from "react";
import { FcGoogle } from "react-icons/fc";
import log from "../components/assets/log.svg";
import register from '../components/assets/register.svg'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";




const SignInSignUp = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigates = useNavigate()
    

  // Signup 
  const [Username,setUsername] = useState('');
  const [Gender, setGender] = useState("");
  const [Email,setEmail] = useState('');
  const [Password,setPassword] = useState('')

 
  const handleSignsup = async(e)=>{
    e.preventDefault();
    console.log(Username,Password,Gender,Email,Password);
    const Signupdata ={
      name : Username, 
      password : Password,
      gender : Gender, 
      email : Email,
    }
    try{
      const response = await axios.post('https://cortex-backend-4h9k.onrender.com/user/usersignup',Signupdata)
      console.log(response.data);
      
      alert(response.data.Message)
      setIsSignUpMode(!isSignUpMode)
      setUsername('')
      setEmail('')
      setGender("");
      setPassword('')
      
    }
    catch(err){
      console.log("ACC already exists")
      alert(err.Message) 
    }

  }

  //Sign in 

  const [LoginUsername,setLoginUsername] = useState('')
  const [LoginPassword,setLoginPassword] = useState('')

  const [userId, setUserId] = useState(null);

    
    const navigate = useNavigate()

    const handleSignIn = async(e)=>{
        
          e.preventDefault();
          
          const Logindata = {
            name:LoginUsername,
            password:LoginPassword
          }
          try{
            
            const res = await axios.post("https://cortex-backend-4h9k.onrender.com/user/userlogin",Logindata)
            console.log(res);
            
            if(res.data.Status== true){
              alert("Login Successfull")
               setUserId(res.data.User._id);
               localStorage.setItem("user_id",res.data.User._id)
               localStorage.setItem("name",res.data.User.name)   
                localStorage.setItem("email",res.data.User.email)
                localStorage.setItem("gender", res.data.User.gender);
               console.log(res.data.User._id);
              navigate("/Home")
            }
            else{
              alert(res.data?.Message || "Invalid credentials");
            }
            
          }
          catch(err){
            
            console.error("Login failed", err);
            alert(err.response?.data?.message || "Invalid credentials");
          }   
    }

    function handleGoogleSignup(){
      signInWithPopup(auth,provider)
      .then(res =>{ console.log(res)
        localStorage.setItem("user_id",res.user.uid)
        localStorage.setItem("name",res.user.displayName)
        localStorage.setItem("email",res.user.email)
        alert("Login Successfull")

        navigates('/Home')
      }
      )
    }

  return (
    <div className={isSignUpMode ? "container sign-up-mode" : "container"}>
      <div className="forms-container">

        <div className="signin-signup">


   {/* Sign In Form */}

          <form  className="sign-in-form" onSubmit={handleSignIn}>  
          
            <h2 className="title">Sign in</h2>

            <div className="input-field">  {/* UserName */ }
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" required value={LoginUsername} onChange={(e)=> setLoginUsername(e.target.value)} />
            </div>

            <div className="input-field">   {/* Password */ }
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required value={LoginPassword} onChange={(e)=> setLoginPassword(e.target.value)} />
            </div>

            <button type="submit"  className="btn solid" >Login</button> {/* Login redirct to feed page */ }
            
            <p className="social-text">Or Sign in with social platforms</p>

            <div className="social-media">
             
              <button onClick={handleGoogleSignup} className="social-icon">
                <i><FcGoogle className="fb"/></i>Sign in with Google
              </button>
             
            </div>
          </form>



          {/* Sign Up Form */}
          <form  className="sign-up-form" onSubmit={handleSignsup}>
            {/* onClick={handleSubmbit} */}
            <h2 className="title">Sign up</h2>


            <div className="input-field">   {/* UserName */ }
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" required value={Username} onChange={(e)=> setUsername(e.target.value)} />
            </div>

            <div className="input-field">   {/* email */ }
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" required value={Email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>

        <div className="input-field gender-input">
              <i className="fas fa-venus-mars"></i>
              <div className="gender-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={Gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={Gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={Gender === "Other"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Other
                </label>
              </div>
            </div>




            <div className="input-field">   {/* Password */ }
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required value={Password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>

            <button type="submit" className="btn">Sign up</button> {/* todo: redirect to signinpage */ }

            <p className="social-text">Or Sign up with social platforms</p>


          <div className="social-media">

              <button onClick={handleGoogleSignup} className="social-icon">
                <i><FcGoogle className="fb"/></i>Sign in with Google
              </button>
             
            </div>
          </form>
        </div>
      </div>

      {/* Panels */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Let's get started with us. Share your thoughts and ideas with the world.
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
          <img src={log} className="image" alt="login" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Let's Login to share your thoughts and ideas with the world.
            </p>
            <button 
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => setIsSignUpMode(false)}
            >
              Sign in
            </button>
          </div>
          <img src={register} className="image" alt="register" />
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
