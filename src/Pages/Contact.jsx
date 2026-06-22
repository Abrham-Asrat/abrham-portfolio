import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { db, collection, addDoc } from "../firebase";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while we send your message",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Save message to Firebase
      const messagesCollection = collection(db, "messages");
      await addDoc(messagesCollection, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });

      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully!",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error saving message to Firebase:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div
        className="h-auto py-8 sm:py-10 md:py-12 flex items-center justify-center px-4 sm:px-6 md:px-8"
        id="Contact"
      >
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-[#030014]/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10 transform transition-all duration-300 hover:shadow-[#6366f1]/10 hover:shadow-2xl hover:scale-105 hover:bg-[#030014]/10 hover:border-[#6366f1]/30 group animate-slide-in-left border border-gray-700/50 hover:border-[#6366f1]/50"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Get in Touch
                </h2>
                <p className="text-gray-400">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#6366f1] opacity-50 flex-shrink-0 mt-2 sm:mt-0" />
            </div>

            <form
              action="https://formsubmit.co/kabirsingh@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 bg-[#030014]/10 rounded-lg sm:rounded-xl border border-white/20 placeholder-gray-500 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50 group-hover:bg-[#030014]/20 group-focus-within:scale-105"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 bg-[#030014]/10 rounded-lg sm:rounded-xl border border-white/20 placeholder-gray-500 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50 group-hover:bg-[#030014]/20 group-focus-within:scale-105"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 bg-[#030014]/10 rounded-lg sm:rounded-xl border border-white/20 placeholder-gray-500 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 min-h-32 sm:min-h-40 disabled:opacity-50 group-hover:bg-[#030014]/20 group-focus-within:scale-105"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#6366f1]/50 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group-hover:animate-pulse-glow animate-fade-in"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          <div className="bg-[#030014]/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl transform transition-all duration-300 hover:shadow-[#6366f1]/10 hover:shadow-2xl hover:scale-105 hover:bg-[#030014]/10 group animate-slide-in-right border border-gray-700/50 hover:border-[#6366f1]/50">
            <Komentar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
