import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../../../apis/coin-api";
import ApexChart from "react-apexcharts"
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../../../atoms/todo-atoms";
interface IHistorical {
    time_open: string
    time_close: string
    open: number
    high: number
    low: number
    close: number
    volume: number
    market_cap: number
}

interface ChartProps {
    coinId: string;
}

function Chart({coinId} : ChartProps) {
    const isDark = useRecoilValue(isDarkAtom)

    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        })
    return (
        <div>
            {
                isLoading ? "Loading chart..."
                    : <ApexChart
                        type="line"
                        series={[
                            {
                                name: "price",
                                data: data?.map((price) => price.close) as number[],
                            },
                            ]}
                        options={{
                            chart: {
                                height: 300,
                                width: 500,
                                toolbar: {
                                    show: false
                                },
                                background:"transparent"
                            },
                            theme: {
                                mode:isDark ? "dark" : "light"
                            },
                            grid: {show: false},
                            stroke: {
                                curve: "smooth",
                                width: 4
                            },
                            yaxis: {
                                show: false
                            },
                            xaxis: {
                                labels: {show: false},
                                type: "datetime",
                                categories: data?.map((price) => price.time_close),
                            },
                            fill: {
                                type: "gradient",
                                gradient: {gradientToColors: ["#0be881"], stops: [0, 100]}
                            },
                            colors: ["#0fbcf9"],
                            tooltip: {
                                y: {
                                    formatter: (val) => {
                                        return `$ ${val.toFixed(2)}`
                                    }
                                },
                            }
                        }}
                    />
            }
        </div>
    );
}

export default Chart;