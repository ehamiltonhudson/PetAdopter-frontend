import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Animated } from 'react-animated-css';
import PetCard from './PetCard';

const apiPetsAddress = 'http://localhost:3000/api/v1/pets'

class PetContainer extends Component {

  componentDidMount = () => {
    fetch(apiPetsAddress, {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem('jwt')
      }
    })
    .then(response => response.json())
    .then(petData => {
      this.props.setAllPets(petData)
    })
  }

  handleAdoptedStatus = (userId, petId) => {
    let pet = this.props.pets.find(pet => pet.id === petId)
    if (pet.adopted === true)  {
      return (
        <div>
          <p className="adopted" style={{"fontSize" : "20px"}}>Adopted!</p>
        </div>
      )
    }
  }

  render() {
    let petList
    if (this.props.checkboxClick) {
      petList = this.props.pets.map((pet) => {
        if (pet.animal === "Cat" && this.props.animalCheck==="Cats"){
          return <PetCard key={pet.id} pet={pet}
            currentUser={this.props.currentUser}
            pets={this.props.pets}
            myPets={this.props.myPets}
            myAdoptedPets={this.props.myAdoptedPets}
            handleAdoptedStatus={this.handleAdoptedStatus}
            handleMyPets={this.props.handleMyPets}
            removeFromMyPets={this.props.removeFromMyPets}
               />
        }
        else if (pet.animal === "Dog" && this.props.animalCheck==="Dogs"){
          return <PetCard key={pet.id} pet={pet}
            currentUser={this.props.currentUser}
            pets={this.props.pets}
            myPets={this.props.myPets}
            myAdoptedPets={this.props.myAdoptedPets}
            handleAdoptedStatus={this.handleAdoptedStatus}
            handleMyPets={this.props.handleMyPets}
            removeFromMyPets={this.props.removeFromMyPets}
               />
        }
        else if (pet.animal === "Rabbit" && this.props.animalCheck==="Rabbits"){
          return <PetCard key={pet.id} pet={pet}
            currentUser={this.props.currentUser}
            pets={this.props.pets}
            myPets={this.props.myPets}
            myAdoptedPets={this.props.myAdoptedPets}
            handleAdoptedStatus={this.handleAdoptedStatus}
            handleMyPets={this.props.handleMyPets}
            removeFromMyPets={this.props.removeFromMyPets}
               />
        }
      })
    } else {
      petList = this.props.pets.map((pet) => {
        return <PetCard key={pet.id} pet={pet}
          currentUser={this.props.currentUser}
          pets={this.props.pets}
          myPets={this.props.myPets}
          myAdoptedPets={this.props.myAdoptedPets}
          handleAdoptedStatus={this.handleAdoptedStatus}
          handleMyPets={this.props.handleMyPets}
          removeFromMyPets={this.props.removeFromMyPets}
          />
      })
    }
    return (
      <div className="ui contianer">
        <br/>
        <Link to="profile" className="linkInPetsMain">My Pets</Link>
        <span style={{"fontSize": "25px", "color": "#404a5d", "fontWeight": "bolder"}}> | </span>
        <Link to='/' className="linkInPetsMain" onClick={this.props.logout}>Logout</Link>
        <h1 className="welcomeHeader">Welcome {this.props.currentUser.name}</h1>
        <Animated animationIn="tada" animationOut="flash" isVisible={true}>
          <h1 className="petsHeader"> ❤︎ Pets! ❤︎ </h1>
        </Animated>
        <div className="ui header">
          <select className="ui dropdown" onChange={this.props.handleSorted}>
            <option value="all">Sort </option>
            <option value="name"> Sort by Name </option>
          </select>
          <div>
            <input name= "Cats" className="ui checkbox" onChange={this.props.handleFilter} type="checkbox" />
            <label className="toggle" htmlFor="Cats">Cats Only</label>
          </div>
          <div>
            <input name= "Dogs" className="ui checkbox" onChange={this.props.handleFilter} type="checkbox" />
            <label className="toggle" htmlFor="Dogs">Dogs Only</label>
          </div>
          <div>
            <input name= "Rabbits" className="ui checkbox" onChange={this.props.handleFilter} type="checkbox" />
            <label className="toggle" htmlFor="Rabbits">Rabbits Only</label>
          </div>
        </div>
        <br></br>
        <div className="ui page grid" style={{"justifyContent": "center"}}>
          {petList}
        </div>
      </div>
    )
  }
}

export default PetContainer;
