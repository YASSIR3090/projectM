import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [skillIcons] = useState(["🔧", "⚡", "🩺", "💻", "🏗️", "🚗", "👨‍🏫", "👨‍🍳"]);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [isHovering, setIsHovering] = useState({
    login: false,
    register: false,
    reset: false
  });
  
  const navigate = useNavigate();

  // Initialize floating icons
  useEffect(() => {
    const icons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      icon: skillIcons[i % skillIcons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 1,
      direction: Math.random() * 360
    }));
    setFloatingIcons(icons);
  }, [skillIcons]);

  // Animate floating icons
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingIcons(prev => prev.map(icon => {
        let newX = icon.x + Math.cos(icon.direction * Math.PI / 180) * icon.speed;
        let newY = icon.y + Math.sin(icon.direction * Math.PI / 180) * icon.speed;
        
        // Bounce off edges
        if (newX < 0 || newX > 100) {
          newX = Math.max(0, Math.min(100, newX));
          icon.direction = 180 - icon.direction;
        }
        if (newY < 0 || newY > 100) {
          newY = Math.max(0, Math.min(100, newY));
          icon.direction = -icon.direction;
        }
        
        // Random direction changes
        if (Math.random() < 0.01) {
          icon.direction = Math.random() * 360;
        }
        
        return { ...icon, x: newX, y: newY };
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(""); // Clear error when user starts typing
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Basic validation
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get users from localStorage
      const allUsers = JSON.parse(localStorage.getItem('allUsersData') || '[]');
      const registrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
      
      // Find user by email and password
      const user = allUsers.find(u => 
        u.email.toLowerCase() === formData.email.toLowerCase() && 
        u.password === formData.password
      );
      
      // Also check registrations if not found in allUsers
      const registeredUser = registrations.find(r => 
        r.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (user || registeredUser) {
        const loggedInUser = user || registeredUser;
        
        // Store authentication data
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userToken", `local-token-${Date.now()}`);
        
        // Store user data if available
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
          // Create basic user data from registration
          const basicUserData = {
            id: loggedInUser.id,
            fullName: loggedInUser.fullName,
            email: loggedInUser.email,
            phoneNumber: loggedInUser.phoneNumber,
            region: loggedInUser.region,
            area: loggedInUser.area,
            fieldOfStudy: loggedInUser.fieldOfStudy,
            educationLevel: loggedInUser.educationLevel,
            registrationDate: loggedInUser.registrationDate
          };
          localStorage.setItem("currentUser", JSON.stringify(basicUserData));
        }

        // Remember me functionality
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Reset login attempts on successful login
        setLoginAttempts(0);
        
        // Show success and redirect
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard");
        }, 500);

      } else {
        setLoginAttempts(prev => prev + 1);
        setError("Invalid email or password. Please check your credentials.");
        
        // Lock account after 3 failed attempts
        if (loginAttempts + 1 >= 3) {
          setError("Account temporarily locked. Please try again in 5 minutes or reset your password.");
          setTimeout(() => {
            setLoginAttempts(0);
            setError("");
          }, 300000); // 5 minutes
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please check your connection and try again.");
      setLoginAttempts(prev => prev + 1);
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Check if demo user exists, if not create one
    const allUsers = JSON.parse(localStorage.getItem('allUsersData') || '[]');
    const demoExists = allUsers.some(u => u.email === "demo@skillsconnect.co.tz");
    
    if (!demoExists) {
      // Create demo user
      const demoUser = {
        id: Date.now(),
        fullName: "Demo Professional",
        email: "demo@skillsconnect.co.tz",
        password: "demo123",
        phoneNumber: "+255 754 000 000",
        region: "Dar es Salaam",
        area: "Kinondoni",
        fieldOfStudy: "Software Engineering",
        educationLevel: "Bachelor's Degree",
        experienceYears: "5+",
        gender: "Male",
        age: 28,
        registrationDate: new Date().toISOString().split('T')[0],
        profilePhoto: `https://i.pravatar.cc/150?img=99`,
        status: "active"
      };
      
      allUsers.push(demoUser);
      localStorage.setItem('allUsersData', JSON.stringify(allUsers));
      
      // Also add to registrations
      const registrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
      registrations.push({
        id: demoUser.id,
        fullName: demoUser.fullName,
        email: demoUser.email,
        phoneNumber: demoUser.phoneNumber,
        area: demoUser.area,
        region: demoUser.region,
        fieldOfStudy: demoUser.fieldOfStudy,
        educationLevel: demoUser.educationLevel,
        registrationDate: new Date().toLocaleString(),
        status: "active"
      });
      localStorage.setItem('userRegistrations', JSON.stringify(registrations));
    }
    
    setFormData({
      email: "demo@skillsconnect.co.tz",
      password: "demo123"
    });
  };

  const handleMouseEnter = (button) => {
    setIsHovering(prev => ({ ...prev, [button]: true }));
  };

  const handleMouseLeave = (button) => {
    setIsHovering(prev => ({ ...prev, [button]: false }));
  };

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      {/* Animated Background Icons */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0
      }}>
        {floatingIcons.map(icon => (
          <div 
            key={icon.id}
            style={{
              position: "absolute",
              fontSize: "1.5rem",
              opacity: 0.1,
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              transform: "translate(-50%, -50%)",
              transition: "left 0.05s linear, top 0.05s linear"
            }}
          >
            {icon.icon}
          </div>
        ))}
        
        {/* Skill Icons Rain */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={`binary-${i}`}
            style={{
              position: "absolute",
              fontFamily: "monospace",
              color: "rgba(0, 168, 255, 0.1)",
              fontSize: "0.9rem",
              animation: `skillFall ${10 + (i % 5)}s linear infinite`,
              left: `${(i * 5)}%`,
              animationDelay: `${i * 0.2}s`,
              whiteSpace: "nowrap"
            }}
          >
            {['⚡', '🔧', '💻', '🏗️', '🩺'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Matrix Code Lines */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.05
      }}>
        {[...Array(8)].map((_, i) => (
          <div 
            key={`matrix-${i}`}
            style={{
              position: "absolute",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #00a8ff, transparent)",
              width: "200px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `matrixLine ${3 + Math.random() * 2}s infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            {/* Animated Header */}
            <div className="text-center mb-5">
              <div style={{
                display: "inline-block",
                position: "relative",
                marginBottom: "1.5rem"
              }}>
                {/* Circuit Animation */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "120px",
                  height: "120px",
                  border: "2px dashed rgba(0, 168, 255, 0.3)",
                  borderRadius: "50%",
                  animation: "spin 20s linear infinite"
                }}></div>
                
                {/* Pulsing Icon */}
                <div style={{
                  fontSize: "3rem",
                  animation: "pulseIcon 2s infinite",
                  background: "linear-gradient(135deg, #00a8ff, #0097e6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block"
                }}>
                  <i className="fas fa-hands-helping"></i>
                </div>
                
                {/* Outer Pulse */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100px",
                  height: "100px",
                  border: "1px solid rgba(0, 168, 255, 0.2)",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                  animationDelay: "0.5s"
                }}></div>
              </div>
              
              <h1 className="text-white mb-2" style={{
                background: "linear-gradient(90deg, #00a8ff, #00d2d3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                fontSize: "2.5rem"
              }}>
                Professional Login
              </h1>
              <p className="text-light" style={{ opacity: 0.8 }}>
                Access your professional dashboard and skills portfolio
              </p>
              
              {/* Platform Stats */}
              <div className="d-flex justify-content-center gap-4 mt-4">
                <div className="text-center">
                  <div className="text-info fs-4 fw-bold">10K+</div>
                  <div className="text-light" style={{ fontSize: "0.8rem", opacity: 0.7 }}>Professionals</div>
                </div>
                <div className="text-center">
                  <div className="text-info fs-4 fw-bold">95%</div>
                  <div className="text-light" style={{ fontSize: "0.8rem", opacity: 0.7 }}>Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-info fs-4 fw-bold">50+</div>
                  <div className="text-light" style={{ fontSize: "0.8rem", opacity: 0.7 }}>Professions</div>
                </div>
              </div>
            </div>

            {/* Login Card */}
            <div className="card shadow border-0 rounded-4 overflow-hidden" style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 168, 255, 0.1)",
              position: "relative",
              zIndex: 2
            }}>
              {/* Card Header Glow */}
              <div className="card-header text-center py-4" style={{
                background: "linear-gradient(90deg, rgba(0, 168, 255, 0.1), rgba(0, 210, 211, 0.1))",
                borderBottom: "1px solid rgba(0, 168, 255, 0.2)",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background: "radial-gradient(circle, rgba(0, 168, 255, 0.1) 0%, transparent 70%)",
                  opacity: isHovering.login ? 0.5 : 0,
                  transition: "opacity 0.3s ease"
                }}></div>
                <h3 className="mb-0 text-white" style={{ position: "relative", zIndex: 1 }}>
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Sign In to Your Professional Account
                </h3>
                <p className="text-light mb-0 mt-2" style={{ opacity: 0.7, fontSize: "0.9rem", position: "relative", zIndex: 1 }}>
                  Enter your credentials to access the skills connection portal
                </p>
              </div>

              <div className="card-body p-4 p-md-5">
                {error && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert" style={{
                    background: "rgba(220, 53, 69, 0.1)",
                    border: "1px solid rgba(220, 53, 69, 0.3)",
                    color: "#ff6b6b",
                    borderRadius: "10px"
                  }}>
                    <i className="fas fa-exclamation-triangle me-3 fs-5"></i>
                    <div>
                      <strong>Error:</strong> {error}
                      {loginAttempts > 0 && (
                        <div className="mt-1" style={{ fontSize: "0.85rem" }}>
                          Failed attempts: {loginAttempts}/3
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label text-light d-flex align-items-center">
                      <i className="fas fa-envelope me-2 text-info"></i>
                      Email Address
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" style={{
                        background: activeField === "email" 
                          ? "rgba(0, 168, 255, 0.2)" 
                          : "rgba(255,255,255,0.05)",
                        border: activeField === "email" 
                          ? "1px solid #00a8ff" 
                          : "1px solid rgba(0, 168, 255, 0.3)",
                        borderRight: "none",
                        transition: "all 0.3s ease"
                      }}>
                        <i className={`fas fa-at ${activeField === "email" ? "text-info" : "text-light"}`}></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        required
                        disabled={isLoading}
                        placeholder="professional@example.com"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: activeField === "email" 
                            ? "1px solid #00a8ff" 
                            : "1px solid rgba(0, 168, 255, 0.3)",
                          borderLeft: "none",
                          color: "white",
                          height: "50px",
                          transition: "all 0.3s ease"
                        }}
                      />
                    </div>
                    <small className="text-muted mt-2 d-block">
                      Enter your registered professional email
                    </small>
                  </div>

                  {/* Password Input */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label text-light d-flex align-items-center">
                      <i className="fas fa-key me-2 text-info"></i>
                      Password
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" style={{
                        background: activeField === "password" 
                          ? "rgba(0, 168, 255, 0.2)" 
                          : "rgba(255,255,255,0.05)",
                        border: activeField === "password" 
                          ? "1px solid #00a8ff" 
                          : "1px solid rgba(0, 168, 255, 0.3)",
                        borderRight: "none",
                        transition: "all 0.3s ease"
                      }}>
                        <i className={`fas fa-lock ${activeField === "password" ? "text-info" : "text-light"}`}></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("password")}
                        onBlur={handleBlur}
                        required
                        disabled={isLoading}
                        placeholder="Enter your password"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: activeField === "password" 
                            ? "1px solid #00a8ff" 
                            : "1px solid rgba(0, 168, 255, 0.3)",
                          borderLeft: "none",
                          color: "white",
                          height: "50px",
                          transition: "all 0.3s ease"
                        }}
                      />
                      <button
                        type="button"
                        className="input-group-text"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: activeField === "password" 
                            ? "1px solid #00a8ff" 
                            : "1px solid rgba(0, 168, 255, 0.3)",
                          borderLeft: "none",
                          color: showPassword ? "#00a8ff" : "#aaa",
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <i className={`fas fa-${showPassword ? "eye-slash" : "eye"}`}></i>
                      </button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">
                        {showPassword ? "Password is visible" : "Password is hidden"}
                      </small>
                      <small>
                        <Link 
                          to="/reset" 
                          className="text-info text-decoration-none"
                          onMouseEnter={() => handleMouseEnter("reset")}
                          onMouseLeave={() => handleMouseLeave("reset")}
                          style={{
                            transform: isHovering.reset ? "translateX(5px)" : "translateX(0)",
                            transition: "transform 0.3s ease"
                          }}
                        >
                          <i className="fas fa-key me-1"></i>
                          Forgot Password?
                        </Link>
                      </small>
                    </div>
                  </div>

                  {/* Remember Me & Options */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          style={{
                            background: rememberMe ? "#00a8ff" : "rgba(255,255,255,0.05)",
                            borderColor: rememberMe ? "#00a8ff" : "rgba(0, 168, 255, 0.3)",
                            cursor: "pointer"
                          }}
                        />
                        <label className="form-check-label text-light" htmlFor="rememberMe">
                          Remember me on this device
                        </label>
                      </div>
                      
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info"
                        onClick={handleDemoLogin}
                        style={{
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          background: "transparent",
                          color: "#00a8ff",
                          padding: "5px 15px",
                          borderRadius: "20px",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "rgba(0, 168, 255, 0.1)";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "transparent";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        <i className="fas fa-magic me-1"></i>
                        Try Demo
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="btn w-100 py-3 fw-bold"
                      disabled={isLoading || loginAttempts >= 3}
                      style={{
                        background: isLoading 
                          ? "linear-gradient(135deg, #666, #888)" 
                          : isHovering.login
                            ? "linear-gradient(135deg, #0097e6, #0088cc)"
                            : "linear-gradient(135deg, #00a8ff, #0097e6)",
                        border: "none",
                        color: "white",
                        borderRadius: "10px",
                        transition: "all 0.3s ease",
                        transform: isHovering.login ? "translateY(-2px)" : "translateY(0)",
                        boxShadow: isHovering.login 
                          ? "0 10px 20px rgba(0, 168, 255, 0.4)" 
                          : "0 5px 15px rgba(0, 168, 255, 0.2)"
                      }}
                      onMouseEnter={() => handleMouseEnter("login")}
                      onMouseLeave={() => handleMouseLeave("login")}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Authenticating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Sign In to Dashboard
                        </>
                      )}
                    </button>
                    
                    {/* Login Progress */}
                    {loginAttempts > 0 && (
                      <div className="mt-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-light">Login Security</small>
                          <small className="text-light">{loginAttempts}/3 attempts</small>
                        </div>
                        <div style={{
                          height: "4px",
                          background: "rgba(255,255,255,0.1)",
                          borderRadius: "2px",
                          overflow: "hidden"
                        }}>
                          <div style={{
                            height: "100%",
                            width: `${(loginAttempts / 3) * 100}%`,
                            background: loginAttempts >= 3 
                              ? "linear-gradient(90deg, #ff6b6b, #ff5252)" 
                              : "linear-gradient(90deg, #00a8ff, #00d2d3)",
                            borderRadius: "2px",
                            transition: "width 0.5s ease"
                          }}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Social Login Divider */}
                  <div className="position-relative text-center mb-4">
                    <hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.1)" }} />
                    <span className="position-absolute top-50 start-50 translate-middle px-3" style={{
                      background: "rgba(0, 0, 0, 0.5)",
                      color: "#aaa",
                      fontSize: "0.85rem"
                    }}>
                      Or continue with
                    </span>
                  </div>

                  {/* Social Login Options */}
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "white",
                          padding: "12px",
                          borderRadius: "10px",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "rgba(255,255,255,0.1)";
                          e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "rgba(255,255,255,0.05)";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        <i className="fab fa-github fs-5"></i>
                        <span>GitHub</span>
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "white",
                          padding: "12px",
                          borderRadius: "10px",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "rgba(255,255,255,0.1)";
                          e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "rgba(255,255,255,0.05)";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        <i className="fab fa-google fs-5"></i>
                        <span>Google</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Registration Link */}
                <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: "rgba(0, 168, 255, 0.2)" }}>
                  <p className="text-light mb-3">
                    <i className="fas fa-user-plus me-2"></i>
                    New to Skills-Connect?
                  </p>
                  <Link 
                    to="/register" 
                    className="btn btn-outline-success w-100 py-3 fw-bold"
                    style={{
                      border: "2px solid #00d2d3",
                      background: isHovering.register ? "rgba(0, 210, 211, 0.1)" : "transparent",
                      color: "#00d2d3",
                      borderRadius: "10px",
                      transition: "all 0.3s ease",
                      transform: isHovering.register ? "translateY(-2px)" : "translateY(0)",
                      boxShadow: isHovering.register ? "0 5px 15px rgba(0, 210, 211, 0.2)" : "none"
                    }}
                    onMouseEnter={() => handleMouseEnter("register")}
                    onMouseLeave={() => handleMouseLeave("register")}
                  >
                    <i className="fas fa-rocket me-2"></i>
                    Create Professional Account
                  </Link>
                  <p className="text-muted mt-3 mb-0" style={{ fontSize: "0.85rem" }}>
                    Join 10,000+ skilled professionals building their careers with us
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="card-footer text-center py-3" style={{
                background: "rgba(0, 0, 0, 0.2)",
                borderTop: "1px solid rgba(0, 168, 255, 0.1)"
              }}>
                <small className="text-light" style={{ opacity: 0.7 }}>
                  <i className="fas fa-shield-alt me-1 text-info"></i>
                  Your data is secured with 256-bit SSL encryption • 
                  <i className="fas fa-bolt ms-2 me-1 text-warning"></i>
                  Fast authentication
                </small>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center mt-4">
              <div className="d-flex justify-content-center gap-3 mb-3">
                <Link to="/" className="text-light text-decoration-none">
                  <i className="fas fa-home me-1"></i> Home
                </Link>
                <span className="text-light">•</span>
                <a href="#" className="text-light text-decoration-none">
                  <i className="fas fa-question-circle me-1"></i> Help
                </a>
                <span className="text-light">•</span>
                <a href="#" className="text-light text-decoration-none">
                  <i className="fas fa-file-alt me-1"></i> Terms
                </a>
                <span className="text-light">•</span>
                <a href="#" className="text-light text-decoration-none">
                  <i className="fas fa-lock me-1"></i> Privacy
                </a>
              </div>
              <p className="text-light mb-0" style={{ opacity: 0.7, fontSize: "0.85rem" }}>
                Need help? Contact support: <a href="mailto:support@skillsconnect.co.tz" className="text-info">support@skillsconnect.co.tz</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles for Animations */}
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes float {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.1;
            }
            25% {
              transform: translateY(-50px) rotate(90deg);
              opacity: 0.2;
            }
            50% {
              transform: translateY(-100px) rotate(180deg);
              opacity: 0.1;
            }
            75% {
              transform: translateY(-50px) rotate(270deg);
              opacity: 0.05;
            }
            100% {
              transform: translateY(0) rotate(360deg);
              opacity: 0.1;
            }
          }
          
          @keyframes skillFall {
            0% {
              transform: translateY(-100px);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
          
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes pulse {
            0% {
              width: 100px;
              height: 100px;
              opacity: 0.5;
            }
            100% {
              width: 150px;
              height: 150px;
              opacity: 0;
            }
          }
          
          @keyframes pulseIcon {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes matrixLine {
            0% {
              transform: translateX(-100px) rotate(45deg);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(100vw) rotate(45deg);
              opacity: 0;
            }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          /* Form element styling */
          .form-control:focus, .form-select:focus, .form-check-input:focus {
            background: rgba(255,255,255,0.1) !important;
            border-color: #00a8ff !important;
            box-shadow: 0 0 0 0.25rem rgba(0, 168, 255, 0.25) !important;
            color: white !important;
          }
          
          .form-control::placeholder {
            color: rgba(255,255,255,0.4) !important;
          }
          
          .form-check-input:checked {
            background-color: #00a8ff !important;
            border-color: #00a8ff !important;
          }
          
          /* Smooth transitions */
          * {
            transition: background-color 0.3s ease, 
                        border-color 0.3s ease, 
                        transform 0.3s ease, 
                        box-shadow 0.3s ease,
                        opacity 0.3s ease;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(0, 168, 255, 0.5);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 168, 255, 0.8);
          }
          
          /* Loading animation */
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          
          .loading-shimmer {
            background: linear-gradient(90deg, 
              rgba(255,255,255,0) 0%, 
              rgba(255,255,255,0.1) 50%, 
              rgba(255,255,255,0) 100%);
            background-size: 200% auto;
            animation: shimmer 2s infinite linear;
          }
        `}
      </style>
      
      {/* Font Awesome Icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
      />
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/brands.min.css" 
      />
    </div>
  );
}

export default Login;