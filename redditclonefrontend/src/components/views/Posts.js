import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Modal } from '../modal/Modal';
import AuthService from '../../service/AuthService';
import { Content } from "./subviews/Content"

export const Posts = () => {
    const { authenticated, setAuthenticated, token, setToken, setUsername} = useContext(AuthContext);

    const [toOpen, setToOpen] = useState(false);
    const [productsRetrieved, setProductsRetrieved] = useState(true)
    const [fullList, setFullList] = useState([]); 

    const logout = () => {
        setAuthenticated(false);
        setToken(false);
        setUsername("");
    }

    const getProducts = async () => {
        const data = await AuthService("post", "all", "get", null);
        setFullList(data);
        setProductsRetrieved(false);
    }

    useEffect(() => {
        if(productsRetrieved){
            getProducts();
        }
    }, [productsRetrieved])

    return(
        <div className="posts">
            {
                token ? <div>
                    <button className="btnToOpen" onClick={() => {setToOpen(true)}} >New Product</button>
                    <Modal open={toOpen} onClose={() => setToOpen(false)} reload={setProductsRetrieved} />
                </div> : <div></div>
            }
            
            <button onClick={logout} >Logout</button>
            <div>
                {fullList.map((item, i) => {
                    return(
                        <div key={i}>
                            <Content key={"post" + i} props={item} reload={setProductsRetrieved} ></Content>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}