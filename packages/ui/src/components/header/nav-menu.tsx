"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { House, List, PencilSimpleLine, SignOut, User } from "@phosphor-icons/react";

export function NavMenu() {
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <button type="button" className="flex p-2 rounded-lg hover:bg-default-200 transition-all">
          <List size={22} weight="bold" />
        </button>
      </DropdownTrigger>
      <DropdownMenu color="primary">
        <DropdownItem key="home" textValue="Home">
          <a href="/" className="flex items-center gap-4 -my-1.5 -mx-2 p-2 text-sm font-medium">
            <House size={20} weight="bold" />
            Home
          </a>
        </DropdownItem>
        <DropdownItem key="my profile" textValue="My Profile">
          <a href="/profile/basic-details" className="flex items-center gap-4 -my-1.5 -mx-2 p-2 text-sm font-medium">
            <User size={20} weight="bold" />
            My Profile
          </a>
        </DropdownItem>
        <DropdownItem key="edit profile" textValue="Edit Profile">
          <a
            href="/edit-profile/basic-details"
            className="flex items-center gap-4 -my-1.5 -mx-2 p-2 text-sm font-medium"
          >
            <PencilSimpleLine size={20} weight="bold" />
            Edit Profile
          </a>
        </DropdownItem>
        <DropdownItem key="logout" textValue="Logout" className="text-danger" color="danger">
          <a href="/logout" className="flex items-center gap-4 -my-1.5 -mx-2 p-2 text-sm font-medium">
            <SignOut size={20} weight="bold" />
            Logout
          </a>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
