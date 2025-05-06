"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useGetUser from "@/hooks/api/user/useGetUser";
import {
  IconCashBanknote,
  IconChartBar,
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
  IconTransactionBitcoin,
} from "@tabler/icons-react";
import { UsersIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import Unauthorized from "./Unauthorized";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: IconListDetails,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: IconCashBanknote,
    },
    {
      title: "Attendees",
      url: "/dashboard/attendees",
      icon: UsersIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const {data: getUser} = useGetUser()
  const session = useSession();
  
  const user = {
    name: getUser?.fullName,
    email: getUser?.email,
    avatar: getUser?.profilePict,
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <span className="text-xl font-bold text-blue-700">Vibration Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          onItemClick={(url: any) => router.push(url)}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
