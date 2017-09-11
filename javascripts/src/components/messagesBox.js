class MessagesBox extends React.Component {

  constructor() {
    super()
    this.state = {
      messages: [
        'HelloReact'
      ]
    }
  }

  render() {
    const {currentUser} = this.props
    const {messages} = this.state
    // openChatIdとかも渡して、それによって表示するメッセージを分けたい
    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          {messages.map((message) => {
            return (
              <li
                key={`${currentUser.id}-${message}`}
                className='message-box__item clear message-box__item--from-current'
              >
                <div className='message-box__item__contents'>{message}</div>
              </li>
            )
          })}
        </ul>
        <ReplyBox />
      </div>
    )
  }
}