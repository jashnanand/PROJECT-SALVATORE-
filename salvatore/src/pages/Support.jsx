import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Wind,
  Moon,
  MessageCircleHeart,
  Users,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  X,
  Stethoscope,
  Siren,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useState } from "react";


function Support() {
  const navigate = useNavigate();

  const [showSleepTips, setShowSleepTips] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);


  const professionals = [
    {
      name: "Dr. Ananya Sharma",
      role: "Clinical Psychologist",
      location: "Ghaziabad, Uttar Pradesh",
      phone: "+91 98765 43210",
      email: "ananya@example.com",
      type: "Psychologist",
    },
    {
      name: "Dr. Rahul Verma",
      role: "Counselling Psychologist",
      location: "Noida, Uttar Pradesh",
      phone: "+91 98765 43211",
      email: "rahul@example.com",
      type: "Counsellor",
    },
    {
      name: "Dr. Priya Mehta",
      role: "Mental Wellness Consultant",
      location: "Delhi NCR",
      phone: "+91 98765 43212",
      email: "priya@example.com",
      type: "Wellness Support",
    },
  ];


  const handleEmergencyAlert = () => {
    const savedUser = localStorage.getItem("salvatoreUser");

    let user = {
      name: "Anonymous Student",
      email: "Not available",
    };

    if (savedUser) {
      user = JSON.parse(savedUser);
    }


    const emergencyAlert = {
      id: `SOS-${Date.now()}`,
      studentName: user.name || "Anonymous Student",
      email: user.email || "Not available",
      time: new Date().toLocaleString(),
      status: "Active",
      type: "Emergency SOS",
      message: "Student has requested immediate emergency support.",
    };


    const existingAlerts = JSON.parse(
      localStorage.getItem("salvatoreEmergencyAlerts") || "[]"
    );


    existingAlerts.unshift(emergencyAlert);


    localStorage.setItem(
      "salvatoreEmergencyAlerts",
      JSON.stringify(existingAlerts)
    );


    setSosTriggered(true);
  };


  const handleContactCounsellor = () => {
    setShowEmergency(false);
    navigate("/messages");
  };


  return (
    <>
      <Navbar />


      <main className="support-page">
        <div className="support-container">

          <Link to="/" className="back-home-btn">
            <ArrowLeft size={18} />
            Back home
          </Link>


          {/* HERO */}

          <section className="support-hero">
            <div className="support-label">
              <Heart size={17} />
              SUPPORT & WELLNESS
            </div>


            <h1>
              Small steps can make a
              <span> meaningful difference.</span>
            </h1>


            <p>
              Explore simple ways to pause, reflect, manage stress,
              improve your daily routine, and find support when you
              need it.
            </p>
          </section>



          {/* EMERGENCY SUPPORT */}

          <section className="emergency-support-section">

            <div className="emergency-support-content">

              <div className="emergency-icon">
                <Siren size={32} />
              </div>


              <div>
                <span>IMMEDIATE SUPPORT</span>

                <h2>
                  Need urgent help?
                </h2>


                <p>
                  If you feel unsafe, overwhelmed, or believe that
                  you need immediate support, you can quickly trigger
                  an emergency alert or contact available support.
                </p>
              </div>


              <button
                className="emergency-help-btn"
                onClick={() => {
                  setShowEmergency(true);
                  setSosTriggered(false);
                }}
              >
                <AlertTriangle size={20} />
                Get Emergency Help
              </button>

            </div>

          </section>



          {/* DAILY WELLNESS */}

          <section className="support-section">

            <div className="support-section-heading">
              <div>
                <span>DAILY WELLNESS</span>
                <h2>Take care of yourself</h2>
              </div>
            </div>


            <div className="support-grid">

              <div className="support-card yellow-support">

                <div className="support-icon">
                  <Wind size={28} />
                </div>


                <h3>Pause and breathe</h3>


                <p>
                  Take a few minutes to slow down and focus on your
                  breathing. A short pause can help you reset.
                </p>


                <Link to="/breathe">
                  Try breathing exercise
                  <ArrowRight size={17} />
                </Link>

              </div>



              <div className="support-card blue-support">

                <div className="support-icon">
                  <Moon size={28} />
                </div>


                <h3>Protect your sleep</h3>


                <p>
                  Small changes in your evening routine can help you
                  build healthier sleep habits.
                </p>


                <button
                  className="support-action-btn"
                  onClick={() =>
                    setShowSleepTips(!showSleepTips)
                  }
                >
                  {showSleepTips
                    ? "Hide sleep tips"
                    : "View sleep tips"}

                  <ArrowRight size={17} />
                </button>

              </div>



              <div className="support-card pink-support">

                <div className="support-icon">
                  <Sparkles size={28} />
                </div>


                <h3>Reflect on your day</h3>


                <p>
                  Writing down your thoughts can help you understand
                  what has been affecting your mood.
                </p>


                <Link to="/checkin">
                  Start a check-in
                  <ArrowRight size={17} />
                </Link>

              </div>

            </div>



            {/* SLEEP TIPS */}

            {showSleepTips && (

              <div className="sleep-tips-box">

                <div className="sleep-tips-header">

                  <div>
                    <span>BETTER SLEEP HABITS</span>

                    <h2>
                      Simple tips for a healthier sleep routine
                    </h2>
                  </div>


                  <button
                    className="close-tips-btn"
                    onClick={() =>
                      setShowSleepTips(false)
                    }
                  >
                    <X size={20} />
                  </button>

                </div>


                <div className="sleep-tips-grid">

                  <div className="sleep-tip">
                    <span>01</span>
                    <h3>Keep a regular schedule</h3>

                    <p>
                      Try to sleep and wake up at roughly the same
                      time each day.
                    </p>
                  </div>


                  <div className="sleep-tip">
                    <span>02</span>
                    <h3>Reduce screen time</h3>

                    <p>
                      Give yourself some time away from phones and
                      screens before going to bed.
                    </p>
                  </div>


                  <div className="sleep-tip">
                    <span>03</span>
                    <h3>Create a wind-down routine</h3>

                    <p>
                      Try relaxing activities such as reading,
                      calm music, or slow breathing.
                    </p>
                  </div>


                  <div className="sleep-tip">
                    <span>04</span>
                    <h3>Notice your patterns</h3>

                    <p>
                      Use your Salvatore check-ins to observe how
                      sleep and mood may change over time.
                    </p>
                  </div>

                </div>

              </div>

            )}

          </section>



          {/* REACH OUT */}

          <section className="support-section">

            <div className="support-section-heading">
              <div>
                <span>DON'T HANDLE EVERYTHING ALONE</span>

                <h2>
                  Reach out when you need support
                </h2>
              </div>
            </div>


            <div className="support-grid two-grid">

              <div className="support-card green-support">

                <div className="support-icon">
                  <Users size={28} />
                </div>


                <h3>Talk to someone you trust</h3>


                <p>
                  A friend, family member, teacher, or mentor may be
                  able to listen and support you.
                </p>

              </div>



              <div className="support-card red-support">

                <div className="support-icon">
                  <MessageCircleHeart size={28} />
                </div>


                <h3>Consider professional support</h3>


                <p>
                  Speaking with a qualified professional can provide
                  structured support and guidance when difficult
                  feelings continue.
                </p>


                <a href="#professionals">
                  Explore support options
                  <ArrowRight size={17} />
                </a>

              </div>

            </div>

          </section>



          {/* PROFESSIONALS */}

          <section
            className="support-section professionals-section"
            id="professionals"
          >

            <div className="support-section-heading">

              <div>
                <span>PROFESSIONAL SUPPORT</span>
                <h2>Find someone to talk to</h2>
              </div>


              <Stethoscope size={28} />

            </div>


            <p className="demo-notice">
              Demo data for prototype showcase. Verified
              professionals and services can be integrated in the
              full version.
            </p>


            <div className="professionals-grid">

              {professionals.map((person) => (

                <div
                  className="professional-card"
                  key={person.name}
                >

                  <div className="professional-avatar">
                    <Stethoscope size={27} />
                  </div>


                  <div className="professional-type">
                    {person.type}
                  </div>


                  <h3>{person.name}</h3>


                  <p className="professional-role">
                    {person.role}
                  </p>


                  <div className="professional-info">

                    <p>
                      <MapPin size={16} />
                      {person.location}
                    </p>


                    <p>
                      <Phone size={16} />
                      {person.phone}
                    </p>


                    <p>
                      <Mail size={16} />
                      {person.email}
                    </p>

                  </div>


                  <div className="professional-actions">

                    <a
                      href={`tel:${person.phone.replace(
                        /\s/g,
                        ""
                      )}`}
                    >
                      <Phone size={16} />
                      Call
                    </a>


                    <a
                      href={`mailto:${person.email}`}
                    >
                      <Mail size={16} />
                      Email
                    </a>

                  </div>

                </div>

              ))}

            </div>

          </section>



          {/* IMPORTANT NOTE */}

          <section className="support-note">

            <ShieldAlert size={25} />


            <div>
              <h3>Your wellbeing matters.</h3>

              <p>
                Salvatore is a wellness awareness tool and does not
                provide a medical or psychological diagnosis. The
                professional profiles above are sample data used for
                this prototype.
              </p>
            </div>

          </section>


        </div>
      </main>



      {/* EMERGENCY MODAL */}

      {showEmergency && (

        <div className="emergency-modal-overlay">

          <div className="emergency-modal">


            <button
              className="emergency-close-btn"
              onClick={() =>
                setShowEmergency(false)
              }
            >
              <X size={22} />
            </button>


            {!sosTriggered ? (

              <>
                <div className="emergency-modal-icon">
                  <Siren size={38} />
                </div>


                <span className="emergency-modal-label">
                  EMERGENCY SUPPORT
                </span>


                <h2>
                  You don't have to handle this alone.
                </h2>


                <p>
                  Choose the option that feels most appropriate.
                  If you are in immediate danger, contact local
                  emergency services immediately.
                </p>


                <div className="emergency-actions">


                  <a
                    href="tel:112"
                    className="emergency-call-btn"
                  >
                    <Phone size={20} />
                    Call Emergency Services
                  </a>


                  <button
                    className="emergency-counsellor-btn"
                    onClick={handleContactCounsellor}
                  >
                    <MessageCircle size={20} />
                    Contact Counsellor
                  </button>


                  <button
                    className="emergency-sos-btn"
                    onClick={handleEmergencyAlert}
                  >
                    <Siren size={20} />
                    Trigger SOS Alert
                  </button>


                </div>


                <p className="emergency-disclaimer">
                  Prototype demonstration: SOS alerts are securely
                  recorded for counsellor and district-level review.
                </p>

              </>

            ) : (

              <div className="sos-success">


                <div className="sos-success-icon">
                  <CheckCircle2 size={48} />
                </div>


                <span>ALERT SENT</span>


                <h2>
                  Your SOS alert has been recorded.
                </h2>


                <p>
                  The emergency alert has been added to the
                  Salvatore response system for priority review.
                </p>


                <button
                  className="sos-done-btn"
                  onClick={() =>
                    setShowEmergency(false)
                  }
                >
                  Done
                </button>


              </div>

            )}

          </div>

        </div>

      )}

    </>
  );
}


export default Support;