import React, { useEffect,useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { baseurl } from "../src/utils/domain";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Table from "./pages/camp";
import RegStudent from "./pages/registered-students";
import CanStudent from "./pages/cancelled-students";
import Settings from "./pages/settings";
import ReportCard from "./pages/ReportCard";
import Filter from "./pages/Filter";
import AddStudent from "./forms/add_students_form/add_students";
import AddCamp from "./forms/add_camp";
import FeeDetails from "./pages/Button/fee_details";
import FeeDiscount from "./pages/Button/fee_discount";
import Batchdetails from "./pages/Button/batch_details";
import AddBatch from "./forms/add_batch";
import GenerateReport from "./forms/generate_report";
import VeiwReportCard from "./pages/Button/veiw_reportcard";
import EditFeeDetails from "./forms/edit_fee_details";
import UpdateStudentDetails from "./pages/update_student_form";
import AdmitCard from "./pages/Button/veiw_entrance_card";
import AuthPage from "./pages/auth";
import Receipt from "./pages/Button/veiw-receipt";
import AdmissionForm from "./pages/admissionform";
import PositionedSnackbar from "./components/Toast";
import EditBatch from "./pages/edit_batch";
import Discount from "./pages/discount";
import View_medical_certificate from "./pages/Button/View_medical_certificate";
import RegisterAdmin from "./pages/register";
import ExtStudent from "./pages/extended-students";
import RefStudent from "./pages/refunded-students";
import Reciptlist from "./pages/receipt_list";
import Medicallist from "./pages/medical_certificate";
import Reportlist from "./pages/reportlist";
import Enterancecard from "./pages/enterancecard_list";
import Pickuplist from "./pages/pick-ip_pointlist";
import Actstudent from "./pages/active-students";
import Certificatepage from "./pages/certificate-page";
import Feedbackpage from "./pages/feedback-page";
import VisitingCard from "./pages/visiting_card_list";
import Payments from "./pages/payments";
import GenerateReport15 from "./forms/generate_report15";
import GenerateReport30 from "./forms/generate_report30";
import GenerateReportPDC from "./forms/generate_report_pdc";
import AccessDeniedPage from "./pages/accessDenied"
import SuperAdminPage from "./pages/superAdmin"
import MentainMode from "./pages/underMaintain"


// Exam Section

import Exams from "./pages/exams";
import AddExams from "./forms/add_exam";
import Questions from "./pages/questions";
import AddQuestion from "./forms/add_question";
import AddQuestion2 from "./forms/add_question-2";
import ViewQuestion from "./pages/view_quesion";
import AddStudentExam from "./forms/add_student_exam";
import RegStudentsExam from "./pages/registered-students-exam";



import DisplayQuestions from "./pages/exam-questions/display_quesions";
import SubmissionSuccessful from "./pages/exam-questions/submission_successful";
import ScreeningPage from "./pages/exam-questions/screening";
import LoginPage from "./pages/exam-questions/login_page";

function App() {
  const location = useLocation();

  const role = localStorage.getItem("admin_name");
  const mntflg = localStorage.getItem("maintainFlag");

  const [maintainFlag, setMaintainFlag] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`https://${baseurl}/getMaintenanceStatus`);
  //       const data = await response.json();
  //       setMaintainFlag(data.status);
  //       localStorage.setItem("maintainFlag", data.status)
  //     } catch (error) {
  //       console.error('Error fetching maintenance status:', error);
  //     }
  //   };

  //   fetchData(); // Initial call

  //   const interval = setInterval(fetchData, 30000); // Fetch data every 30 seconds

  //   return () => clearInterval(interval); // Clean up interval on unmount
  // }, []);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<AuthPage />} />
        <Route exact path="/exams" element={<Exams />} />
        <Route exact path="/add-exam" element={<AddExams />} />
        <Route exact path="/questions" element={<Questions />} />
        <Route exact path="/add-question" element={<AddQuestion />} />
        <Route exact path="/add-question-2" element={<AddQuestion2 />} />
        <Route exact path="/view-question" element={<ViewQuestion />} />
        <Route exact path="/add-student-exam" element={<AddStudentExam />} />
        <Route exact path="/reg-students-exam" element={<RegStudentsExam />} />



        <Route exact path="/display_questions" element={<DisplayQuestions />} />
        <Route exact path="/submissionSuccessful" element={<SubmissionSuccessful />} />
        <Route exact path="/screening" element={<ScreeningPage />} />
        <Route exact path="/login" element={<LoginPage />} />

        {role === "super" && mntflg === "off" && (
          <>
          <Route exact path="/dash" element={<Dashboard />} />
          <Route exact path="/camp" element={<Table />} />
          <Route exact path="/regStudent" element={<RegStudent />} />
          <Route exact path="/CanStudent" element={<CanStudent />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/Reportcard" element={<ReportCard />} />
          <Route exact path="/Filter" element={<Filter />} />
          <Route exact path="/add-student" element={<AddStudent />} />
          <Route exact path="/add-camp" element={<AddCamp />} />
          <Route exact path="/fee-details" element={<FeeDetails />} />
          <Route exact path="/fee-discounts" element={<FeeDiscount />} />
          <Route exact path="/batch-details" element={<Batchdetails />} />
          <Route exact path="/add-batch" element={<AddBatch />} />
          <Route exact path="/generate-report" element={<GenerateReport />} />
          <Route exact path="/generate-report15" element={<GenerateReport15 />} />

          <Route exact path="/generate-report30" element={<GenerateReport30 />} />
          <Route
            exact
            path="/generate-reportpdc"
            element={<GenerateReportPDC />}
          />

          <Route exact path="/view-report" element={<VeiwReportCard />} />
          <Route
            exact
            path="/view_medical_report/:id"
            element={<View_medical_certificate />}
          />
          <Route exact path="/edit-fee-details" element={<EditFeeDetails />} />
          <Route
            exact
            path="/update-student-details"
            element={<UpdateStudentDetails />}
          />
          <Route exact path="/veiw-entrance" element={<AdmitCard />} />
          <Route exact path="/receipt" element={<Receipt />} />
          <Route exact path="/toast" element={<PositionedSnackbar />} />
          <Route exact path="/admission-form" element={<AdmissionForm />} />
          <Route exact path="/edit-batch" element={<EditBatch />} />
          <Route exact path="/discount" element={<Discount />} />
          <Route exact path="/register" element={<RegisterAdmin />} />
          <Route exact path="/extStudent" element={<ExtStudent />} />
          <Route exact path="/refStudent" element={<RefStudent />} />
          <Route exact path="/Receiptlist" element={<Reciptlist />} />
          <Route exact path="/Medicallist" element={<Medicallist />} />
          <Route exact path="/Reportlist" element={<Reportlist />} />
          <Route exact path="/Enterancecard" element={<Enterancecard />} />
          <Route exact path="/Pickuplist" element={<Pickuplist />} />
          <Route exact path="/Actstudent" element={<Actstudent />} />
          <Route exact path="/Certificatepage" element={<Certificatepage />} />
          <Route exact path="/Feedbackpage" element={<Feedbackpage />} />
          <Route exact path="/VisitingCard" element={<VisitingCard />} />
          <Route exact path="/payments" element={<Payments />} />
          <Route exact path="/superAdmin" element={<SuperAdminPage />} />
          <Route path="*" element={<AccessDeniedPage/>} />
          </>
        )}

        {role === "admin" && mntflg === "off" && (
          <>
          <Route exact path="/dash" element={<Dashboard />} />
          <Route exact path="/camp" element={<Table />} />
          <Route exact path="/regStudent" element={<RegStudent />} />
          <Route exact path="/CanStudent" element={<CanStudent />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/Reportcard" element={<ReportCard />} />
          <Route exact path="/Filter" element={<Filter />} />
          <Route exact path="/add-student" element={<AddStudent />} />
          <Route exact path="/add-camp" element={<AddCamp />} />
          <Route exact path="/fee-details" element={<FeeDetails />} />
          <Route exact path="/fee-discounts" element={<FeeDiscount />} />
          <Route exact path="/batch-details" element={<Batchdetails />} />
          <Route exact path="/add-batch" element={<AddBatch />} />
          <Route exact path="/generate-report" element={<GenerateReport />} />
          <Route exact path="/generate-report15" element={<GenerateReport15 />} />

          <Route exact path="/generate-report30" element={<GenerateReport30 />} />
          <Route
            exact
            path="/generate-reportpdc"
            element={<GenerateReportPDC />}
          />

          <Route exact path="/view-report" element={<VeiwReportCard />} />
          <Route
            exact
            path="/view_medical_report/:id"
            element={<View_medical_certificate />}
          />
          <Route exact path="/edit-fee-details" element={<EditFeeDetails />} />
          <Route
            exact
            path="/update-student-details"
            element={<UpdateStudentDetails />}
          />
          <Route exact path="/veiw-entrance" element={<AdmitCard />} />
          <Route exact path="/receipt" element={<Receipt />} />
          <Route exact path="/toast" element={<PositionedSnackbar />} />
          <Route exact path="/admission-form" element={<AdmissionForm />} />
          <Route exact path="/edit-batch" element={<EditBatch />} />
          <Route exact path="/discount" element={<Discount />} />
          <Route exact path="/register" element={<RegisterAdmin />} />
          <Route exact path="/extStudent" element={<ExtStudent />} />
          <Route exact path="/refStudent" element={<RefStudent />} />
          <Route exact path="/Receiptlist" element={<Reciptlist />} />
          <Route exact path="/Medicallist" element={<Medicallist />} />
          <Route exact path="/Reportlist" element={<Reportlist />} />
          <Route exact path="/Enterancecard" element={<Enterancecard />} />
          <Route exact path="/Pickuplist" element={<Pickuplist />} />
          <Route exact path="/Actstudent" element={<Actstudent />} />
          <Route exact path="/Certificatepage" element={<Certificatepage />} />
          <Route exact path="/Feedbackpage" element={<Feedbackpage />} />
          <Route exact path="/VisitingCard" element={<VisitingCard />} />
          <Route exact path="/payments" element={<Payments />} />
          <Route path="*" element={<AccessDeniedPage/>} />
          </>
        )}
        {role === "accountant" && mntflg === "off" && (
          <>
            <Route exact path="/dash" element={<Dashboard />} />
            <Route exact path="/payments" element={<Payments />} />
            <Route exact path="/regStudent" element={<RegStudent />} />
            <Route exact path="/Actstudent" element={<Actstudent />} />
            <Route exact path="/discount" element={<Discount />} />
            <Route exact path="/Filter" element={<Filter />} />
            <Route exact path="/Enterancecard" element={<Enterancecard />} />
            <Route exact path="/Receiptlist" element={<Reciptlist />} />
            <Route
            exact
            path="/update-student-details"
            element={<UpdateStudentDetails />}
          />
            {/* Catch all other routes for accountant */}
            <Route path="*" element={<AccessDeniedPage/>} />
          </>
        )}

        {role === "transport" && mntflg === "off" && (
          <>
            <Route exact path="/dash" element={<Dashboard />} />
            <Route exact path="/Pickuplist" element={<Pickuplist />} />
            <Route exact path="/Enterancecard" element={<Enterancecard />} />
            {/* Catch all other routes for accountant */}
            <Route path="*" element={<AccessDeniedPage/>} />
          </>
        )}

        {role === "report" && mntflg === "off" && (
          <>
            <Route exact path="/dash" element={<Dashboard />} />
            <Route exact path="/Reportcard" element={<ReportCard />} />
            {/* Catch all other routes for accountant */}
            <Route path="*" element={<AccessDeniedPage/>} />
          </>
        )}

        {role === "certificate" && mntflg === "off" && (
          <>
            <Route exact path="/dash" element={<Dashboard />} />
            <Route exact path="/Certificatepage" element={<Certificatepage />} />
            {/* Catch all other routes for accountant */}
            <Route path="*" element={<AccessDeniedPage/>} />
          </>
        )}

        {role === "camp" && mntflg === "off" && (
          <>
            <Route exact path="/dash" element={<Dashboard />} />
            <Route exact path="/add-camp" element={<AddCamp />} />
            <Route exact path="/camp" element={<Table />} />
            <Route exact path="/batch-details" element={<Batchdetails />} />
            <Route exact path="/add-batch" element={<AddBatch />} />
            <Route exact path="/edit-batch" element={<EditBatch />} />
            <Route exact path="/edit-fee-details" element={<EditFeeDetails />} />
            {/* Catch all other routes for accountant */}
            <Route path="*" element={<AccessDeniedPage/>} />
          </>
        )}

        {role === "documentation" && mntflg === "off" && (
          <>
            <Route exact path="/dash" element={<Dashboard />} />
            <Route exact path="/Feedbackpage" element={<Feedbackpage />} />
            <Route exact path="/Receiptlist" element={<Reciptlist />} />
            <Route exact path="/Medicallist" element={<Medicallist />} />
            <Route exact path="/VisitingCard" element={<VisitingCard />} />
            {/* Catch all other routes for accountant */}
            <Route exact path="/Enterancecard" element={<Enterancecard />} />
            <Route path="*" element={<AccessDeniedPage/>} />
          </>
        )}

        {role === "admission" && mntflg === "off" && (
          <>
            <Route exact path="/dash" element={<Dashboard />} />
            <Route exact path="/regStudent" element={<RegStudent />} />
            <Route exact path="/Actstudent" element={<Actstudent />} />
            <Route exact path="/add-student" element={<AddStudent />} />
            <Route
            exact
            path="/update-student-details"
            element={<UpdateStudentDetails />}
          />
          <Route exact path="/CanStudent" element={<CanStudent />} />
          <Route exact path="/refStudent" element={<RefStudent />} />
          <Route exact path="/extStudent" element={<ExtStudent />} />
            {/* Catch all other routes for accountant */}
            <Route path="*" element={<AccessDeniedPage/>} />
          </>
        )}

        {mntflg === "on" && (
          <>
          <Route exact path="/superAdmin" element={<SuperAdminPage />} />
          <Route path="*" element={<MentainMode/>} />
          <Route path="/accessDenied" element={<AccessDeniedPage />} />
        </>
        )}



        {/* Redirect to accessDenied route if the role is not allowed */}
        {role !== "admin" && role !== "accountant" && role !== "certificate" && role !== "documentation" && role !== "report" && role !== "camp" && role !== "transport" && role !== "admission" && (
          <>
            <Route path="*" element={<AccessDeniedPage/>} />
            <Route path="/accessDenied" element={<AccessDeniedPage />} />
          </>
        )}
        <Route path="/accessDenied" element={<AccessDeniedPage />} />
      </Routes>
    </>
  );
}

export default App;
