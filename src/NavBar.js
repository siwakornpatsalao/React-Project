import { useState } from 'react'
import './NavBar.css'
import { CSSTransition } from 'react-transition-group';

export function NavBar(props){

    return(
        <nav className="navbar">
            <ul className='navbar-nav'>
              {props.children}
            </ul>
        </nav>
    )
}

export function NavItem(props){
    const [open,setOpen] = useState(); //ค่าในการเปิด dropdown


    return(
        <li className='nav-item'>
            <p href="#" className='icon-button' onClick={()=>setOpen(!open)}>
                {props.icon}
            </p>

            {open && props.children}
        </li>
    )
}


export function DropDown(){

    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
      }

    function DropDownItem(props){
        return(
            <p href='#' className='menu-item' onClick={()=> props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className='icon-button'>{props.leftIcon}</span>
                {props.children}
                <span className='icon-button'>{props.rightIcon}</span>
            </p>
        )
    }

    return(
        <div className='dropdown' style={{height: menuHeight}}>
            <CSSTransition in={activeMenu==='main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
                <div className='menu'>
                <DropDownItem>My Profile</DropDownItem>
                <DropDownItem leftIcon="😉" rightIcon="👽" goToMenu="settings">Settings</DropDownItem>
                </div>
            </CSSTransition>
            <CSSTransition in={activeMenu==='settings'} unmountOnExit timeout={500} classNames="menu-secondary">
                <div className='menu'>
                <DropDownItem>Settings</DropDownItem>
                </div>
            </CSSTransition>
        </div>
    )
}
