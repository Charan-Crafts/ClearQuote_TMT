import React from 'react';
import { NavLink } from 'react-router-dom';
import { House, SquarePlus, ReceiptText } from "lucide-react";

const Sidebar = () => {

    const items = [
        {
            name: "Dashboard",
            link: "/",
            icon: <House size={18} />
        },
        {
            name: "Add New",
            link: "/add-new",
            icon: <SquarePlus size={18} />
        }
    ];

    return (
        <aside className="w-64 min-h-screen bg-white border-r dark:bg-white dark:border-gray-800 p-4">
            <div className="mb-6 px-1">
                <h2 className="text-2xl font-semibold text-black dark:text-black ">ClearQuote</h2>
                
            </div>

            <nav aria-label="Main navigation">
                <ul className="space-y-1">
                    {items.map((item, idx) => (
                        <li key={idx}>
                            <NavLink
                                to={item.link}
                                end
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 mb-3 font-bold` +
                                    (isActive
                                        ? 'bg-blue-50 text-white dark:bg-blue-900/20 dark:text-white'
                                        : 'text-black hover:bg-gray-100 dark:text-black dark:hover:bg-background')
                                }
                                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                            >
                                <span className="text-black dark:text-black">{item.icon}</span>
                                <span className="truncate">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
