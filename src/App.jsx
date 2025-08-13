import React, { useMemo, useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import HelpButton from "./components/HelpButton.jsx";
import OnboardingChecklist from "./components/OnboardingChecklist.jsx";

const LS_KEY = "demo-guided-tour-complete-v1";

export default function App() {
  const [run, setRun] = useState(() => !localStorage.getItem(LS_KEY));
  const [stepIndex, setStepIndex] = useState(0);
  const [demoType, setDemoType] = useState("career-change");
  const [isTourComplete, setIsTourComplete] = useState(false);

  const steps = useMemo(
    () => [
      {
        target: "body",
        placement: "center",
        title: "Welcome 👋",
        content: (
          <div>
            <p>
              This quick tour will guide you through the SaaS dashboard flow.
            </p>
            <ol style={{ marginLeft: 16 }}>
              <li>
                Start with <b>Resume Manager</b>
              </li>
              <li>
                Configure <b>Auto Apply</b>
              </li>
              <li>
                Use <b>Tailored Apply</b> for 100 jobs
              </li>
              <li>
                Build with <b>Resume Builder</b>
              </li>
              <li>
                Generate a <b>Cover Letter</b>
              </li>
              <li>
                Check <b>Resume Score</b>
              </li>
              <li>
                View <b>Analytics</b>
              </li>
              <li>
                Manage <b>Settings & Billing</b>
              </li>
            </ol>
          </div>
        ),
      },
      {
        target: '[data-tour="resume-manager"]',
        title: "Resume Manager",
        content: "Create a complete profile which powers Auto Apply.",
        disableBeacon: true,
      },
      {
        target: '[data-tour="auto-apply"]',
        title: "Auto Apply",
        content: "Set job search preferences and let the system auto-apply.",
      },
      {
        target: '[data-tour="tailored-apply"]',
        title: "Tailored Apply",
        content:
          "Customize resumes to up to 100 job descriptions for maximum visibility.",
      },
      {
        target: '[data-tour="resume-builder"]',
        title: "Resume Builder",
        content: "Design professional resumes using our templates.",
      },
      {
        target: '[data-tour="cover-letter"]',
        title: "Cover Letters",
        content: "Generate personalized cover letters in one click.",
      },
      {
        target: '[data-tour="resume-score"]',
        title: "Resume Score",
        content: "Run ATS checks and improve your score before applying.",
      },
      {
        target: '[data-tour="analytics"]',
        title: "Analytics",
        content: "Track applications, interviews, and conversions over time.",
      },
      {
        target: '[data-tour="settings-billing"]',
        title: "Settings & Billing",
        content: "Update preferences, subscription, and payment methods.",
      },
      {
        target: "body",
        placement: "center",
        title: "You're all set!",
        content:
          "That's the flow. You can replay this tour anytime via the Help button.",
      },
    ],
    []
  );

  const handleJoyride = (data) => {
    const { status, index, type } = data;
    if (type === "step:after" || type === "target:notFound") {
      setStepIndex(index + 1);
    }
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem(LS_KEY, "true");
      setRun(false);
      setStepIndex(0);
      setIsTourComplete(true);
    }
  };

  const startTour = (startFromStep = 0) => {
    setRun(true);
    setStepIndex(startFromStep);
    setIsTourComplete(false);
  };

  const handleReplayTour = (startFromStep = 0) => {
    startTour(startFromStep);
  };

  return (
    <div>
      <header className="header">
        <div className="brand">
          <span className="dot"></span>
          <h1>Acme Careers — Dashboard</h1>
          <span className="demo-badge">
            {demoType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>
        <div className="toolbar">
          <select 
            value={demoType} 
            onChange={(e) => setDemoType(e.target.value)}
            className="demo-selector"
          >
            <option value="career-change">Career Change</option>
            <option value="first-job">First Job</option>
            <option value="better-position">Better Position</option>
          </select>
          <button onClick={() => startTour()}>▶︎ Start Tour</button>
          <HelpButton onClick={() => startTour()} />
        </div>
      </header>

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

      <main className="container">
        <div className="grid">
          <Card
            id="resume-manager"
            dataKey="resume-manager"
            title="Resume Manager"
            badge="Start here"
          >
            Create & maintain your unified profile. Required for Auto Apply.
          </Card>

          <Card id="auto-apply" dataKey="auto-apply" title="Auto Apply">
            Set role titles, locations, and keywords. Our system applies for
            you.
          </Card>

          <Card
            id="tailored-apply"
            dataKey="tailored-apply"
            title="Tailored Apply"
          >
            Upload up to 100 JDs and generate tailored resumes for each.
          </Card>

          <Card
            id="resume-builder"
            dataKey="resume-builder"
            title="Resume Builder"
          >
            Drag-and-drop sections, ATS-safe templates, instant PDF export.
          </Card>

          <Card id="cover-letter" dataKey="cover-letter" title="Cover Letters">
            One-click, personalized letters that mirror the job and your
            profile.
          </Card>

          <Card
            id="resume-score"
            dataKey="resume-score"
            data-key="resume-score"
            title="Resume Score"
          >
            Parse ATS keywords, readability, and alignment with the job.
          </Card>

          <Card id="analytics" dataKey="analytics" title="Analytics">
            See applied count, interview rate, and conversions over time.
          </Card>

          <Card
            id="settings-billing"
            dataKey="settings-billing"
            title="Settings & Billing"
            badge="Admin"
          >
            Manage subscription, invoices, and product preferences.
          </Card>
        </div>
      </main>

      <OnboardingChecklist
        demoType={demoType}
        onReplayTour={handleReplayTour}
        isTourComplete={isTourComplete}
        currentStep={stepIndex}
      />
    </div>
  );
}

function Card({ id, dataKey, title, badge, children }) {
  return (
    <section id={id} className="card" data-tour={dataKey}>
      {badge ? <span className="badge">{badge}</span> : null}
      <h3>{title}</h3>
      <p>{children}</p>
    </section>
  );
}
