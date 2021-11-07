import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import AuthService from "../../../service/AuthService";

export const Content = ({props, noBtn, reload}) => {
    const {token, username} = useContext(AuthContext);

    const [toSend, setToSend] = useState({
        id: props.id,
        title: props.title,
        body: props.body,
        username: username,
        points: props.points})
    const [isTrue, setIsTrue] = useState(true);

    useEffect(() => {
        setToSend({
            id: props.id,
            title: props.title,
            body: props.body,
            username: username,
            points: props.points})
    }, [toSend])

    const deleteThis = async () => {
        setToSend({
            id: props.id,
            title: props.title,
            body: props.body,
            username: username,
            points: props.points})
        const data = await AuthService("post", "delete", "delete", toSend, "headerAndJSON", token);
        if(data){
            alert(data);
            reload(true);
            console.log(username);
        }
    }

    useEffect(() => {
        if(noBtn === "noBtn"){
            setIsTrue("");
        }
    }, [])

    return(
        <div className="product">
                <p>Username:{props.username}</p>
                <p>Title: {props.title}</p>
                <p>Body: {props.body}</p>
                {isTrue ? <button onClick={() => deleteThis()}>Delete</button>
                :<div></div>
            }
        </div>
    )

}