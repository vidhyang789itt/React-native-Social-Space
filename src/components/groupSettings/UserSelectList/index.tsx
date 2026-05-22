import React from "react";
import {
  View,
  FlatList,
} from "react-native";

import { SearchBar } from "./SearchBar";
import { UserItem } from "./userItem";
import { EmptyState } from "./emptyState";

import { styles } from "./style";

interface User {
  userId: string;
  username: string;
  profileUrl?: string;
}

interface UserSelectListProps {
  users: User[];
  selectedUserIds: string[];
  searchTerm: string;
  isLoading?: boolean;

  onSearchChange: (term: string) => void;
  onSelectUser: (userId: string) => void;
  onViewProfile?: (userId: string) => void;

  getFullUrl: (url?: string) => string;

  emptyTitle?: string;
  emptyDescription?: string;
  showProfileLink?: boolean;
}

export const UserSelectList = ({
  users,
  selectedUserIds,
  searchTerm,
  isLoading = false,
  onSearchChange,
  onSelectUser,
  onViewProfile,
  getFullUrl,
  emptyTitle = "No Users Found",
  emptyDescription = "Try searching with a different name",
  showProfileLink = true,
}: UserSelectListProps) => {
  const renderItem = ({ item }: { item: User }) => (
    <UserItem
      user={item}
      isSelected={selectedUserIds.includes(
        item.userId
      )}
      onSelectUser={onSelectUser}
      onViewProfile={onViewProfile}
      getFullUrl={getFullUrl}
      showProfileLink={showProfileLink}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchTerm}
        onChangeText={onSearchChange}
        loading={isLoading}
      />

      {users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item) =>
            item.userId
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.listContent
          }
        />
      ) : (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
        />
      )}
    </View>
  );
};