const headerModule = () =>{
const header = document.querySelector('[data-header]')
const openNAvSubMenu = document.querySelector('[data-open-navSubMenu]')
const navSubMenu = document.querySelector('[data-navSubMenu]')
const userMenu = document.querySelector('[data-usermenu]')
const openUserMenu = document.querySelector('[data-open-usermenu]')



function onWindowScroll(){
    if(window.scrollY > 20){
      header.style.backgroundColor = '#0C0D14'
    }else{
      header.style.backgroundColor = 'transparent'
    }
  }

function onTouchOpenNavSubMenu(event){
  event.preventDefault()
  navSubMenu.classList.toggle('active')
}

function onTouchOpenUserMenu(event){
  event.preventDefault()
  userMenu.classList.toggle('active')
}

function setListeners(){
  window.addEventListener('scroll',onWindowScroll)
  openNAvSubMenu.addEventListener('touchstart', onTouchOpenNavSubMenu)
  openUserMenu.addEventListener('touchstart', onTouchOpenUserMenu)
}

function init(){
  setListeners()
}

return{
  init
}
}

export default headerModule