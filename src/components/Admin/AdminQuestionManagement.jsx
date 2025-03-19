import React, { useState, useEffect } from 'react';
import { useQuestions } from '../../hooks/useQuestions';
import { useTests } from '../../hooks/useTests';
import './AdminQuestionManagement.css';
import axios from "axios";

const AdminQuestionManagement = () => {
  const { getTests } = useTests();
  const { getQuestions } = useQuestions();
  const [tests, setTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestions, setNewQuestions] = useState([
    {
      id: 1,
      question_text: '',
      question_type: 'multiple_choice',
      score: 10,
      difficulty: 'easy',
      audio_url: '',
      choices: [{ option_text: '', is_correct: false }],
      correct_answer: ''
    }
  ]);

  useEffect(() => {
    fetchTests();
  }, []);

  useEffect(() => {
    if (selectedTestId) fetchQuestions();
  }, [selectedTestId]);

  const fetchTests = async () => {
    try {
      const data = await getTests();
      setTests(data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions(selectedTestId);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    }
  };

  const handleTestChange = (e) => setSelectedTestId(e.target.value);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...newQuestions];
    updatedQuestions[index][name] = value;
    setNewQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const { name, value, type, checked } = e.target;
    const updatedQuestions = [...newQuestions];
    const updatedChoices = [...updatedQuestions[qIndex].choices];

    if (type === "checkbox") {
      updatedChoices[oIndex].is_correct = checked;
      const correctAnswers = updatedChoices.filter(choice => choice.is_correct).map(choice => choice.option_text);
      updatedQuestions[qIndex].correct_answer = correctAnswers.join(", ");
    } else {
      updatedChoices[oIndex][name] = value;
    }

    updatedQuestions[qIndex].choices = updatedChoices;
    setNewQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...newQuestions];
    updatedQuestions[qIndex].choices.push({ option_text: '', is_correct: false });
    setNewQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setNewQuestions([...newQuestions, {
      id: newQuestions.length + 1,
      question_text: '',
      question_type: 'multiple_choice',
      score: 10,
      difficulty: 'easy',
      audio_url: '',
      choices: [{ option_text: '', is_correct: false }],
      correct_answer: ''
    }]);
  };

  const submitQuestions = async () => {
    if (!selectedTestId) {
      alert("Please select a test before creating questions.");
      return;
    }

    try {
      const responses = await Promise.all(newQuestions.map(q =>
        axios.post(`http://localhost:5000/api/tests/${selectedTestId}/questions`, q)
      ));

      setQuestions(prev => [...prev, ...responses.map(res => res.data)]);
      setNewQuestions([
        {
          id: 1,
          question_text: '',
          question_type: 'multiple_choice',
          score: 10,
          difficulty: 'easy',
          audio_url: '',
          choices: [{ option_text: '', is_correct: false }],
          correct_answer: ''
        }
      ]);
    } catch (error) {
      console.error("Error creating questions:", error.response?.data || error);
    }
  };

  return (
    <div className="admin-question-management">
      <h1>Question Management</h1>

      {/* Select Test Section */}
      <fieldset className="section-selectTest">
        <legend>Select Test</legend>
        <select value={selectedTestId} onChange={handleTestChange}>
          <option value="">Select a test</option>
          {tests.map(test => (
            <option key={test._id} value={test._id}>{test.title}</option>
          ))}
        </select>
      </fieldset>

      {selectedTestId && (
        <>
          {/* Create New Question Section */}
          <fieldset className="section-createQuestion">
            <legend>Create New Questions</legend>

            {newQuestions.map((question, qIndex) => (
              <div key={qIndex} className="question-container">
                <h3>Question {question.id}</h3>
                <input type="text" name="question_text" value={question.question_text} onChange={(e) => handleInputChange(qIndex, e)} placeholder="Question Text" />
                <select name="question_type" value={question.question_type} onChange={(e) => handleInputChange(qIndex, e)}>
                  <option value="multiple_choice">Multiple Choice</option>
                  <option value="fill_in_the_blank">Fill in the Blank</option>
                </select>
                <input type="number" name="score" value={question.score} onChange={(e) => handleInputChange(qIndex, e)} placeholder="Score" />
                <select name="difficulty" value={question.difficulty} onChange={(e) => handleInputChange(qIndex, e)}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <input type="text" name="audio_url" value={question.audio_url} onChange={(e) => handleInputChange(qIndex, e)} placeholder="Audio URL" />

                {/* Choices Section */}
                <fieldset className="nested-section">
                  <legend>Choices</legend>
                  {question.choices.map((choice, oIndex) => (
                    <div key={oIndex} className="option">
                      <input type="text" name="option_text" value={choice.option_text} onChange={(e) => handleOptionChange(qIndex, oIndex, e)} placeholder={`Option ${String.fromCharCode(65 + oIndex)}`} />
                      <label>
                        <input type="checkbox" checked={choice.is_correct} onChange={(e) => handleOptionChange(qIndex, oIndex, e)} /> Correct
                      </label>
                    </div>
                  ))}
                  <button onClick={() => addOption(qIndex)}>Add a New Choice</button>
                </fieldset>
              </div>
            ))}

            <button className="addQuestion" onClick={addQuestion}>➕ Add Question</button>
            <button className="submitQuestion" onClick={submitQuestions}>✅ Submit Questions</button>
          </fieldset>

          {/* Existing Questions Section */}
          <fieldset className="section-QuestionList">
            <legend>Existing Questions</legend>
            <table className="questions-table">
              <thead>
                <tr>
                  <th>Question Text</th>
                  <th>Type</th>
                  <th>Score</th>
                  <th>Difficulty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map(question => (
                  <tr key={question._id}>
                    <td>{question.question_text}</td>
                    <td>{question.question_type}</td>
                    <td>{question.score}</td>
                    <td>{question.difficulty}</td>
                    <td className="actions">
                      <button className="edit-btn">
                        <span className="material-icons">Edit</span>
                      </button>
                      <button className="delete-btn">
                        <span className="material-icons">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>
        </>
      )}
    </div>
  );
}

export default AdminQuestionManagement;
