class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      openChatID: 2,
      messageList: [
        {
          lastMessage: {
            contents: 'Hey, what\'s up?',
            from: 1,
            timestamp: 1424469794000,
          },
          lastAccess: {
            recipient: 1424469794050,
            currentUser: 1424469794080,
          },
          user: {
            profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
            id: 2,
            name: 'Ryan Clark',
            status: 'online',
          },
        },
        {
          lastMessage: {
            contents: 'Want a game of ping pong?',
            from: 3,
            timestamp: 1424352522000,
          },
          lastAccess: {
            recipient: 1424352522000,
            currentUser: 1424352522080,
          },
          user: {
            read: true,
            profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
            name: 'Jilles Soeters',
            id: 3,
            status: 'online',
          },
        },
        {
          lastMessage: {
            contents: 'Please follow me on twitter I\'ll pay you',
            timestamp: 1424423579000,
            from: 4,
          },
          lastAccess: {
            recipient: 1424423579000,
            currentUser: 1424423574000,
          },
          user: {
            name: 'Todd Motto',
            id: 4,
            profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
            status: 'online',
          },
        },
      ],
    }
  }
  render() {
    this.state.messageList.sort((a, b) => {
      if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
        return -1
      }
      if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
        return 1
      }
      return 0
    })

    const messages = this.state.messageList.map((message, index) => {
      const date = getNiceDate(message.lastMessage.timestamp)

      var statusIcon
      if (message.lastMessage.from !== message.user.id) {
        statusIcon = (
          <i className='fa fa-reply user-list__item__icon' />
        )
      }
      if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
        statusIcon = (
          <i className='fa fa-circle user-list__item__icon' />
        )
      }

      var isNewMessage = false
      if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
        isNewMessage = message.lastMessage.from !== this.state.messageList[0].user.id
      }

      const itemClasses =
        `user-list__item
        clear
        ${isNewMessage && 'user-list__item--new'}
        ${this.state.openChatID === message.user.id && 'user-list__item--active'}
        `

      return (
        <li
          className={itemClasses}
          key={ message.user.id }
        >
          <div className='user-list__item__picture'>
            <img src={ message.user.profilePicture } />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { message.user.name }
              <abbr className='user-list__item__timestamp'>
                { date }
              </abbr>
            </h4>
            <span className='user-list__item__message'>
              { statusIcon } { message.lastMessage.contents }
            </span>
          </div>
        </li>
      )
    }, this)
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { messages }
        </ul>
      </div>
    )
  }
}

const getShortDate = (timestamp) => {
  const distance = Math.round((+new Date() - timestamp) / 60000)
  const date = new Date(timestamp)

  const hour = (`0${date.getHours()}`).slice(-2)
  const minutes = (`0${date.getMinutes()}`).slice(-2)

  if (distance > 2879) {
    if (distance > 14567) {
      return this.getNiceDate(timestamp)
    } else {
      return `Yesterday at ${hour}:${minutes}`
    }
  } else {
    return `at ${hour}:${minutes}`
  }
}

const getNiceDate = (timestamp) => {
  const defaultString = '%d %f%y at %h:%i'

  const language = {
    0: 'less than a minute ago',
    1: '1 minute ago',
    59: '%distance minutes ago',
    118: 'an hour ago',
    1439: '%r hours ago',
    2879: 'Yesterday at %h:%',
    14567: '%l at %h:%i',
  }
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const date = new Date(timestamp)
  const distance = Math.round((+new Date() - timestamp) / 60000)

  let string
  for (const i in language) {
    if (distance < i) {
      string = language[i]

      break
    }
  }

  const hour = (`0${date.getHours()}`).slice(-2)
  const minutes = (`0${date.getMinutes()}`).slice(-2)
  const day = days[date.getDay()]
  const month = months[date.getMonth()]

  let year = date.getFullYear()
  if (new Date().getFullYear() === year) {
    year = ''
  }

  if (string) {
    const hoursAgo = Math.round(distance / 60)

    return string.replace(/%distance/i, distance)
      .replace(/%r/i, hoursAgo)
      .replace(/%h/i, hour)
      .replace(/%i/i, minutes)
      .replace(/%l/i, day)
  }

  return defaultString.replace(/%d/i, day)
    .replace(/%f/i, month)
    .replace(/%y/i, year)
    .replace(/%h/i, hour)
    .replace(/%i/i, minutes)
}