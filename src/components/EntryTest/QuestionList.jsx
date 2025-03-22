import React from 'react';
import './QuestionList.css';

const QuestionList = ({ questions, onAnswerSelect }) => {
  return (
    <div className="questions-list">
      {questions.map((q, index) => (
        <div key={q._id} className="question-item">
          {q.audio_url && (
            <div className="audio-container">
              <audio controls className="question-audio">
                <source src={`http://localhost:5000${q.audio_url}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          {q.image_url && (
            <div className="image-container">
              <img 
                src={`http://localhost:5000${q.image_url}`} 
                alt="Question illustration" 
                className="question-image"
              />
            </div>
          )}
          <p className="question-text">{index + 1}. {q.question_text}</p>
          <div className="choices-list">
            {q.choices.map((option, idx) => (
              <label key={idx} className="choice-label">
                <input
                  type="radio"
                  name={`question-${q._id}`}
                  value={option.option_text}
                  onChange={() => onAnswerSelect(q._id, option.option_text)}
                  className="choice-input"
                />
                <span className="choice-text">{option.option_text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList; 