import { useState } from 'react';

const TABS = ['Account', 'Notifications', 'Billing'];

const NOTIFICATION_SETTINGS = [
  {
    id: 'mentions',
    label: 'Mentions',
    description: 'Receive notifications when you are mentioned by other event collaborators.',
    defaultEnabled: true,
  },
  {
    id: 'new-event-invites',
    label: 'New event invites',
    description: 'Receive notifications when someone invites you to a new event.',
    defaultEnabled: true,
  },
  {
    id: 'reminders',
    label: 'Reminders',
    description: 'Receive notifications for tasks, events and incomplete information.',
    defaultEnabled: true,
  },
  {
    id: 'announcements',
    label: 'Announcements',
    description: 'Receive notifications for product related announcements and new features.',
    defaultEnabled: false,
  },
];

function ToggleSwitch({ enabled, onToggle, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={`toggle-switch flex w-10 shrink-0 items-center rounded-full p-[3px] transition-colors duration-200 ${
        enabled ? 'justify-end bg-white/40' : 'justify-start bg-white/15'
      }`}
    >
      <span className="toggle-switch__knob h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.12)]" />
    </button>
  );
}

export default function MyNewComponent() {
  const [activeTab, setActiveTab] = useState('Notifications');
  const [settings, setSettings] = useState(
    NOTIFICATION_SETTINGS.reduce((acc, setting) => {
      acc[setting.id] = setting.defaultEnabled;
      return acc;
    }, {})
  );

  const toggleSetting = (id) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="settings-panel flex w-[700px] flex-col items-start rounded-[28px] border border-white/[0.12] bg-black/[0.12] shadow-[0_24px_20px_0_rgba(0,0,0,0.20),-5px_-4px_40px_0_rgba(0,0,0,0.12)_inset]"
      style={{ fontFamily: "'Asta Sans', -apple-system, Roboto, Helvetica, sans-serif" }}
    >
      <div className="settings-panel__header flex w-full flex-col items-start gap-3 border-b border-white/[0.12] px-8 pt-8">
        <h2 className="settings-panel__title text-[30px] font-semibold leading-[140%] tracking-[-0.3px] text-white">
          Settings
        </h2>

        <div className="settings-panel__tabs flex w-full items-center gap-5">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`settings-panel__tab flex items-center justify-center gap-1.5 px-1 py-5 text-center text-base leading-[150%] text-white ${
                activeTab === tab ? 'border-b-2 border-white font-semibold' : 'font-normal'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-panel__body flex w-full flex-col items-start gap-16 px-8 pb-4 pt-3">
        <div className="settings-panel__list flex w-full flex-col items-start">
          {NOTIFICATION_SETTINGS.map((setting) => (
            <div
              key={setting.id}
              className="settings-panel__row flex w-full items-center gap-6 py-5"
            >
              <ToggleSwitch
                enabled={settings[setting.id]}
                onToggle={() => toggleSetting(setting.id)}
                label={setting.label}
              />
              <div className="settings-panel__row-text flex flex-1 flex-col items-start gap-1">
                <div className="settings-panel__row-title text-base font-semibold leading-[150%] text-white">
                  {setting.label}
                </div>
                <div className="settings-panel__row-description text-base font-normal leading-[150%] text-white/[0.68]">
                  {setting.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
