import { Menu, MenuItem, MenuTrigger } from "#ui/Menu/Menu.js";
import { Separator } from "#ui/Separator/index.js";
import { Text } from "#ui/Text/index.js";
import { userProfileButton, userProfileInfo } from "./UserProfileMenu.css";
import { Button, Header } from "react-aria-components";
import { SignOutModal } from "#ui/SignOutModal/index.js";
import { useState } from "react";

type UserProfileMenuProps = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onSignOut: () => void;
};

export const UserProfileMenu = ({ user, onSignOut }: UserProfileMenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <MenuTrigger>
        <Button
          className={userProfileButton}
        >{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</Button>
        <Menu>
          <Header className={userProfileInfo}>
            <Text
              font="body1"
              weight="medium"
              color="brandDefault"
            >{`${user.firstName} ${user.lastName}`}</Text>
            <Text font="body2" color="brandTertiary">
              {user.email}
            </Text>
          </Header>
          <Separator />
          <MenuItem onAction={() => setIsModalOpen(true)}>Sign out</MenuItem>
        </Menu>
      </MenuTrigger>
      <SignOutModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSignOut={onSignOut}
      />
    </>
  );
};

UserProfileMenu.displayName = "UserProfileMenu";
