class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {openChatID: 2}
  }

  handleClickUser(user) {
    // openChatIdは他でも使いたいのでStoreで管理したい
    this.setState({openChatID: user.id})
  }

  render() {
    const {users, currentUser} = this.props
    const {openChatID} = this.state
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          {users.map((user) => {
            return (
              <li
                key={user.id}
                onClick={this.handleClickUser.bind(this, user)}
                className={`user-list__item clear ${openChatID === user.id && 'user-list__item--active'}`}
              >
                <img
                  src={user.profilePicture}
                  className='user-list__item__picture'
                />
                <h4 className='user-list__item__details user-list__item__name'>{user.name}</h4>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
