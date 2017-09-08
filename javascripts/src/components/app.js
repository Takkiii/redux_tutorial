class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <UserList />
        <MessagesBox />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)