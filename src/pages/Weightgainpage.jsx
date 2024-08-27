import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../Style/Weightgainpage.css'; // Import the CSS file
import img7 from '../image/weightloss1.jpg'; // Import the image for the left side
import img8 from '../image/weightloss2.jpg'; // Import the image for the right side
import img9 from '../image/moneyback.jpg'; // Import the new image for the end

const WeightGain = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => console.log('Razorpay script loaded successfully');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);

      if (!window.Razorpay) {
        alert('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      // Create order on the backend
      const response = await fetch('http://localhost:3001/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 50000, // amount in paise
          currency: 'INR',
          receipt: 'receipt#1',
          payment_capture: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to create order: ${data.error}`);
      }

      const options = {
        key: 'rzp_test_nMMmfd2QG4H4Ed',
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'FitX',
        description: 'Test Transaction',
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const validationResponse = await fetch('http://localhost:3001/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const validationData = await validationResponse.json();

            if (!validationResponse.ok) {
              throw new Error(`Failed to validate payment: ${validationData.error}`);
            }

            if (validationData.message === 'Payment verified successfully') {
              alert('Payment successful');
              
              // Record the purchase in the backend
              const purchaseResponse = await fetch('http://localhost:3001/api/purchase', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: '1', // Replace this with the actual user ID
                  courseName: 'FitX 120 Weight Gain Program',
                }),
              });
              
              

              const purchaseData = await purchaseResponse.json();

              if (!purchaseResponse.ok) {
                throw new Error(`Failed to record purchase: ${purchaseData.error}`);
              }

              console.log('Purchase recorded successfully:', purchaseData.purchaseId);

              // Navigate to Navcontent1 page on successful payment and purchase recording
              navigate('/navcontent1');
            } else {
              alert('Payment failed');
            }
          } catch (error) {
            console.error('Error validating payment or recording purchase:', error);
            alert('Payment validation or purchase recording failed');
          }
        },
        prefill: {
          name: 'Rahul K',
          email: 'rahulkrishnamoorthy2004@gmail.com',
          contact: '8610350048',
        },
        theme: {
          color: '#F37254',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    handlePayment();
  };

  return (
    <div className="weight-gain-container">
      <div className="weight-gain-heading">
        Gain muscle & build strength in just 120 days
      </div>
      <div className="weight-gain-details">
        The Step-by-Step 120 days transformation program that will guide you to
        gain muscle through home workouts or gym workouts combined with 300+ diet plans.
      </div>

      <div className="weight-gain-link">
        <a href="#" onClick={handleClick} className="weight-gain-link-text">
          CLICK HERE TO JOIN FITX120
        </a>
        <div className="weight-gain-subheading">
          Struggling to gain weight despite trying various methods? Here’s why
        </div>
      </div>

      <div className="weight-gain-images">
        <div className="weight-gain-image-container">
          <img src={img7} alt="Weight Gain Transformation" className="weight-gain-image-left" />
          <div className="weight-gain-image-text-left">
            You don’t have a structured plan to guide you towards your muscle-building goals.
          </div>
        </div>
        <div className="weight-gain-image-container">
          <img src={img8} alt="Weight Gain Program" className="weight-gain-image-right" />
          <div className="weight-gain-image-text-right">
            You are overwhelmed with too much information on the internet and don't know how to start your muscle gain journey.
          </div>
        </div>
      </div>
      <div className="case-studies-container">
        <div className="case-study">
          <div className="case-study-heading">SITUATION</div>
          <div className="case-study-content">
            Frustrated with lack of progress in achieving a lean and muscular physique.
          </div>
          <div className="case-study-heading">STRUGGLE</div>
          <div className="case-study-content">
            Unable to balance diet and workouts for fat loss and muscle gain.
          </div>
          <div className="case-study-heading">SOLUTION</div>
          <div className="case-study-content">
            Enrolled into the Fit-X 120 days transformation program for structured guidance.
          </div>
          <div className="case-study-heading">RESULT</div>
          <div className="case-study-content">
            Reduced body fat by 10% and gained muscle in just 16 weeks.
          </div>
        </div>
        <div className="case-study">
          <div className="case-study-heading">SITUATION</div>
          <div className="case-study-content">
            Struggled to achieve a toned physique despite regular workouts.
          </div>
          <div className="case-study-heading">STRUGGLE</div>
          <div className="case-study-content">
            Inconsistent diet and lack of a clear plan for body recomposition.
          </div>
          <div className="case-study-heading">SOLUTION</div>
          <div className="case-study-content">
            Followed the Fit-X 120 days plan for balanced diet and workouts.
          </div>
          <div className="case-study-heading">RESULT</div>
          <div className="case-study-content">
            Achieved a leaner, more muscular physique with balanced fat loss and muscle gain.
          </div>
        </div>
        <div className="case-study">
          <div className="case-study-heading">SITUATION</div>
          <div className="case-study-content">
            Lost weight but struggled to maintain muscle mass due to poor program structure.
          </div>
          <div className="case-study-heading">STRUGGLE</div>
          <div className="case-study-content">
            Lack of guidance on effective muscle gain while losing fat.
          </div>
          <div className="case-study-heading">SOLUTION</div>
          <div className="case-study-content">
            Opted for the Fit-X 120 days program for a structured approach to body recomposition.
          </div>
          <div className="case-study-heading">RESULT</div>
          <div className="case-study-content">
            Improved muscle mass and reduced body fat with a well-balanced plan.
          </div>
        </div>
      </div>

      {/* Program Modules */}
      <div className="modules-container">
        <div className="module">
          <strong>Module 1: Introduction to Body Recomposition</strong><br />
          Understand the concept of body recomposition and how it works.
        </div>
        <div className="module">
          <strong>Module 2: Setting Goals</strong><br />
          Learn how to set realistic and achievable goals for body recomposition.
        </div>
        <div className="module">
          <strong>Module 3: Principles of Body Recomposition</strong><br />
          Understand how to effectively reduce fat while gaining muscle.
        </div>
        <div className="module">
          <strong>Module 4: Nutrition & Macros</strong><br />
          Learn about nutrition and how to balance your macros for optimal results.
        </div>
        <div className="module">
          <strong>Module 5: Track Calories</strong><br />
          Track your calorie intake and expenditure to achieve your goals.
        </div>
        <div className="module">
          <strong>Module 6: Workout Plans</strong><br />
          Follow structured workout plans tailored to your goals.
        </div>
        <div className="module">
          <strong>Module 7: Monitoring Progress</strong><br />
          Learn how to monitor and adjust your progress for continuous improvement.
        </div>
      </div>

      <div className="money-back-image">
        <img src={img9} alt="Money Back Guarantee" />
      </div>
      <div className="money-back-text">
          If you follow our program and don’t see results, we offer a 30-day money-back guarantee.
        </div>
  


      {/* New Section */}
      <div className="welcome-section">
        <div className="welcome-heading">
          <strong>Welcome the FitX 120 Weight Gain Program in your life</strong>
        </div>
        <div className="welcome-details">
          <ul>
            <li>An online program to help you kick start your muscle gain journey today and build a stronger, healthier physique in 16 weeks.</li>
            <li>Effective training methods to build overall muscle mass and strength. No gimmicks or shortcuts!</li>
            <li>300+ high-calorie meal plans, strength workouts, and other resources from beginner to pro level to make your muscle gain journey easy and organized.</li>
            <li>16 weekly levels to help you progress every week with new challenges and enjoy the muscle gain process.</li>
            <li>Case studies of people featuring how they gained 10 to 15 kgs within 120 days to inspire you with real success stories.</li>
            <li>Weekly group calls with the coach (Rahul) to get your burning queries answered and an always active Facebook group with your fellow peers to network, work out, and achieve fitness goals together.</li>
          </ul>
        </div>

        {/* Payment Note Section */}
        <div className="payment-note">
          NOTE: If you face any problem regarding payment, contact here <a href="tel:+8610350048">8610350048</a>
        </div>

        {/* Join FitX120 Section */}
        <div className="join-fitx120">
          <a href="#" onClick={handleClick} className="join-fitx120-link">CLICK HERE TO JOIN FITX120</a>
        </div>
      </div>
    </div>
  );
};

export default WeightGain;
