import * as React from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-community/async-storage';

import TabScreen from './TabScreen';
import DrawerScreen from './DrawerScreen';
import DetailsScreen from './Details'

// const AuthContext = React.createContext();

function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}
    />
  );
}

function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Button
        title="Go to profile"
        onPress={() => navigation.navigate('Profile', {
          name: 'profile screen'
        })}
      />
      <Button
        title="Go to TabNavigatorExample"
        onPress={() => navigation.navigate('TabNavigatorExample')}
      />
      <Button
        title="Go to DrawerNavigatorExample"
        onPress={() => navigation.navigate('DrawerNavigatorExample')}
      />
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
      <Button title="Go to RightHeaderBtn" onPress={() => navigation.navigate('RightHeaderBtn')} />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', { post: postText });
        }}
      />
    </>
  );
}

function ProfileScreen({ route, navigation }) {
  /* 2. Get the param */
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
    </View>
  );
}

function RightHeaderBtnScreen({ route, navigation }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => setCount(c => c + 1)}
          title="Update count"
          color="white"
        />
      ),
    });
  }, [navigation, setCount]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Count: {count}</Text>
    </View>
  );
}


const Stack = createStackNavigator();

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'RESTORE_TOKEN':
//       return {
//         ...state,
//         userToken: action.token,
//         isLoading: false,
//       };
//     case 'SIGN_IN':
//       return {
//         ...state,
//         isSignout: false,
//         userToken: action.token,
//       };
//     case 'SIGN_OUT':
//       return {
//         ...state,
//         isSignout: true,
//         userToken: null,
//       };
//   }
// }

// const initialState = {
//   isLoading: true,
//   isSignout: false,
//   userToken: null,
// }



function App() {
  // const [state, dispatch] = React.useReducer(reducer, initialState);
  // React.useEffect(() => {
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       userToken = await AsyncStorage.getItem('userToken');
  //     } catch (e) {
  //       console.log(e);
  //     }

  //     // After restoring token, we may need to validate it in production apps

  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  //   };
  //   bootstrapAsync();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: props => <LogoTitle {...props} />,
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ otherParam: 'empty' }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="RightHeaderBtn"
          component={RightHeaderBtnScreen}
        />
        <Stack.Screen
          name="TabNavigatorExample"
          component={TabScreen}
        />
        <Stack.Screen
          name="DrawerNavigatorExample"
          component={DrawerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;