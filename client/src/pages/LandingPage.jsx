import { Link } from "react-router-dom";
import { GraduationCap, Shield } from "lucide-react";
import heroImage from "../assets/img.png"; // Replace with real illustration or NITRIS image

const LandingPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "#F4F6F9",
        fontFamily: "Segoe UI, Roboto, sans-serif",
        color: "#333333",
      }}
    >
      {/* HEADER */}
      <header
        className="sticky top-0 z-50 shadow-sm"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-9 w-9" style={{ color: "#b95c40" }} />
            <h1
              className="text-3xl font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(90deg, #b95c40, #3c5a98)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              NITR Mess Plus
            </h1>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex-grow container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* TEXT BLOCK */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Gateway to{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #b95c40, #3c5a98)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Smarter Campus Mess
                </span>
              </h2>
              <p
                className="text-lg leading-relaxed max-w-xl"
                style={{ color: "#555555" }}
              >
                Manage meals, view records,and stay updated — All in one secure
                and seamless platform designed for NIT Rourkela students and
                Administrators.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 mt-6">
              <Link to="/student/login" className="flex-1">
                <button
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-lg font-semibold shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(90deg, #b95c40, #a04d35)",
                    color: "#fff",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg, #a04d35, #8f3f29)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg, #b95c40, #a04d35)")
                  }
                >
                  <GraduationCap className="h-5 w-5" />
                  Student Portal
                </button>
              </Link>

              <Link to="/admin/login" className="flex-1">
                <button
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-lg font-semibold shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(90deg, #3c5a98, #324c83)",
                    color: "#fff",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg, #324c83, #293e6f)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg, #3c5a98, #324c83)")
                  }
                >
                  <Shield className="h-5 w-5" />
                  Admin Portal
                </button>
              </Link>
            </div>
          </div>

          {/* IMAGE BLOCK */}
          <div className="relative">
            <div
              className="absolute inset-0 rounded-3xl blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at top right, #b95c40 0%, #3c5a98 70%)",
                opacity: 0.2,
              }}
            ></div>
            <img
              src={heroImage}
              alt="NITRIS portal illustration"
              className="relative rounded-3xl shadow-2xl w-200 h-125 object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section
        className="py-12 mt-8 text-center"
        style={{
          background: "linear-gradient(90deg, #b95c40, #3c5a98)",
          color: "#FFFFFF",
        }}
      >
        <h3 className="text-2xl font-semibold mb-3">
          One Platform. Complete Access.
        </h3>
        <p className="text-sm opacity-90">
          A unified experience for students, staff, and administration — secure,
          fast, and easy to use.
        </p>
      </section>

      {/* FOOTER */}
      <footer
        className="border-t"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#e0e0e0",
        }}
      >
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-sm" style={{ color: "#777777" }}>
            © {new Date().getFullYear()} NITRIS Portal — National Institute of
            Technology Rourkela. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
