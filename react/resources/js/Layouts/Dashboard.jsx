import React, { useEffect, useRef } from 'react'
import GuestLayout from './Front/Layout';
import { Link } from '@inertiajs/react';

const Dashboard = ({ children }) => {
    const isDesktop = useRef(true);
    useEffect(() => {
        let check = window.innerWidth >= 769;
        console.log(check);
        isDesktop.current = check;
    })
    return (
        <>
            <GuestLayout>
                <div className="flex flex-col min-h-screen md:flex-row bg-gradient-to-br from-purple-50 to-white">
                    {/* Sidebar */}
                    <aside className="bg-white border-r border-gray-200 shadow-md h-fit md:h-auto md:w-64">
                        <div className="p-2 text-xl font-bold text-indigo-700 border-b border-gray-200 md:p-6">
                            My Account
                        </div>
                        <nav className={`flex ${isDesktop && "items-center justify-around gap-2 p-2"} md:flex-col md:items-start md:p-4 md:space-y-4 text-sm font-medium text-gray-700`}>
                            <Link href={route("Overview")} className="font-semibold text-indigo-600">Overview</Link>
                            <Link href={route("profile")} className="cursor-pointer hover:text-indigo-600">Profile</Link>
                            <Link href={route("orders")} className="cursor-pointer hover:text-indigo-600">Orders</Link>
                            <Link href={route("logout")} className="cursor-pointer hover:text-indigo-600">Logout</Link>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 px-2 py-3 md:p-10">
                        {children}
                    </div>
                </div>
            </GuestLayout>
        </>
    )
}

export default Dashboard;