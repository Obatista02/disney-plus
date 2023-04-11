const movieCarouselItem = (props) =>{
    return `
  <li class="movie-carousel-item" data-carousel="item" data-id="${props.id}">
      <a href="${props.slug}" class="movie-carousel-link">
      <img src="${props.imageCover}" alt="${props.title}"
      class="movie-carousel-cover"></a>
  </li>
    `
}

export default movieCarouselItem