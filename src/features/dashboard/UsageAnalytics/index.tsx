// "use client";

// import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import {  ChartContainer } from "@/components/ui/chart";

// // Define the type for chart data
// interface ChartConfig {
//   queriesData: { date: string; value: number }[];
// }

// const chartConfig: ChartConfig = {
//   queriesData: [
//     { date: "1 January", value: 45 },
//     { date: "2 January", value: 87 },
//     { date: "3 January", value: 33 },
//     { date: "4 January", value: 92 },
//     { date: "5 January", value: 61 },
//     { date: "6 January", value: 28 },
//     { date: "7 January", value: 74 },
//     { date: "8 January", value: 13 },
//     { date: "9 January", value: 53 },
//     { date: "10 January", value: 11 },
//     { date: "11 January", value: 78 },
//     { date: "12 January", value: 62 },
//     { date: "13 January", value: 35 },
//     { date: "14 January", value: 49 },
//     { date: "15 January", value: 82 },
//     { date: "16 January", value: 21 },
//     { date: "17 January", value: 16 },
//     { date: "18 January", value: 93 },
//     { date: "19 January", value: 67 },
//     { date: "20 January", value: 56 },
//     { date: "21 January", value: 74 },
//     { date: "22 January", value: 19 },
//     { date: "23 January", value: 40 },
//     { date: "24 January", value: 55 },
//     { date: "25 January", value: 89 },
//     { date: "26 January", value: 66 },
//     { date: "27 January", value: 18 },
//     { date: "28 January", value: 80 },
//     { date: "29 January", value: 62 },
//     { date: "30 January", value: 90 },
//   ]
// };
// // Data for queries made each day
// // const chartData: ChartData[] = [
// //   { date: "1 January", value: 45 },
// //   { date: "2 January", value: 87 },
// //   { date: "3 January", value: 33 },
// //   { date: "4 January", value: 92 },
// //   { date: "5 January", value: 61 },
// //   { date: "6 January", value: 28 },
// //   { date: "7 January", value: 74 },
// //   { date: "8 January", value: 13 },
// //   { date: "9 January", value: 53 },
// //   { date: "10 January", value: 11 },
// //   { date: "11 January", value: 78 },
// //   { date: "12 January", value: 62 },
// //   { date: "13 January", value: 35 },
// //   { date: "14 January", value: 49 },
// //   { date: "15 January", value: 82 },
// //   { date: "16 January", value: 21 },
// //   { date: "17 January", value: 16 },
// //   { date: "18 January", value: 93 },
// //   { date: "19 January", value: 67 },
// //   { date: "20 January", value: 56 },
// //   { date: "21 January", value: 74 },
// //   { date: "22 January", value: 19 },
// //   { date: "23 January", value: 40 },
// //   { date: "24 January", value: 55 },
// //   { date: "25 January", value: 89 },
// //   { date: "26 January", value: 66 },
// //   { date: "27 January", value: 18 },
// //   { date: "28 January", value: 80 },
// //   { date: "29 January", value: 62 },
// //   { date: "30 January", value: 90 },
// // ];

// // Function to determine the color for each bar based on value
// const getBarColor = (value: number, maxValue: number): string => {
//   return value === maxValue ? "#344BFD" : "#E9ECF1";
// };


// export default function UsageAnalytics() {
//   // // Find the maximum value in the data to highlight the bar with the highest value
//   // const maxValue = Math.max(...chartData.map(item => item.value));
//   const maxValue = Math.max(...chartConfig.queriesData.map(entry => entry.value));  // Find max queries value


//   return (
//     <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
//       <BarChart data={chartConfig.queriesData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis ticks={[0, 50, 100]} />
//         <Tooltip />
//         <Legend />
//         <Bar
//           dataKey="value"
//           fill={(entry: { value: number }) => getBarColor(entry.value, maxValue)}
//           radius={4}
//         />
//       </BarChart>
//     </ChartContainer>
//   );
// }
