import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPurchasesThunk, loginThunk } from "../redux/actions";
import '../styles/navbar.css'
import Purchases from './Purchases';

const NavBar = () => {

    const [loginOpen, setLoginOpen] = useState(false)
    const [isPurchasesOpen, setIsPurchasesOpen] = useState(false)
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loginError, setLoginError] = useState("");

    //localStorage.setItem("number", "10")
    const dispatch = useDispatch();

    const openPurchases = () => {
        setIsPurchasesOpen(!isPurchasesOpen);
        dispatch(getPurchasesThunk())
    }

    const login = (e) => {
        e.preventDefault()
        const credentials = {email, password}
        dispatch(loginThunk(credentials)) 
        .then(res => { 
            localStorage.setItem("token", res.data.data.token);
        setLoginError("");
        setLoginOpen(false);
        
    })
    .catch(error => {
        setLoginError(error.response.data.message)
    })
    
    }

    

  return (
    <div className='navbar'>
        <h2>e-commerce</h2>
        <nav>
            <button onClick={() => setLoginOpen(!loginOpen)}><i className="fa-solid fa-user"></i></button>
            <button><i className="fa-solid fa-store"></i></button>
            <button onClick={openPurchases} ><i className="fa-solid fa-cart-shopping"></i></button>
        
            <form onSubmit={login} className={`login ${loginOpen ? "open" : ""}`}>
                <div className='icon-login'>
                    <i className="fa-solid fa-circle-user"></i>
                </div>
                <div className='test'>
                <article>
                    <h5>Test Data</h5>
                    <p><i className="fa-solid fa-envelope"></i> john@gmail.com</p>
                    <p><i className="fa-solid fa-key"></i> john1234</p>
                </article>
                </div>
                
                {
                    localStorage.getItem("token") ? (
                        <div className='btn-logout'>
                            <button 
                            onClick={() => localStorage.setItem("token", "")}
                            type="button"
                        >
                            Log Out
                        </button>
                        </div>
                        
                        ): (
                        <>
                            <article>e-mail</article>
                            <input
                                className='email' 
                                type="email" 
                                placeholder=' e-mail' 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email}
                            />

                            <article>Password</article>
                            <input
                                className='password'
                                type="password" 
                                placeholder=' password' 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password}
                            />
                        
                            <div className='btn-login'>
                                <button>Login</button>
                            </div>
                            <div className='login-error'>
                                <p>{loginError}</p>
                            </div>
                            
                        </>
                    )
                }
            
            </form>
        </nav>
      <Purchases isPurchasesOpen={isPurchasesOpen}/>
    </div>
  )
}

export default NavBar