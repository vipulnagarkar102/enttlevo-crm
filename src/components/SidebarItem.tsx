import React from 'react';

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  to?: string;
  hasFlyout?: boolean;
  flyoutItems?: Array<{ name?: string; to?: string; icon?: string; isDivider?: boolean; hasIcon?: boolean }>;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, to = "#", hasFlyout, flyoutItems }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div 
      className="sidebar-item-container relative w-full flex flex-col items-center" 
      tabIndex={0}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a 
        className={`${active ? 'sidebar-item-active border-l-2 border-[#FF8000]' : 'sidebar-hover text-white/70'} w-12 h-12 flex items-center justify-center transition-all`} 
        href={to}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </a>
      {hasFlyout && flyoutItems && (
        <div className={`flyout-menu ${isOpen ? '!block opacity-100' : 'hidden opacity-0'} transition-all duration-300`}>
          <div className="flyout-header font-headline">{label}</div>
          {flyoutItems.map((item, idx) => (
            <div key={idx}>
              {item.isDivider ? (
                <div className="flyout-divider"></div>
              ) : (
                <a className="flyout-item group/item" href={item.to || "#"}>
                  <div className="flex items-center gap-3">
                    {item.icon && <span className="material-symbols-outlined !text-[18px] text-on-surface-variant group-hover/item:text-[#FF8000]">{item.icon}</span>}
                    <span className="group-hover/item:translate-x-1 transition-transform">{item.name}</span>
                  </div>
                  {item.hasIcon && <span className="material-symbols-outlined !text-[16px] text-on-surface-variant/40">chevron_right</span>}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
