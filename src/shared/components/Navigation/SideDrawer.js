import React from 'react';
import reactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './SideDrawer.css'

const SideDrawer = props =>{
    
        const content=(
         <CSSTransition 
            in={props.show} 
            timeout={200}
            classNames='slide-in-left'
            mountOnEnter
            unmountOnExit>  
              <aside className='side-drawer' onClick={props.onClick}> {props.children}</aside>
         </CSSTransition> 
        )

        return reactDom.createPortal(content, document.getElementById('drawer-hook'))
}
export default SideDrawer ;