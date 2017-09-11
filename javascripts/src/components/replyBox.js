class ReplyBox extends React.Component {

  constructor() {
    super()
    this.state = {
      value: ""
    }
  }

  handleChangeInput(e) {
    this.setState({value: e.target.value})
  }

  handleKeyDown(e) {
    // MessageStore的なものを用意する
    // いつ？
    // 誰が？
    // 誰に？
    // 同じデータを使いたい
    // 同じデータを使う = データが更新されたらアプリケーションの全てのデータが同期される必要
    // redux登場 reducer, action, store, connectなどの作成
    if (e.key === 'Enter') {
      console.log('pressed enter!!')
    }
  }

  render() {
    const {value} = this.state
    return (
      <div className='reply-box'>
        <input
          className='reply-box__input'
          placeholder='メッセージを入力'
          value={value}
          onChange={this.handleChangeInput.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
        <span className='reply-box__tip'>Enterで送信</span>
      </div>
    )
  }
}