import UserProfile from '../componentes/userProfile.js'
import bannerSliderItem from '../componentes/bannerSliderITem.js'
import ControlSliderItem from'../componentes/controlSliderItem.js'
import Collection from '../componentes/collection.js'
import MovieCarouselItem from '../componentes/movieCarouselItem.js'
import bannerSliderModule from '../modules/banner-slider.js'
import collectionModule from '../modules/colletions.js'
import headerModule from '../modules/header.js'


  const Home = (data) =>{
  const userProfilesElement = document.querySelector('[data-userMenu="user-profiles"]')
  const bannerSliderElement = document.querySelector('[data-banner="slider"]')
  const controlsSliderElement = document.querySelector('[data-banner="controls"]')
  const Collections = document.querySelector('[data-carousel="colletions"]')
  
  const {banners, categories, movies, userProfiles } = data

  for(const profile of userProfiles){
    userProfilesElement.innerHTML += UserProfile(profile)

  }

  for(const banner of banners){
    bannerSliderElement.innerHTML += bannerSliderItem(banner)
    controlsSliderElement.innerHTML += ControlSliderItem()
  }

  for(const category of categories){
    Collections.innerHTML += Collection(category)
    const collectionsElement = document.querySelector(`[data-id="${category.id}"]`)
    const movieCarouselListElement = collectionsElement.querySelector('[data-carousel="list"]')
    const collectionMovies = movies.filter((movie) => movie.categories.includes(category.id))
      for(const movie of collectionMovies){
        movieCarouselListElement.innerHTML += MovieCarouselItem(movie)
      }
    }
    headerModule().init()
    bannerSliderModule().init()
    collectionModule().init()

}

export default Home