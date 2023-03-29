const sliderItem = document.querySelectorAll('[data-banner="item"]')

function preventDefault(event){
event.preventDefault()
}

function onMouseDown(event){
  const slide = event.currentTarget
      slide.addEventListener('mousemove', onMouseMove)
  
    console.log("adfadasdad")
}
function onMouseMove(event){
    console.log("moveu")
  
}
function onMouseUp(event){
 const slide = event.currentTarget
      slide.removeEventListener('mousemove', onMouseMove)
    console.log("adssssss")
}

function setListeners(){
  sliderItem.forEach(function(slide, index){
  const link =  slide.querySelector('.banner-slider-link')
      link.addEventListener('click',preventDefault)
      slide.addEventListener('dragstart',preventDefault)
      slide.addEventListener('mousedown', onMouseDown) 
      slide.addEventListener('mouseup',onMouseUp)
      slide.addEventListener('mousemove', onMouseMove)
    })
}

function init(){
 setListeners()
}
export default{
  init
}