const UserProfile = (props) =>{
    return ` 
    <li class="user-menu-item"b data-id="${props.id}">
      <div class="user-profile ">
        <img src="${props.avatar}" class="user-profile-avatar">
        <span class="user-profile-title">${props.name}</span>
      </div>
    </li>
    `
}

export default UserProfile  