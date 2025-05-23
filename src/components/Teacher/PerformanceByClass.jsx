import { useState } from "react";
import { motion } from "framer-motion";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Sample dataset with additional teachers
const performanceData = [
  { Grade: "Grade 7", Kunaal: 72, MsRani: 70, MrPatel: 75, MrSharma: 80, Karthik: 85, Jabbar: 78, year: "2025", qualification: "M.Ed" },
  { Grade: "Grade 8", MrSharma: 75, MsRani: 73, MrPatel: 78, Kunaal: 72, Karthik: 80, Jabbar: 77, year: "2024", qualification: "B.Ed" },
  { Grade: "Grade 9", MrSharma: 78, MsRani: 76, MrPatel: 80, Kunaal: 80, Karthik: 85, Jabbar: 82, year: "2023", qualification: "Ph.D" },
  { Grade: "Grade 10", Kunaal: 78, MsRani: 76, MrPatel: 80, MrSharma: 82, Karthik: 88, Jabbar: 83, year: "2022", qualification: "Ph.D" },
  // Add more teachers as needed...
];

const PerformanceByClass = ({ year, qualification }) => {
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const filteredData = performanceData.filter((d) => {
    const matchYear = year ? d.year === year : true;
    const matchQualification = qualification ? d.qualification === qualification : true;
    return matchYear && matchQualification;
  });

  const getSeries = () => {
    const series = [];

    if (selectedTeacher === "MrSharma") {
      series.push({
        name: "Mr. Sharma",
        data: filteredData.map((d) => d.MrSharma),
        color: "#60A5FA",
      });
    }

    if (selectedTeacher === "MsRani") {
      series.push({
        name: "Ms. Rani",
        data: filteredData.map((d) => d.MsRani),
        color: "#34D399",
      });
    }

    if (selectedTeacher === "MrPatel") {
      series.push({
        name: "Mr. Patel",
        data: filteredData.map((d) => d.MrPatel),
        color: "#F59E0B",
      });
    }

    if (selectedTeacher === "Kunaal") {
      series.push({
        name: "Mr. Kunaal",
        data: filteredData.map((d) => d.Kunaal),
        color: "#F472B6",
      });
    }

    if (selectedTeacher === "Karthik") {
      series.push({
        name: "Karthik",
        data: filteredData.map((d) => d.Karthik),
        color: "#9333EA",
      });
    }

    if (selectedTeacher === "Jabbar") {
      series.push({
        name: "Jabbar",
        data: filteredData.map((d) => d.Jabbar),
        color: "#FBBF24",
      });
    }

    return series;
  };

  const chartOptions = {
    chart: {
      type: "column",
      backgroundColor: "#1F2937",
      style: { fontFamily: "sans-serif" },
      height: 500,
    },
    title: { text: null },
    xAxis: {
      categories: filteredData.map((d) => d.Grade),
      labels: { style: { color: "#F9FAFB" } },
      lineColor: "#4B5563",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Average Score",
        style: { color: "#F9FAFB" },
      },
      labels: { style: { color: "#F9FAFB" } },
      gridLineColor: "#374151",
    },
    legend: { itemStyle: { color: "#F9FAFB" } },
    tooltip: {
      shared: true,
      backgroundColor: "#111827",
      borderColor: "#4B5563",
      style: { color: "#F9FAFB" },
      valueSuffix: " marks",
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        pointPadding: 0.2,
        groupPadding: 0.1,
      },
    },
    series: getSeries(),
    credits: { enabled: false },
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-8 border border-gray-700 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Teacher Performance by Class Taught</h2>
        <select
          className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none max-h-40 overflow-y-scroll"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="">Select Teacher</option>
          <option value="MrSharma">Mr. Sharma</option>
          <option value="MsRani">Ms. Rani</option>
          <option value="MrPatel">Mr. Patel</option>
          <option value="Kunaal">Mr. Kunaal</option>
          <option value="Karthik">Karthik</option>
          <option value="Jabbar">Jabbar</option>
        </select>
      </div>

      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </motion.div>
  );
};

export default PerformanceByClass;
