import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api'

const CountryPicker = (props) => {

    const [countries, setCountries] = useState([])

    useEffect(() => {
        const fetchCountriesAPI = async () => {
            setCountries(await fetchCountries())
        }
        fetchCountriesAPI()
    }, [])

    return (
        <div className={styles.container}>
            <FormControl className={styles.formControl}>
                <NativeSelect
                    defaultValue=""
                    onChange={props.onCountryChange}
                >
                    <option value="">Global</option>
                    {
                        countries.map((country, index) => {
                            return (
                                <option key={index} value={country.name}>{country.name}</option>
                            )
                        })
                    }
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default CountryPicker
