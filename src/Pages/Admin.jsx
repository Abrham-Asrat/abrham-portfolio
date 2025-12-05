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
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* User Info */}
        <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Welcome, Admin</h2>
              {user && <p className="text-gray-400">{user.email}</p>}
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-900/50 border border-green-500"
                : "bg-red-900/50 border border-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Update Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Update Email Card */}
          <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-[#6366f1]" />
              <h3 className="text-xl font-semibold">Update Email</h3>
            </div>

            {!showEmailForm ? (
              <div>
                <p className="text-gray-400 mb-4">
                  Change the email address associated with your account.
                </p>
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="px-4 py-2 bg-[#6366f1] hover:bg-[#5555e5] rounded-lg transition-colors"
                >
                  Change Email
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={emailDataWithPassword.currentPassword}
                        onChange={(e) =>
                          setEmailDataWithPassword({
                            ...emailDataWithPassword,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                        placeholder="Enter current password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      New Email
                    </label>
                    <input
                      type="email"
                      value={emailDataWithPassword.newEmail}
                      onChange={(e) =>
                        setEmailDataWithPassword({
                          ...emailDataWithPassword,
                          newEmail: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                      placeholder="Enter new email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Confirm Email
                    </label>
                    <input
                      type="email"
                      value={emailDataWithPassword.confirmEmail}
                      onChange={(e) =>
                        setEmailDataWithPassword({
                          ...emailDataWithPassword,
                          confirmEmail: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                      placeholder="Confirm new email"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#6366f1] hover:bg-[#5555e5] rounded-lg transition-colors"
                    >
                      Update Email
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEmailForm(false);
                        setEmailDataWithPassword({
                          newEmail: "",
                          confirmEmail: "",
                          currentPassword: "",
                        });
                        setShowCurrentPassword(false);
                      }}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Update Password Card */}
          <div className="bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-[#a855f7]" />
              <h3 className="text-xl font-semibold">Update Password</h3>
            </div>

            {!showPasswordForm ? (
              <div>
                <p className="text-gray-400 mb-4">
                  Change your account password for security.
                </p>
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="px-4 py-2 bg-[#a855f7] hover:bg-[#9a4ae0] rounded-lg transition-colors"
                >
                  Change Password
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                        placeholder="Enter current password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                        placeholder="Confirm new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#a855f7] hover:bg-[#9a4ae0] rounded-lg transition-colors"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                        setShowCurrentPassword(false);
                        setShowNewPassword(false);
                        setShowConfirmPassword(false);
                      }}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Security Tips */}
        <div className="mt-8 bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Security Tips</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-[#6366f1]">•</span>
              <span>
                Use a strong password with at least 8 characters including
                numbers and symbols
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366f1]">•</span>
              <span>Enable two-factor authentication for extra security</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366f1]">•</span>
              <span>Never share your credentials with anyone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366f1]">•</span>
              <span>
                Regularly update your password and review account activity
              </span>
            </li>
          </ul>
        </div>

        {/* Messages Section */}
        <div className="mt-8 bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#6366f1]" />
              Messages
              <span className="text-sm bg-[#6366f1]/20 text-[#6366f1] px-2 py-1 rounded-full">
                {messages.length}
              </span>
            </h3>
          </div>

          {loadingMessages ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6366f1]"></div>
              <p className="mt-2 text-gray-400">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No messages found</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="bg-[#1a1a2e]/50 p-4 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-semibold text-white">
                          {message.name}
                        </span>
                        <span className="text-gray-400 text-sm">
                          &lt;{message.email}&gt;
                        </span>
                        <span className="text-gray-500 text-xs">
                          {message.timestamp
                            ? message.timestamp.toDate
                              ? message.timestamp.toDate().toLocaleString()
                              : new Date(message.timestamp).toLocaleString()
                            : "Unknown date"}
                        </span>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="ml-2 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-full transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-8 bg-[#0f0c29]/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#a855f7]" />
              Comments
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
            <p className="text-gray-400 text-center py-4">No comments found</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-[#1a1a2e]/50 p-4 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-semibold text-white">
                          {comment.userName || comment.name}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {comment.timestamp || comment.createdAt
                            ? (comment.timestamp || comment.createdAt).toDate
                              ? (comment.timestamp || comment.createdAt)
                                  .toDate()
                                  .toLocaleString()
                              : new Date(
                                  comment.timestamp || comment.createdAt
                                ).toLocaleString()
                            : "Unknown date"}
                        </span>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap">
                        {comment.content || comment.comment}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="ml-2 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-full transition-colors"
                      title="Delete comment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
