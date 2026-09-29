import { Link } from "react-router-dom";
import {
  Brain,
  Sparkles,
  Heart,
  MessageCircle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              Your personal wellness companion
            </div>

            <h1>
              Understand your mind.
              <span> Feel a little better.</span>
            </h1>

            <p>
              Salvatore helps students reflect on their emotions, track their
              wellness journey, and discover patterns that may need attention.
            </p>

            <div className="hero-buttons">
              <Link to="/checkin" className="primary-btn">
                Start today's check-in
                <ArrowRight size={19} />
              </Link>

              <Link to="/history" className="secondary-btn">
                View my journey
              </Link>
            </div>

            <div className="hero-trust">
              <ShieldCheck size={18} />
              <span>Private • Supportive • Not a medical diagnosis</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="blob blob-yellow"></div>
            <div className="blob blob-pink"></div>
            <div className="blob blob-blue"></div>
            <div className="blob blob-green"></div>

            <div className="mind-card">
              <div className="mind-icon">
                <Brain size={70} strokeWidth={1.6} />
              </div>

              <div className="mind-text">
                <span>Today's wellness</span>
                <strong>You're doing okay ✨</strong>
              </div>

              <div className="wellness-bar">
                <div className="wellness-progress"></div>
              </div>

              <div className="mood-row">
                <span>😔</span>
                <span>😐</span>
                <span className="active-mood">🙂</span>
                <span>😊</span>
              </div>
            </div>

            <div className="floating-card card-one">
              <Heart size={21} />
              <span>Daily reflection</span>
            </div>

            <div className="floating-card card-two">
              <TrendingUp size={21} />
              <span>Track progress</span>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section">
          <div className="section-heading">
            <span>HOW SALVATORE HELPS</span>
            <h2>A small check-in can make a difference.</h2>
            <p>
              Take a moment to understand how you've been feeling and notice
              patterns over time.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card yellow-card">
              <div className="feature-icon">
                <Heart size={27} />
              </div>
              <h3>Check in</h3>
              <p>
                Share your mood, answer a few questions, and reflect on your
                day.
              </p>
            </div>

            <div className="feature-card pink-card">
              <div className="feature-icon">
                <MessageCircle size={27} />
              </div>
              <h3>Express yourself</h3>
              <p>
                Write freely about your thoughts and let Salvatore identify
                emotional patterns.
              </p>
            </div>

            <div className="feature-card blue-card">
              <div className="feature-icon">
                <Brain size={27} />
              </div>
              <h3>Understand patterns</h3>
              <p>
                Combine multiple wellness signals to generate meaningful
                insights.
              </p>
            </div>

            <div className="feature-card green-card">
              <div className="feature-icon">
                <TrendingUp size={27} />
              </div>
              <h3>Grow over time</h3>
              <p>
                Track your wellness journey and notice changes before they
                become overwhelming.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;