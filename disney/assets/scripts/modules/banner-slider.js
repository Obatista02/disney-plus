const bannerSliderModule= () =>{
  const sliderItem = document.querySelectorAll('[data-banner="item"]')
const slider = document.querySelector('[data-banner="slider"]')
const btnNext = document.querySelector('[data-banner="btn-next"]')
const btnPrevius  = document.querySelector('[data-banner="btn-previous"]')
const btnControls = document.querySelectorAll('[data-banner="btn-control"]')
const imgTitles = document.querySelectorAll('[data-banner="img-title"]')

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

function activeControlButton(index){
    btnControls.forEach(function(item){
      item.classList.remove('active')
    })
    const btnControl = btnControls[index]
    btnControl.classList.add('active')

}

function activeImageTitle(index){
    imgTitles.forEach(function(item){ 
      item.classList.remove('active')
    })
    const imgTitle = imgTitles[index]
    imgTitle.classList.add('active')

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

function setArrowButtonsDisplay (){
    if(state.currentSlideIndex === 0){
      btnPrevius.style.display = 'none'
    }else{
      btnPrevius.style.display = 'block'
    }
    if(state.currentSlideIndex === sliderItem.length -1 ){
      btnNext.style.display = 'none'
    }else{
      btnNext.style.display = 'block'
    }
}
  const activeCurrentSlides = () =>{
    sliderItem.forEach((slide, slideIndex) =>{
      slide.classList.remove('active')
      if(slideIndex == state.currentSlideIndex){
          slide.classList.add('active')
      }
    })
  }


function setVisibleSlide(index){
  state.currentSlideIndex = index
   const position= getCenterPosition(index)
    activeCurrentSlides()
    setArrowButtonsDisplay()
    activeControlButton(index)
    AnimateTransition(true)
    activeImageTitle(index)
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
        const movementQtd = event.type.includes('touch') ? 50 : 150
        if(state.movementPosition > movementQtd){
          backwardSlide()
        }else if(state.movementPosition < movementQtd){
        forwardSlide()
        }else{
      setVisibleSlide(state.currentSlideIndex)
        }
        state.movementPosition = 0
          slide.removeEventListener('mousemove', onMouseMove)
}

//Quando o mouse sai de cima do elemento
function onMouseLeave(event){
   const slide = event.currentTarget
      slide.removeEventListener('mousemove', onMouseMove)
}

function onControlButtonClick(event, index){
    setVisibleSlide(index)
}

function onTouchStart(event, index){
  const slide = event.currentTarget
  slide.addEventListener('touchmove',onTouchMove)
  event.clientX = event.touches[0].clientX
  onMouseDown(event, index)
}
function onTouchMove(event){
  event.clientX = event.touches[0].clientX
  onMouseMove(event)
}
function onTouchEnd(event){
 const slide = event.currentTarget
  slide.removeEventListener('touchmove',onTouchMove)
  onMouseUp(event)
}

function onResizeWindow(){
   setVisibleSlide(state.currentSlideIndex)

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

      btnControls[index].addEventListener('click', function(event) {
        onControlButtonClick(event, index)
      })
      slide.addEventListener('touchstart', function(event){
        onTouchStart(event, index)
      })
      slide.addEventListener('touchend', onTouchEnd)
    })
    let resizeTimeOut;

    window.addEventListener('resize', function(event){
      clearTimeout(resizeTimeOut)
      resizeTimeOut = setTimeout(function(){
        onResizeWindow()
      },1000)
    })
}

function init(){
  setVisibleSlide(2)
  setListeners()
}
return{
  init
}
}
export default bannerSliderModule

