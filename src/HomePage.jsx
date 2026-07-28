import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import zawaLogo from "./Imgs/zawaLogo.png";

function HomePage() {
  const [activeAnimation, setActiveAnimation] = useState(0);
  const [isHovering, setIsHovering] = useState({
    developer: false,
    admin: false
  });
  
  // Cycle through animations every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnimation((prev) => (prev + 1) % 4);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (card) => {
    setIsHovering(prev => ({ ...prev, [card]: true }));
  };

  const handleMouseLeave = (card) => {
    setIsHovering(prev => ({ ...prev, [card]: false }));
  };

  return (
    <div 
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(-45deg, #001f3f, #003366, #004080, #00509e)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite'
      }}
    >
      {/* Floating Tech Animations */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            style={{
              position: 'absolute',
              fontSize: '1.5rem',
              opacity: 0.1,
              animation: `float ${15 + i}s infinite linear`,
              left: `${10 + (i * 7)}%`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            {['🔧', '⚡', '🩺', '💻', '🏗️', '🚗', '👨‍🏫', '👨‍🍳', '📊', '⚖️', '🎨', '🚜'][i % 12]}
          </div>
        ))}
      </div>

      {/* Binary Code Animation */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.05
      }}>
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            style={{
              position: 'absolute',
              fontSize: '0.8rem',
              fontFamily: 'monospace',
              color: '#00a8ff',
              animation: `binaryFall ${10 + (i % 5)}s linear infinite`,
              left: `${(i * 3.33)}%`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            {/* Logo and Heading with Tech Animation */}
            <div className="mb-5" style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                display: 'inline-block',
                marginBottom: '1.5rem'
              }}>
                {/* Circuit Animation */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '150px',
                  height: '150px',
                  border: '2px dashed rgba(0, 150, 255, 0.5)',
                  borderRadius: '50%',
                  animation: 'spin 20s linear infinite'
                }}></div>
                
                {/* Logo */}
                <img
                  src={zawaLogo}
                  alt="Skills-Connect Logo"
                  className="img-fluid"
                  style={{ 
                    maxHeight: '120px', 
                    filter: 'brightness(0) invert(1)',
                    position: 'relative',
                    zIndex: 2
                  }}
                />
                
                {/* Pulse Animation */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '160px',
                  height: '160px',
                  border: '2px solid rgba(0, 200, 255, 0.3)',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></div>
              </div>
              
              {/* Typing Animation Heading */}
              <h1 
                className="text-white display-3 fw-bold mb-3"
                style={{
                  overflow: 'hidden',
                  borderRight: '3px solid #00a8ff',
                  whiteSpace: 'nowrap',
                  margin: '0 auto',
                  animation: 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite'
                }}
              >
                Welcome to Skills-Connect
              </h1>
              
              {/* Code Line Animation */}
              <div style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i}
                    style={{
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #00a8ff, transparent)',
                      margin: '5px 0',
                      animation: `slide 2s infinite`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  ></div>
                ))}
              </div>
              
              <p className="text-white lead mb-5">
                Tanzania's Premier Skills Connection Platform - Connecting Skilled Professionals with Opportunities
              </p>
            </div>
            
            {/* Animated Stats */}
            <div className="row justify-content-center mb-5">
              {[
                { icon: '👷', number: '10,000+', label: 'Skilled Workers' },
                { icon: '🔧', number: '50+', label: 'Professions' },
                { icon: '📍', number: '26', label: 'Regions' },
                { icon: '🎯', number: '95%', label: 'Success Rate' }
              ].map((stat, index) => (
                <div key={index} className="col-md-3 mb-4">
                  <div 
                    style={{
                      background: activeAnimation === index 
                        ? 'rgba(0, 150, 255, 0.1)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '15px',
                      padding: '20px',
                      transition: 'all 0.3s ease',
                      border: activeAnimation === index 
                        ? '1px solid #00a8ff' 
                        : '1px solid transparent',
                      transform: activeAnimation === index 
                        ? 'translateY(-10px)' 
                        : 'translateY(0)',
                      boxShadow: activeAnimation === index 
                        ? '0 10px 30px rgba(0, 168, 255, 0.3)' 
                        : 'none'
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                      {stat.icon}
                    </div>
                    <h3 style={{ color: '#00a8ff', fontWeight: 'bold', margin: '10px 0' }}>
                      {stat.number}
                    </h3>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Login Options with Tech Theme - FIXED ROUTING */}
            <div className="row justify-content-center">
              {/* Skilled Professional Card */}
              <div className="col-lg-5 col-md-6 mb-4">
                <div 
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: isHovering.developer ? '1px solid #00a8ff' : '1px solid rgba(0, 150, 255, 0.2)',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: isHovering.developer ? 'translateY(-10px)' : 'translateY(0)',
                    boxShadow: isHovering.developer ? '0 20px 40px rgba(0, 168, 255, 0.3)' : 'none'
                  }}
                  onMouseEnter={() => handleMouseEnter('developer')}
                  onMouseLeave={() => handleMouseLeave('developer')}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'radial-gradient(circle, rgba(0, 168, 255, 0.1) 0%, transparent 70%)',
                      opacity: isHovering.developer ? 1 : 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  ></div>
                  
                  <div className="card-body p-5 text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                      <div 
                        style={{
                          width: '90px',
                          height: '90px',
                          background: 'linear-gradient(135deg, #00a8ff, #0097e6)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '2rem',
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        <i className="fas fa-tools"></i>
                      </div>
                      <div 
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          left: '-5px',
                          right: '-5px',
                          bottom: '-5px',
                          border: '2px dashed rgba(0, 168, 255, 0.5)',
                          borderRadius: '50%',
                          animation: 'spin 10s linear infinite'
                        }}
                      ></div>
                    </div>
                    <h3 className="card-title mb-3 text-white">Skilled Professional</h3>
                    <p className="card-text text-light mb-4" style={{ opacity: 0.8 }}>
                      Register your skills, showcase your expertise, and connect with opportunities across Tanzania
                    </p>
                    
                    {/* Fixed: Using Link component with proper routing */}
                    <Link 
                      to="/login" 
                      style={{
                        background: 'linear-gradient(135deg, #00a8ff, #0097e6)',
                        border: 'none',
                        color: 'white',
                        borderRadius: '10px',
                        transition: 'all 0.3s ease',
                        padding: '12px',
                        display: 'block',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        transform: isHovering.developer ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: isHovering.developer ? '0 10px 20px rgba(0, 168, 255, 0.4)' : 'none'
                      }}
                      className="w-100 py-3 mb-2"
                    >
                      <i className="fas fa-user-tie me-2"></i> 
                      Skilled Professional Login
                    </Link>
                    
                    <div className="mt-3">
                      <small className="text-light" style={{ opacity: 0.7 }}>
                        New professional? <Link to="/register" style={{ 
                          color: '#00a8ff', 
                          textDecoration: 'none',
                          fontWeight: 'bold'
                        }}>Register Your Skills</Link>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Admin Card */}
              <div className="col-lg-5 col-md-6 mb-4">
                <div 
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: isHovering.admin ? '1px solid #00d2d3' : '1px solid rgba(0, 210, 211, 0.2)',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: isHovering.admin ? 'translateY(-10px)' : 'translateY(0)',
                    boxShadow: isHovering.admin ? '0 20px 40px rgba(0, 210, 211, 0.3)' : 'none'
                  }}
                  onMouseEnter={() => handleMouseEnter('admin')}
                  onMouseLeave={() => handleMouseLeave('admin')}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'radial-gradient(circle, rgba(0, 210, 211, 0.1) 0%, transparent 70%)',
                      opacity: isHovering.admin ? 1 : 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  ></div>
                  
                  <div className="card-body p-5 text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                      <div 
                        style={{
                          width: '90px',
                          height: '90px',
                          background: 'linear-gradient(135deg, #00d2d3, #00a8a8)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '2rem',
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        <i className="fas fa-users-cog"></i>
                      </div>
                      <div 
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          left: '-5px',
                          right: '-5px',
                          bottom: '-5px',
                          border: '2px dashed rgba(0, 210, 211, 0.5)',
                          borderRadius: '50%',
                          animation: 'spin 10s linear infinite'
                        }}
                      ></div>
                    </div>
                    <h3 className="card-title mb-3 text-white">Platform Admin</h3>
                    <p className="card-text text-light mb-4" style={{ opacity: 0.8 }}>
                      Manage skilled professionals, verify credentials, and oversee the Skills-Connect platform.
                    </p>
                    
                    {/* Fixed: Using Link component with proper routing */}
                    <Link 
                      to="/admin-login" 
                      style={{
                        background: 'linear-gradient(135deg, #00d2d3, #00a8a8)',
                        border: 'none',
                        color: 'white',
                        borderRadius: '10px',
                        transition: 'all 0.3s ease',
                        padding: '12px',
                        display: 'block',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        transform: isHovering.admin ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: isHovering.admin ? '0 10px 20px rgba(0, 210, 211, 0.4)' : 'none'
                      }}
                      className="w-100 py-3"
                    >
                      <i className="fas fa-database me-2"></i> 
                      Admin Panel
                    </Link>
                    
                    <div className="mt-3">
                      <small className="text-light" style={{ opacity: 0.7 }}>
                        For Platform Administrators only
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skills Categories Section */}
            <div className="mt-5">
              <h4 className="text-white mb-4">Skills Categories Available</h4>
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '2rem'
                }}
              >
                {[
                  ['Electrical', 'Electronics', 'Construction', 'Automotive'],
                  ['Healthcare', 'Pharmacy', 'Laboratory', 'Clinical'],
                  ['ICT', 'Software', 'Cybersecurity', 'Data Science'],
                  ['Hospitality', 'Culinary', 'Tourism', 'Hotel Management']
                ].map((category, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '15px',
                      margin: '10px 0',
                      flexWrap: 'wrap'
                    }}
                  >
                    {category.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          background: 'rgba(0, 168, 255, 0.1)',
                          border: '1px solid rgba(0, 168, 255, 0.3)',
                          color: '#00a8ff',
                          padding: '8px 15px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease',
                          cursor: 'default'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(0, 168, 255, 0.2)';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(0, 168, 255, 0.1)';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Education Levels Section */}
            <div className="mt-4 mb-5">
              <h4 className="text-white mb-4">All Education Levels Welcome</h4>
              <div className="row justify-content-center">
                {[
                  { level: 'Certificate', icon: '📜', desc: 'VETA, Technical Colleges' },
                  { level: 'Diploma', icon: '🎓', desc: 'NTA Level 5-6' },
                  { level: 'Degree', icon: '🎖️', desc: 'Bachelor & Masters' },
                  { level: 'Professional', icon: '⭐', desc: 'Certified Experts' }
                ].map((edu, index) => (
                  <div key={index} className="col-md-3 mb-3">
                    <div className="d-flex flex-column align-items-center text-decoration-none"
                      style={{
                        padding: '20px',
                        borderRadius: '10px',
                        background: 'rgba(0, 168, 255, 0.05)',
                        transition: 'all 0.3s ease',
                        height: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 168, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 168, 255, 0.05)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                        {edu.icon}
                      </div>
                      <h5 className="text-white mb-2">{edu.level}</h5>
                      <p className="text-light text-center mb-0" style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                        {edu.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="mt-4 mb-5">
              <div className="row justify-content-center">
                <div className="col-md-3 mb-3">
                  <Link 
                    to="/jobs" 
                    className="d-flex flex-column align-items-center text-decoration-none"
                    style={{
                      padding: '15px',
                      borderRadius: '10px',
                      background: 'rgba(0, 168, 255, 0.05)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className="fas fa-briefcase text-info fs-4 mb-2"></i>
                    <span className="text-white">Browse Opportunities</span>
                  </Link>
                </div>
                
                <div className="col-md-3 mb-3">
                  <Link 
                    to="/register" 
                    className="d-flex flex-column align-items-center text-decoration-none"
                    style={{
                      padding: '15px',
                      borderRadius: '10px',
                      background: 'rgba(0, 168, 255, 0.05)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className="fas fa-user-plus text-success fs-4 mb-2"></i>
                    <span className="text-white">Register Skills</span>
                  </Link>
                </div>
                
                <div className="col-md-3 mb-3">
                  <a 
                    href="#"
                    className="d-flex flex-column align-items-center text-decoration-none"
                    style={{
                      padding: '15px',
                      borderRadius: '10px',
                      background: 'rgba(0, 168, 255, 0.05)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className="fas fa-question-circle text-warning fs-4 mb-2"></i>
                    <span className="text-white">How It Works</span>
                  </a>
                </div>
                
                <div className="col-md-3 mb-3">
                  <a 
                    href="#"
                    className="d-flex flex-column align-items-center text-decoration-none"
                    style={{
                      padding: '15px',
                      borderRadius: '10px',
                      background: 'rgba(0, 168, 255, 0.05)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className="fas fa-newspaper text-danger fs-4 mb-2"></i>
                    <span className="text-white">Success Stories</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Support Information */}
            <div className="mt-5 pt-4">
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(0, 168, 255, 0.2)',
                  marginBottom: '1rem'
                }}
              >
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5 className="text-white mb-2">
                      <i className="fas fa-hands-helping me-2 text-info"></i>
                      How Skills-Connect Works
                    </h5>
                    <p className="text-light mb-0" style={{ opacity: 0.8 }}>
                      <strong>For Skilled Workers:</strong> Register → Verify → Get Opportunities<br/>
                      <strong>For Service Seekers:</strong> Search → Compare → Contact Professionals
                    </p>
                  </div>
                  <div className="col-md-4 text-end">
                    <button 
                      style={{
                        border: '1px solid #00a8ff',
                        color: '#00a8ff',
                        borderRadius: '10px',
                        background: 'transparent',
                        padding: '8px 20px',
                        transition: 'all 0.3s ease',
                        fontWeight: 'bold'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0, 168, 255, 0.1)';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <i className="fas fa-play-circle me-2"></i>
                      Watch Video
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="d-flex justify-content-center gap-4 flex-wrap">
                  {[
                    { icon: 'fas fa-envelope', text: 'support@skillsconnect.co.tz', color: '#00a8ff' },
                    { icon: 'fab fa-whatsapp', text: 'WhatsApp', color: '#00a8ff' },
                    { icon: 'fas fa-phone', text: '+255 754 SKILLS', color: '#00a8ff' },
                    { icon: 'fas fa-map-marker-alt', text: 'Dar es Salaam', color: '#00a8ff' }
                  ].map((item, index) => (
                    <a 
                      key={index}
                      href="#" 
                      style={{
                        color: item.color,
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#ffffff';
                        e.target.style.textDecoration = 'underline';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = item.color;
                        e.target.style.textDecoration = 'none';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <i className={item.icon}></i> 
                      <span>{item.text}</span>
                    </a>
                  ))}
                </div>
              </div>
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
              transform: translateY(-100px) rotate(90deg);
              opacity: 0.2;
            }
            50% {
              transform: translateY(-200px) rotate(180deg);
              opacity: 0.1;
            }
            75% {
              transform: translateY(-100px) rotate(270deg);
              opacity: 0.05;
            }
            100% {
              transform: translateY(0) rotate(360deg);
              opacity: 0.1;
            }
          }
          
          @keyframes binaryFall {
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
              width: 160px;
              height: 160px;
              opacity: 1;
            }
            100% {
              width: 200px;
              height: 200px;
              opacity: 0;
            }
          }
          
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          
          @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #00a8ff }
          }
          
          @keyframes slide {
            0% { width: 0; opacity: 0; }
            50% { width: 200px; opacity: 1; }
            100% { width: 0; opacity: 0; }
          }
          
          /* Smooth transitions */
          * {
            transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          /* Link hover effects */
          a:hover {
            transform: translateY(-2px);
          }
          
          /* Card hover effects */
          .hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .card {
            border: none;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(0, 168, 255, 0.5);
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 168, 255, 0.8);
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

export default HomePage;