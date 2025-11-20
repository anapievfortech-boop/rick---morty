import '../App.css'
import headerLogo from '../assets/logo-black 1.svg'

export default function Header() {
    return (
        <header className="header">
            <div className="wrapper">
                <img className='header-logo' src={headerLogo} alt="header-logo" />
                <nav>
                    <ul className='header-list'>
                        <a className='nav-list' href="">
                            <li >
                                Characters
                            </li>
                        </a>
                        <a className='nav-list' href="">

                            <li>
                                Locations
                            </li>
                        </a>
                        <a className='nav-list' href="">
                            <li>
                                Episodes
                            </li>
                        </a>
                    </ul>
                </nav>
            </div>
        </header>
    )
}