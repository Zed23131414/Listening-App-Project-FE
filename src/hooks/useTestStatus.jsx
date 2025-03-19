import { useEffect, useState } from "react";
import { checkTestStatus } from "../services/userService";

const useTestStatus = (userId) => {
  const [isTestCompleted, setIsTestCompleted] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchTestStatus = async () => {
      const status = await checkTestStatus(userId);
      setIsTestCompleted(status);
    };

    fetchTestStatus();
  }, [userId]);

  return isTestCompleted;
};

export default useTestStatus;
