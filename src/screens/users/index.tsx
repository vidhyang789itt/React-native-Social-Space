import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  Search,
  Sparkles,
  Clock,
  Users,
  ArrowDownAZ,
} from "lucide-react-native";

import { useUsers } from "./useUsers";
import { UserList } from "../../components/users/usersList";
import Loader from "../../components/common";
import { useRoute } from "@react-navigation/native";
import { useAppTheme } from "../../theme/ThemeContext";
import { createStyles } from "./style";

type SortType = "recent" | "followers" | "alphabetical";

export const UsersScreen = () => {
  const { users, loading, currentUser, error } = useUsers();
  const { theme } = useAppTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortType>("recent");

  const route = useRoute<any>();

  useEffect(() => {
    const query = route.params?.search;

    if (query) {
      setSearchQuery(query);
    }
  }, [route.params]);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(
      (user: any) =>
        user.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        user.bio
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case "followers":
        filtered.sort(
          (a: any, b: any) =>
            (b.followers?.length || 0) -
            (a.followers?.length || 0)
        );
        break;

      case "alphabetical":
        filtered.sort((a: any, b: any) =>
          a.username.localeCompare(b.username)
        );
        break;

      case "recent":
      default:
        filtered.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
    }

    return filtered;
  }, [users, searchQuery, sortBy]);

  if (loading && users.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {}
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>People</Text>
            <Text style={styles.subHeading}>
              {filteredAndSortedUsers.length} profiles found
            </Text>
          </View>
        </View>


        {}
        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Search size={18} color="#94a3b8" />

            <TextInput
              placeholder="Search users by name or bio..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>
        </View>

        {}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Sort By</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.sortButtonsContainer}>
              {(
                ["recent", "followers", "alphabetical"] as const
              ).map((option) => (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.8}
                  style={[
                    styles.sortButton,
                    sortBy === option &&
                      styles.activeSortButton,
                  ]}
                  onPress={() => setSortBy(option)}
                >
                  <View style={styles.sortButtonContent}>
                    {option === "recent" && (
                      <Clock size={14} color={sortBy === option ? "#ffffff" : "#64748b"} />
                    )}

                    {option === "followers" && (
                      <Users size={14} color={sortBy === option ? "#ffffff" : "#64748b"} />
                    )}

                    {option === "alphabetical" && (
                      <ArrowDownAZ size={14} color={sortBy === option ? "#ffffff" : "#64748b"} />
                    )}

                    <Text
                      style={[
                        styles.sortButtonText,
                        sortBy === option && styles.activeSortButtonText,
                      ]}
                    >
                      {option === "recent" && "Recent"}
                      {option === "followers" && "Popular"}
                      {option === "alphabetical" && "A - Z"}
                    </Text>
                  </View>

                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {}
        <UserList
          title={`All Users (${filteredAndSortedUsers.length})`}
          users={filteredAndSortedUsers}
          currentUser={currentUser}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

