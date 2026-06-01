import React, { useMemo, memo } from "react";
import {
  View,
  Text,
} from "react-native";
import { Users } from "lucide-react-native";

import type { User } from "../../../types/user.types";
import { UserCard } from "../userCard";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";

interface Props {
  title: string;
  users: any[];
  currentUser: User | null;
}

export const UserList = memo(({
  title,
  users,
  currentUser,
}: Props) => {
  const { theme } = useAppTheme(); 
  
  
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>{title}</Text>

      {users.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Users size={34} color="#94a3b8" />
          </View>

          <Text style={styles.emptyTitle}>
            No Users Found
          </Text>

          <Text style={styles.emptyText}>
            Try adjusting your search or filters
            to find more users
          </Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {users.map((item) => {
            const isFollowing =
              currentUser?.following?.includes(item._id) ?? false;

            return (
              <UserCard
                key={item._id}
                user={item}
                isFollowing={isFollowing}
                allUsers={users}
              />
            );
          })}
        </View>
      )}
    </View>
  );
});

UserList.displayName = "UserList";


