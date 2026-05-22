import React from "react";
import { View } from "react-native";
import { UserSelectList } from "../groupSettings/UserSelectList";
import { SelectedUsersList } from "../groupSettings/selectedUserList";

interface User {
  userId: string;
  username: string;
  profileUrl?: string;
}

interface Props {
  users: User[];
  selectedMembers: string[];
  selectedUserObjects: User[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSelectUser: (id: string) => void;
  onRemoveUser: (id: string) => void;
}

export const MembersStep = ({
  users,
  selectedMembers,
  selectedUserObjects,
  searchTerm,
  setSearchTerm,
  onSelectUser,
  onRemoveUser,
}: Props) => {
  return (
    <View>
      <SelectedUsersList
        users={selectedUserObjects}
        onRemove={onRemoveUser}
      />

      <UserSelectList
        users={users}
        selectedUserIds={selectedMembers}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSelectUser={onSelectUser}
        getFullUrl={(url) => url || ""}
      />
    </View>
  );
};