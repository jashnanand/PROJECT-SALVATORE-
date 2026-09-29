import Navbar from "../components/Navbar";
import { Mail, HeartHandshake, Users, CircleCheck } from "lucide-react";

function CounsellorProfile() {
  const savedUser = localStorage.getItem("salvatoreUser");
  const user = savedUser ? JSON.parse(savedUser) : null;

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <div className="profile-container">
          <section className="profile-header counsellor-profile-header">
            <div className="profile-avatar counsellor-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "C"}
            </div>

            <div>
              <span className="profile-badge counsellor-badge">
                👩‍⚕️ Counsellor
              </span>

              <h1>{user?.name || "Counsellor"}</h1>

              <p>Supporting students on their wellness journey.</p>
            </div>
          </section>

          <section className="profile-grid">
            <div className="profile-card">
              <Mail size={24} />
              <div>
                <span>Email</span>
                <strong>{user?.email || "counsellor@example.com"}</strong>
              </div>
            </div>

            <div className="profile-card">
              <HeartHandshake size={24} />
              <div>
                <span>Role</span>
                <strong>Counsellor</strong>
              </div>
            </div>

            <div className="profile-card">
              <Users size={24} />
              <div>
                <span>Assigned Students</span>
                <strong>12 Students</strong>
              </div>
            </div>

            <div className="profile-card">
              <CircleCheck size={24} />
              <div>
                <span>Availability</span>
                <strong>Available Now 🟢</strong>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default CounsellorProfile;