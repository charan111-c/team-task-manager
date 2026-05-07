import { useEffect, useState } from "react";

function App() {

  // ================= AUTH =================

  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );

  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ================= NAVIGATION =================

  const [page, setPage] = useState(
    localStorage.getItem("page") || "dashboard"
  );

  const [taskFilter, setTaskFilter] = useState("All");

  // ================= PROJECTS =================

  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem("projects")) || [
      {
        id: 1,
        name: "Marketing Campaign",
        description: "Q2 Digital Marketing Campaign",
        status: "On Hold"
      },
      {
        id: 2,
        name: "Website Redesign",
        description: "Complete Website Overhaul",
        status: "Active"
      }
    ]
  );

  const [projectName, setProjectName] = useState("");

  // ================= TEAM =================

  const [team, setTeam] = useState(
    JSON.parse(localStorage.getItem("team")) || [
      {
        id: 1,
        name: "Alex Johnson",
        role: "Developer",
        email: "alex@example.com",
        color: "#3b82f6"
      },
      {
        id: 2,
        name: "Sarah Chen",
        role: "Designer",
        email: "sarah@example.com",
        color: "#22c55e"
      }
    ]
  );

  const [memberName, setMemberName] = useState("");

  // ================= TASKS =================

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
      {
        id: 1,
        title: "Design Homepage",
        assigned: "Sarah Chen",
        due: "2026-05-10",
        status: "Completed"
      },
      {
        id: 2,
        title: "Setup Database",
        assigned: "Alex Johnson",
        due: "2026-05-12",
        status: "In Progress"
      }
    ]
  );

  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskDue, setTaskDue] = useState("");

  // ================= SAVE DATA =================

  useEffect(() => {
    localStorage.setItem(
      "loggedIn",
      JSON.stringify(loggedIn)
    );
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem(
      "projects",
      JSON.stringify(projects)
    );
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(
      "team",
      JSON.stringify(team)
    );
  }, [team]);

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  // ================= AUTH FUNCTIONS =================

  const login = () => {

    if (!email || !password) {
      alert("Enter Email & Password");
      return;
    }

    setLoggedIn(true);
  };

  const logout = () => {

    setLoggedIn(false);

    localStorage.removeItem("loggedIn");
  };

  // ================= PROJECT FUNCTIONS =================

  const createProject = () => {

    if (!projectName) return;

    const newProject = {
      id: Date.now(),
      name: projectName,
      description: "New Project",
      status: "Active"
    };

    setProjects([...projects, newProject]);

    setProjectName("");
  };

  const deleteProject = (id) => {

    setProjects(
      projects.filter(
        (project) => project.id !== id
      )
    );
  };

  // ================= TEAM FUNCTIONS =================

  const addMember = () => {

    if (!memberName) return;

    const newMember = {
      id: Date.now(),
      name: memberName,
      role: "Team Member",
      email:
        memberName.toLowerCase() +
        "@example.com",
      color: "#f97316"
    };

    setTeam([...team, newMember]);

    setMemberName("");
  };

  const deleteMember = (id) => {

    setTeam(
      team.filter(
        (member) => member.id !== id
      )
    );
  };

  // ================= TASK FUNCTIONS =================

  const addTask = () => {

    if (
      !taskName ||
      !assignedTo ||
      !taskDue
    ) {
      alert("Fill all fields");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskName,
      assigned: assignedTo,
      due: taskDue,
      status: "Pending"
    };

    setTasks([...tasks, newTask]);

    setTaskName("");
    setAssignedTo("");
    setTaskDue("");
  };

  const deleteTask = (id) => {

    setTasks(
      tasks.filter(
        (task) => task.id !== id
      )
    );
  };

  const filteredTasks =
    taskFilter === "All"
      ? tasks
      : tasks.filter(
          (task) =>
            task.status === taskFilter
        );

  // ================= COUNTS =================

  const completedTasks =
    tasks.filter(
      (t) => t.status === "Completed"
    ).length;

  const overdueTasks =
    tasks.filter(
      (t) => t.status === "Overdue"
    ).length;

  // ================= LOGIN PAGE =================

  if (!loggedIn) {

    return (

      <div style={authContainer}>

        <style>{placeholderStyle}</style>

        <div style={authBox}>

          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px",
              fontWeight: "800"
            }}
          >
            {isRegister
              ? "Create Account"
              : "Welcome Back"}
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "30px"
            }}
          >
            Professional Project & Team Management Platform
          </p>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={input}
          />

          <button
            style={blueBtn}
            onClick={login}
          >
            {isRegister
              ? "Register"
              : "Login"}
          </button>

          <button
            style={switchBtn}
            onClick={() =>
              setIsRegister(
                !isRegister
              )
            }
          >
            {isRegister
              ? "Already have account?"
              : "Create account"}
          </button>

        </div>

      </div>
    );
  }

  // ================= MAIN APP =================

  return (

    <div style={container}>

      {/* SIDEBAR */}

      <div style={sidebar}>

        <h1
          style={{
            color: "white",
            marginBottom: "30px"
          }}
        >
          Team Manager
        </h1>

        <SidebarButton
          title="Dashboard"
          active={page === "dashboard"}
          onClick={() =>
            setPage("dashboard")
          }
        />

        <SidebarButton
          title="Projects"
          active={page === "projects"}
          onClick={() =>
            setPage("projects")
          }
        />

        <SidebarButton
          title="Tasks"
          active={page === "tasks"}
          onClick={() =>
            setPage("tasks")
          }
        />

        <SidebarButton
          title="Team"
          active={page === "team"}
          onClick={() =>
            setPage("team")
          }
        />

        <button
          style={logoutBtn}
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* MAIN */}

      <div style={main}>

        {/* DASHBOARD */}

        {page === "dashboard" && (

          <>

            <h1 style={title}>
              Dashboard
            </h1>

            <p style={subtitle}>
              Welcome back! Here's your workspace overview.
            </p>

            <div style={cardGrid}>

              <DashboardCard
                title="Projects"
                value={projects.length}
                color="#3b82f6"
              />

              <DashboardCard
                title="Tasks"
                value={tasks.length}
                color="#f59e0b"
              />

              <DashboardCard
                title="Completed"
                value={completedTasks}
                color="#22c55e"
              />

              <DashboardCard
                title="Overdue"
                value={overdueTasks}
                color="#ef4444"
              />

            </div>

            <div style={dashboardPanel}>

              <h2>Recent Tasks</h2>

              {tasks.map((task) => (

                <div
                  key={task.id}
                  style={taskRow}
                >

                  <div>

                    <h3>
                      {task.title}
                    </h3>

                    <p>
                      Assigned to {task.assigned}
                    </p>

                  </div>

                  <span style={badge}>
                    {task.status}
                  </span>

                </div>

              ))}

            </div>

          </>
        )}

        {/* PROJECTS */}

        {page === "projects" && (

          <>

            <h1 style={title}>
              Projects
            </h1>

            <p style={subtitle}>
              Manage projects and progress.
            </p>

            <input
              placeholder="Project Name"
              value={projectName}
              onChange={(e) =>
                setProjectName(
                  e.target.value
                )
              }
              style={projectInput}
            />

            <button
              style={blueBtn}
              onClick={createProject}
            >
              + New Project
            </button>

            <div style={grid}>

              {projects.map((project) => (

                <div
                  key={project.id}
                  style={card}
                >

                  <h2>
                    {project.name}
                  </h2>

                  <p>
                    {
                      project.description
                    }
                  </p>

                  <span style={badge}>
                    {project.status}
                  </span>

                  <button
                    style={deleteBtn}
                    onClick={() =>
                      deleteProject(
                        project.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          </>
        )}

        {/* TASKS */}

        {page === "tasks" && (

          <>

            <h1 style={title}>
              Tasks
            </h1>

            <p style={subtitle}>
              Create and track tasks.
            </p>

            <div style={filterRow}>

              {[
                "All",
                "Pending",
                "In Progress",
                "Completed",
                "Overdue"
              ].map((filter) => (

                <button
                  key={filter}
                  onClick={() =>
                    setTaskFilter(
                      filter
                    )
                  }
                  style={
                    taskFilter ===
                    filter
                      ? activeFilter
                      : filterBtn
                  }
                >
                  {filter}
                </button>

              ))}

            </div>

            <input
              placeholder="Task Name"
              value={taskName}
              onChange={(e) =>
                setTaskName(
                  e.target.value
                )
              }
              style={projectInput}
            />

            <input
              placeholder="Assigned To"
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(
                  e.target.value
                )
              }
              style={projectInput}
            />

            <input
              type="date"
              value={taskDue}
              onChange={(e) =>
                setTaskDue(
                  e.target.value
                )
              }
              style={projectInput}
            />

            <button
              style={blueBtn}
              onClick={addTask}
            >
              + Add Task
            </button>

            {filteredTasks.map((task) => (

              <div
                key={task.id}
                style={taskCard}
              >

                <div>

                  <h2>
                    {task.title}
                  </h2>

                  <p>
                    Assigned to{" "}
                    {task.assigned}
                  </p>

                  <p>
                    Due: {task.due}
                  </p>

                </div>

                <div>

                  <select
                    value={task.status}
                    onChange={(e) => {

                      const updated =
                        tasks.map(
                          (t) =>
                            t.id ===
                            task.id
                              ? {
                                  ...t,
                                  status:
                                    e.target
                                      .value
                                }
                              : t
                        );

                      setTasks(updated);
                    }}
                    style={select}
                  >

                    <option>
                      Pending
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Completed
                    </option>

                    <option>
                      Overdue
                    </option>

                  </select>

                  <button
                    style={deleteBtn}
                    onClick={() =>
                      deleteTask(
                        task.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </>
        )}

        {/* TEAM */}

        {page === "team" && (

          <>

            <h1 style={title}>
              Team
            </h1>

            <p style={subtitle}>
              Manage your team members.
            </p>

            <input
              placeholder="Member Name"
              value={memberName}
              onChange={(e) =>
                setMemberName(
                  e.target.value
                )
              }
              style={projectInput}
            />

            <button
              style={blueBtn}
              onClick={addMember}
            >
              + Add Member
            </button>

            <div style={grid}>

              {team.map((member) => (

                <div
                  key={member.id}
                  style={card}
                >

                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      background:
                        member.color,
                      borderRadius:
                        "50%",
                      color: "white",
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      fontSize:
                        "30px",
                      fontWeight:
                        "bold"
                    }}
                  >
                    {member.name.charAt(
                      0
                    )}
                  </div>

                  <h2>
                    {member.name}
                  </h2>

                  <p>
                    {member.role}
                  </p>

                  <p>
                    {member.email}
                  </p>

                  <button
                    style={deleteBtn}
                    onClick={() =>
                      deleteMember(
                        member.id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          </>
        )}

      </div>

    </div>
  );
}

// ================= COMPONENTS =================

function SidebarButton({
  title,
  active,
  onClick
}) {

  return (

    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "18px",
        marginTop: "10px",
        border: "none",
        borderRadius: "18px",
        cursor: "pointer",
        background: active
          ? "linear-gradient(135deg,#2563eb,#3b82f6)"
          : "transparent",
        color: "white",
        fontSize: "17px",
        fontWeight: "600",
        textAlign: "left"
      }}
    >
      {title}
    </button>
  );
}

function DashboardCard({
  title,
  value,
  color
}) {

  return (

    <div style={dashboardCard}>

      <h2
        style={{
          color: "#94a3b8"
        }}
      >
        {title}
      </h2>

      <h1
        style={{
          color,
          fontSize: "60px"
        }}
      >
        {value}
      </h1>

    </div>
  );
}

// ================= STYLES =================

const placeholderStyle = `
input::placeholder{
  color: rgba(255,255,255,0.55);
}
`;

const authContainer = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(135deg,#020617,#0f172a,#1e3a8a,#2563eb)"
};

const authBox = {
  width: "430px",
  padding: "45px",
  borderRadius: "32px",
  background:
    "rgba(15,23,42,0.75)",
  backdropFilter: "blur(18px)",
  border:
    "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 20px 60px rgba(0,0,0,0.45)",
  color: "white"
};

const input = {
  width: "100%",
  padding: "18px",
  marginTop: "15px",
  marginBottom: "18px",
  borderRadius: "16px",
  border:
    "1px solid rgba(255,255,255,0.1)",
  background:
    "rgba(255,255,255,0.08)",
  color: "white",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box"
};

const container = {
  display: "flex",
  minHeight: "100vh",
  background: "#0f172a",
  fontFamily: "Inter, sans-serif"
};

const sidebar = {
  width: "280px",
  background:
    "linear-gradient(180deg,#020617,#111827)",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  borderRight:
    "1px solid rgba(255,255,255,0.05)"
};

const main = {
  flex: 1,
  padding: "40px",
  background: "#111827",
  color: "white"
};

const title = {
  fontSize: "52px",
  fontWeight: "800",
  color: "white"
};

const subtitle = {
  color: "#94a3b8",
  fontSize: "18px",
  marginBottom: "35px"
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",
  gap: "25px"
};

const dashboardCard = {
  background:
    "rgba(255,255,255,0.05)",
  borderRadius: "25px",
  padding: "30px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)"
};

const dashboardPanel = {
  marginTop: "35px",
  background:
    "rgba(255,255,255,0.05)",
  padding: "35px",
  borderRadius: "25px",
  border:
    "1px solid rgba(255,255,255,0.08)"
};

const taskRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderRadius: "18px",
  background:
    "rgba(255,255,255,0.03)",
  marginTop: "18px"
};

const badge = {
  padding: "10px 18px",
  borderRadius: "50px",
  background:
    "linear-gradient(135deg,#2563eb,#3b82f6)",
  color: "white",
  fontWeight: "600"
};

const projectInput = {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  background:
    "rgba(255,255,255,0.05)",
  color: "white",
  marginBottom: "15px",
  outline: "none"
};

const blueBtn = {
  background:
    "linear-gradient(135deg,#2563eb,#7c3aed)",
  color: "white",
  border: "none",
  padding: "16px 24px",
  borderRadius: "16px",
  cursor: "pointer",
  fontWeight: "700",
  width: "100%"
};

const switchBtn = {
  marginTop: "25px",
  border: "none",
  background: "transparent",
  color: "#cbd5e1",
  cursor: "pointer",
  width: "100%"
};

const logoutBtn = {
  marginTop: "auto",
  background:
    "linear-gradient(135deg,#ef4444,#dc2626)",
  color: "white",
  border: "none",
  padding: "16px",
  borderRadius: "16px",
  cursor: "pointer",
  fontWeight: "700"
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,1fr))",
  gap: "25px",
  marginTop: "30px"
};

const card = {
  background:
    "rgba(255,255,255,0.05)",
  borderRadius: "25px",
  padding: "30px",
  border:
    "1px solid rgba(255,255,255,0.08)"
};

const deleteBtn = {
  marginTop: "18px",
  background:
    "linear-gradient(135deg,#ef4444,#dc2626)",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "12px",
  cursor: "pointer"
};

const taskCard = {
  background:
    "rgba(255,255,255,0.05)",
  padding: "28px",
  borderRadius: "24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "22px",
  border:
    "1px solid rgba(255,255,255,0.08)"
};

const select = {
  padding: "14px",
  borderRadius: "12px",
  background: "#1e293b",
  color: "white",
  border:
    "1px solid rgba(255,255,255,0.1)"
};

const filterRow = {
  display: "flex",
  gap: "12px",
  marginBottom: "25px",
  flexWrap: "wrap"
};

const filterBtn = {
  padding: "12px 22px",
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
  background:
    "rgba(255,255,255,0.05)",
  color: "white"
};

const activeFilter = {
  ...filterBtn,
  background:
    "linear-gradient(135deg,#2563eb,#3b82f6)"
};

export default App;