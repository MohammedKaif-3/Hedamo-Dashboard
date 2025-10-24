import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import { FiUser, FiLock, FiMoon, FiSun, FiBell } from "react-icons/fi";

const Settings = ({ theme, setTheme }) => {
  const isDark = theme === "dark";
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Admin",
  });

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    console.log("Saved:", { profile, notifications, twoFactor });
  };

  return (
    <div
      className={`p-6 transition-colors duration-300 font-poppins h-full ${
        isDark ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      }`}
      style={{
        maxHeight: "calc(100vh - 70px)",
        overflowY: "auto",
      }}
    >
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <motion.div
          whileHover={{ y: -3 }}
          className={`rounded-xl p-5 shadow-md ${
            isDark ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
            <FiUser /> Profile Information
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm opacity-80 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg outline-none ${
                  isDark
                    ? "bg-gray-800 text-white border border-gray-700"
                    : "bg-gray-50 border border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm opacity-80 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg outline-none ${
                  isDark
                    ? "bg-gray-800 text-white border border-gray-700"
                    : "bg-gray-50 border border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm opacity-80 mb-1">Role</label>
              <input
                type="text"
                value={profile.role}
                disabled
                className={`w-full px-3 py-2 rounded-lg outline-none ${
                  isDark
                    ? "bg-gray-800 text-gray-400 border border-gray-700"
                    : "bg-gray-50 border border-gray-300 text-gray-500"
                }`}
              />
            </div>

            <button
              onClick={handleSave}
              className={`mt-3 w-full py-2 rounded-lg font-medium transition-all ${
                isDark
                  ? "bg-[#B0DB9C]/20 text-[#B0DB9C] hover:bg-[#B0DB9C]/30"
                  : "bg-[#6b9080]/20 text-[#446455] hover:bg-[#6b9080]/30"
              }`}
            >
              Save Changes
            </button>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          whileHover={{ y: -3 }}
          className={`rounded-xl p-5 shadow-md ${
            isDark ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
            <FiBell /> Preferences
          </div>

          <div className="flex justify-between items-center mb-4">
            <span>Enable Notifications</span>
            <Switch
              checked={notifications}
              onChange={setNotifications}
              className={`${
                notifications
                  ? isDark
                    ? "bg-[#B0DB9C]"
                    : "bg-[#6b9080]"
                  : isDark
                  ? "bg-gray-700"
                  : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
            >
              <span
                className={`${
                  notifications ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span>Dark Mode</span>
            <Switch
              checked={isDark}
              onChange={() => setTheme(isDark ? "light" : "dark")}
              className={`${
                isDark ? "bg-[#B0DB9C]" : "bg-[#6b9080]"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
            >
              <span
                className={`${
                  isDark ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span>Two-Factor Authentication</span>
            <Switch
              checked={twoFactor}
              onChange={setTwoFactor}
              className={`${
                twoFactor
                  ? isDark
                    ? "bg-[#B0DB9C]"
                    : "bg-[#6b9080]"
                  : isDark
                  ? "bg-gray-700"
                  : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
            >
              <span
                className={`${
                  twoFactor ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          <div className="mt-4 text-sm opacity-80">
            Manage notification preferences, theme mode, and security settings.
          </div>
        </motion.div>
      </div>

      {/* Security Section */}
      <motion.div
        whileHover={{ y: -3 }}
        className={`mt-6 rounded-xl p-5 shadow-md ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
          <FiLock /> Security Settings
        </div>
        <div className="space-y-3">
          <button
            className={`w-full py-2 rounded-lg font-medium ${
              isDark
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-red-100 text-red-600 hover:bg-red-200"
            }`}
          >
            Change Password
          </button>
          <button
            className={`w-full py-2 rounded-lg font-medium ${
              isDark
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-red-100 text-red-600 hover:bg-red-200"
            }`}
          >
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
