"use client";

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  onItemClick,
}: {
  items: {
    title: string;
    url: string;
    icon?: any;
  }[];
  onItemClick: (url: string) => void; 
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create Event"
              className="bg-blue-800 text-primary-foreground hover:bg-blue-700 hover:text-primary-foreground active:bg-blue-700 active:text-primary-foreground min-w-8 duration-200 ease-linear hover:cursor-pointer "
              onClick={() => onItemClick("/dashboard/events/create")} 
            >
              <IconCirclePlusFilled />
              <span>Quick Create Event</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Dynamic Menu Items */}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => onItemClick(item.url)} // Handle click with onItemClick
                className="hover:cursor-pointer"
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}