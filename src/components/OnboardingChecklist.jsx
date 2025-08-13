import React, { useState, useEffect } from "react";

export default function OnboardingChecklist({ 
  demoType, 
  onReplayTour, 
  isTourComplete = false,
  currentStep = 0 
}) {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Define onboarding steps based on demo type
  const getOnboardingSteps = () => {
    const baseSteps = [
      {
        id: "welcome",
        title: "Welcome & Demo Selection",
        description: "Choose your career path and understand the dashboard",
        icon: "👋"
      },
      {
        id: "resume-manager",
        title: "Resume Manager",
        description: "Create your complete profile",
        icon: "📝"
      },
      {
        id: "auto-apply",
        title: "Auto Apply Setup",
        description: "Configure job preferences and filters",
        icon: "⚡"
      },
      {
        id: "tailored-apply",
        title: "Tailored Apply",
        description: "Upload JDs and customize resumes",
        icon: "🎯"
      },
      {
        id: "resume-builder",
        title: "Resume Builder",
        description: "Design professional resumes",
        icon: "🏗️"
      },
      {
        id: "cover-letter",
        title: "Cover Letters",
        description: "Generate personalized letters",
        icon: "✉️"
      },
      {
        id: "resume-score",
        title: "Resume Score",
        description: "Check ATS compatibility",
        icon: "📊"
      },
      {
        id: "analytics",
        title: "Analytics & Tracking",
        description: "Monitor your progress",
        icon: "📈"
      }
    ];

    // Add demo-specific steps
    if (demoType === "career-change") {
      baseSteps.splice(1, 0, {
        id: "career-transition",
        title: "Career Transition Planning",
        description: "Identify transferable skills and target roles",
        icon: "🔄"
      });
    } else if (demoType === "first-job") {
      baseSteps.splice(1, 0, {
        id: "entry-level-prep",
        title: "Entry Level Preparation",
        description: "Build your first professional profile",
        icon: "🎓"
      });
    } else if (demoType === "better-position") {
      baseSteps.splice(1, 0, {
        id: "senior-role-prep",
        title: "Senior Role Preparation",
        description: "Position yourself for leadership roles",
        icon: "🚀"
      });
    }

    return baseSteps;
  };

  const steps = getOnboardingSteps();

  // Update completed steps based on current tour progress
  useEffect(() => {
    if (currentStep > 0) {
      const newCompletedSteps = steps
        .slice(0, currentStep)
        .map(step => step.id);
      setCompletedSteps(newCompletedSteps);
    }
  }, [currentStep, steps]);

  // Mark all steps as complete when tour is finished
  useEffect(() => {
    if (isTourComplete) {
      setCompletedSteps(steps.map(step => step.id));
    }
  }, [isTourComplete, steps]);

  const handleStepClick = (stepId) => {
    if (completedSteps.includes(stepId)) {
      // If step is completed, allow replay from that point
      const stepIndex = steps.findIndex(step => step.id === stepId);
      if (stepIndex !== -1) {
        onReplayTour(stepIndex);
      }
    }
  };

  const handleReplayAll = () => {
    onReplayTour(0);
  };

  const getProgressPercentage = () => {
    return Math.round((completedSteps.length / steps.length) * 100);
  };

  if (isCollapsed) {
    return (
      <div className="onboarding-checklist collapsed">
        <button 
          className="expand-button"
          onClick={() => setIsCollapsed(false)}
          title="Expand checklist"
        >
          📋
        </button>
        <div className="progress-indicator">
          <div className="progress-circle">
            <span className="progress-text">{getProgressPercentage()}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-checklist">
      <div className="checklist-header">
        <h3>Onboarding Checklist</h3>
        <button 
          className="collapse-button"
          onClick={() => setIsCollapsed(true)}
          title="Collapse checklist"
        >
          ×
        </button>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${getProgressPercentage()}%` }}></div>
        <span className="progress-text">{getProgressPercentage()}% Complete</span>
      </div>

      <div className="checklist-steps">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === index;
          
          return (
            <div 
              key={step.id}
              className={`checklist-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
              onClick={() => handleStepClick(step.id)}
            >
              <div className="step-icon">
                {isCompleted ? '✅' : step.icon}
              </div>
              <div className="step-content">
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </div>
              {isCompleted && (
                <button 
                  className="replay-step-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStepClick(step.id);
                  }}
                  title="Replay this step"
                >
                  🔄
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="checklist-actions">
        <button 
          className="replay-all-btn"
          onClick={handleReplayAll}
          disabled={completedSteps.length === 0}
        >
          🔄 Replay Tour
        </button>
        <button 
          className="reset-btn"
          onClick={() => setCompletedSteps([])}
          disabled={completedSteps.length === 0}
        >
          🔄 Reset Progress
        </button>
      </div>
    </div>
  );
}
