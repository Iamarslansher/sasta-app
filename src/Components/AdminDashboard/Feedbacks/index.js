import React, { useState, useEffect } from "react";
import { FaUser, FaCommentAlt } from "react-icons/fa";
import { allFeedbacks } from "../../../config/fireBase";
import "./feedbacks.css";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getingFeedbacks();
  }, []);

  const getingFeedbacks = async () => {
    const all_feedbacks = await allFeedbacks();
    setFeedbacks(all_feedbacks);
  };

  return (
    <div className="feedbacksContainer">
      <h1 className="feedbacksTitle">User Feedbacks</h1>
      <div className="feedbacksList">
        {feedbacks.map((feedback) => (
          <div key={feedback.feedbackId} className="feedbacksItem">
            <img
              src={feedback.userFeedback.userData.image}
              alt="Product"
              className="feedbacksProductImage"
            />
            <div className="feedbacksContent">
              <p className="feedbacksEmail">
                <FaUser className="feedbacksIcon" />
                {feedback.userFeedback.userData.email}
              </p>
              <p className="feedbacksText">
                <FaCommentAlt className="feedbacksIcon" />
                {feedback.userFeedback.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
