import { DrawerNavigationState } from '@react-navigation/native';
import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{
      flex: 1, alignItems: "center", justifyContent: 'center'
    }}>
      <Button title="Sair" onPress={signOut}></Button>
    </View >
  )
}

export default Dashboard;