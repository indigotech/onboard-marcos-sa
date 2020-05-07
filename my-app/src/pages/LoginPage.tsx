import React from 'react';
import './LoginPage.css';

const LoginPage = () => (
    <div className="page"> 
        <div className="login">
            <h1>
            Entrar na Teqtile
            </h1>
            <div className="forms">
                <form className="emailform">
                    <div className="emailspan"><span>Email</span></div>
                    <input type="text" name="email" className="email" ></input>
                    </form>
                    <form className="pwform">
                    <div className="pwspan"><span>Senha</span></div>
                    <input type="text" name="email" className="password" ></input>
                </form>
            </div>
            <button type="button" className="loginbt">Entrar</button>
        </div>
    </div>   
);

export default LoginPage;