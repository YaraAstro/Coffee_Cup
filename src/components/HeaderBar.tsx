import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcons from './CustomIcons'
import { COLORS, FONTFAMILY } from '../themes/theme'
import MenuSVG from './MenuIcon'

interface HeaderBarProps {
    title?: string
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
        <MenuSVG size={24}/>
        <Text style={styles.HeaderText}>{title}</Text>
        <View></View>
    </View>
  )
}

export default HeaderBar

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText: {
        fontFamily: FONTFAMILY.alef_bold,
        fontSize: 24,
        color: COLORS.themePeach,
        letterSpacing: 2,
    },
})