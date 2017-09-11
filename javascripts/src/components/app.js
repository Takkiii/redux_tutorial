class App extends React.Component {

  constructor() {
    super()
    this.data = {
      users: [
        {
          id: 2,
          name: 'にんじゃわんこ',
          profilePicture: 'https://pbs.twimg.com/media/CvhteXTVIAAzHDw.jpg',
        },
        {
          id: 3,
          name: 'はらぺこ君',
          profilePicture: 'https://pbs.twimg.com/profile_images/882917567743918080/pzpkX5DS_400x400.jpg',
        },
      ],
      currentUser: {
        id: 1,
        name: 'Takkiii',
        profilePicture: 'https://pbs.twimg.com/profile_images/899990905855156224/WVjZoIcl_bigger.jpg',
      },
    }
  }

  render() {
    const {
      users,
      currentUser
    } = this.data
    return (
      <div className='app'>
        <Header />
        <UserList users={users} currentUser={currentUser}/>
        <MessagesBox currentUser={currentUser}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)