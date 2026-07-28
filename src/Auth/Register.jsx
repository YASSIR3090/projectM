import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    area: "",
    region: "",
    cardinalLocation: "",
    fieldOfStudy: "",
    gender: "",
    dateOfBirth: "",
    experienceYears: "0",
    educationLevel: "",
    preferredJobType: ""
  });

  const [files, setFiles] = useState({
    passportPhoto: null,
    cv: null,
    transcript: null,
    skillsCertificate: null,
    birthCertificate: null,
    fieldCertificate: null
  });

  const [filePreviews, setFilePreviews] = useState({
    passportPhoto: null
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [skillIcons] = useState(["🔧", "⚡", "🩺", "💻", "🏗️", "🚗", "👨‍🏫", "👨‍🍳"]);
  const [activeIconIndex, setActiveIconIndex] = useState(0);
  const [isHovering, setIsHovering] = useState({
    submit: false,
    back: false,
    next: false
  });
  
  const navigate = useNavigate();

  // Tanzanian regions and districts
  const tanzaniaRegions = [
    "Dar es Salaam", "Arusha", "Kilimanjaro", "Tanga", "Morogoro", 
    "Pwani", "Dodoma", "Singida", "Tabora", "Rukwa", 
    "Kigoma", "Shinyanga", "Kagera", "Mwanza", "Mara", 
    "Manyara", "Mbeya", "Iringa", "Ruvuma", "Lindi", 
    "Mtwara", "Zanzibar Urban/West", "Zanzibar North", "Zanzibar South"
  ];

  const zanzibarDistricts = [
    "Mjini Magharibi", "Kaskazini A", "Kaskazini B", "Kati", "Kusini",
    "Magharibi", "Mji Mkongwe", "Mjini"
  ];

  // Updated fields for Skills-Connect (All professions)
  const fieldsOfStudy = [
    // Technical & Vocational
    "Electrical Installation", "Electronics Technology", "Welding & Fabrication", 
    "Motor Vehicle Mechanics", "Plumbing", "Refrigeration & Air Conditioning",
    "Carpentry & Joinery", "Masonry & Construction", "Tailoring & Fashion Design",
    
    // Healthcare
    "Clinical Medicine", "Nursing", "Pharmaceutical Sciences", 
    "Laboratory Technology", "Environmental Health", "Medical Attendant",
    "Community Health", "Health Records & Information",
    
    // ICT & Technology
    "Information Technology", "Computer Science", "Software Engineering",
    "Computer Engineering", "Cyber Security", "Data Science",
    "Computer Applications", "Network Administration",
    
    // Engineering
    "Civil Engineering", "Electrical Engineering", "Mechanical Engineering",
    "Automotive Engineering", "Mining Engineering", "Telecommunication Engineering",
    
    // Business & Administration
    "Business Administration", "Accounting", "Procurement & Supply",
    "Marketing", "Human Resource Management", "Office Administration",
    
    // Hospitality & Tourism
    "Hotel Management", "Tourism Management", "Food Production",
    "Travel & Tourism", "Front Office Operations",
    
    // Agriculture
    "Agriculture", "Animal Science", "Agribusiness",
    "Crop Production", "Animal Husbandry", "Horticulture",
    
    // Education
    "Education", "Early Childhood Education", "Educational Management",
    
    // Social Sciences
    "Social Work", "Community Development", "Public Administration",
    
    // Creative Arts
    "Fine Art", "Graphic Design", "Film & Television Production",
    
    // Legal
    "Law", "Political Science", "International Relations"
  ];

  const cardinalLocations = ["North", "South", "East", "West", "Central"];
  
  const educationLevels = [
    "Primary Education (Standard 7)",
    "Secondary Education (O-Level)",
    "Advanced Secondary (A-Level)",
    "Certificate (VETA/Technical College)",
    "Diploma (NTA Level 5-6)",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Professional Certification"
  ];
  
  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship", "Remote"];

  // Rotate skill icons every 2 seconds
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setActiveIconIndex((prev) => (prev + 1) % skillIcons.length);
    }, 2000);
    
    return () => clearInterval(iconInterval);
  }, [skillIcons.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Auto-calculate age from date of birth
    if (name === "dateOfBirth" && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setFormData(prev => ({
        ...prev,
        age: age.toString()
      }));
    }
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file types
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const validPdfTypes = ['application/pdf'];
      
      if (fileType === 'passportPhoto') {
        if (!validImageTypes.includes(file.type)) {
          alert("Please use only JPG, JPEG or PNG images");
          e.target.value = null;
          return;
        }
        
        // Create preview for passport photo
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreviews(prev => ({
            ...prev,
            passportPhoto: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        // For PDF documents
        if (!validPdfTypes.includes(file.type)) {
          alert("Please use PDF files only");
          e.target.value = null;
          return;
        }
      }
      
      setFiles(prev => ({
        ...prev,
        [fileType]: file
      }));
      
      // Show success message
      setSuccess(`✅ ${getFileLabel(fileType)} uploaded successfully`);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const getFileLabel = (fileType) => {
    const labels = {
      passportPhoto: "Passport Photo",
      cv: "CV/Resume",
      transcript: "Academic Transcript",
      skillsCertificate: "Skills Certificate",
      birthCertificate: "Birth Certificate",
      fieldCertificate: "Professional Certificate"
    };
    return labels[fileType] || fileType;
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setProgress(((currentStep + 1) / 4) * 100);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setProgress(((currentStep - 1) / 4) * 100);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.fullName.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phoneNumber.trim() !== "" &&
          formData.dateOfBirth !== ""
        );
      case 2:
        return (
          formData.area.trim() !== "" &&
          formData.region.trim() !== "" &&
          formData.cardinalLocation.trim() !== "" &&
          formData.fieldOfStudy.trim() !== ""
        );
      case 3:
        return (
          formData.educationLevel.trim() !== "" &&
          formData.experienceYears.trim() !== "" &&
          formData.preferredJobType.trim() !== ""
        );
      case 4:
        return (
          formData.password.length >= 6 &&
          formData.password === formData.confirmPassword &&
          files.passportPhoto &&
          files.cv
        );
      default:
        return false;
    }
  };

  // Generate random avatar URL
  const generateAvatarUrl = () => {
    const randomNum = Math.floor(Math.random() * 70) + 1;
    return `https://i.pravatar.cc/150?img=${randomNum}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Final validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // Check required files
    const requiredFiles = ['passportPhoto', 'cv'];
    const missingFiles = requiredFiles.filter(file => !files[file]);
    
    if (missingFiles.length > 0) {
      setError(`Please upload all required files: ${missingFiles.map(f => getFileLabel(f)).join(', ')}`);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate user data
      const userId = Date.now();
      const profilePhotoUrl = filePreviews.passportPhoto || generateAvatarUrl();
      
      const userDataToStore = {
        id: userId,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        age: formData.age,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        area: formData.area,
        region: formData.region,
        cardinalLocation: formData.cardinalLocation,
        fieldOfStudy: formData.fieldOfStudy,
        educationLevel: formData.educationLevel,
        experienceYears: formData.experienceYears,
        preferredJobType: formData.preferredJobType,
        registrationDate: new Date().toISOString().split('T')[0],
        profilePhoto: profilePhotoUrl,
        cv: files.cv ? files.cv.name : "cv.pdf",
        transcript: files.transcript ? files.transcript.name : null,
        certificates: files.skillsCertificate ? [files.skillsCertificate.name] : [],
        birthCertificate: files.birthCertificate ? files.birthCertificate.name : null,
        fieldCertificate: files.fieldCertificate ? files.fieldCertificate.name : null,
        status: "active"
      };

      // Store authentication data
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(userDataToStore));
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userToken", `local-token-${userId}`);

      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem('allUsersData') || '[]');
      
      // Add new user to the list
      existingUsers.push(userDataToStore);
      localStorage.setItem('allUsersData', JSON.stringify(existingUsers));

      // Store for admin management
      const registrationData = {
        id: userId,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        area: formData.area,
        region: formData.region,
        fieldOfStudy: formData.fieldOfStudy,
        educationLevel: formData.educationLevel,
        registrationDate: new Date().toLocaleString(),
        status: "active"
      };

      const existingRegistrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
      existingRegistrations.push(registrationData);
      localStorage.setItem('userRegistrations', JSON.stringify(existingRegistrations));

      // Show success message
      setSuccess("🎉 Registration successful! Redirecting to dashboard...");
      
      // Add some demo users if this is the first registration
      if (existingUsers.length <= 1) {
        addDemoUsers();
      }

      // Redirect to dashboard after delay
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration error: " + error.message);
      setIsLoading(false);
    }
  };

  // Add demo users for testing
  const addDemoUsers = () => {
    const professions = [
      "Electrical Installation", "Civil Engineering", "Clinical Medicine", 
      "Software Engineering", "Business Administration", "Hotel Management",
      "Agriculture", "Mechanical Engineering", "Nursing", "Education"
    ];
    
    const regions = ["Dar es Salaam", "Arusha", "Mwanza", "Mbeya", "Dodoma", "Tanga"];
    const educationLevels = ["Certificate", "Diploma", "Bachelor's Degree", "Master's Degree"];
    
    const demoUsers = [];
    
    for (let i = 1; i <= 15; i++) {
      const profession = professions[Math.floor(Math.random() * professions.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      const education = educationLevels[Math.floor(Math.random() * educationLevels.length)];
      
      demoUsers.push({
        id: `demo-${i}`,
        fullName: `Demo User ${i} ${["John", "Mary", "Peter", "Sarah", "James", "Anna"][i % 6]} ${["Doe", "Smith", "Johnson", "Williams", "Brown", "Jones"][i % 6]}`,
        email: `demo${i}@example.com`,
        phoneNumber: `+255 7${Math.floor(Math.random() * 90000000 + 10000000)}`,
        region: region,
        area: `${region} Area ${i % 5 + 1}`,
        fieldOfStudy: profession,
        educationLevel: education,
        experienceYears: `${Math.floor(Math.random() * 10)}`,
        gender: i % 2 === 0 ? "Male" : "Female",
        age: Math.floor(Math.random() * 30) + 22,
        registrationDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
        profilePhoto: `https://i.pravatar.cc/150?img=${i % 70}`,
        cv: `cv_demo_${i}.pdf`,
        transcript: `transcript_demo_${i}.pdf`,
        certificates: [`certificate_${i % 3 + 1}.pdf`],
        birthCertificate: `birth_certificate_${i}.pdf`,
        status: "active"
      });
    }
    
    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('allUsersData') || '[]');
    
    // Add demo users
    const allUsers = [...existingUsers, ...demoUsers];
    localStorage.setItem('allUsersData', JSON.stringify(allUsers));
    
    console.log(`Added ${demoUsers.length} demo users to localStorage`);
  };

  const handleMouseEnter = (button) => {
    setIsHovering(prev => ({ ...prev, [button]: true }));
  };

  const handleMouseLeave = (button) => {
    setIsHovering(prev => ({ ...prev, [button]: false }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        position: "relative",
        overflow: "hidden",
        padding: "20px 0"
      }}
    >
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0
      }}>
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            style={{
              position: "absolute",
              fontSize: "1.2rem",
              opacity: 0.1,
              animation: `float ${15 + i}s infinite linear`,
              left: `${(i * 6.66)}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {skillIcons[i % skillIcons.length]}
          </div>
        ))}
        
        {/* Connection Lines Animation */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`connection-${i}`}
            style={{
              position: "absolute",
              fontFamily: "monospace",
              color: "rgba(0, 168, 255, 0.1)",
              fontSize: "0.9rem",
              animation: `codeSlide ${10 + (i % 5)}s linear infinite`,
              left: `${(i * 12.5)}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              whiteSpace: "nowrap"
            }}
          >
            {`Skills > Connect > Opportunities > Success`}
          </div>
        ))}
      </div>

      <div className="container col-md-10 col-lg-8" style={{ position: "relative", zIndex: 2 }}>
        {/* Animated Header */}
        <div className="text-center mb-4">
          <div style={{
            display: "inline-block",
            position: "relative",
            marginBottom: "1rem"
          }}>
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
            
            <div style={{
              fontSize: "3.5rem",
              animation: "pulseIcon 2s infinite",
              display: "inline-block"
            }}>
              {skillIcons[activeIconIndex]}
            </div>
            
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
            fontWeight: "bold"
          }}>
            Professional Registration
          </h1>
          <p className="text-light">Join Tanzania's Premier Skills Connection Platform</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem"
          }}>
            {["Personal Info", "Location & Skills", "Education", "Documents"].map((step, index) => (
              <div key={index} className="text-center" style={{ flex: 1 }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: currentStep > index + 1 ? "#00a8ff" : currentStep === index + 1 ? "#00a8ff" : "rgba(255,255,255,0.1)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.5rem",
                  border: currentStep === index + 1 ? "2px solid #00d2d3" : "none",
                  boxShadow: currentStep === index + 1 ? "0 0 15px rgba(0, 210, 211, 0.5)" : "none"
                }}>
                  {currentStep > index + 1 ? "✓" : index + 1}
                </div>
                <span className="text-white" style={{
                  fontSize: "0.9rem",
                  fontWeight: currentStep === index + 1 ? "bold" : "normal"
                }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          
          <div style={{
            height: "6px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "3px",
            overflow: "hidden",
            marginBottom: "2rem"
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #00a8ff, #00d2d3)",
              borderRadius: "3px",
              transition: "width 0.5s ease",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                right: "-5px",
                top: "-2px",
                width: "10px",
                height: "10px",
                background: "#00d2d3",
                borderRadius: "50%",
                boxShadow: "0 0 10px rgba(0, 210, 211, 0.8)"
              }}></div>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 rounded-4 overflow-hidden" style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 168, 255, 0.1)"
        }}>
          <div className="card-header" style={{
            background: "linear-gradient(90deg, rgba(0, 168, 255, 0.1), rgba(0, 210, 211, 0.1))",
            borderBottom: "1px solid rgba(0, 168, 255, 0.2)"
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-white">
                Step {currentStep}: {currentStep === 1 ? "Personal Information" : currentStep === 2 ? "Location & Professional Skills" : currentStep === 3 ? "Education & Career" : "Documents & Security"}
              </h3>
              <span className="badge" style={{
                background: "rgba(0, 168, 255, 0.2)",
                color: "#00a8ff",
                padding: "8px 15px",
                borderRadius: "20px"
              }}>
                {skillIcons[activeIconIndex]} Professional Account
              </span>
            </div>
          </div>

          <div className="card-body p-4">
            {error && (
              <div className="alert alert-danger d-flex align-items-center" role="alert" style={{
                background: "rgba(220, 53, 69, 0.1)",
                border: "1px solid rgba(220, 53, 69, 0.3)",
                color: "#ff6b6b"
              }}>
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success d-flex align-items-center" role="alert" style={{
                background: "rgba(40, 167, 69, 0.1)",
                border: "1px solid rgba(40, 167, 69, 0.3)",
                color: "#28a745"
              }}>
                <i className="fas fa-check-circle me-2"></i>
                {success}
              </div>
            )}

            <form onSubmit={currentStep === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div style={{ animation: "fadeIn 0.5s ease" }}>
                  <h5 className="text-light mb-4">
                    <i className="fas fa-user-circle me-2"></i>
                    Personal Information
                  </h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="fullName" className="form-label text-light">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        placeholder="John Doe"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label text-light">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-3"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        placeholder="professional@example.com"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="phoneNumber" className="form-label text-light">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{
                          background: "rgba(0, 168, 255, 0.2)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "#00a8ff"
                        }}>+255</span>
                        <input
                          type="tel"
                          className="form-control rounded-3"
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="712345678"
                          pattern="[0-9]{9}"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(0, 168, 255, 0.3)",
                            color: "white"
                          }}
                        />
                      </div>
                      <small className="text-muted">
                        Example: 712345678 (9 digits)
                      </small>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="dateOfBirth" className="form-label text-light">
                        Date of Birth <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control rounded-3"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="age" className="form-label text-light">
                        Age
                      </label>
                      <input
                        type="number"
                        className="form-control rounded-3"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        min="18"
                        max="100"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      />
                      <small className="text-muted">
                        Auto-calculated from date of birth
                      </small>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="gender" className="form-label text-light">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select rounded-3"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location & Field of Study */}
              {currentStep === 2 && (
                <div style={{ animation: "fadeIn 0.5s ease" }}>
                  <h5 className="text-light mb-4">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Location & Professional Skills
                  </h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="region" className="form-label text-light">
                        Region <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select rounded-3"
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      >
                        <option value="">Select Region</option>
                        {tanzaniaRegions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="area" className="form-label text-light">
                        District/Area <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        placeholder="e.g., Ilala, Kinondoni, Arusha CBD"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      />
                      {formData.region && formData.region.includes("Zanzibar") && (
                        <small className="text-muted">
                          Examples: {zanzibarDistricts.slice(0, 3).join(", ")}...
                        </small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="cardinalLocation" className="form-label text-light">
                        Cardinal Location <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select rounded-3"
                        id="cardinalLocation"
                        name="cardinalLocation"
                        value={formData.cardinalLocation}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      >
                        <option value="">Select Location</option>
                        {cardinalLocations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="fieldOfStudy" className="form-label text-light">
                        Field of Expertise <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select rounded-3"
                        id="fieldOfStudy"
                        name="fieldOfStudy"
                        value={formData.fieldOfStudy}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      >
                        <option value="">Select Your Field</option>
                        {fieldsOfStudy.map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="experienceYears" className="form-label text-light">
                        Years of Experience
                      </label>
                      <select
                        className="form-select rounded-3"
                        id="experienceYears"
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      >
                        <option value="0">No experience</option>
                        <option value="1">Less than 1 year</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Education & Career */}
              {currentStep === 3 && (
                <div style={{ animation: "fadeIn 0.5s ease" }}>
                  <h5 className="text-light mb-4">
                    <i className="fas fa-graduation-cap me-2"></i>
                    Education & Career Preferences
                  </h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="educationLevel" className="form-label text-light">
                        Education Level <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select rounded-3"
                        id="educationLevel"
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      >
                        <option value="">Select Education Level</option>
                        {educationLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="preferredJobType" className="form-label text-light">
                        Preferred Job Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select rounded-3"
                        id="preferredJobType"
                        name="preferredJobType"
                        value={formData.preferredJobType}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(0, 168, 255, 0.3)",
                          color: "white"
                        }}
                      >
                        <option value="">Select Job Type</option>
                        {jobTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 mb-4">
                      <div className="card" style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px dashed rgba(0, 168, 255, 0.3)"
                      }}>
                        <div className="card-body">
                          <h6 className="text-light mb-3">
                            <i className="fas fa-info-circle me-2 text-info"></i>
                            Additional Information
                          </h6>
                          <p className="text-light mb-0" style={{ opacity: 0.8, fontSize: "0.9rem" }}>
                            This information will help employers and clients find you more easily based on your skills and qualifications.
                            After registration, you will be redirected to your professional dashboard where you can connect with opportunities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Documents & Security */}
              {currentStep === 4 && (
                <div style={{ animation: "fadeIn 0.5s ease" }}>
                  <h5 className="text-light mb-4">
                    <i className="fas fa-file-alt me-2"></i>
                    Documents & Security
                  </h5>
                  
                  {/* File Upload Section - First Border */}
                  <div className="mb-4 p-4 rounded-3" style={{
                    border: "2px solid rgba(0, 168, 255, 0.3)",
                    background: "rgba(255,255,255,0.02)"
                  }}>
                    <h6 className="text-light mb-3">
                      <i className="fas fa-upload me-2"></i>
                      Upload Documents
                    </h6>
                    
                    <div className="row">
                      {/* Passport Photo (Image) */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="passportPhoto" className="form-label text-light">
                          Passport Photo <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className="form-control rounded-3"
                          id="passportPhoto"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, 'passportPhoto')}
                          required
                          disabled={isLoading}
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(0, 168, 255, 0.3)",
                            color: "white",
                            padding: "10px"
                          }}
                        />
                        <small className="text-muted d-block mt-1">
                          Professional passport photo (JPG/PNG)
                        </small>
                        {filePreviews.passportPhoto && (
                          <div className="mt-2">
                            <img
                              src={filePreviews.passportPhoto}
                              alt="Passport preview"
                              className="img-thumbnail rounded-3"
                              style={{ 
                                maxHeight: "100px",
                                border: "2px solid rgba(0, 168, 255, 0.5)"
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* CV/Resume */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cv" className="form-label text-light">
                          CV/Resume <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className="form-control rounded-3"
                          id="cv"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, 'cv')}
                          required
                          disabled={isLoading}
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(0, 168, 255, 0.3)",
                            color: "white",
                            padding: "10px"
                          }}
                        />
                        <small className="text-muted d-block mt-1">
                          PDF format only
                        </small>
                        {files.cv && (
                          <div className="mt-2">
                            <span className="badge bg-success">
                              <i className="fas fa-check me-1"></i>
                              Uploaded
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Transcript */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="transcript" className="form-label text-light">
                          Academic Transcript
                        </label>
                        <input
                          type="file"
                          className="form-control rounded-3"
                          id="transcript"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, 'transcript')}
                          disabled={isLoading}
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(0, 168, 255, 0.3)",
                            color: "white",
                            padding: "10px"
                          }}
                        />
                        <small className="text-muted d-block mt-1">
                          Academic performance transcript (PDF)
                        </small>
                      </div>

                      {/* Skills Certificate */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="skillsCertificate" className="form-label text-light">
                          Skills Certificate
                        </label>
                        <input
                          type="file"
                          className="form-control rounded-3"
                          id="skillsCertificate"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, 'skillsCertificate')}
                          disabled={isLoading}
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(0, 168, 255, 0.3)",
                            color: "white",
                            padding: "10px"
                          }}
                        />
                        <small className="text-muted d-block mt-1">
                          Professional skills certificate (PDF)
                        </small>
                      </div>

                      {/* Birth Certificate */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="birthCertificate" className="form-label text-light">
                          Birth Certificate
                        </label>
                        <input
                          type="file"
                          className="form-control rounded-3"
                          id="birthCertificate"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, 'birthCertificate')}
                          disabled={isLoading}
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(0, 168, 255, 0.3)",
                            color: "white",
                            padding: "10px"
                          }}
                        />
                        <small className="text-muted d-block mt-1">
                          Birth certificate (PDF)
                        </small>
                      </div>

                      {/* Field Certificate */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="fieldCertificate" className="form-label text-light">
                          Professional Certificate
                        </label>
                        <input
                          type="file"
                          className="form-control rounded-3"
                          id="fieldCertificate"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, 'fieldCertificate')}
                          disabled={isLoading}
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(0, 168, 255, 0.3)",
                            color: "white",
                            padding: "10px"
                          }}
                        />
                        <small className="text-muted d-block mt-1">
                          Course or training certificate (PDF)
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Second Border - Security Section */}
                  <div className="p-4 rounded-3" style={{
                    border: "2px solid rgba(0, 210, 211, 0.3)",
                    background: "rgba(255,255,255,0.02)",
                    marginTop: "20px"
                  }}>
                    <h6 className="text-light mb-3">
                      <i className="fas fa-shield-alt me-2"></i>
                      Account Security
                    </h6>
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="password" className="form-label text-light">
                          Password <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control rounded-3"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          minLength="6"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: formData.password.length >= 6 
                              ? "1px solid #00d2d3" 
                              : "1px solid rgba(0, 168, 255, 0.3)",
                            color: "white"
                          }}
                        />
                        <div className="password-strength mt-2">
                          <div style={{
                            height: "4px",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "2px",
                            overflow: "hidden"
                          }}>
                            <div style={{
                              height: "100%",
                              width: `${Math.min(formData.password.length * 10, 100)}%`,
                              background: formData.password.length >= 8 ? "#00d2d3" : 
                                        formData.password.length >= 6 ? "#00a8ff" : "#ff6b6b",
                              borderRadius: "2px",
                              transition: "width 0.3s ease"
                            }}></div>
                          </div>
                          <small className="text-muted">
                            {formData.password.length >= 8 ? "Strong password ✓" : 
                             formData.password.length >= 6 ? "Moderate password" : 
                             "Weak password - at least 6 characters"}
                          </small>
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="confirmPassword" className="form-label text-light">
                          Confirm Password <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control rounded-3"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: formData.password === formData.confirmPassword && formData.password !== "" 
                              ? "1px solid #00d2d3" 
                              : "1px solid rgba(0, 168, 255, 0.3)",
                            color: "white"
                          }}
                        />
                        {formData.password === formData.confirmPassword && formData.password !== "" && (
                          <small className="text-success">
                            <i className="fas fa-check-circle me-1"></i>
                            Passwords match
                          </small>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="terms"
                            required
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(0, 168, 255, 0.3)"
                            }}
                          />
                          <label className="form-check-label text-light" htmlFor="terms">
                            I agree to the <a href="#" className="text-info">Terms of Service</a> and 
                            <a href="#" className="text-info"> Privacy Policy</a> of Skills-Connect platform
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top" style={{
                borderColor: "rgba(0, 168, 255, 0.2)"
              }}>
                <div>
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      className="btn btn-outline-light rounded-3 px-4 py-2"
                      onClick={prevStep}
                      disabled={isLoading}
                      style={{
                        border: "1px solid rgba(255,255,255,0.3)",
                        background: isHovering.back ? "rgba(255,255,255,0.1)" : "transparent",
                        color: "white",
                        transition: "all 0.3s ease",
                        transform: isHovering.back ? "translateX(-5px)" : "translateX(0)"
                      }}
                      onMouseEnter={() => handleMouseEnter("back")}
                      onMouseLeave={() => handleMouseLeave("back")}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Back
                    </button>
                  ) : (
                    <Link to="/login" className="btn btn-outline-light rounded-3 px-4 py-2 text-decoration-none">
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Back to Login
                    </Link>
                  )}
                </div>

                <div className="d-flex gap-3">
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      className="btn btn-primary rounded-3 px-4 py-2 fw-bold"
                      onClick={nextStep}
                      disabled={!validateStep(currentStep)}
                      style={{
                        background: validateStep(currentStep) 
                          ? "linear-gradient(135deg, #00a8ff, #0097e6)" 
                          : "rgba(0, 168, 255, 0.3)",
                        border: "none",
                        color: "white",
                        transition: "all 0.3s ease",
                        transform: isHovering.next ? "scale(1.05)" : "scale(1)",
                        opacity: validateStep(currentStep) ? 1 : 0.5
                      }}
                      onMouseEnter={() => handleMouseEnter("next")}
                      onMouseLeave={() => handleMouseLeave("next")}
                    >
                      Continue
                      <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-success rounded-3 px-4 py-2 fw-bold"
                      disabled={isLoading || !validateStep(4)}
                      style={{
                        background: isLoading 
                          ? "linear-gradient(135deg, #666, #888)" 
                          : isHovering.submit
                            ? "linear-gradient(135deg, #00a8a8, #008b8b)"
                            : "linear-gradient(135deg, #00d2d3, #00a8a8)",
                        border: "none",
                        color: "white",
                        transition: "all 0.3s ease",
                        transform: isHovering.submit ? "scale(1.05)" : "scale(1)",
                        opacity: validateStep(4) ? 1 : 0.5,
                        boxShadow: isHovering.submit 
                          ? "0 10px 20px rgba(0, 210, 211, 0.4)" 
                          : "none"
                      }}
                      onMouseEnter={() => handleMouseEnter("submit")}
                      onMouseLeave={() => handleMouseLeave("submit")}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-rocket me-2"></i>
                          Complete Registration
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Step Indicator */}
              <div className="text-center mt-3">
                <small className="text-muted">
                  Step {currentStep} of 4 • {Math.round(progress)}% Completed
                </small>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="card-footer text-center" style={{
            background: "rgba(0, 0, 0, 0.2)",
            borderTop: "1px solid rgba(0, 168, 255, 0.1)"
          }}>
            <small className="text-light" style={{ opacity: 0.7 }}>
              <i className="fas fa-info-circle me-1"></i>
              Local Storage Mode - No backend required • 
              <i className="fas fa-hands-helping ms-2 me-1"></i>
              After registration, you will be redirected to your professional dashboard
            </small>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-4">
          <div className="d-flex justify-content-center gap-4 mb-3">
            <Link to="/" className="text-light text-decoration-none">
              <i className="fas fa-home me-1"></i> Home
            </Link>
            <a href="#" className="text-light text-decoration-none">
              <i className="fas fa-question-circle me-1"></i> Help Center
            </a>
            <a href="#" className="text-light text-decoration-none">
              <i className="fas fa-envelope me-1"></i> support@skillsconnect.co.tz
            </a>
            <a href="#" className="text-light text-decoration-none">
              <i className="fas fa-phone me-1"></i> +255 754 000 000
            </a>
          </div>
          <p className="text-light mb-0">
            Already have an account? <Link to="/login" className="text-info">Login here</Link>
          </p>
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
          
          @keyframes codeSlide {
            0% {
              transform: translateY(-100px) translateX(-100px);
              opacity: 0;
            }
            10% {
              opacity: 0.1;
            }
            90% {
              opacity: 0.1;
            }
            100% {
              transform: translateY(100vh) translateX(100px);
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
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes successPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          .form-control:focus, .form-select:focus {
            background: rgba(255,255,255,0.1) !important;
            border-color: #00a8ff !important;
            box-shadow: 0 0 0 0.25rem rgba(0, 168, 255, 0.25) !important;
            color: white !important;
          }
          
          .form-control::placeholder {
            color: rgba(255,255,255,0.4) !important;
          }
          
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            opacity: 0.7;
          }
          
          .btn:hover {
            transform: translateY(-2px);
            transition: all 0.3s ease;
          }
          
          .file-upload-area {
            border: 2px dashed #00a8ff;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            background: rgba(0, 168, 255, 0.05);
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .file-upload-area:hover {
            background: rgba(0, 168, 255, 0.1);
            border-color: #00d2d3;
          }
          
          .file-upload-area.dragover {
            background: rgba(0, 168, 255, 0.2);
            border-color: #00d2d3;
            transform: scale(1.02);
          }
          
          .success-animation {
            animation: successPulse 2s infinite;
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

export default Register;