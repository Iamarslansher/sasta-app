import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";
import "./feedbacks.css";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch feedbacks from API
    // This is a mock data, replace with actual API call
    const mockFeedbacks = [
      {
        id: 1,
        userEmail: "user1@example.com",
        productImg: "https://via.placeholder.com/150",
        content: "Great product! I love it.",
      },
      {
        id: 2,
        userEmail: "user2@example.com",
        productImg: "https://via.placeholder.com/150",
        content: "Could be better. The quality is not what I expected.",
      },
      // Add more mock feedbacks as needed
    ];

    setFeedbacks(mockFeedbacks);
  }, []);

  return (
    <div className="feedbacksContainer">
      <h1 className="feedbacksTitle">User Feedbacks</h1>
      <div className="feedbacksList">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="feedbacksItem">
            <img
              src={feedback.productImg}
              alt="Product"
              className="feedbacksProductImage"
            />
            <div className="feedbacksContent">
              <p className="feedbacksEmail">
                <FaEnvelope className="feedbacksIcon" />
                {feedback.userEmail}
              </p>
              <p className="feedbacksText">
                <FaCommentAlt className="feedbacksIcon" />
                {feedback.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
