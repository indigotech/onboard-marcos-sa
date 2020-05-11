import React from 'react';
import './UserListPage.css';

export class UserListPage extends React.Component {
    
    render() {
        return(
            <div className="wrap">
                <div className="card">
                <div className="container">
                    <h4><b>John Doe</b></h4> 
                    <p>john.doe@gmail.com</p> 
                </div>
                </div>
                <div className="card">
                <div className="container">
                    <h4><b>John Doe</b></h4> 
                    <p>john.doe@gmail.com</p> 
                </div>
                </div>
                <div className="card">
                <div className="container">
                    <h4><b>John Doe</b></h4> 
                    <p>john.doe@gmail.com</p> 
                </div>
                </div>
            </div>
        )
    }
  }
