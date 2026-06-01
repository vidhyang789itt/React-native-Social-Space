import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { clearError, login, register } from '../../store/slices/authSlice';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { getToken } from '../../utils/AsyncStorage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useLogin = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  
  
  
  
  
  
  

  
  

  const handleLogin = async () => {
    const resultAction = await dispatch(login({ email, password }));
    console.log(resultAction);
    
    if (login.fulfilled.match(resultAction)) {
      navigation.navigate("Main");
    }
  };

  const handleRegister = async () => {
    const resultAction = await dispatch(register({username : userName, email, password}));
    
    if (register.fulfilled.match(resultAction)) {
      navigation.navigate("Login");
    }
  }


  return {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
    handleRegister
  };
};
