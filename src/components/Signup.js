import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

const Signup = (props) => {
    const [creds,setCreds]=useState({name:"",email:"", password:"",cpassword:""})
    let navigate=useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const{name,email,password}=creds;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
             
              },
              body: JSON.stringify({name: creds.name, email: creds.email,password: creds.password}),
           
          });
          const json= await response.json();
          console.log(json);
          
         if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("signed up successfully", "success")
          }
            else{
              props.showAlert("Invalid credentials", "danger")
            }
          
          
    }
    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
      };
  return (
    <div className="container my-2">
      <form onSubmit={handleSubmit} >
      <div className="form-group my-4">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="Password"/>
  </div>
  <div className="form-group my-4">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
  
  </div>
  <div className="form-group my-4">
    <label htmlFor="pasword">Password</label>
    <input type="password" className="form-control" id="password" name="password"  onChange={onChange} placeholder="Password" minLength={5} required/>
  </div>
  <div className="form-group my-4">
    <label htmlFor="cpasword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword"  onChange={onChange} placeholder="Password" minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
