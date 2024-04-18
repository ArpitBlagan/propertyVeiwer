import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import React from "react";
import { change } from "@/store/atom/user";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
const Navbar = () => {
  const value = useRecoilValue(change);

  return (
    <div>
      <div className="flex justify-between border border-gray-200 px-3 py-2 items-center rounded-xl">
        <div>
          <h1 className="text-red-400 text-xl font-bold underline">
            <Link to="/">Porperty-Viewer</Link>
          </h1>
        </div>
        <div className="flex justify-end items-center gap-3">
          <Link to="/property">New Properties</Link>
        </div>
      </div>
      <Menubar className="mt-2">
        <MenubarMenu>
          <React.Suspense
            fallback={<div className="text-center">Loading...</div>}
          >
            {!value.isloggedin ? (
              <div className="flex justify-end w-full items-center gap-3">
                <Link to="/signin">Signin</Link>
                <Link to="/signup">Signup</Link>
              </div>
            ) : (
              <div className="flex gap-2 justify-around items-center w-full">
                <Link to="/add">Add Property</Link>
                <div>
                  <Link to="/query">Queries</Link> /{" "}
                  <Link to="/sent">Sent</Link>
                </div>
                <div>
                  <MenubarTrigger className="cursor-pointer">
                    Profile
                  </MenubarTrigger>
                </div>
              </div>
            )}
          </React.Suspense>
          <MenubarContent>
            <MenubarItem>
              {value?.name} <MenubarShortcut>❤️</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>{value?.email}</MenubarItem>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Navbar;
