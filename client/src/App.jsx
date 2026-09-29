import { useEffect, useState } from "react";
import "./App.css";

const startingTasks = [
  { id: 1, title: "Complete React fundamentals", category: "Learning", done: true },
  { id: 2, title: "Build the Daynexa dashboard", category: "Development", done: false },
  { id: 3, title: "Revise JavaScript concepts", category: "Learning", done: false },
  { id: 4, title: "Plan tomorrow's priorities", category: "Personal", done: false },
];

const navigation = [
  { icon: "⌂", label: "Overview" },
  { icon: "✓", label: "My Tasks" },
  { icon: "✧", label: "AI Lab" },
  { icon: "▤", label: "My Roadmap" },
  { icon: "◷", label: "Learning Journey" },
  { icon: "📚", label: "My Learning" },
];
export default function App() {
  const [activePage, setActivePage] = useState("Overview");

  // Load the saved learning goal
  const [aiGoal, setAiGoal] = useState(
    () => localStorage.getItem("daynexa-ai-goal") || ""
  );

  // Load the saved duration
  const [aiDays, setAiDays] = useState(
    () => localStorage.getItem("daynexa-ai-days") || "7"
  );

  // Load the saved study plan
  const [aiPlan, setAiPlan] = useState(() => {
    try {
      const savedPlan = localStorage.getItem("daynexa-ai-plan");
      return savedPlan ? JSON.parse(savedPlan) : [];
    } catch (error) {
      console.error("Could not load AI plan:", error);
      return [];
    }
  });

  // Generate the study plan
  const generateStudyPlan = (event) => {
    event.preventDefault();

    const goal = aiGoal.trim();

    if (!goal) return;

    const days = Number(aiDays);

    const topics = [
      "Understand the fundamentals",
      "Learn the core concepts",
      "Practice with examples",
      "Work on a mini project",
      "Review and revise",
      "Practice independently",
      "Test your knowledge",
    ];

    const plan = Array.from({ length: days }, (_, index) => ({
      id: index + 1,
      title: `Day ${index + 1}`,
      task: topics[index % topics.length],
      goal,
      done: false,
    }));

    setAiPlan(plan);
  };
const toggleAiTask = (id) => {
  setAiPlan((currentPlan) =>
    currentPlan.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    )
  );
};
  const [roadmap, setRoadmap] = useState(() => {
  try {
    const savedRoadmap = localStorage.getItem("daynexa-roadmap");

    if (savedRoadmap) {
      return JSON.parse(savedRoadmap);
    }
  } catch (error) {
    console.error("Could not load roadmap:", error);
  }
// Save AI study plan
useEffect(() => {
  localStorage.setItem(
    "daynexa-ai-plan",
    JSON.stringify(aiPlan)
  );
}, [aiPlan]);

// Save learning goal
useEffect(() => {
  localStorage.setItem(
    "daynexa-ai-goal",
    aiGoal
  );
}, [aiGoal]);

// Save study duration
useEffect(() => {
  localStorage.setItem(
    "daynexa-ai-days",
    aiDays
  );
}, [aiDays]);
  return [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, and JavaScript basics.",
      status: "Completed",
      tasks: ["Learn HTML", "Practice CSS", "Learn JavaScript"],
      done: true,
    },
    {
      id: 2,
      title: "Frontend Development",
      description: "Build interactive websites using React.",
      status: "In Progress",
      tasks: [
        "Learn React",
        "Build a React project",
        "Learn API integration",
      ],
      done: false,
    },
    {
      id: 3,
      title: "Full Stack Development",
      description: "Learn backend development and databases.",
      status: "Upcoming",
      tasks: ["Learn Node.js", "Learn Express", "Practice MongoDB"],
      done: false,
    },
    {
      id: 4,
      title: "Career Preparation",
      description: "Prepare your portfolio and job applications.",
      status: "Upcoming",
      tasks: ["Update portfolio", "Prepare resume", "Practice interviews"],
      done: false,
    },
  ];
});
  useEffect(() => {
  localStorage.setItem(
    "daynexa-roadmap",
    JSON.stringify(roadmap)
  );
}, [roadmap]);  
const toggleRoadmapStep = (id) => {
  setRoadmap((steps) =>
    steps.map((step) =>
      step.id === id
        ? {
            ...step,
            done: !step.done,
            status: !step.done ? "Completed" : "In Progress",
          }
        : step
    )
  );
};

const roadmapProgress = Math.round(
  (roadmap.filter((step) => step.done).length / roadmap.length) * 100
);
  const [learningCourses, setLearningCourses] = useState(() => {
  try {
    const saved = localStorage.getItem("daynexa-learning-courses");

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Could not load learning courses:", error);
  }

  return [
    {
      id: 1,
      title: "React Fundamentals",
      category: "Web Development",
      totalLessons: 12,
      completedLessons: 4,
    },
    {
      id: 2,
      title: "Advanced Excel",
      category: "Business Skills",
      totalLessons: 10,
      completedLessons: 6,
    },
    {
      id: 3,
      title: "JavaScript Essentials",
      category: "Programming",
      totalLessons: 15,
      completedLessons: 0,
    },
  ];
});
const [learningGoals, setLearningGoals] = useState(() => {
  try {
    const saved = localStorage.getItem("daynexa-learning-goals");

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Could not load learning goals:", error);
  }

  return [
    { id: 1, title: "Complete one lesson today", done: false },
    { id: 2, title: "Practice coding for 30 minutes", done: false },
    { id: 3, title: "Review my previous lessons", done: false },
  ];
});
useEffect(() => {
  localStorage.setItem(
    "daynexa-learning-courses",
    JSON.stringify(learningCourses)
  );
}, [learningCourses]);

useEffect(() => {
  localStorage.setItem(
    "daynexa-learning-goals",
    JSON.stringify(learningGoals)
  );
}, [learningGoals]);
const toggleLearningGoal = (id) => {
  setLearningGoals((goals) =>
    goals.map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    )
  );
};

const updateLessonProgress = (id, amount) => {
  setLearningCourses((courses) =>
    courses.map((course) =>
      course.id === id
        ? {
            ...course,
            completedLessons: Math.max(
              0,
              Math.min(
                course.totalLessons,
                course.completedLessons + amount
              )
            ),
          }
        : course
    )
  );
};
  const [tasks, setTasks] = useState(() => {
  try {
    const savedTasks = localStorage.getItem("daynexa-tasks");
    return savedTasks ? JSON.parse(savedTasks) : startingTasks;
  } catch (error) {
    return startingTasks;
  }
});
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
  localStorage.setItem("daynexa-tasks", JSON.stringify(tasks));
}, [tasks]);
  const [taskFilter, setTaskFilter] = useState("All");

  const completed = tasks.filter((task) => task.done).length;
  const remaining = tasks.length - completed;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;
  const filteredTasks = tasks.filter((task) => {
  if (taskFilter === "Pending") return !task.done;
  if (taskFilter === "Completed") return task.done;
  return true;
});
  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function addTask(event) {
    event.preventDefault();

    if (!newTask.trim()) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTask.trim(),
        category: "Personal",
        done: false,
      },
    ]);

    setNewTask("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">d</div>
          <span>daynexa<span className="brand-dot">.</span></span>
        </div>

        <p className="workspace-label">WORKSPACE</p>

        <nav className="navigation">
          {navigation.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${
                activePage === item.label ? "active" : ""
              }`}
              onClick={() => setActivePage(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>

              {item.label === "My Tasks" && (
                <span className="nav-count">{remaining}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div className="tip-icon">✦</div>
            <h4>Small steps, big things.</h4>
            <p>Every focused day moves you forward.</p>
          </div>

          <button
            className={`nav-item ${
              activePage === "Settings" ? "active" : ""
            }`}
            onClick={() => setActivePage("Settings")}
          >
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </button>

          <div className="profile-mini">
            <div className="avatar">N</div>
            <div className="profile-info">
              <strong>Nikhil K</strong>
              <span>Personal workspace</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-right">
            <span className="today-label">✦ Your space to grow</span>
            <div className="avatar small-avatar">N</div>
          </div>
        </header>

        {activePage === "Overview" ? (
          <>
            <section className="welcome-section">
              <div>
                <div className="eyebrow">
                  <span className="status-dot" />
                  YOUR PERSONAL WORKSPACE
                </div>

                <h1>Make today <span>count.</span></h1>

                <p className="welcome-subtitle">
                  A little progress each day adds up to big results.
                </p>
              </div>

              <div className="date-pill">◷ Your daily overview</div>
            </section>

            <section className="stats-grid">
              <article className="stat-card">
                <div className="stat-top">
                  <span className="stat-label">Tasks completed</span>
                  <span className="stat-icon green-icon">✓</span>
                </div>

                <div className="stat-number">
                  {completed}<span> / {tasks.length}</span>
                </div>

                <div className="stat-foot">
                  <div className="mini-progress">
                    <div style={{ width: `${progress}%` }} />
                  </div>
                  <span>{progress}%</span>
                </div>
              </article>

              <article className="stat-card">
                <div className="stat-top">
                  <span className="stat-label">Focus time</span>
                  <span className="stat-icon peach-icon">◷</span>
                </div>
                <div className="stat-number">2.5<span> hrs</span></div>
                <div className="stat-description">Time invested in yourself</div>
              </article>

              <article className="stat-card">
                <div className="stat-top">
                  <span className="stat-label">Learning streak</span>
                  <span className="stat-icon yellow-icon">✦</span>
                </div>
                <div className="stat-number">5<span> days</span></div>
                <div className="stat-description">Keep your momentum going!</div>
              </article>

              <article className="stat-card">
                <div className="stat-top">
                  <span className="stat-label">Active goals</span>
                  <span className="stat-icon blue-icon">◎</span>
                </div>
                <div className="stat-number">3</div>
                <div className="stat-description">You're building something great</div>
              </article>
            </section>

            <section className="dashboard-grid">
              <div className="panel tasks-panel">
                <div className="panel-heading">
                  <div>
                    <div className="section-kicker">STAY ON TRACK</div>
                    <h2>
                      Today's tasks
                      <span className="heading-count">{tasks.length}</span>
                    </h2>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => setActivePage("My Tasks")}
                  >
                    View all ↗
                  </button>
                </div>

                <form className="add-task-form" onSubmit={addTask}>
                  <span className="add-symbol">＋</span>

                  <input
                    value={newTask}
                    onChange={(event) => setNewTask(event.target.value)}
                    placeholder="Add a task to your day..."
                    aria-label="New task"
                  />

                  <button type="submit">Add task</button>
                </form>

                <div className="task-list">
                  {tasks.map((task) => (
                    <div
                      className={`task-row ${task.done ? "task-done" : ""}`}
                      key={task.id}
                    >
                      <button
                        className={`task-check ${
                          task.done ? "checked" : ""
                        }`}
                        onClick={() => toggleTask(task.id)}
                        aria-label={
                          task.done ? "Mark incomplete" : "Mark complete"
                        }
                      >
                        {task.done ? "✓" : ""}
                      </button>

                      <div className="task-details">
                        <span className="task-title">{task.title}</span>
                        <span className="task-meta">{task.category}</span>
                      </div>
                    </div>
                  ))}

                  {tasks.length === 0 && (
                    <p className="empty-state">
                      Your task list is clear. Add something you'd like to
                      achieve!
                    </p>
                  )}
                </div>

                <div className="task-summary">
                  <span>{remaining} tasks remaining</span>
                  <span>{completed} completed</span>
                </div>
              </div>

              <div className="right-column">
                <div className="focus-card">
                  <div className="focus-label">✦ YOUR DAILY FOCUS</div>
                  <span className="focus-badge">IN PROGRESS</span>

                  <h2>
                    Build your
                    <br />
                    future, one day
                    <br />
                    at a time.
                  </h2>

                  <p>Stay curious. Keep creating. Trust your progress.</p>

                  <div className="focus-art">
                    <div className="art-orbit orbit-one" />
                    <div className="art-orbit orbit-two" />
                    <div className="art-sun">✦</div>
                    <div className="art-hill hill-one" />
                    <div className="art-hill hill-two" />
                  </div>
                </div>

                <div className="panel roadmap-panel">
                  <div className="section-kicker">KEEP GROWING</div>
                  <h2>Learning roadmap</h2>

                  <div className="roadmap-item">
                    <div className="roadmap-symbol">⌘</div>

                    <div className="roadmap-details">
                      <strong>Full Stack Development</strong>
                      <span>Module 3 of 8</span>
                      <div className="roadmap-track">
                        <div />
                      </div>
                    </div>

                    <span className="roadmap-percent">38%</span>
                  </div>

                  <button
                    className="roadmap-link"
                    onClick={() => setActivePage("My Roadmap")}
                  >
                    Continue learning <span>→</span>
                  </button>
                </div>
              </div>
            </section>

            <footer className="page-footer">
              <span>DAYNEXA · MAKE TODAY COUNT.</span>
              <span>Designed for your next chapter. ✦</span>
            </footer>
          </>
        ) : (
          <section className="placeholder-page">
            <div className="placeholder-symbol">✦</div>
            <div className="eyebrow">YOUR DAYNEXA WORKSPACE</div>
            <h1>{activePage}</h1>
            <p>This space is ready for us to build next.</p>
            {activePage === "My Learning" && (
  <div className="learning-page">
    <div className="learning-heading">
      <div>
        <div className="eyebrow">GROW EVERY DAY</div>
        <h2>Your learning journey</h2>
        <p>Small steps today, bigger skills tomorrow.</p>
      </div>
    </div>

    <div className="learning-summary">
      <div className="learning-stat">
        <span>Learning paths</span>
        <strong>{learningCourses.length}</strong>
      </div>

      <div className="learning-stat">
        <span>Lessons completed</span>
        <strong>
          {learningCourses.reduce(
            (total, course) => total + course.completedLessons,
            0
          )}
        </strong>
      </div>

      <div className="learning-stat">
        <span>Daily goals</span>
        <strong>
          {learningGoals.filter((goal) => goal.done).length}/
          {learningGoals.length}
        </strong>
      </div>
    </div>

    <h2 className="learning-section-title">Your courses</h2>

    <div className="learning-courses">
      {learningCourses.map((course) => {
        const progress = Math.round(
          (course.completedLessons / course.totalLessons) * 100
        );

        return (
          <div className="learning-course" key={course.id}>
            <div className="course-top">
              <span className="course-category">
                {course.category}
              </span>
              <span className="course-percent">{progress}%</span>
            </div>

            <h3>{course.title}</h3>

            <div className="course-progress-track">
              <div
                className="course-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="course-footer">
              <span>
                {course.completedLessons} of {course.totalLessons} lessons
              </span>

              <div className="course-actions">
                <button
                  className="lesson-button"
                  onClick={() => updateLessonProgress(course.id, -1)}
                  disabled={course.completedLessons === 0}
                  aria-label={`Remove completed lesson from ${course.title}`}
                >
                  −
                </button>

                <button
                  className="lesson-button"
                  onClick={() => updateLessonProgress(course.id, 1)}
                  disabled={
                    course.completedLessons === course.totalLessons
                  }
                  aria-label={`Complete a lesson in ${course.title}`}
                >
                  +
                </button>
              </div>
            </div>

            {progress === 100 && (
              <div className="course-complete">
                ✓ Course completed!
              </div>
            )}
          </div>
        );
      })}
    </div>

    <h2 className="learning-section-title">Today's learning goals</h2>

    <div className="learning-goals">
      {learningGoals.map((goal) => (
        <label className="learning-goal" key={goal.id}>
          <input
            type="checkbox"
            checked={goal.done}
            onChange={() => toggleLearningGoal(goal.id)}
          />

          <span className={goal.done ? "goal-done" : ""}>
            {goal.title}
          </span>

          {goal.done && (
            <span className="goal-check">✓</span>
          )}
        </label>
      ))}
    </div>
  </div>
)}
{activePage === "My Roadmap" && (
  <div className="roadmap-page">
    <div className="eyebrow">YOUR PATH FORWARD</div>
    <h2 className="roadmap-heading">My Growth Roadmap</h2>
    <p className="roadmap-subtitle">
      Every milestone brings you closer to your goals.
    </p>

    <div className="roadmap-progress-card">
      <div className="roadmap-progress-info">
        <span>Overall progress</span>
        <strong>{roadmapProgress}%</strong>
      </div>

      <div className="roadmap-progress-track">
        <div
          className="roadmap-progress-fill"
          style={{ width: `${roadmapProgress}%` }}
        />
      </div>

      <p>
        {roadmap.filter((step) => step.done).length} of{" "}
        {roadmap.length} milestones completed
      </p>
    </div>

    <div className="roadmap-list">
      {roadmap.map((step, index) => (
        <div className="roadmap-step" key={step.id}>
          <div className="roadmap-step-marker">
            <span className={step.done ? "marker-done" : ""}>
              {step.done ? "✓" : index + 1}
            </span>
            {index !== roadmap.length - 1 && (
              <div className="roadmap-connector" />
            )}
          </div>

          <div className="roadmap-step-card">
            <div className="roadmap-step-top">
              <span className="roadmap-step-status">
                {step.done ? "Completed" : step.status}
              </span>

              <button
                className="roadmap-toggle"
                onClick={() => toggleRoadmapStep(step.id)}
              >
                {step.done ? "Mark as incomplete" : "Mark as complete"}
              </button>
            </div>

            <h3>{step.title}</h3>
            <p>{step.description}</p>

            <div className="roadmap-task-list">
              {step.tasks.map((task) => (
                <div className="roadmap-task" key={task}>
                  <span>{step.done ? "✓" : "○"}</span>
                  {task}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
{activePage === "AI Lab" && (
  <div className="ai-lab-page">
    <div className="eyebrow">YOUR PERSONAL AI WORKSPACE</div>

    <h2 className="ai-lab-heading">Welcome to AI Lab ✦</h2>

    <p className="ai-lab-subtitle">
      Turn your learning goals into a clear, actionable study plan.
    </p>

    <form className="ai-goal-form" onSubmit={generateStudyPlan}>
      <label htmlFor="ai-goal">What do you want to learn?</label>

      <input
        id="ai-goal"
        type="text"
        value={aiGoal}
        onChange={(event) => setAiGoal(event.target.value)}
        placeholder="e.g. Learn React, improve Excel..."
        required
      />

      <label htmlFor="ai-days">Choose your plan duration</label>

      <select
        id="ai-days"
        value={aiDays}
        onChange={(event) => setAiDays(event.target.value)}
      >
        <option value="3">3 days</option>
        <option value="7">7 days</option>
        <option value="14">14 days</option>
        <option value="30">30 days</option>
      </select>

      <button className="ai-generate-button" type="submit">
        ✦ Generate Study Plan
      </button>
    </form>

    {aiPlan.length > 0 && (
      <div className="ai-plan-section">
        <div className="ai-plan-header">
          <div>
            <div className="eyebrow">YOUR PERSONAL PLAN</div>
            <h3>{aiGoal}</h3>
          </div>

          <span className="ai-plan-count">
            {aiPlan.filter((item) => item.done).length}/{aiPlan.length} done
          </span>
        </div>

        <div className="ai-plan-progress">
          <div
            className="ai-plan-progress-fill"
            style={{
              width: `${
                (aiPlan.filter((item) => item.done).length /
                  aiPlan.length) *
                100
              }%`,
            }}
          />
        </div>

        <div className="ai-plan-list">
          {aiPlan.map((item) => (
            <label className="ai-plan-item" key={item.id}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleAiTask(item.id)}
              />

              <div>
                <strong>{item.title}</strong>
                <p>{item.task}</p>
              </div>

              {item.done && (
                <span className="ai-plan-check">✓</span>
              )}
            </label>
          ))}
        </div>

        {aiPlan.every((item) => item.done) && (
          <div className="ai-plan-complete">
            🎉 You've completed your study plan!
          </div>
        )}
      </div>
    )}

    {aiPlan.length === 0 && (
      <div className="ai-empty-state">
        <div className="ai-empty-icon">✦</div>
        <h3>Your next achievement starts here</h3>
        <p>
          Enter a learning goal above to create your own study checklist.
        </p>
      </div>
    )}
  </div>
)}
            {activePage === "My Tasks" && (
  <div className="placeholder-tasks">
    <h2>Your tasks</h2>

    <div className="task-filters">
      {["All", "Pending", "Completed"].map((filter) => (
        <button
          key={filter}
          className={`filter-button ${
            taskFilter === filter ? "active" : ""
          }`}
          onClick={() => setTaskFilter(filter)}
        >
          {filter}
          <span>
            {filter === "All"
              ? tasks.length
              : filter === "Pending"
              ? remaining
              : completed}
          </span>
        </button>
      ))}
    </div>

    {filteredTasks.map((task) => (
      <div className="placeholder-task" key={task.id}>
        <button
          className={`task-check ${task.done ? "checked" : ""}`}
          onClick={() => toggleTask(task.id)}
        >
          {task.done ? "✓" : ""}
        </button>

        <span className={task.done ? "completed-text" : ""}>
          {task.title}
        </span>
      </div>
    ))}

    {filteredTasks.length === 0 && (
      <p className="empty-state">
        No tasks here yet. Add a task from your Overview!
      </p>
    )}
  </div>
)}
            

            <button
              className="back-button"
              onClick={() => setActivePage("Overview")}
            >
              ← Back to overview
            </button>
          </section>
        )}
      </main>
    </div>
  );
}