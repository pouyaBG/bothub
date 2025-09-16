import React, { useState } from "react";
import {
  User,
  Lock,
  Camera,
  Phone,
  Eye,
  EyeSlash,
  MapPinLine,
} from "phosphor-react";
import ConfirmationModal from "../../components/common/ConfirmationModal";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"personal" | "password">(
    "personal"
  );
  const [profile, setProfile] = useState<UserProfile>({
    name: "احمد محمدی",
    email: "ahmad@example.com",
    phone: "09123456789",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    type: "warning" as "warning" | "info" | "success",
  });

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (
    field: keyof typeof passwords,
    value: string
  ) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSavePersonalInfo = () => {
    setModalConfig({
      title: "تایید تغییرات",
      message: "آیا از ذخیره تغییرات اطلاعات شخصی اطمینان دارید؟",
      type: "info",
    });
    setShowModal(true);
  };

  const handleSavePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("رمز عبور جدید و تایید آن مطابقت ندارند");
      return;
    }
    if (passwords.newPassword.length < 6) {
      alert("رمز عبور باید حداقل 6 کاراکتر باشد");
      return;
    }

    setModalConfig({
      title: "تایید تغییر رمز عبور",
      message: "آیا از تغییر رمز عبور اطمینان دارید؟",
      type: "warning",
    });
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (activeTab === "personal") {
      // Save personal info logic
      console.log("Saving personal info:", profile);
    } else {
      // Save password logic
      console.log("Changing password");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    setShowModal(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">پروفایل کاربری</h1>
        <p className="text-gray-600 mt-1">مدیریت اطلاعات حساب کاربری شما</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 space-x-reverse px-6">
          <button
            onClick={() => setActiveTab("personal")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "personal"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}>
            <div className="flex items-center space-x-2 space-x-reverse">
              <User size={18} />
              <span>اطلاعات شخصی</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "password"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Lock size={18} />
              <span>تغییر رمز عبور</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "personal" && (
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    profile.name.charAt(0)
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg">
                  <Camera size={16} />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {profile.name}
                </h3>
                <p className="text-gray-500">{profile.email}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام و نام خانوادگی
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      handleProfileChange("name", e.target.value)
                    }
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شماره تلفن
                </label>
                <div className="relative">
                  <Phone
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      handleProfileChange("phone", e.target.value)
                    }
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="شماره تلفن خود را وارد کنید"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل
                </label>
                <div className="relative">
                  <MapPinLine
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      handleProfileChange("email", e.target.value)
                    }
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ایمیل خود را وارد کنید"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSavePersonalInfo}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                ذخیره تغییرات
              </button>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="space-y-8">
            {/* Password Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  رمز عبور فعلی
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      handlePasswordChange("currentPassword", e.target.value)
                    }
                    className="w-full pr-10 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="رمز عبور فعلی را وارد کنید"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPasswords.current ? (
                      <EyeSlash size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  رمز عبور جدید
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwords.newPassword}
                    onChange={(e) =>
                      handlePasswordChange("newPassword", e.target.value)
                    }
                    className="w-full pr-10 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="رمز عبور جدید را وارد کنید"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPasswords.new ? (
                      <EyeSlash size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  تایید رمز عبور جدید
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      handlePasswordChange("confirmPassword", e.target.value)
                    }
                    className="w-full pr-10 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="رمز عبور جدید را مجدداً وارد کنید"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPasswords.confirm ? (
                      <EyeSlash size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                  <h4 className="text-sm font-semibold text-blue-800">
                    الزامات رمز عبور
                  </h4>
                </div>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-400 rounded-full ml-2"></span>
                    حداقل 6 کاراکتر
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-400 rounded-full ml-2"></span>
                    شامل حروف و اعداد
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-400 rounded-full ml-2"></span>
                    استفاده از کاراکترهای خاص توصیه می‌شود
                  </li>
                </ul>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                onClick={handleSavePassword}
                disabled={
                  !passwords.currentPassword ||
                  !passwords.newPassword ||
                  !passwords.confirmPassword
                }
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-md hover:shadow-lg">
                تغییر رمز عبور
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default Profile;
