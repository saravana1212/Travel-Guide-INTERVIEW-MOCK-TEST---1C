import {Component} from 'react'
import './App.css'
import Loader from 'react-loader-spinner'
import TravelGuide from './components/TravelGuide'

// Replace your code here
class App extends Component {
  state = {isLoading: true, dataList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({isLoading: false, dataList: updatedData})
    }
  }

  loadingView = () => (
    <div className="loader-con" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" hight={50} width={50} />
    </div>
  )

  successView = () => {
    const {dataList} = this.state

    return (
      <ul className="list-con">
        {dataList.map(each => (
          <TravelGuide key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="main-con">
        <h1 className="heading">Travel Guide</h1>
        <div className="jp">
          {isLoading === true ? this.loadingView() : this.successView()}
        </div>
      </div>
    )
  }
}

export default App
