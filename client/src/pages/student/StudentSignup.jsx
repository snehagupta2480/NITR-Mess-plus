import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserPlus } from "lucide-react";

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    password: "",
    name: "",
    photo: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "nitr_unsigned");
    data.append("cloud_name", "dhgflpbge");

    const res = await fetch("https://api.cloudinary.com/v1_1/dhgflpbge/image/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    if (!json.secure_url) throw new Error("Cloudinary upload failed");
    return json.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let photoUrl = "";

      if (formData.photo) {
        photoUrl = await uploadToCloudinary(formData.photo);
      }

      await signup({
        rollNo: formData.rollNo,
        password: formData.password,
        name: formData.name,
        photoUrl,
      });

      navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Signup failed");
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
              <UserPlus className="h-8 w-8 text-white" />
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
          <p className="text-base text-gray-600 font-medium">Student Signup</p>
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
            >
              Roll Number
            </label>
            <input
              id="rollNo"
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="e.g., 123CS0000"
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
              style={{ borderColor: "#ccc", backgroundColor: "#fff" }}
              onFocus={(e) => (e.target.style.borderColor = "#b95c40")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
              style={{ borderColor: "#ccc", backgroundColor: "#fff" }}
              onFocus={(e) => (e.target.style.borderColor = "#b95c40")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold"
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
              minLength="6"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
              style={{ borderColor: "#ccc", backgroundColor: "#fff" }}
              onFocus={(e) => (e.target.style.borderColor = "#b95c40")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div>
            <label
              htmlFor="photo"
              className="block mb-2 text-sm font-semibold"
            >
              Profile Photo (Optional)
            </label>
            <input
              id="photo"
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
              style={{ borderColor: "#ccc", backgroundColor: "#fff" }}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/student/login"
              className="font-semibold hover:underline"
              style={{
                background: "linear-gradient(90deg, #b95c40, #3c5a98)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Login here
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © {new Date().getFullYear()} National Institute of Technology, Rourkela
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
