import React, { useState } from 'react';
import '../Style/Forum.css';
import headerImage from '../image/Forum.jpg';// Adjust path if needed

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newResponse, setNewResponse] = useState('');

  const handleQuestionSubmit = () => {
    if (newQuestion.trim()) {
      setPosts([...posts, { question: newQuestion, response: '' }]);
      setNewQuestion('');
    }
  };

  const handleResponseSubmit = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].response = newResponse;
    setPosts(updatedPosts);
    setNewResponse('');
  };

  return (
    <div className="forum-container">
      <img src={headerImage} alt="Forum Header" className="forum-header-image" />
      <h2>Gym Trainee Forum</h2>

      <div className="ask-question">
        <textarea
          placeholder="Ask your question here..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          rows="3"
        />
        <button onClick={handleQuestionSubmit}>Submit Question</button>
      </div>

      <div className="posts">
        {posts.length === 0 && <p>No questions have been asked yet.</p>}
        {posts.map((post, index) => (
          <div key={index} className="post">
            <div className="question">
              <strong>Question:</strong> {post.question}
            </div>
            <div className="response">
              {post.response ? (
                <>
                  <strong>Response:</strong> {post.response}
                </>
              ) : (
                <div>
                  <textarea
                    placeholder="Trainee's response..."
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    rows="3"
                  />
                  <button onClick={() => handleResponseSubmit(index)}>
                    Submit Response
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
