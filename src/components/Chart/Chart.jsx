import React from 'react'
import { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, recovered, deaths }, selectedCountry }) => {

    const [dailyData, setDailyData] = useState({})

    useEffect(() => {
        const fetchAPIData = async () => {
            setDailyData(await fetchDailyData())
        }
        fetchAPIData()
    }, [])

    const LineChart = () => {
        return (
            dailyData.length ?
                <Line
                    data={{
                        labels: dailyData.map(dailyData => dailyData.date),
                        datasets: [
                            {
                                data: dailyData.map(dailyData => dailyData.confirmed),
                                label: "Infected",
                                borderColor: "blue",
                                fill: true
                            },
                            {
                                data: dailyData.map(dailyData => dailyData.deaths),
                                label: "Deaths",
                                borderColor: "red",
                                backgroundColor: 'rgba(255,0,0,0.5)',
                                fill: true
                            }]
                    }}
                /> :
                null
        )
    }


    const BarChart = () => {
        return (
            confirmed ?
                <Bar
                    data={{
                        labels: ["Infected", "Recovered", "Deaths"],
                        datasets: [
                            {
                                label: "People",
                                backgroundColor: ['rgba(0,0,255, 0.5)', 'rgba(0,255,0, 0.5)', 'rgba(255,0,0, 0.5)'],
                                data: [confirmed.value, recovered.value, deaths.value]
                            }]
                    }
                    }
                    options={
                        {
                            legend: { display: false },
                            title: { display: true, text: `Current state in ${selectedCountry}` }
                        }
                    }
                /> : null
        )
    }
    return (
        <div className={styles.container}>
            {selectedCountry ? <BarChart /> : <LineChart />}
        </div>
    )
}

export default Chart