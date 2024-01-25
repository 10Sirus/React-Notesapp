import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [creds,setCreds]=useState({email:"", password:""})
    let navigate=useNavigate();
const handleSubmit= async (e)=>{
        e.preventDefault();
       
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
             
              },
              body: JSON.stringify({email: creds.email,password: creds.password}),
           
          });
          const json= await response.json();
          
          if(json.success){
            //redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("logged in", "success")
            navigate("/");
            
          }
          else{
            props.showAlert("Invalid credentials", "danger")

          }
    }
    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
      };
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" value={creds.email} name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"/>
    
  </div>
 
  <div className="form-group my-4">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" value={creds.password} name="password" onChange={onChange} placeholder="Password"/>
  </div>
  
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
