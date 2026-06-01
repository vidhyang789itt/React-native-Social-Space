import React from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import { BASE_URL } from '../../constants/ApiRoutes';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../theme/ThemeContext';
import { createStyles } from './profilePage/style';
import { getMediaUrl } from '../../utils/getMediaUrl';

export const PostGridItem = ({ item }: any) => {
  const imageUri = item.imageUrl
    ? { uri: getMediaUrl(item.imageUrl) }
    : require("../../assests/temp_profile.webp");
  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.postContainer}
      onPress={() =>
        navigation.navigate(
          "PostDetails",
          {
            postId: item.postId,
          }
        )
      }
    >
      <Image source={imageUri} style={styles.postImage} />
    </TouchableOpacity>
  );
};
