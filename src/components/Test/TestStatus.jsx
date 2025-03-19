import { useEffect, useState } from "react";
import { getTestStatus } from "../services/api";

const TestStatus = ({ userId }) => {
  const [isTestCompleted, setIsTestCompleted] = useState(null);

  useEffect(() => {
    const fetchTestStatus = async () => {
      try {
        const data = await getTestStatus(userId);
        setIsTestCompleted(data.isTestCompleted);
      } catch (error) {
        console.error("Lỗi khi lấy trạng thái bài test:", error);
      }
    };

    fetchTestStatus();
  }, [userId]);

  if (isTestCompleted === null) return <p>Đang kiểm tra...</p>;

  return (
    !isTestCompleted && (
      <div className="alert">
        <p>Bạn chưa hoàn thành bài test đầu vào. Hãy làm ngay!</p>
        <a href="/test">Làm bài test</a>
      </div>
    )
  );
};

export default TestStatus;
