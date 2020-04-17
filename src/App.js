import React, { Component } from 'react'
import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData } from './api'
import covidImg from '../src/images/covid19.png'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            covidData: {},
            selectedCountry: ""
        }
    }

    async componentDidMount() {
        const data = await fetchData()
        this.setState({ covidData: data })
    }

    onCountryChange = async (e) => {
        let country = e.target.value
        const data = await fetchData(country)
        this.setState({ covidData: data, selectedCountry: country })
    }


    render() {
        const { covidData } = this.state
        return (
            <div className={styles.container}>
                <img src={covidImg} className={styles.image} alt="COVID19" />
                <Cards data={covidData} />
                <CountryPicker onCountryChange={this.onCountryChange} />
                <Chart data={covidData} selectedCountry={this.state.selectedCountry} />
            </div>
        )
    }
}
