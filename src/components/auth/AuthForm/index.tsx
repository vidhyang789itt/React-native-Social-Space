import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Animated, KeyboardAvoidingView, Platform, ImageBackground, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '../../../theme/ThemeContext';
import { createStyles } from '../../../screens/auth/styles';

type InputField = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  editable?: boolean;
};

type AuthFormProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  onSubmit: () => void;
  loading: boolean;
  error?: string | null;
  inputs: InputField[];
  redirectText: string;
  redirectLinkLabel: string;
  onRedirectPress: () => void;
};

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  buttonLabel,
  onSubmit,
  loading,
  error,
  inputs,
  redirectText,
  redirectLinkLabel,
  onRedirectPress,
}) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ImageBackground source={require('../../../assests/login_bg.png')} style={styles.background} resizeMode="cover">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.85)"]} style={styles.overlay}>
        <KeyboardAvoidingView style={styles.centerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }]}>
            <Text style={styles.logoText}>SocialSpace</Text>
            <Text style={styles.logoSubtitle}>Connect, share and stay inspired.</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {inputs.map((field, idx) => (
              <View key={idx} style={styles.inputContainer}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  placeholderTextColor={theme.colors.textSoft}
                  value={field.value}
                  onChangeText={field.onChangeText}
                  secureTextEntry={field.secureTextEntry}
                  keyboardType={field.keyboardType}
                  autoCapitalize="none"
                  editable={field.editable !== undefined ? field.editable : !loading}
                />
              </View>
            ))}
            <TouchableOpacity activeOpacity={0.9} style={[styles.button, loading && styles.buttonDisabled]} onPress={onSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={theme.colors.primaryText} />
              ) : (
                <Text style={styles.buttonText}>{buttonLabel}</Text>
              )}
            </TouchableOpacity>
            <View style={styles.redirectContainer}>
              <Text style={styles.redirectText}>{redirectText}</Text>
              <TouchableOpacity onPress={onRedirectPress}>
                <Text style={styles.redirectLink}>{redirectLinkLabel}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
};
