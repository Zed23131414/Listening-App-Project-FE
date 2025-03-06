import React from "react";
import { getLessons } from "../services/lessonService";
import { useEffect, useState } from "react";

export default function Lessons() {
    const [lessons, setLessons] = useState([]);
  
    useEffect(() => {
      getLessons().then(setLessons);
    }, []);
    return (
        <div>
          <h1>Danh sách bài học Listening</h1>
          <ul>
            {lessons.map((lesson) => (
              <li key={lesson._id}>{lesson.title}</li>
            ))}
          </ul>
        </div>
      );
    }

  