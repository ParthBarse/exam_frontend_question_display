import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/DropdownEditMenu";
import { baseurl } from "../../utils/domain";

function DashboardCard01() {
  const [totalStudentsCount, setTotalStudentsCount] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`https://${baseurl}/getStudentCounts`)
      .then((response) => {
        setTotalStudentsCount(response.data.total_students_count);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3"
                to="/RegStudent"
              >
                More Info
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Total Cadets
        </h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
          till date
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
            {totalStudentsCount}
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]"></div>
    </div>
  );
}

export default DashboardCard01;
