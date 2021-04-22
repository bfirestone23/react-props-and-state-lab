import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleTypeChange = e => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  fetchPets = () => {
    let endpoint = "/api/pets"

    if (this.state.filters.type !== "all") {
      endpoint += `?type=${this.state.filters.type}`
    }

    fetch(endpoint)
    .then(resp => resp.json())
    .then(pets => this.setState({ pets: pets }))
  }

  onAdoptPet = (petId) => {
    let newPets = this.state.pets.map(pet => {
      return pet.id == petId ? {...pet, isAdopted: true} : pet
    })
    this.setState({ pets: newPets })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.fetchPets} onChangeType={this.handleTypeChange} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
