import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const CreateEvent = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SiteHeader />
        <SidebarInset>CreateEvent</SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default CreateEvent;
