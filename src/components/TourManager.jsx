import React, { useMemo, useState } from "react";
import Joyride, { STATUS } from "react-joyride";

const LS_KEY = "demo-guided-tour-complete-v1";

export default function TourManager({
  demoType,
  run,
  onTourComplete,
  tourMode = "dashboard",
}) {
  const [stepIndex, setStepIndex] = useState(0);

  const getDashboardTourSteps = (demoType) => {
    // Start with Home section tour after demo selection
    const navigationSteps = [
      {
        target: '[data-tour="nav-home"]',
        title: "Home Section",
        content: `Welcome! This is your main dashboard. You've selected ${
          demoType ? `${demoType.replace("-", " ")}` : "Career Change"
        } mode. Let's explore the features available for your career goals.`,
        placement: "right",
        disableBeacon: true,
      },
      {
        target: '[data-tour="nav-demo-selection"]',
        title: "Demo Selection",
        content: `Here you can change your demo type anytime. Currently active: ${
          demoType ? `${demoType.replace("-", " ")}` : "Career Change"
        }.`,
        placement: "right",
      },
      {
        target: '[data-tour="nav-resume-manager"]',
        title: "Resume Manager",
        content: getResumeManagerContent(demoType),
        placement: "right",
      },
      {
        target: '[data-tour="nav-auto-apply"]',
        title: "Auto Apply",
        content: getAutoApplyContent(demoType),
        placement: "right",
      },
      {
        target: '[data-tour="nav-tailored-apply"]',
        title: "Tailored Apply",
        content: getTailoredApplyContent(demoType),
        placement: "right",
      },
      {
        target: '[data-tour="nav-resume-builder"]',
        title: "Resume Builder",
        content: getResumeBuilderContent(demoType),
        placement: "right",
      },
      {
        target: '[data-tour="nav-cover-letter"]',
        title: "Cover Letters",
        content: getCoverLetterContent(demoType),
        placement: "right",
      },
      {
        target: '[data-tour="nav-resume-score"]',
        title: "Resume Score",
        content: getResumeScoreContent(demoType),
        placement: "right",
      },
      {
        target: '[data-tour="nav-analytics"]',
        title: "Analytics",
        content: getAnalyticsContent(demoType),
        placement: "right",
      },
      {
        target: "body",
        placement: "center",
        title: "You're all set!",
        content: `That's the ${
          demoType ? `${demoType.replace("-", " ")}` : "dashboard"
        } flow. You can replay this tour anytime via the Help button.`,
      },
    ];

    return navigationSteps;
  };

  const getSectionDetailTourSteps = (demoType, sectionId) => {
    const sectionTours = {
      "resume-manager": [
        {
          target: '[data-tour="resume-manager-profile-basics"]',
          title: "Profile Basics",
          content: getProfileBasicsContent(demoType),
          disableBeacon: true,
        },
        {
          target: '[data-tour="resume-manager-work-experience"]',
          title: "Work Experience",
          content: getWorkExperienceContent(demoType),
        },
        {
          target: '[data-tour="resume-manager-skills-section"]',
          title: "Skills & Expertise",
          content: getSkillsContent(demoType),
        },
        {
          target: '[data-tour="resume-manager-education"]',
          title: "Education & Certifications",
          content: getEducationContent(demoType),
        },
      ],
      "auto-apply": [
        {
          target: '[data-tour="auto-apply-job-preferences"]',
          title: "Job Preferences",
          content: getJobPreferencesContent(demoType),
          disableBeacon: true,
        },
        {
          target: '[data-tour="auto-apply-keywords"]',
          title: "Keywords & Filters",
          content: getKeywordsContent(demoType),
        },
        {
          target: '[data-tour="auto-apply-application-settings"]',
          title: "Application Settings",
          content: getApplicationSettingsContent(demoType),
        },
      ],
      "tailored-apply": [
        {
          target: '[data-tour="tailored-apply-jd-upload"]',
          title: "Job Description Upload",
          content: getJDUploadContent(demoType),
          disableBeacon: true,
        },
        {
          target: '[data-tour="tailored-apply-resume-customization"]',
          title: "Resume Customization",
          content: getResumeCustomizationContent(demoType),
        },
        {
          target: '[data-tour="tailored-apply-matching-algorithm"]',
          title: "Smart Matching",
          content: getMatchingAlgorithmContent(demoType),
        },
      ],
    };

    const section = sectionTours[sectionId];
    if (!section) return [];

    const introStep = {
      target: "body",
      placement: "center",
      title: `${sectionId
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())} Tour`,
      content: `Let's explore the ${sectionId.replace(
        "-",
        " "
      )} features tailored for your ${demoType.replace("-", " ")} goals.`,
    };

    const finalStep = {
      target: "body",
      placement: "center",
      title: "Section Complete!",
      content: `You've completed the ${sectionId.replace(
        "-",
        " "
      )} tour. Click on other sections to continue exploring!`,
    };

    return [introStep, ...section, finalStep];
  };

  const getTourSteps = (demoType) => {
    if (tourMode === "section-detail") {
      // This will be set when a section is clicked
      return [];
    }
    return getDashboardTourSteps(demoType);
  };

  // Dashboard tour content functions
  const getResumeManagerContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Create a complete profile highlighting transferable skills and career transition goals.";
      case "first-job":
        return "Build your first professional profile with education, internships, and relevant projects.";
      case "better-position":
        return "Optimize your existing profile for senior roles and leadership positions.";
      default:
        return "Create a complete profile which powers Auto Apply.";
    }
  };

  const getAutoApplyContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Set job search preferences for your new field with industry-specific keywords and locations.";
      case "first-job":
        return "Configure entry-level job preferences with location and company size filters.";
      case "better-position":
        return "Target senior roles with advanced filters for experience level and company culture.";
      default:
        return "Set job search preferences and let the system auto-apply.";
    }
  };

  const getTailoredApplyContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Upload 100 job descriptions from your target industry for maximum relevance.";
      case "first-job":
        return "Customize resumes for entry-level positions with relevant coursework and projects.";
      case "better-position":
        return "Tailor resumes for senior roles emphasizing leadership and strategic impact.";
      default:
        return "Customize resumes to up to 100 job descriptions for maximum visibility.";
    }
  };

  const getResumeBuilderContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Use career transition templates highlighting transferable skills and achievements.";
      case "first-job":
        return "Choose from entry-level templates with education and project sections.";
      case "better-position":
        return "Access executive templates with leadership and strategic focus areas.";
      default:
        return "Design professional resumes using our templates.";
    }
  };

  const getCoverLetterContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Generate letters explaining your career transition and transferable skills.";
      case "first-job":
        return "Create letters highlighting your enthusiasm and potential for growth.";
      case "better-position":
        return "Write letters emphasizing leadership experience and strategic vision.";
      default:
        return "Generate personalized cover letters in one click.";
    }
  };

  const getResumeScoreContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Check ATS compatibility for your new industry and role requirements.";
      case "first-job":
        return "Verify ATS optimization for entry-level positions and recent graduate roles.";
      case "better-position":
        return "Ensure ATS compatibility for senior and executive-level positions.";
      default:
        return "Run ATS checks and improve your score before applying.";
    }
  };

  const getAnalyticsContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Track applications in your new field, industry response rates, and transition progress.";
      case "first-job":
        return "Monitor first-job applications, interview invitations, and entry-level market trends.";
      case "better-position":
        return "Analyze senior role applications, executive search firm responses, and career advancement metrics.";
      default:
        return "Track applications, interviews, and conversions over time.";
    }
  };

  // Section detail tour content functions
  const getProfileBasicsContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Focus on transferable skills and career transition goals in your professional summary.";
      case "first-job":
        return "Emphasize your education, relevant coursework, and enthusiasm for the role.";
      case "better-position":
        return "Highlight leadership experience and strategic achievements in your summary.";
      default:
        return "Create a compelling professional summary that showcases your expertise.";
    }
  };

  const getWorkExperienceContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Frame past roles to demonstrate transferable skills for your target industry.";
      case "first-job":
        return "Include internships, part-time jobs, volunteer work, and academic projects.";
      case "better-position":
        return "Emphasize leadership roles, strategic impact, and measurable achievements.";
      default:
        return "Showcase your professional experience with quantifiable achievements.";
    }
  };

  const getSkillsContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Emphasize skills that transfer to your target industry and role.";
      case "first-job":
        return "Include academic skills, tools, and technologies you've learned.";
      case "better-position":
        return "Showcase advanced skills, industry expertise, and leadership capabilities.";
      default:
        return "List your technical and soft skills relevant to your target roles.";
    }
  };

  const getEducationContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Highlight relevant coursework and certifications for your new field.";
      case "first-job":
        return "Showcase academic achievements, relevant projects, and extracurricular activities.";
      case "better-position":
        return "Emphasize advanced degrees, industry certifications, and continuing education.";
      default:
        return "Present your educational background and professional certifications.";
    }
  };

  const getJobPreferencesContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Set preferences for your new field with industry-specific keywords and locations.";
      case "first-job":
        return "Configure entry-level preferences with location and company size filters.";
      case "better-position":
        return "Target senior roles with advanced experience level and company culture filters.";
      default:
        return "Define your job search preferences and target criteria.";
    }
  };

  const getKeywordsContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Use industry-specific keywords from your target field and role.";
      case "first-job":
        return "Include entry-level terms and recent graduate keywords.";
      case "better-position":
        return "Focus on senior-level and leadership keywords.";
      default:
        return "Define search terms and application criteria.";
    }
  };

  const getApplicationSettingsContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Set application frequency for career transition opportunities.";
      case "first-job":
        return "Optimize for entry-level job market timing and application windows.";
      case "better-position":
        return "Configure for senior role application strategies and timing.";
      default:
        return "Set how and when to apply for positions.";
    }
  };

  const getJDUploadContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Upload 100 job descriptions from your target industry for maximum relevance.";
      case "first-job":
        return "Focus on entry-level positions with relevant requirements and responsibilities.";
      case "better-position":
        return "Target senior roles with leadership and strategic requirements.";
      default:
        return "Upload and analyze job postings for customization.";
    }
  };

  const getResumeCustomizationContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Customize to highlight transferable skills for each specific role.";
      case "first-job":
        return "Adapt to show relevant coursework and projects for each position.";
      case "better-position":
        return "Emphasize leadership experience and strategic impact for each role.";
      default:
        return "Tailor your resume for each specific job description.";
    }
  };

  const getMatchingAlgorithmContent = (demoType) => {
    switch (demoType) {
      case "career-change":
        return "Algorithm identifies transferable skills and industry matches.";
      case "first-job":
        return "Matches education and project experience to job requirements.";
      case "better-position":
        return "Identifies leadership and strategic alignment opportunities.";
      default:
        return "AI-powered resume-job matching for optimal customization.";
    }
  };

  const steps = useMemo(() => getTourSteps(demoType), [demoType, tourMode]);

  const handleJoyride = (data) => {
    const { status, index, type } = data;
    if (type === "step:after" || type === "target:notFound") {
      setStepIndex(index + 1);
    }
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem(LS_KEY, "true");
      onTourComplete();
      setStepIndex(0);
    }
  };

  if (steps.length === 0) return null;

  return (
    <Joyride
      run={run}
      stepIndex={stepIndex}
      steps={steps}
      continuous
      showSkipButton
      showProgress
      disableScrolling
      scrollToFirstStep
      styles={{
        options: {
          primaryColor: "var(--brand)",
          textColor: "#0f172a",
          zIndex: 10000,
        },
        tooltipContent: { fontSize: "14px" },
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip",
      }}
      callback={handleJoyride}
    />
  );
}
