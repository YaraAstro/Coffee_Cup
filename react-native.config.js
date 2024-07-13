// this file is mannually created to append the assets to IOS & ANdroid Platforms from ../src/assets & ../src/lottie

module.exports = {
    project: {
        ios: {},
        android: {},
    },
    assets: ['./src/assets'],
};

// then run "npx react-native-asset" in root directory

/*
expected result something like this :
    PS %Path%\Coffee_Cup> npx react-native-asset
    info Linking ttf assets to iOS project 
    WARN ERRGROUP Group 'Resources' does not exist in your Xcode project. We have created it automatically for you.
    info Linking custom assets to iOS project 
    info Linking ttf assets to Android project 
    info Linking png assets to Android project   
*/