"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { House, List, PencilSimpleLine, SignIn, SignOut, User } from "@phosphor-icons/react";
import Link from "next/link";

export function NavMenu({ loggedIn }: { loggedIn: boolean }) {
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <button type="button" className="flex p-2 rounded-lg hover:bg-default-200 transition-all">
          <List size={22} weight="bold" />
        </button>
      </DropdownTrigger>
      <DropdownMenu color="primary">
        <DropdownItem key="home" textValue="Home">
          <Link href="/" className="flex items-center gap-4 -my-1.5 -mx-2 p-2 text-sm font-medium">
            <House size={20} weight="bold" />
            Home
          </Link>
        </DropdownItem>
        {loggedIn ? (
          <>
            <DropdownItem key="my profile" textValue="My Profile">
              <Link
                href="/profile/basic-details"
                className="flex items-center gap-4 -my-1.5 -mx-2 p-2 text-sm font-medium"
              >
                <User size={20} weight="bold" />
                My Profile
              </Link>
            </DropdownItem>
            <DropdownItem key="edit profile" textValue="Edit Profile">
              <Link
                href="/edit-profile/basic-details"
                className="flex items-center gap-4 -my-1.5 -mx-2 p-2 text-sm font-medium"
              >
                <PencilSimpleLine size={20} weight="bold" />
                Edit Profile
              </Link>
            </DropdownItem>
            <DropdownItem key="logout" textValue="Logout" className="text-danger" color="danger">
              <Link href="/logout" className="flex items-center gap-4 -my-1.5 -mx-2 p-2 text-sm font-medium">
                <SignOut size={20} weight="bold" />
                Logout
              </Link>
            </DropdownItem>
          </>
        ) : (
          <>
            <DropdownItem key="signup" textValue="Signup" className="text-danger" color="danger">
              <Link href="/signup" className="flex items-center gap-4 -my-1.5 -mx-2 p-2 text-sm font-medium">
                <SignIn size={20} weight="bold" />
                Signup
              </Link>
            </DropdownItem>
            <DropdownItem key="login" textValue="Login" className="text-danger" color="danger">
              <Link href="/login" className="flex items-center gap-4 -my-1.5 -mx-2 p-2 text-sm font-medium">
                <SignIn size={20} weight="bold" />
                Login
              </Link>
            </DropdownItem>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
