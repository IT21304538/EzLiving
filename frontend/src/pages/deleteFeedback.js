import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./feedbacklist.css";

function DeleteFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);

  // Define fetchFeedback function outside of useEffect
  const fetchFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/feedback"); // API endpoint for fetching feedback
      setFeedbackList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Call fetchFeedback inside useEffect
    fetchFeedback();
  }, []);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${feedbackId}`);
      alert("Review deleted successfully!");
      // After deleting, fetch the updated feedback list
      fetchFeedback();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="feedback-heading">User Feedbacks on our site</h1>
      <br />
      <br />
      <ul className="feedback-list">
        {feedbackList.map((feedback) => (
          <li key={feedback._id} className="feedback-item-box">
            <h2 className="feedback-title">{feedback.feedbacktitle}</h2>
            <p className="feedback-text">{feedback.feedbacktext}</p>
            <button className="feedback-delete-btn" onClick={() => handleDeleteFeedback(feedback._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default DeleteFeedback;
