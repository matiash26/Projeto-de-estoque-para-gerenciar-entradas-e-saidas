import { Chart as Chartjs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js"
import { BiDollar, BiTrendingUp, BiDetail } from "react-icons/bi"
import { useCallback, useEffect, useState } from "react"
import { Bar, Doughnut } from 'react-chartjs-2'
import Cards from "../../components/Cards"
import api from "../../services/Api"
import "./style.css"
function Statistics() {
    const [statistic, setStatistic] = useState({})
    const [filter, setFilter] = useState("day")
    Chartjs.register(
        ArcElement,
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend,
    )
    const salesHistory = {
        labels: statistic?.graph?.map(({ mes }) => mes),
        datasets: [
            {
                label: 'lucro R$',
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                borderColor: 'rgb(32, 134, 55)',
                data: statistic?.graph?.map(({ lucro }) => lucro)
            }
        ]
        
    }
    const productData = {
        labels: statistic?.products?.map(({ produto }) => produto),
        datasets: [
            {
                label: 'Top produtos R$',
                data: statistic?.products?.map(({ lucro }) => lucro),
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            }
        ]
    }
    const cardsData = {
        ganhos: statistic?.revenue?.[0]?.total_ganho,
        total_vendas: statistic?.revenue?.[0]?.total_vendas,
    }
    const fetchData = useCallback(async() =>{
        const { data } = await api.get(`/estatistica/historico/${filter}`)
            setStatistic(data)
    })
    useEffect(() => {
        fetchData()
    }, [filter])
    
    return (
        <main className="Container-Main">
            <section className="section-container">
                <div className="left-content">
                    <div className="top-item">
                        <Cards title="Total Ganho" icon={<BiDollar />} value={cardsData.ganhos} color="green" />
                        <Cards title="Despesas" icon={<BiDetail/>} color="red"/>
                    </div>
                    <div className="middle-item">
                        <div className="top_content">
                            <div className="top_title">
                                <h3>Lucro das vendas</h3>
                            </div>
                            <select name="filter" id="filter_statistcs" onChange={e => setFilter(e.target.value)}>
                                <option value="day">7 dias</option>
                                <option value="monthsOfYear">mês do ano</option>
                                <option value="year">todos anos</option>
                            </select>
                        </div>
                        <Bar data={salesHistory}></Bar>
                    </div>
                </div>
                <div className="right-content">
                    <div className="top-item">
                        <Cards title="Total de Vendas" icon={<BiTrendingUp />} value={cardsData.total_vendas} color="blue" />
                    </div>
                    <div className="middle-item">
                        <div className="top_content">
                            <div className="top_title">
                                <h3>produto com maior lucro</h3>
                            </div>
                        </div>
                        <Doughnut data={productData}></Doughnut>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default Statistics