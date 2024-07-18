import React, { useState } from "react";
import axios from "axios"; // Import Axios
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../utils/domain";
import { toPadding } from "chart.js/helpers";

function AddQuestion() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get("id");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const baseurl = '127.0.0.1:8088'; // Replace with your actual base URL
  const [questionType, setQuestionType] = useState('text');
  const [questionText, setQuestionText] = useState('');
  const [questionImage, setQuestionImage] = useState('');
  const [options, setOptions] = useState(['']);
  const [correctOptions, setCorrectOptions] = useState([]);
  const navigate = useNavigate();
  const [marks, setMarks] = useState('');

  const handleFileChange = async (e) => {
    const { files } = e.target;
    const formData = new FormData();
    formData.append('file', files[0]);
    try {
      const res = await axios.post(`https://${baseurl}/uploadFile`, formData);
      setQuestionImage(res.data.file_url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);

    // Update correct options if the value of an existing correct option changes
    if (correctOptions.includes(options[index])) {
      setCorrectOptions((prev) =>
        prev.map((opt) => (opt === options[index] ? value : opt))
      );
    }
  };

  const handleCorrectOptionChange = (value) => {
    setCorrectOptions((prev) =>
      prev.includes(value)
        ? prev.filter((opt) => opt !== value)
        : [...prev, value]
    );
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 1) {
      const optionToRemove = options[index];
      setOptions(options.filter((_, i) => i !== index));
      setCorrectOptions(correctOptions.filter((opt) => opt !== optionToRemove));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('questionType', questionType);
    if (questionType === 'text') {
      formData.append('questionText', questionText);
    } else {
      formData.append('questionImage', questionImage);
    }
    options.forEach((option, index) => {
      formData.append(`option${index + 1}`, option);
    });
    formData.append('correctOptions', JSON.stringify(correctOptions));
    formData.append('marks', marks);
    formData.append('exam_id', examId);

    try {
      const response = await axios.post(`https://${baseurl}/addQuestion`, formData);
      console.log('Question submitted successfully:', response.data);
      alert("Question added successfully!");
      navigate("/questions?id="+examId);
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-screen-xl mx-auto">
            <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header
                className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Add Question
                </h2>
                <Link
                  end
                  to={`/questions?id=${examId}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Back to Question List
                </Link>
              </header>
              <div className="p-3 shadow-lg border border-gray-300 rounded-lg">
                <form onSubmit={handleSubmit}>

                  <div className="flex flex-col p-4 w-full">
                    <label className="block text-gray-700">
                      <p1 style={{ paddingRight: "16px" }}>
                        Question Type:
                      </p1>
                      <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className="border rounded-lg">
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                      </select>
                    </label>
                  </div>

                  <div className="flex flex-col p-4 w-full">
                    {questionType === 'text' ? (
                      <div className="flex flex-col mb-4">
                        <label style={{}} className="block text-gray-700">
                          Question:
                          <input
                            type="text"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            className="w-full border rounded-lg p-2"
                            placeholder="Enter Question Here..."
                            required
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="flex flex-row mb-4">
                        <div>
                          <label>
                            Question Image:
                            <input
                              type="file"
                              onChange={handleFileChange}
                              className="w-full border rounded-lg p-2"
                              required
                            />
                          </label>
                          <div style={{marginTop: "12px" }}>
                            {questionImage && <img src={questionImage} alt="Question Preview" style={{ maxWidth: "100%", height: "auto", maxHeight: "400px" }} />}
                          </div>
                        </div>
                      </div>

                    )}
                  </div>

                  <div className="flex flex-col p-4 w-full">
                    {options.map((option, index) => (
                      <div key={index} className="mb-4">
                        <label>
                          Option {index + 1}:
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="w-full p-2 border rounded-lg mb-2"
                            placeholder={`Enter Option ${index+1} Here...`}
                            required
                          />
                        </label>
                        <div className="flex justify-between items-center">
                          <label>
                            <input
                              type="checkbox"
                              checked={correctOptions.includes(option)}
                              onChange={() => handleCorrectOptionChange(option)}
                              className="mr-2"
                            />
                            Correct
                          </label>
                          {options.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeOption(index)}
                              className="btn p-2 border rounded-lg text-white bg-red-600"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {options.length < 5 && (
                      <button
                        type="button"
                        onClick={addOption}
                        className="btn p-2 border rounded-sm bg-blue-600 text-white w-1/2 mb-2"
                      >
                        Add Option
                      </button>
                    )}
                  </div>


                  <div className="flex flex-row p-4 w-full">
                    <label>
                      Marks:
                      <input
                        type="number"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="w-1/2 p-2 border rounded-lg mb-2"
                        style={{marginLeft:"4px" , marginBottom:"12px"}}
                        required
                      />
                    </label>
                  </div>


                  <button
                    type="submit"
                    className="bg-green-500 w-full text-white px-4 py-2 rounded-lg hover:bg-lime-600 mb-12"
                  >
                    Submit
                  </button>

                  
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddQuestion;
