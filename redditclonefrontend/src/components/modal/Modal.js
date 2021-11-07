import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import AuthService from '../../service/AuthService';
import { AuthContext } from '../../context/AuthProvider';

export const Modal = ({open, onClose, reload}) => {
    const { token, username } = useContext(AuthContext);

    const [info, setInfo] = useState({title: "", body: "", username: username});

    const changeInfo = (e) => {
        setInfo({...info, [e.target.name]: e.target.value});
    }

    const saveProduct = async (e) => {
        e.preventDefault();
        const data = await AuthService("post", "create", "put", info, "headerAndJSON", token);
        if(data){
            reload(true);
        }
    }

    if(!open){
        return null;
    }

    return ReactDOM.createPortal(
        <div>
            <div className="overlay" onClick={onClose}></div>
            <div className="modal">
                <h2>New Product</h2>
                <button className="btnBack" onClick={onClose}>Back</button>
                <div>
                    <form onSubmit={saveProduct}>
                        <input type="title" name="title" onChange={changeInfo} placeholder="Title" />
                        <input type="text" name="body" onChange={changeInfo} placeholder="Body" />
                        <button type="submit" >Submit</button>
                    </form>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}