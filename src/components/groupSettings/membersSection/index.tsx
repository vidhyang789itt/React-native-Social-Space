import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import { BASE_URL } from "../../../constants/ApiRoutes";
import { styles } from "./style";

interface Member {
  userId: {
    _id: string;
    userId: string;
    username: string;
    profileUrl?: string;
  };
  role: "admin" | "member";
}

interface MembersSectionProps {
  groupMembers: Member[];
  isAdmin: boolean;
  isLoading: boolean;
  currentUserId?: string;
  onRemoveMember: (userId: string) => void;
  onAddClick: () => void;
}

const MembersSection = ({
  groupMembers,
  isAdmin,
  isLoading,
  currentUserId,
  onRemoveMember,
  onAddClick,
}: MembersSectionProps) => {
  const navigation = useNavigation<any>();

  const adminCount = useMemo(
    () =>
      groupMembers.filter(
        (member) => member.role === "admin"
      ).length,
    [groupMembers]
  );

  const getFullUrl = (url?: string) => {
    if (!url) {
      return Image.resolveAssetSource(
        require("../../../assests/temp_profile.webp")
      ).uri;
    }

    if (url.startsWith("http")) {
      return url;
    }

    return `${BASE_URL}/${url}`;
  };

  const handleViewProfile = (userId: string) => {
    navigation.navigate("UserProfile", {
      userId,
    });
  };

  return (
    <View style={styles.section}>
      {}
      <View style={styles.headerRow}>
        <View style={styles.headerTitleWrapper}>
          <Icon
            name="users"
            size={18}
            color="#111827"
          />
          <Text style={styles.headerTitle}>
            Members ({groupMembers.length})
          </Text>
        </View>

        {isAdmin && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddClick}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Icon
              name="plus"
              size={16}
              color="#FFFFFF"
            />
            <Text style={styles.addButtonText}>
              Add Member
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {}
      {groupMembers.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon
            name="users"
            size={32}
            color="#9CA3AF"
          />
          <Text style={styles.emptyText}>
            No members yet
          </Text>
        </View>
      ) : (
        <View style={styles.memberList}>
          {groupMembers.map((member) => {
            const isCurrentUser =
              member.userId.userId === currentUserId;

            const isLastAdmin =
              adminCount === 1 &&
              member.role === "admin";

            return (
              <View
                key={member.userId._id}
                style={styles.memberItem}
              >
                {}
                <View style={styles.memberCard}>
                  <Image
                    source={{
                      uri: getFullUrl(
                        member.userId.profileUrl
                      ),
                    }}
                    style={styles.avatar}
                  />

                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>
                      {member.userId.username}
                      {isCurrentUser
                        ? " (You)"
                        : ""}
                    </Text>

                    <View style={styles.metaRow}>
                      {member.role ===
                        "admin" && (
                        <View
                          style={
                            styles.roleBadge
                          }
                        >
                          <Icon
                            name="shield"
                            size={11}
                            color="#7C3AED"
                          />
                          <Text
                            style={
                              styles.roleText
                            }
                          >
                            Admin
                          </Text>
                        </View>
                      )}

                      {isCurrentUser && (
                        <View
                          style={
                            styles.youBadge
                          }
                        >
                          <Text
                            style={
                              styles.youText
                            }
                          >
                            You
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {!isCurrentUser && (
                    <TouchableOpacity
                      style={
                        styles.profileButton
                      }
                      onPress={() =>
                        handleViewProfile(
                          member.userId.userId
                        )
                      }
                    >
                      <Icon
                        name="external-link"
                        size={16}
                        color="#6B7280"
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {}
                {isAdmin &&
                  !isCurrentUser && (
                    <TouchableOpacity
                      style={[
                        styles.removeButton,
                        (isLoading ||
                          isLastAdmin) &&
                          styles.disabledButton,
                      ]}
                      disabled={
                        isLoading ||
                        isLastAdmin
                      }
                      onPress={() =>
                        onRemoveMember(
                          member.userId
                            .userId
                        )
                      }
                    >
                      <Icon
                        name="trash-2"
                        size={16}
                        color="#EF4444"
                      />
                    </TouchableOpacity>
                  )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default MembersSection;