import { LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "../ui/avatar";

const UserMenu = ({ user, navigate, handleLogout }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={user?.avatar?.url}
            alt={user?.name}
            loading="lazy"
          />
          <AvatarFallback>
            {user?.name?.charAt(0)?.toUpperCase() || (
              <UserIcon className="h-4 w-4" />
            )}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mt-4" align="end">
      <DropdownMenuItem onClick={() => navigate("/profile")}>
        <UserIcon className="mr-2 h-4 w-4" />
        Profile
      </DropdownMenuItem>
      {user?.isAdmin && (
        <DropdownMenuItem onClick={() => navigate("/dashboard")}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
      )}
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserMenu;
