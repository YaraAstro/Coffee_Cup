import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../themes/theme'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import HeaderBar from '../components/HeaderBar'

const OrderHistoryScreen = () => {
  
  const tabBarHeight = useBottomTabBarHeight()
  
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.themeBlack}/> 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.InsideScrollView, {marginBottom: tabBarHeight}]}>
          <View style={{flex: 1}}>
            <HeaderBar title='Orders' />
          </View>
        </View>
      </ScrollView>     
    </View>
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.themeBlack
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  InsideScrollView: {
    flex: 1,
    justifyContent: 'space-between',
  },
})