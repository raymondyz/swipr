import { useState } from "react"
import { Pages } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"
//For the purposes of front-end testing, we will just make sure it actually looks correct.


function MessagingPage({ setPage, auth: {user, setUser} }) {

    const handleChange = () => {
        setTexts;
    }


    const {name, setName} = useState("");
    const {texts, setTexts} = useState(true);
    return (
        <div className="textbox">
            <Title />
            <Messages />
            <InputMessage />
            <form
            className="send-message">
            <input
                
                type="text"
                value={texts.value}
                onChange={handleChange}
            />
            </form>
        </div>
    )
}

export default MessagingPage