import {
    PieChart,
    Pie,
    Cell,
    Legend,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Bar,
    Rectangle,
} from "recharts";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading";
import { Tooltip } from "flowbite-react";

const Balance = () => {
    const axiosPublic = useAxiosPublic();
    const { data: { totalPaidMember, totalMember } = [], isLoading } = useQuery(
        {
            queryKey: "totalPaidMember",
            queryFn: async () => {
                const res = await axiosPublic.get("/trainers");
                return res.data;
            },
        }
    );

    const {
        data: { totalNewsLetterSubscriber } = [],
        isLoading: totalSubscriberLoading,
        // refetch,
    } = useQuery({
        queryKey: "newsletters",
        queryFn: async () => {
            const res = await axiosPublic.get(`/newsletters`);
            console.log(res.data);
            return res.data;
        },
    });

    if (isLoading || totalSubscriberLoading) {
        return <Loading />;
    }
    const data = [
        {
            name: "Page A",
            totalNewsLetterSubscriber: totalNewsLetterSubscriber,
            totalPaidMember: totalPaidMember,
            amt: 2400,
        },
    ];

    const paymentData = [
        { name: "Remaining Balance", value: totalMember },
        { name: " Total Payment", value: totalPaidMember },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <section className="">
            <h2 className="text-2xl">Balance</h2>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#505ca6]/10 p-6 rounded-xl flex justify-center items-center">
                    <div className="">
                        <PieChart width={500} height={500}>
                            <Pie
                                data={paymentData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {paymentData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Legend></Legend>
                        </PieChart>
                    </div>
                </div>
                <div className="bg-[#505ca6]/10 flex justify-center items-center rounded-xl">
                    <div className="">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="totalPaidMember"
                                fill="#8884d8"
                                activeBar={
                                    <Rectangle fill="pink" stroke="blue" />
                                }
                            />
                            <Bar
                                dataKey="totalNewsLetterSubscriber"
                                fill="#82ca9d"
                                activeBar={
                                    <Rectangle fill="gold" stroke="purple" />
                                }
                            />
                        </BarChart>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Balance;
