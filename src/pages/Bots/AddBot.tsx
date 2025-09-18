import React, { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, TelegramLogo, Globe, WhatsappLogo, InstagramLogo, Copy, Warning } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

interface Platform {
  id: string;
  name: string;
  persianName: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
}

const AddBot: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [botName, setBotName] = useState("");
  const [telegramToken, setTelegramToken] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const navigate = useNavigate();

  const platforms: Platform[] = [
    {
      id: "telegram",
      name: "Telegram",
      persianName: "تلگرام",
      icon: <TelegramLogo size={32} className="text-white" />,
      description: "ربات تلگرام برای ارتباط با کاربران در پلتفرم تلگرام",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: "website",
      name: "Website",
      persianName: "وب‌سایت",
      icon: <Globe size={32} className="text-white" />,
      description: "یک ویجت چت به وب‌سایت خود اضافه کنید",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      persianName: "واتساپ",
      icon: <WhatsappLogo size={32} className="text-white" />,
      description: "ربات واتساپ برای پشتیبانی کسب‌وکار",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: "instagram",
      name: "Instagram",
      persianName: "اینستاگرام",
      icon: <InstagramLogo size={32} className="text-white" />,
      description: "ربات اینستاگرام برای مدیریت پیام‌های مستقیم",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      setConnectionSuccess(true);
      setCurrentStep(4);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
            step <= currentStep
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? <CheckCircle size={16} /> : step}
          </div>
          {step < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderPlatformSelection = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">انتخاب پلتفرم</h2>
        <p className="text-gray-600">پلتفرمی که می‌خواهید ربات خود را روی آن راه‌اندازی کنید انتخاب کنید</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            onClick={() => handlePlatformSelect(platform.id)}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedPlatform === platform.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${platform.gradient} flex items-center justify-center`}>
                {platform.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{platform.persianName}</h3>
                <p className="text-sm text-gray-500">{platform.name}</p>
              </div>
            </div>
            <p className="text-gray-600">{platform.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBasicConfiguration = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">تنظیمات اولیه</h2>
        <p className="text-gray-600">اطلاعات اولیه ربات خود را وارد کنید</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نام ربات
          </label>
          <Input
            placeholder="مثلاً: ربات پشتیبانی فروشگاه"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            inputSize="lg"
          />
          <p className="text-xs text-gray-500 mt-1">این نام به کاربران نمایش داده می‌شود</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">پلتفرم انتخاب شده:</h4>
          <div className="flex items-center gap-3">
            {platforms.find(p => p.id === selectedPlatform)?.icon}
            <span className="text-blue-800">{platforms.find(p => p.id === selectedPlatform)?.persianName}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlatformConnection = () => {
    const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

    if (selectedPlatform === "telegram") {
      return (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">اتصال به تلگرام</h2>
            <p className="text-gray-600">توکن API تلگرام خود را وارد کنید</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Warning className="text-amber-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-amber-800 mb-2">دستورالعمل دریافت توکن:</h4>
                <ol className="text-sm text-amber-700 space-y-1">
                  <li>۱. به ربات @BotFather در تلگرام بروید</li>
                  <li>۲. دستور /newbot را ارسال کنید</li>
                  <li>۳. نام و نام کاربری ربات خود را انتخاب کنید</li>
                  <li>۴. توکنی که دریافت می‌کنید را در زیر کپی کنید</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                توکن API تلگرام
              </label>
              <Input
                placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                value={telegramToken}
                onChange={(e) => setTelegramToken(e.target.value)}
                inputSize="lg"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={isConnecting}
              disabled={!telegramToken}
              onClick={handleConnect}
            >
              {isConnecting ? "در حال اتصال..." : "اتصال به تلگرام"}
            </Button>
          </div>
        </div>
      );
    }

    if (selectedPlatform === "website") {
      return (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">اتصال به وب‌سایت</h2>
            <p className="text-gray-600">کد زیر را در وب‌سایت خود کپی کنید</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">کد JavaScript:</label>
                <button
                  onClick={() => copyToClipboard(`<script src="https://bot.yoursite.com/widget.js" data-bot-id="${botName.replace(/\s+/g, '-').toLowerCase()}"></script>`)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  <Copy size={16} />
                  کپی
                </button>
              </div>
              <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                {`<script src="https://bot.yoursite.com/widget.js" data-bot-id="${botName.replace(/\s+/g, '-').toLowerCase()}"></script>`}
              </code>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">نحوه نصب:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>۱. کد بالا را کپی کنید</li>
                <li>۲. آن را در تگ head صفحات وب‌سایت خود قرار دهید</li>
                <li>۳. ویجت چت به صورت خودکار نمایش داده می‌شود</li>
              </ol>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                setConnectionSuccess(true);
                setCurrentStep(4);
              }}
            >
              تایید و ادامه
            </Button>
          </div>
        </div>
      );
    }

    if (selectedPlatform === "whatsapp" || selectedPlatform === "instagram") {
      return (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              اتصال به {selectedPlatformData?.persianName}
            </h2>
            <p className="text-gray-600">نیاز به تنظیمات Meta Business دارید</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-medium text-blue-900 mb-4">مراحل اتصال:</h4>
            <ol className="text-sm text-blue-800 space-y-2">
              <li>۱. به Meta Business Manager بروید</li>
              <li>۲. یک اپلیکیشن جدید ایجاد کنید</li>
              <li>۳. API {selectedPlatformData?.persianName} را فعال کنید</li>
              <li>۴. اطلاعات اعتباری (Credentials) را دریافت کنید</li>
            </ol>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-xs text-blue-700">
                برای راهنمای کامل به مستندات Meta Business مراجعه کنید
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <Input
              placeholder="App ID"
              inputSize="lg"
            />
            <Input
              placeholder="App Secret"
              inputSize="lg"
            />
            <Input
              placeholder="Access Token"
              inputSize="lg"
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => {
              setConnectionSuccess(true);
              setCurrentStep(4);
            }}
            className="mt-6"
          >
            اتصال به {selectedPlatformData?.persianName}
          </Button>
        </div>
      );
    }

    return null;
  };

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} className="text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">تبریک!</h2>
      <p className="text-gray-600 mb-8">ربات شما با موفقیت ساخته شد و آماده استفاده است.</p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-right">
        <h4 className="font-medium text-gray-900 mb-4">خلاصه اطلاعات ربات:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">نام ربات:</span>
            <span className="font-medium">{botName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">پلتفرم:</span>
            <span className="font-medium">{platforms.find(p => p.id === selectedPlatform)?.persianName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">وضعیت:</span>
            <span className="text-green-600 font-medium">فعال و آماده</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => navigate(`/bots/1`)}
        >
          ورود به پنل ربات
        </Button>
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => navigate("/bots")}
        >
          بازگشت به لیست ربات‌ها
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPlatformSelection();
      case 2:
        return renderBasicConfiguration();
      case 3:
        return renderPlatformConnection();
      case 4:
        return renderConfirmation();
      default:
        return renderPlatformSelection();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedPlatform !== "";
      case 2:
        return botName.trim() !== "";
      case 3:
        return connectionSuccess;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/bots")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">افزودن ربات جدید</h1>
                <p className="text-sm text-gray-600">
                  مرحله {currentStep} از ۴: {
                    currentStep === 1 ? "انتخاب پلتفرم" :
                    currentStep === 2 ? "تنظیمات اولیه" :
                    currentStep === 3 ? "اتصال به پلتفرم" :
                    "تایید و اتمام"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStepIndicator()}
        {renderCurrentStep()}

        {currentStep < 4 && (
          <div className="max-w-2xl mx-auto mt-8 flex justify-between">
            <Button
              variant="secondary"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
            >
              مرحله قبل
            </Button>
            <Button
              variant="primary"
              onClick={handleNextStep}
              disabled={!canProceed()}
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              مرحله بعد
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBot;