import { Chart as Chartjs, BarElement, CategoryScale, PointElement, LineElement, LinearScale, Tooltip, Legend, ArcElement, LineController, BarController } from "chart.js"
import { BiDollar, BiTrendingUp, BiDetail } from "react-icons/bi"
import { useCallback, useEffect, useState } from "react"
import { Chart, Doughnut } from 'react-chartjs-2'
import Cards from "../../components/Cards"
import api from "../../services/Api"
import "./style.css"
function Statistics() {
    const [statistic, setStatistic] = useState({})
    const [filter, setFilter] = useState("day")
    Chartjs.register(
        BarElement,
        CategoryScale,
        PointElement,
        LineElement,
        LinearScale,
        Tooltip,
        Legend,
        ArcElement,
        LineController,
        BarController
    )
    const gastoTotal = () => {
        return statistic?.expenses?.reduce((acc, el) => acc += parseFloat(el.gasto), 0)
    }
    const salesHistory = {
        labels: statistic?.graph?.map(({ mes }) => mes),
        datasets: [
            {
                type: "line",
                label: 'Despesas: R$ ',
                borderWidth: 2.4,
                fill: true,
                borderColor: '#dc3545',
                backgroundColor: ['#dc3545'],
                data: filter != 'day' ? statistic?.expenses?.map(({ gasto }) => gasto) : null
            },
            {
                type: "bar",
                label: 'Receita R$ ',
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                borderWidth: 2,
                fill: false,
                data: statistic?.graph?.map(({ lucro }) => lucro),
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
        ganhos: (statistic?.revenue?.[0]?.total_ganho - gastoTotal()),
        total_vendas: statistic?.revenue?.[0]?.total_vendas,
        gasto: gastoTotal()
    }
    const fetchData = useCallback(async () => {
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
                        <Cards title="Total de lucro" icon={<BiDollar />} value={cardsData.ganhos} color="green" />
                        <Cards title="Despesas" icon={<BiDetail />} value={cardsData.gasto} color="red" />
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
                        <Chart data={salesHistory}></Chart>
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