import Navbar from "../components/Navbar";
import {
  Mail,
  Building2,
  MapPin,
  ShieldCheck,
} from "lucide-react";


function DistrictProfile() {
  const savedUser = localStorage.getItem("salvatoreUser");

  const user = savedUser ? JSON.parse(savedUser) : null;


  return (
    <>
      <Navbar />

      <main className="profile-page">
        <div className="profile-container">

          <section className="profile-header">

            <div className="profile-avatar">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "D"}
            </div>


            <div>
              <span className="profile-badge">
                🏛️ District Officer
              </span>

              <h1>
                {user?.name || "District Officer"}
              </h1>

              <p>
                Your Salvatore district monitoring profile.
              </p>
            </div>

          </section>



          <section className="profile-grid">

            <div className="profile-card">

              <Mail size={24} />

              <div>
                <span>Email</span>

                <strong>
                  {user?.email || "officer@example.com"}
                </strong>
              </div>

            </div>



            <div className="profile-card">

              <Building2 size={24} />

              <div>
                <span>Role</span>

                <strong>
                  District Officer
                </strong>
              </div>

            </div>



            <div className="profile-card">

              <MapPin size={24} />

              <div>
                <span>Assigned District</span>

                <strong>
                  Demo District
                </strong>
              </div>

            </div>



            <div className="profile-card">

              <ShieldCheck size={24} />

              <div>
                <span>Access Level</span>

                <strong>
                  District Monitoring
                </strong>
              </div>

            </div>

          </section>

        </div>
      </main>
    </>
  );
}


export default DistrictProfile;