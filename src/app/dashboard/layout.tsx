'use client'
import { userType } from "@/lib/jwtConfig";
import { useDashStore } from "@/lib/store";
import { useEffect } from "react";
import MobileNavbar from "./_components/MobileNavbar";
import NotificationList from "./_components/Notifications";
import Sidebar from "./_components/SideNav";
import Topbar from "./_components/Topbar";
import Breadcrumbs from "./_components/BreadCrumbs";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const {openNotifications,setUser,setNotifications,loadNotifications} = useDashStore()
  useEffect(()=>{
    const getMe = async()=>{
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      if(res.ok ){
        setUser(data.user as userType)
        console.log(data.user,'user')
        
        
  }
}
    getMe()
  },[]) 

  // frontend (client)
useEffect(() => {
  if (!localStorage.getItem("visitor_id")) {
    const id = crypto.randomUUID();
    localStorage.setItem("visitor_id", id);
    fetch("/api/dashboard/visitors", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
  }
}, []);


  

  useEffect(() => {
  // Connect to the SSE notifications endpoint
  const eventSource = new EventSource("/api/notification");

  eventSource.onopen = () => {
    console.log("✅ Connected to SSE notifications");
  };

  eventSource.onmessage = (event) => {
    try {
     if (!event.data || event.data === "Connected to notifications") return;

    const data = JSON.parse(event.data); 
    
    console.log(data,'12344xx')

      console.log("📩 New SSE Notification:", data.notification);
      setNotifications(data.notification);
    } catch (error) {
      console.error("Error parsing SSE data:", error);
    }
  };

  eventSource.onerror = (error) => {
    console.error("❌ SSE Error:", error);
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}, [setNotifications]);

useEffect(() => {
  const fetchAllNotifications = async () => {
    try {
      const res = await fetch("/api/notification/all");
      const data = await res.json();

      if (res.ok ) {
        loadNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  fetchAllNotifications();
}, [setNotifications]);



  return (
    <div className="bg-gray-50">
      {/* Fixed Sidebar */}
      
        <Sidebar />
      

      {/* Fixed Topbar */}
      <header className="fixed  left-64 top-0 right-0 h-16 bg-white shadow z-40">
        <Topbar />
      </header>
      {openNotifications && <NotificationList/>}

      {/* Scrollable Main Content */}
      <main className="sm:pl-64 sm:pt-28 pb-24 pt-0     overflow-y-auto sm:px-8 sm:py-6">
        <Breadcrumbs/>
        
        {children}
      </main>
      <MobileNavbar/>
    </div>
  );
}

export default Layout;
