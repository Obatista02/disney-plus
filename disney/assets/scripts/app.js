import { getHomeContent } from "./services/getHomeContent.js";

getHomeContent()
.then((response) =>{
  console.log( 'apps.js', response);
})
.catch((error) =>{
  console.log(error)
})