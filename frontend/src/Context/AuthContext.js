import { createContext, useContext , useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

const userToken = localStorage.getItem("userToken");
const user = localStorage.getItem("user")

const [token, setToken] = useState(userToken)


return (
    <AuthContext.Provider value={{userToken , user , setToken , token}}>
        {children}
    </AuthContext.Provider>
)

}


const useAuth = () =>useContext(AuthContext);

export {useAuth , AuthProvider }


