import React, { useState } from "react";
import Card from "../../components/Card";

const Settings = () => {
  const [centerName, setCenterName] = useState("Bee Bright Tutorial Center");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [defaultFee, setDefaultFee] = useState("₱2,500 per month");
  const [paymentMethods, setPaymentMethods] = useState([
    "GCash",
    "Bank Transfer",
    "Cash",
  ]);

  return (
    <Card>
      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">
        System Settings ⚙️
      </h2>

      <div className="space-y-8">
        {/* General Settings */}
        <div>
          <h3 className="font-bold text-neutral-900 mb-3">General Settings</h3>
          <div className="space-y-3">
            <SettingItem
              title="Tutorial Center Name"
              description={centerName}
              actionLabel="Edit"
              onAction={() => {
                const newName = prompt("Enter new center name:", centerName);
                if (newName) setCenterName(newName);
              }}
            />

            <SettingSwitch
              title="Email Notifications"
              description="Enable email alerts for important events"
              checked={emailNotifications}
              onToggle={() => setEmailNotifications(!emailNotifications)}
            />
          </div>
        </div>

        
      
      </div>
    </Card>
  );
};

/* ----------------- REUSABLE COMPONENTS ----------------- */

const SettingItem = ({ title, description, actionLabel, onAction, actionClass }) => (
  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
    <div>
      <div className="font-semibold text-neutral-900">{title}</div>
      <div className="text-sm text-neutral-600">{description}</div>
    </div>
    <button
      onClick={onAction}
      className={`text-sm font-semibold rounded-lg px-4 py-2 transition ${
        actionClass ||
        "text-primary-600 hover:text-primary-700 hover:bg-primary-50"
      }`}
    >
      {actionLabel}
    </button>
  </div>
);

const SettingSwitch = ({ title, description, checked, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
    <div>
      <div className="font-semibold text-neutral-900">{title}</div>
      <div className="text-sm text-neutral-600">{description}</div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onToggle}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
    </label>
  </div>
);

export default Settings;
