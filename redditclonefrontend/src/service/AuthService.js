const AuthService = async (route, action, method, data, form, token) => {
    const _unAutherized = {
        Authed: false
    };

    const _method = (method, form, token) => {
        if(method){
            switch (form) {
                case "JSON":
                    return{
                        method: method,
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(data)
                    }
                case "header":
                    return{
                        method: method,
                        headers: {"Content-Type": "application/json",
                                username: data.username,
                                password: data.password
                        }
                    }
                case "headerAndJSON":
                    return{
                        method: method,
                        headers: {"Content-Type": "application/json",
                                token: token
                        },
                        body: JSON.stringify(data)
                    }
                default:
                    return{
                        method: method,
                        headers: {"Content-Type": "application/json",
                                token: token
                        },
                        body: data
                    }
            }
        }
        return undefined;
    }

    try {
        const res = await fetch(`/${route}/${action}`, _method(method, form, token));
        if(res !== null){
            if(res.status === 200 || res.status === 201){
                const contentType = res.headers.get("content-type");
                if(contentType.indexOf("application/json") !== -1){
                    const data = await res.json();
                    return data;
                }else{
                    const data = await res.text();
                    return data;
                }
            }
        }else{
            return _unAutherized;
        }
    } catch (error) {
        return {error};
    }
};
export default AuthService;