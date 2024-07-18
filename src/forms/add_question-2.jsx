import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const baseurl = 'exam-apis.bnbdevelopers.in'; // Replace with your actual base URL
  const [questionType, setQuestionType] = useState('text');
  const [questionText, setQuestionText] = useState('');
  const [questionImage, setQuestionImage] = useState('');
  const [options, setOptions] = useState(['']);
  const [correctOptions, setCorrectOptions] = useState([]);
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

    try {
      const response = await axios.post(`https://${baseurl}/submit`, formData);
      console.log('Question submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <div>
        <label>
          Question Type:
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </label>
      </div>

      {questionType === 'text' ? (
        <div>
          <label>
            Question:
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </label>
        </div>
      ) : (
        <div>
          <label>
            Question Image:
            <input
              type="file"
              onChange={handleFileChange}
              required
            />
          </label>
          {questionImage && <img src={questionImage} alt="Question Preview" />}
        </div>
      )}

      <div>
        {options.map((option, index) => (
          <div key={index}>
            <label>
              Option {index + 1}:
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={correctOptions.includes(option)}
                onChange={() => handleCorrectOptionChange(option)}
              />
              Correct
            </label>
            {options.length > 1 && (
              <button type="button" onClick={() => removeOption(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        {options.length < 5 && (
          <button type="button" onClick={addOption}>
            Add Option
          </button>
        )}
      </div>

      <div>
        <label>
          Marks:
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;
