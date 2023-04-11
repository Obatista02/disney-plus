const collections = document.querySelectorAll('[data-carousel="colletion"]')
const collectionData = []
let currentCollectionIndex = 0
let itemsPerSlide = 5

const preventDefault = (event) =>{
  event.preventDefault()
}

const translateSlide = (position) => {
  const { state, carouselList } = collectionData[currentCollectionIndex]
  state.lastTranslatePosition = position
  carouselList.style.transform = `translateX(${position}px)`
}

const getCenterPosition = (slideIndex) => {
  const { state, carouselItems } = collectionData[currentCollectionIndex]
  const item = carouselItems[state.currentItemIndex]
  const itemWidth = item.offsetWidth
  const bodyWidth = document.body.clientWidth
  const slideWidth = itemWidth * itemsPerSlide
  const margin = (bodyWidth - slideWidth) /2
  return margin - (slideWidth * slideIndex)
}
const getLastSlideIndex = () =>{
  const { carouselItems } = collectionData[currentCollectionIndex]

  const lastItemIndex = carouselItems.length - 1
  return Math.floor(lastItemIndex / itemsPerSlide)
}

  const AnimateTransition = (active) =>{
  const { carouselList } = collectionData[currentCollectionIndex]

    if(active){
      carouselList.style.trnsition = 'transform .3s'
    }else{
      carouselList.style.removeProperty('transition')
    }
  }

  const activeCurrentItems = () =>{
    const { carouselItems , state}= collectionData[currentCollectionIndex]
    carouselItems.forEach((item, itemIndex) =>{
      item.classList.remove('active')
      const  firstItemIndex = state.currentSlideIndex * itemsPerSlide
      if(itemIndex>= firstItemIndex && itemIndex < firstItemIndex + itemsPerSlide){
          item.classList.add('active')
      }
    })
  }

const setArrowButtonsDisplay = () => {
  const { btnPrevius, btnNext, state } = collectionData[currentCollectionIndex]

    if(state.currentSlideIndex === 0){
      btnPrevius.style.display = 'none'
    }else{
      btnPrevius.style.display = 'block'
    }
    if(state.currentSlideIndex === getLastSlideIndex()){
      btnNext.style.display = 'none'
    }else{
      btnNext.style.display = 'block'
    }
}

const setVisibleSlide= (slideIndex) =>{
  const { state} = collectionData[currentCollectionIndex]
    state.currentSlideIndex = slideIndex
    const centerPosition = getCenterPosition(slideIndex)
    activeCurrentItems()
    setArrowButtonsDisplay ()
    AnimateTransition(true)
    translateSlide(centerPosition)
  }

const backwardSlide = () => {
  const { state } = collectionData[currentCollectionIndex]
  if(state.currentSlideIndex > 0){
    setVisibleSlide(state.currentSlideIndex -1)
  }else{
    setVisibleSlide(state.currentSlideIndex)
  }
}
const forwardSlide = () => {
  const { state } = collectionData[currentCollectionIndex]
  const lastSlideIndex = getLastSlideIndex()
  if(state.currentSlideIndex < lastSlideIndex){
    setVisibleSlide(state.currentSlideIndex +1)
  }else{
    setVisibleSlide(state.currentSlideIndex)
  }
}

const onMouseDown = (event,itemIndex) => {
  const { state} = collectionData[currentCollectionIndex]
    const item = event.currentTarget
    state.currentItemIndex = itemIndex
    state.MouseDownPosition = event.clientX
    state.currentSlidePosition = event.clientX - state.lastTranslatePosition
    AnimateTransition(false)
    item.addEventListener('mousemove', onMouseMove)
}
const onMouseMove = (event) => {
  const { state} = collectionData[currentCollectionIndex]
    state.movement = event.clientX - state.MouseDownPosition
    const position = event.clientX - state.currentSlidePosition 
    translateSlide(position)

}
const onMouseUp = (event) => {
  const { state} = collectionData[currentCollectionIndex]
      if(state.movement > 150){
        backwardSlide()
      }else if(state.movement < -159){
        forwardSlide()
      }else {
        setVisibleSlide(state.currentSlideIndex)
      }
    state.movement = 0 
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)
}
const onMouseLeave = (event) => {
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)
}

const onTouchStart =(event, itemIndex) =>{
  const item = event.currentTarget
  item.addEventListener('touchmove',onTouchMove)
  event.clientX = event.touches[0].clientX
  onMouseDown(event, itemIndex)
}
const onTouchMove =(event) =>{
  event.clientX = event.touches[0].clientX
  onMouseMove(event)
}
const onTouchEnd =(event) =>{
 const item = event.currentTarget
  item.removeEventListener('touchmove',onTouchMove)
  onMouseUp(event)
}

const insertCollectionData = (collections) =>{
  collectionData.push(
    {
        carouselList:  collections.querySelector('[data-carousel="list"]'),
        carouselItems: collections.querySelectorAll('[data-carousel="item"]'),
        btnPrevius: collections.querySelector('[data-carousel="btn-previous"]'),
        btnNext: collections.querySelector('[data-carousel="btn-next"]'),

        state: {
          MouseDownPosition: 0,
          movement: 0,
          lastTranslatePosition: 0,
          currentSlidePosition:0,
          currentItemIndex:0,
          currentSlideIndex:0
}
}
  )
}

const setItemsPerSlide = () =>{
    if(document.body.clientWidth < 1024){
      itemsPerSlide = 2
      return
    }
    itemsPerSlide = 5
}

const setWindowResizeListener= () => {
  let resizeTimeOut
  window.addEventListener('resize', function(event){
      clearTimeout(resizeTimeOut)
      resizeTimeOut = setTimeout(function(){
        setItemsPerSlide()
        collections.forEach((_, collectionIndex)=> {
          currentCollectionIndex = collectionIndex
          setVisibleSlide(0)
        })
      }, 1000)
    })
}

const setListeners = (collectionIndex) =>{
  const {btnNext,btnPrevius, carouselItems} = collectionData[collectionIndex]
  btnNext.addEventListener('click',() => {
    currentCollectionIndex = collectionIndex
    forwardSlide()
    })
  btnPrevius.addEventListener('click', () => {
    currentCollectionIndex = collectionIndex
    backwardSlide()
    })

  carouselItems.forEach((item, itemIndex) => {
    const link = item.querySelector('.movie-carousel-link')
    link.addEventListener('click', preventDefault)
    item.addEventListener('dragstart', preventDefault)
    item.addEventListener('mousedown', (event) => {
    currentCollectionIndex = collectionIndex
      onMouseDown(event, itemIndex)

      })
    item.addEventListener('mouseup',onMouseUp)
    item.addEventListener('mouseleave',onMouseLeave)
    item.addEventListener('touchstart', function(event){
        currentCollectionIndex = collectionIndex
        onTouchStart(event, itemIndex)
      })
      item.addEventListener('touchend', onTouchEnd)
  })
}
//arrow functions
const init = () =>{
    setWindowResizeListener()
    setItemsPerSlide()
    collections.forEach((collection, collectionIndex) => {
          currentCollectionIndex = collectionIndex
          insertCollectionData(collection)
          setListeners(collectionIndex)
          setVisibleSlide(0)
    })  
}
export default{
  init
}