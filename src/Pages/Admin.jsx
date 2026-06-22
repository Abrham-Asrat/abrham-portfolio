import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signOut,
  updateEmail,
  updatePassword,
  db,
} from "../firebase-auth";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import {
  Eye,
  EyeOff,
  LogOut,
  User,
  Lock,
  Mail,
  MessageSquare,
  Trash2,
} from "lucide-react";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCertificates, setLoadingCertificates] = useState(true);
  const [loadingTechStacks, setLoadingTechStacks] = useState(true);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [emailDataWithPassword, setEmailDataWithPassword] = useState({
    newEmail: "",
    confirmEmail: "",
    currentPassword: "",
  });
  const [certForm, setCertForm] = useState({
    Title: "",
    Img: "",
  });
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState("messages");
  const [techStackForm, setTechStackForm] = useState({ name: "", icon: "" });
  const [isAddingTech, setIsAddingTech] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    Title: "",
    Description: "",
    Link: "",
    Img: "",
    TechStack: "",
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;

      try {
        setLoadingMessages(true);
        const messagesCollection = collection(db, "messages");
        const messagesSnapshot = await getDocs(messagesCollection);
        const messagesList = messagesSnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
            };
          })
          .sort((a, b) => {
            // Handle Firebase Timestamp objects
            const timeA = a.timestamp
              ? a.timestamp.toDate
                ? a.timestamp.toDate()
                : new Date(a.timestamp)
              : new Date(0);
            const timeB = b.timestamp
              ? b.timestamp.toDate
                ? b.timestamp.toDate()
                : new Date(b.timestamp)
              : new Date(0);
            return timeB - timeA;
          });

        setMessages(messagesList);
      } catch (error) {
        console.error("Error fetching messages:", error);
        showMessage("error", "Failed to load messages");
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [user]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      try {
        setLoadingProjects(true);
        const projectsCollection = collection(db, "projects");
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsList = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [user]);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!user) return;
      try {
        setLoadingCertificates(true);
        const certificatesCollection = collection(db, "certificates");
        const certificatesSnapshot = await getDocs(certificatesCollection);
        const certificatesList = certificatesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCertificates(certificatesList);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoadingCertificates(false);
      }
    };

    fetchCertificates();
  }, [user]);

  useEffect(() => {
    const fetchTechStacks = async () => {
      if (!user) return;
      try {
        setLoadingTechStacks(true);
        const techCollection = collection(db, "techstacks");
        const techSnapshot = await getDocs(techCollection);
        const techList = techSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTechStacks(techList);
      } catch (error) {
        console.error("Error fetching tech stacks:", error);
      } finally {
        setLoadingTechStacks(false);
      }
    };

    fetchTechStacks();
  }, [user]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!user) return;

      try {
        setLoadingComments(true);
        const commentsCollection = collection(db, "portfolio-comments");
        const commentsSnapshot = await getDocs(commentsCollection);
        const commentsList = commentsSnapshot.docs
          .map((doc) => {
            const data = doc.data();
            // Handle both timestamp and createdAt fields
            const timestamp = data.timestamp || data.createdAt;
            return {
              id: doc.id,
              ...data,
              timestamp: timestamp,
            };
          })
          .sort((a, b) => {
            // Handle Firebase Timestamp objects
            const timeA = a.timestamp
              ? a.timestamp.toDate
                ? a.timestamp.toDate()
                : new Date(a.timestamp)
              : new Date(0);
            const timeB = b.timestamp
              ? b.timestamp.toDate
                ? b.timestamp.toDate()
                : new Date(b.timestamp)
              : new Date(0);
            return timeB - timeA;
          });

        setComments(commentsList);
      } catch (error) {
        console.error("Error fetching comments:", error);
        showMessage("error", "Failed to load comments");
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      showMessage("error", "Failed to logout. Please try again.");
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const deleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, "messages", id));
      setMessages(messages.filter((message) => message.id !== id));
      showMessage("success", "Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      showMessage("error", "Failed to delete message");
    }
  };

  const deleteComment = async (id) => {
    try {
      await deleteDoc(doc(db, "portfolio-comments", id));
      setComments(comments.filter((comment) => comment.id !== id));
      showMessage("success", "Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      showMessage("error", "Failed to delete comment");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter((project) => project.id !== id));
      showMessage("success", "Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      showMessage("error", "Failed to delete project");
    }
  };

  const deleteCertificate = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?"))
      return;
    try {
      await deleteDoc(doc(db, "certificates", id));
      setCertificates(certificates.filter((cert) => cert.id !== id));
      showMessage("success", "Certificate deleted successfully");
    } catch (error) {
      console.error("Error deleting certificate:", error);
      showMessage("error", "Failed to delete certificate");
    }
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    if (emailDataWithPassword.newEmail !== emailDataWithPassword.confirmEmail) {
      showMessage("error", "Email addresses do not match!");
      return;
    }

    if (!emailDataWithPassword.newEmail) {
      showMessage("error", "Please enter a valid email address!");
      return;
    }

    if (!emailDataWithPassword.currentPassword) {
      showMessage("error", "Please enter your current password!");
      return;
    }

    try {
      // Re-authenticate user before updating email
      const credential = EmailAuthProvider.credential(
        user.email,
        emailDataWithPassword.currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update email
      await updateEmail(user, emailDataWithPassword.newEmail);
      showMessage("success", "Email updated successfully!");
      setEmailDataWithPassword({
        newEmail: "",
        confirmEmail: "",
        currentPassword: "",
      });
      setShowEmailForm(false);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        showMessage("error", "Incorrect current password!");
      } else if (error.code === "auth/requires-recent-login") {
        showMessage("error", "Please log in again to update your email.");
      } else if (error.code === "auth/email-already-in-use") {
        showMessage("error", "Email is already in use!");
      } else if (error.code === "auth/invalid-email") {
        showMessage("error", "Invalid email address!");
      } else {
        showMessage("error", `Error updating email: ${error.message}`);
      }
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage("error", "Passwords do not match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showMessage("error", "Password should be at least 6 characters!");
      return;
    }

    if (!passwordData.currentPassword) {
      showMessage("error", "Please enter your current password!");
      return;
    }

    try {
      // Re-authenticate user before updating password
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordData.currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, passwordData.newPassword);
      showMessage("success", "Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        showMessage("error", "Incorrect current password!");
      } else if (error.code === "auth/requires-recent-login") {
        showMessage("error", "Please log in again to update your password.");
      } else if (error.code === "auth/weak-password") {
        showMessage("error", "Password is too weak!");
      } else {
        showMessage("error", `Error updating password: ${error.message}`);
      }
    }
  };

  const uploadFile = async (file, path) => {
    try {
      const storageRef = ref(getStorage(), `${path}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      let imageUrl = projectForm.Img;

      // Check if Img is a File object (from file input)
      if (projectForm.Img instanceof File) {
        imageUrl = await uploadFile(projectForm.Img, "projects");
      }

      const docRef = await addDoc(collection(db, "projects"), {
        ...projectForm,
        Img: imageUrl,
        TechStack: projectForm.TechStack.split(",").map((s) => s.trim()),
        timestamp: new Date(),
      });

      setProjects([
        { id: docRef.id, ...projectForm, Img: imageUrl, TechStack: projectForm.TechStack.split(",").map((s) => s.trim()) },
        ...projects,
      ]);
      setProjectForm({ Title: "", Description: "", Link: "", Img: "", TechStack: "" });
      setIsAddingProject(false);
      showMessage("success", "Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error);
      showMessage("error", "Failed to add project");
    } finally {
      setUploading(false);
    }
  };

  const handleCertSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      let imageUrl = certForm.Img;

      if (certForm.Img instanceof File) {
        imageUrl = await uploadFile(certForm.Img, "certificates");
      }

      const docRef = await addDoc(collection(db, "certificates"), {
        ...certForm,
        Img: imageUrl,
        timestamp: new Date(),
      });

      setCertificates([
        { id: docRef.id, ...certForm, Img: imageUrl },
        ...certificates,
      ]);
      setCertForm({ Title: "", Img: "" });
      setIsAddingCert(false);
      showMessage("success", "Certificate added successfully!");
    } catch (error) {
      console.error("Error adding certificate:", error);
      showMessage("error", "Failed to add certificate");
    } finally {
      setUploading(false);
    }
  };

  const handleTechSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const docRef = await addDoc(collection(db, "techstacks"), techStackForm);
      setTechStacks([...techStacks, { id: docRef.id, ...techStackForm }]);
      setTechStackForm({ name: "", icon: "" });
      setIsAddingTech(false);
      showMessage("success", "Tech stack item added!");
    } catch (error) {
      console.error("Error adding tech stack:", error);
      showMessage("error", "Failed to add tech stack");
    } finally {
      setUploading(false);
    }
  };

  const deleteTech = async (id) => {
    try {
      await deleteDoc(doc(db, "techstacks", id));
      setTechStacks(techStacks.filter((t) => t.id !== id));
      showMessage("success", "Tech removed");
    } catch (error) {
      console.error("Error deleting tech:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
      <div className="w-full min-h-screen bg-[#030014] text-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4 md:gap-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full md:w-auto">
            <nav className="flex gap-1 sm:gap-2 bg-[#0f0c29]/50 p-1 sm:p-2 rounded-lg border border-gray-700 flex-wrap sm:flex-nowrap">
              {["messages", "comments", "projects", "certificates", "tech", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm transition-all whitespace-nowrap ${activeTab === tab
                    ? "bg-[#6366f1] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                    } capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-lg shadow-red-600/20 text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* User Info & Global Msg */}
        <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold">Welcome, Admin</h2>
              {user && <p className="text-gray-400 text-sm">{user.email}</p>}
            </div>
          </div>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-3 sm:p-4 rounded-lg animate-fade-in text-sm sm:text-base ${message.type === "success"
              ? "bg-green-900/50 border border-green-500 text-green-200"
              : "bg-red-900/50 border border-red-500 text-red-200"
              }`}
          >
            {message.text}
          </div>
        )}

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "messages" && (
            <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#6366f1]" />
                  Internal Messages
                  <span className="text-sm bg-[#6366f1]/20 text-[#6366f1] px-2 py-1 rounded-full">
                    {messages.length}
                  </span>
                </h3>
              </div>

              {loadingMessages ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-[#6366f1]"></div>
                  <p className="mt-2 text-gray-400">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <p className="text-gray-400 text-center py-10 italic">No messages found</p>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-[#1a1a2e]/50 p-5 rounded-xl border border-gray-700 hover:border-gray-600 transition-all group">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-semibold text-white">{msg.name}</span>
                            <span className="text-gray-400 text-sm">&lt;{msg.email}&gt;</span>
                            <span className="text-gray-500 text-xs">
                              {msg.timestamp?.toDate?.()?.toLocaleString() || new Date(msg.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                        </div>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "comments" && (
            <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#a855f7]" />
                  Portfolio Comments
                  <span className="text-sm bg-[#a855f7]/20 text-[#a855f7] px-2 py-1 rounded-full">
                    {comments.length}
                  </span>
                </h3>
              </div>

              {loadingComments ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#a855f7]"></div>
                  <p className="mt-2 text-gray-400">Loading comments...</p>
                </div>
              ) : comments.length === 0 ? (
                <p className="text-gray-400 text-center py-10 italic">No comments found</p>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-[#1a1a2e]/50 p-5 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-white">{comment.userName || comment.name}</span>
                            <span className="text-gray-500 text-xs">
                              {comment.timestamp?.toDate?.()?.toLocaleString() || new Date(comment.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-300">{comment.content || comment.comment}</p>
                        </div>
                        <button
                          onClick={() => deleteComment(comment.id)}
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#6366f1]" />
                    Projects Management
                  </h3>
                  <button
                    onClick={() => setIsAddingProject(!isAddingProject)}
                    className="px-4 py-2 bg-[#6366f1] hover:bg-[#5555e5] rounded-lg transition-colors flex items-center gap-2"
                  >
                    {isAddingProject ? "Cancel" : "Add Project"}
                  </button>
                </div>

                {isAddingProject && (
                  <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-[#1a1a2e]/30 p-6 rounded-xl border border-gray-700 animate-fade-in">
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={projectForm.Title}
                        onChange={(e) => setProjectForm({ ...projectForm, Title: e.target.value })}
                        className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1] outline-none"
                        required
                      />
                      <input
                        type="url"
                        placeholder="Live/Demo Link"
                        value={projectForm.Link}
                        onChange={(e) => setProjectForm({ ...projectForm, Link: e.target.value })}
                        className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1] outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Tech Stack (comma separated)"
                        value={projectForm.TechStack}
                        onChange={(e) => setProjectForm({ ...projectForm, TechStack: e.target.value })}
                        className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1] outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Banner Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setProjectForm({ ...projectForm, Img: e.target.files[0] })}
                          className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1] outline-none file:bg-[#6366f1] file:border-none file:text-white file:rounded-md file:px-2 file:py-1 file:mr-2 file:cursor-pointer"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Project Brief</label>
                        <textarea
                          placeholder="Project Description"
                          value={projectForm.Description}
                          onChange={(e) => setProjectForm({ ...projectForm, Description: e.target.value })}
                          className="w-full h-24 px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1] outline-none resize-none"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={uploading}
                        className="w-full py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                      >
                        {uploading ? "Saving..." : "Add Project"}
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-[#1a1a2e]/50 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-all">
                      <img src={project.Img} alt="" className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h4 className="font-bold text-lg mb-2 truncate">{project.Title}</h4>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.TechStack?.map((tech, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 bg-[#6366f1]/10 text-[#6366f1] rounded-full border border-[#6366f1]/30">{tech}</span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="flex-1 py-1.5 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg border border-red-600/50 transition-all text-sm font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#a855f7]" />
                  Certificates Management
                </h3>
                <button
                  onClick={() => setIsAddingCert(!isAddingCert)}
                  className="px-4 py-2 bg-[#a855f7] hover:bg-[#9a4ae0] rounded-lg transition-colors flex items-center gap-2"
                >
                  {isAddingCert ? "Cancel" : "Add Certificate"}
                </button>
              </div>

              {isAddingCert && (
                <form onSubmit={handleCertSubmit} className="space-y-4 mb-8 bg-[#1a1a2e]/30 p-6 rounded-xl border border-gray-700 animate-fade-in max-w-xl">
                  <input
                    type="text"
                    placeholder="Certificate Title"
                    value={certForm.Title}
                    onChange={(e) => setCertForm({ ...certForm, Title: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#a855f7] outline-none"
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCertForm({ ...certForm, Img: e.target.files[0] })}
                    className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#a855f7] outline-none file:bg-[#a855f7] file:border-none file:text-white file:rounded-md file:px-2 file:py-1 file:mr-2 file:cursor-pointer"
                    required
                  />
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-2 bg-gradient-to-r from-[#a855f7] to-[#6366f1] rounded-lg font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {uploading ? "Uploading..." : "Save Certificate"}
                  </button>
                </form>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="relative group bg-[#1a1a2e]/50 border border-gray-700 rounded-lg overflow-hidden transition-all hover:border-[#a855f7]/50">
                    <img src={cert.Img} alt="" className="w-full aspect-[4/3] object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center flex-col gap-2">
                      <p className="text-[10px] line-clamp-2">{cert.Title}</p>
                      <button
                        onClick={() => deleteCertificate(cert.id)}
                        className="bg-red-500/80 hover:bg-red-500 p-1.5 rounded-full transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tech" && (
            <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#6366f1]" />
                  Tech Stack Management
                </h3>
              </div>
              <form onSubmit={handleTechSubmit} className="flex gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Language/Tech Name"
                  value={techStackForm.name}
                  onChange={(e) => setTechStackForm({ ...techStackForm, name: e.target.value })}
                  className="flex-1 px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Icon Name (e.g. SiReact)"
                  value={techStackForm.icon}
                  onChange={(e) => setTechStackForm({ ...techStackForm, icon: e.target.value })}
                  className="flex-1 px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg outline-none"
                  required
                />
                <button type="submit" className="px-6 py-2 bg-[#6366f1] rounded-lg font-bold">Add</button>
              </form>
              <div className="flex flex-wrap gap-2">
                {techStacks.map((tech) => (
                  <div key={tech.id} className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                    <span>{tech.name}</span>
                    <button onClick={() => deleteTech(tech.id)} className="text-red-400 hover:text-red-300">×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {/* Settings forms (Email/Password) */}
              <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-5 h-5 text-[#6366f1]" />
                  <h3 className="text-xl font-semibold">Update Email</h3>
                </div>
                {!showEmailForm ? (
                  <button onClick={() => setShowEmailForm(true)} className="w-full py-2 bg-[#6366f1] hover:bg-[#5555e5] rounded-lg transition-colors font-medium">Change Admin Email</button>
                ) : (
                  <form onSubmit={handleEmailUpdate} className="space-y-4">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Current Password"
                      value={emailDataWithPassword.currentPassword}
                      onChange={(e) => setEmailDataWithPassword({ ...emailDataWithPassword, currentPassword: e.target.value })}
                      className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1] outline-none"
                      required
                    />
                    <input
                      type="email"
                      placeholder="New Email"
                      value={emailDataWithPassword.newEmail}
                      onChange={(e) => setEmailDataWithPassword({ ...emailDataWithPassword, newEmail: e.target.value })}
                      className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1] outline-none"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Confirm New Email"
                      value={emailDataWithPassword.confirmEmail}
                      onChange={(e) => setEmailDataWithPassword({ ...emailDataWithPassword, confirmEmail: e.target.value })}
                      className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1] outline-none"
                      required
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 py-2 bg-[#6366f1] hover:bg-[#5555e5] rounded-lg font-bold transition-colors">Update</button>
                      <button type="button" onClick={() => setShowEmailForm(false)} className="px-4 py-2 bg-gray-700 rounded-lg font-medium">Cancel</button>
                    </div>
                  </form>
                )}
              </div>

              <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-5 h-5 text-[#a855f7]" />
                  <h3 className="text-xl font-semibold">Update Password</h3>
                </div>
                {!showPasswordForm ? (
                  <button onClick={() => setShowPasswordForm(true)} className="w-full py-2 bg-[#a855f7] hover:bg-[#9a4ae0] rounded-lg transition-colors font-medium">Change Password</button>
                ) : (
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Current Password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#a855f7] outline-none"
                      required
                    />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#a855f7] outline-none"
                      required
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#a855f7] outline-none"
                      required
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 py-2 bg-[#a855f7] hover:bg-[#9a4ae0] rounded-lg font-bold transition-colors">Update</button>
                      <button type="button" onClick={() => setShowPasswordForm(false)} className="px-4 py-2 bg-gray-700 rounded-lg font-medium">Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4b5563; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AdminPage;
