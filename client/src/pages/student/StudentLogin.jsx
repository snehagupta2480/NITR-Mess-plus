import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GraduationCap } from "lucide-react";

const StudentLogin = () => {
  const [formData, setFormData] = useState({ rollNo: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(formData.rollNo, formData.password);
      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Roll Number or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #f4f6f9 0%, #e8ecf1 100%)",
        fontFamily: "Segoe UI, Roboto, sans-serif",
        color: "#333333",
      }}
    >
      <div
        className="relative bg-white/95 p-10 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md border"
        style={{
          borderColor: "#f0f0f0",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div
              className="p-3 rounded-full shadow-md"
              style={{
                background: "linear-gradient(135deg, #b95c40, #3c5a98)",
              }}
            >
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1
            className="text-3xl font-extrabold tracking-tight mb-1"
            style={{
              background: "linear-gradient(90deg, #b95c40, #3c5a98)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NITR Mess Plus
          </h1>
          <p className="text-base text-gray-600 font-medium">Student Login</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className="mb-5 px-4 py-3 rounded-lg text-sm font-medium border"
            style={{
              color: "#E53935",
              backgroundColor: "#ffeaea",
              borderColor: "#E53935",
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="rollNo"
              className="block mb-2 text-sm font-semibold"
              style={{ color: "#333333" }}
            >
              Student Roll Number
            </label>
            <input
              id="rollNo"
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="123CS0000"
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
              style={{
                borderColor: "#ccc",
                backgroundColor: "#fff",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#b95c40")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold"
              style={{ color: "#333333" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
              style={{
                borderColor: "#ccc",
                backgroundColor: "#fff",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#b95c40")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg"
            style={{
              background: "linear-gradient(90deg, #b95c40, #3c5a98)",
              color: "#fff",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer / Sign up link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/student/signup"
              className="font-semibold"
              style={{
                color: "#3c5a98",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Sign up here
            </Link>
          </p>
          <p className="text-sm text-gray-500 mt-4">
            © {new Date().getFullYear()} National Institute of Technology, Rourkela
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
