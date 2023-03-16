import { useContext, useState } from "react"
import { FiChevronDown } from "react-icons/fi"
import { AuthContext } from "../../Contexts/AuthContext"
import { Link } from "react-router-dom"
import "./style.css"
function Header() {
    const [userMenu, setUserMenu] = useState(false)
    const { handleLogOut, userName } = useContext(AuthContext)
    const handleBtnUser = () => {
        setUserMenu(prev => !prev)
    }
    return (
        <header>
            <nav>
                <ul className="user_container">
                    <div className="userInfo">
                        <img src="https://pbs.twimg.com/profile_images/1551715512027123713/EP4XL1HU_400x400.jpg" alt="Profile Picture" />
                        <span>{userName}</span>
                    </div>
                    <div className="btnUser">
                        <FiChevronDown onClick={handleBtnUser} />
                        <ul className={`userOptions ${userMenu ? "show" : ""}`}>
                            <li onClick={handleBtnUser}><Link to="perfil">Perfil</Link></li>
                            <li onClick={handleBtnUser}><Link to="users">Usuários</Link></li>
                            <li onClick={handleLogOut}>Sair</li>
                        </ul>
                    </div>
                </ul>
            </nav>
        </header>
    )
}
export default Header