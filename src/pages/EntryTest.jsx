import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import React from "react";
import TestCard from "../components/EntryTest/TestCard";
import QuestionList from "../components/EntryTest/QuestionList";
import TestHeader from "../components/EntryTest/TestHeader";
import "./EntryTest.css";

const EntryTest = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchTests();
  }, [user, navigate]);

  const fetchTests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tests/category?category=entry-test");
      console.log("📥 Test data:", response.data);
      setTests(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách bài test:", error);
      setLoading(false);
    }
  };

  const handleSelectTest = async (testId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/tests/${testId}/questions`);
      setQuestions(response.data);
      setSelectedTest(testId);
      setLoading(false);
      console.log("📩 Questions data:", response.data);
    } catch (error) {
      console.error("❌ Lỗi khi lấy câu hỏi:", error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setAnswers({ ...answers, [questionId]: selectedAnswer });
    console.log("📝 Chọn đáp án:", { questionId, selectedAnswer });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/tests/submit", {
        user_id: user.id,
        test_id: selectedTest,
        answers: Object.keys(answers).map((question_id) => ({
          question_id,
          answer: answers[question_id],
        })),
      });

      alert("✅ Bạn đã hoàn thành bài test!");
      setUser({ ...user, isTestCompleted: true });
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Lỗi khi nộp bài test:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  const selectedTestData = tests.find(t => t._id === selectedTest);

  return (
    <div className="entry-test-container">
      <h1>📖 Bài Test Đầu Vào</h1>
  
      {!selectedTest ? (
        <div className="test-selection">
          <h2>Chọn bài test phù hợp với trình độ của bạn:</h2>
          {tests.length === 0 ? (
            <p>Không có bài test nào.</p>
          ) : (
            <div className="test-list">
              {tests.map((test) => (
                <TestCard 
                  key={test._id} 
                  test={test} 
                  onSelect={handleSelectTest} 
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="question-container">
          <TestHeader 
            test={selectedTestData}
            questionsCount={questions.length}
          />
          
          {questions.length === 0 ? (
            <p>Không có câu hỏi nào.</p>
          ) : (
            <>
              <QuestionList 
                questions={questions}
                onAnswerSelect={handleAnswerSelect}
              />
              <button className="submit-btn" onClick={handleSubmit}>
                Nộp bài
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EntryTest;
