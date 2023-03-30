const sliderItem = document.querySelectorAll('[data-banner="item"]')
const slider = document.querySelector('[data-banner="slider"]')
const btnNext = document.querySelector('[data-banner="btn-next"]')
const btnPrevius  = document.querySelector('[data-banner="btn-previous"]')

const state = {
    mouseDowPosition:0,
    movementPosition:0,
    lastTranslatePosition:0,
    currentSliderPosition: 0,
    currentSlideIndex:0
}
function translateSlide(position){
  state.lastTranslatePosition = position
  slider.style.transform=`translateX(${position}px)`
}
function getCenterPosition(index){
  const slide = sliderItem[index]
  const margin = (document.body.clientWidth - slide.offsetWidth) / 2
  const centerPosition = margin - (slide.offsetWidth * index)
  return centerPosition
}
function AnimateTransition(active){
  if(active){
  slider.style.transition = 'transform .3s'
  }else {
    slider.style.removeProperty('transition')
  }
}

function forwardSlide(){
  if(state.currentSlideIndex< sliderItem.length - 1){
     setVisibleSlide(state.currentSlideIndex +1)
      
  }else {
    setVisibleSlide(state.currentSlideIndex)
      }
}

function backwardSlide(){
 if(state.currentSlideIndex> 0){
     setVisibleSlide(state.currentSlideIndex -1)
  }else {
    setVisibleSlide(state.currentSlideIndex)
      }
}

function setVisibleSlide(index){
  state.currentSlideIndex= index
   const position= getCenterPosition(index)
      AnimateTransition(true)
      translateSlide(position)
}
function preventDefault(event){
    event.preventDefault()
}

//clica no elemento
 function onMouseDown(event, index) {
        const slide = event.currentTarget
        state.mouseDowPosition = event.clientX
        state.currentSliderPosition = event.clientX - state.lastTranslatePosition
        state.currentSlideIndex = index
        AnimateTransition(false)
        slide.addEventListener('mousemove', onMouseMove)
    }

//passa por cima do elemento clicando nele
function onMouseMove(event){
  state.movementPosition= event.clientX - state.mouseDowPosition
  translateSlide(event.clientX - state.currentSliderPosition)
}

//quando vc solto o elemento
function onMouseUp(event){
        const slide = event.currentTarget
        if(state.movementPosition > 150){
          backwardSlide()
        }else if(state.movementPosition < 150){
        forwardSlide()
        }else{
        const calc = getCenterPosition(state.currentSlideIndex)
              translateSlide(calc)
        }
          slide.removeEventListener('mousemove', onMouseMove)
}

//Quando o mouse sai de cima do elemento
function onMouseLeave(event){
   const slide = event.currentTarget
      slide.removeEventListener('mousemove', onMouseMove)
}

function setListeners(){
  btnNext.addEventListener('click', forwardSlide)
  btnPrevius.addEventListener('click', backwardSlide)

  sliderItem.forEach(function(slide, index){
  const link =  slide.querySelector('.banner-slider-link')
      link.addEventListener('click',preventDefault)
      slide.addEventListener('dragstart',preventDefault)
      slide.addEventListener('mousedown', function(event){
        onMouseDown(event, index)
      })
      slide.addEventListener('mouseup',onMouseUp)
      slide.addEventListener('mouseleave',onMouseLeave)
      
    })
}

function init(){
  setVisibleSlide(2)
  setListeners()
}
export default{
  init
}