import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EntryTest = ({ userId, token }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API lấy danh sách câu hỏi bài test đầu vào
    axios
      .get("http://localhost:5000/api/test/entry-test", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setQuestions(res.data.questions);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    const score = calculateScore(); // Hàm tính điểm
    await axios.post("http://localhost:5000/api/auth/submit-test", {
      userId,
      score,
    });

    alert("Bạn đã hoàn thành bài test!");
    navigate("/dashboard"); // Điều hướng về trang chính
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) correctAnswers++;
    });
    return (correctAnswers / questions.length) * 100;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Bài test đầu vào</h2>
      {questions.map((q) => (
        <div key={q._id}>
          <p>{q.question}</p>
          {q.options.map((opt) => (
            <label key={opt}>
              <input
                type="radio"
                name={q._id}
                value={opt}
                onChange={() => handleAnswerChange(q._id, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Nộp bài</button>
    </div>
  );
};

export default EntryTest;
