import React, {
  useState,
  useMemo,
  useEffect,
} from "react";

import {
  Modal,
  View,
  ScrollView,
  Alert,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  launchImageLibrary,
} from "react-native-image-picker";

import type {
  AppDispatch,
  RootState,
} from "../../store/store";

import {
  createGroupChat,
} from "../../store/slices/chatSlice";

import {
  fetchConnections,
} from "../../store/slices/userSlice";

import { useChat } from "../../hooks/useChat";
import { StepIndicator } from "./stepIndixator";
import { ModalHeader } from "./modalHeader";
import { MembersStep } from "./memberStep";
import { DetailsStep } from "./detailStep";
import { ImageStep } from "./imageStep";
import { ReviewStep } from "./reviewStep";
import { ModalFooter } from "./modalFooter";

import { styles } from "./style";

type Step =
  | "members"
  | "details"
  | "image"
  | "review";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  userId: string;
  username: string;
  profileUrl?: string;
}

const steps: Step[] = [
  "members",
  "details",
  "image",
  "review",
];

const stepTitles = {
  members: {
    title: "Select Members",
    desc: "Choose users to add",
  },
  details: {
    title: "Group Details",
    desc: "Add name and description",
  },
  image: {
    title: "Group Image",
    desc: "Add profile image",
  },
  review: {
    title: "Review & Create",
    desc: "Confirm details",
  },
};

const GroupChatModal = ({
  isOpen,
  onClose,
}: Props) => {
  const dispatch =
    useDispatch<AppDispatch>();

  const { notifyGroupCreation } =
    useChat();

  const {
    user: currentUser,
  } = useSelector(
    (state: RootState) =>
      state.auth
  );

  const [currentStep, setCurrentStep] =
    useState<Step>("members");

  const [groupName, setGroupName] =
    useState("");

  const [
    groupDescription,
    setGroupDescription,
  ] = useState("");

  const [groupImage, setGroupImage] =
    useState<any>(null);

  const [
    groupImagePreview,
    setGroupImagePreview,
  ] = useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedMembers,
    setSelectedMembers,
  ] = useState<string[]>([]);

  const [allUsers, setAllUsers] =
    useState<User[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  useEffect(() => {
    if (
      isOpen &&
      currentUser?.userId
    ) {
      dispatch(
        fetchConnections({
          userId:
            currentUser.userId,
          type: "following",
        })
      ).then((res: any) => {
        const users =
          Array.isArray(
            res.payload
          )
            ? res.payload
            : [];

        setAllUsers(
          users.map(
            (u: any) => ({
              userId:
                u.userId ||
                u._id,
              username:
                u.username,
              profileUrl:
                u.profileUrl,
            })
          )
        );
      });
    }
  }, [
    isOpen,
    currentUser?.userId,
    dispatch,
  ]);

  const filteredUsers =
    useMemo(() => {
      return allUsers.filter(
        (user) =>
          user.username
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) &&
          !selectedMembers.includes(
            user.userId
          )
      );
    }, [
      allUsers,
      searchTerm,
      selectedMembers,
    ]);

    const selectedUserObjects = useMemo(() => {
    return selectedMembers
        .map((id) =>
        allUsers.find(
            (user) => user.userId === id
        )
        )
        .filter(
        (user): user is User =>
            user !== undefined
        );
    }, [selectedMembers, allUsers]);


  const pickImage =
    async () => {
      const result =
        await launchImageLibrary(
          {
            mediaType:
              "photo",
          }
        );

      if (
        result.assets?.[0]
      ) {
        const asset =
          result.assets[0];

        setGroupImage(asset);
        setGroupImagePreview(
          asset.uri || ""
        );
      }
    };

  const resetForm = () => {
    setCurrentStep(
      "members"
    );
    setGroupName("");
    setGroupDescription(
      ""
    );
    setGroupImage(null);
    setGroupImagePreview(
      ""
    );
    setSearchTerm("");
    setSelectedMembers(
      []
    );
  };

  const handleCreate =
    async () => {
      try {
        setIsLoading(true);

        const result =
          await dispatch(
            createGroupChat(
              {
                groupName:
                  groupName.trim(),
                memberIds:
                  selectedMembers,
                groupImage,
              }
            )
          ).unwrap();

        notifyGroupCreation(
          {
            groupId:
              result._id,
            groupName:
              groupName.trim(),
            members:
              selectedMembers,
            createdBy:
              currentUser?.userId ||
              "",
          }
        );

        resetForm();
        onClose();
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to create group"
        );
      } finally {
        setIsLoading(false);
      }
    };

  const currentIndex =
    steps.indexOf(
      currentStep
    );

  const canGoNext =
    (currentStep ===
      "members" &&
      selectedMembers.length >
        0) ||
    (currentStep ===
      "details" &&
      groupName.trim()
        .length > 0) ||
    currentStep ===
      "image" ||
    currentStep ===
      "review";

  const handleNext =
    async () => {
      if (
        currentStep ===
        "review"
      ) {
        await handleCreate();
        return;
      }

      setCurrentStep(
        steps[
          currentIndex + 1
        ]
      );
    };

  const handleBack =
    () => {
      if (
        currentIndex === 0
      ) {
        resetForm();
        onClose();
        return;
      }

      setCurrentStep(
        steps[
          currentIndex - 1
        ]
      );
    };

  if (!isOpen)
    return null;

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent
      onRequestClose={
        onClose
      }
    >
      <View
        style={
          styles.overlay
        }
      >
        <View
          style={
            styles.modal
          }
        >
          <StepIndicator
            steps={steps}
            currentStep={
              currentStep
            }
          />

          <ModalHeader
            title={
              stepTitles[
                currentStep
              ].title
            }
            description={
              stepTitles[
                currentStep
              ].desc
            }
            onClose={
              onClose
            }
            disabled={
              isLoading
            }
          />

          <ScrollView
            style={
              styles.body
            }
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={
              false
            }
          >
            {currentStep ===
              "members" && (
              <MembersStep
                users={
                  filteredUsers
                }
                selectedMembers={
                  selectedMembers
                }
                selectedUserObjects={
                  selectedUserObjects
                }
                searchTerm={
                  searchTerm
                }
                setSearchTerm={
                  setSearchTerm
                }
                onSelectUser={(
                  id
                ) =>
                  setSelectedMembers(
                    (
                      prev
                    ) => [
                      ...prev,
                      id,
                    ]
                  )
                }
                onRemoveUser={(
                  id
                ) =>
                  setSelectedMembers(
                    (
                      prev
                    ) =>
                      prev.filter(
                        (
                          x
                        ) =>
                          x !==
                          id
                      )
                  )
                }
              />
            )}

            {currentStep ===
              "details" && (
              <DetailsStep
                groupName={
                  groupName
                }
                setGroupName={
                  setGroupName
                }
                groupDescription={
                  groupDescription
                }
                setGroupDescription={
                  setGroupDescription
                }
              />
            )}

            {currentStep ===
              "image" && (
              <ImageStep
                imageUri={
                  groupImagePreview
                }
                onPickImage={
                  pickImage
                }
              />
            )}

            {currentStep ===
              "review" && (
              <ReviewStep
                groupName={
                  groupName
                }
                groupDescription={
                  groupDescription
                }
                groupImage={
                  groupImagePreview
                }
                members={
                  selectedUserObjects
                }
              />
            )}
          </ScrollView>

          <ModalFooter
            currentStep={
              currentStep
            }
            isLoading={
              isLoading
            }
            canGoNext={
              canGoNext
            }
            onBack={
              handleBack
            }
            onNext={
              handleNext
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default GroupChatModal;