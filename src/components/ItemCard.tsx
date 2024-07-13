import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY } from '../themes/theme'
import LinearGradient from 'react-native-linear-gradient'
import CustomIcons from './CustomIcons'

const CARD_WIDTH = Dimensions.get("window").width * 0.32

interface ItemCardProps {
  id: string
  index: number
  type: string
  roasted: string
  imagelink_square: ImageProps
  name: string
  special_ingredient: string
  average_rating: number
  price: any
  buttonPressHandler: any
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) => {

  return (
    <LinearGradient
    start={{ x:0,y:0 }} 
    end={{ x:1,y:1 }}
    style={styles.CardGradient}
    colors={[COLORS.themeGray, COLORS.themeBlack]}>
      <ImageBackground source={imagelink_square} style={styles.CardImage} resizeMode='cover'>
        <View style={styles.CardRatingContainer}>
            <CustomIcons name={'star'} color={COLORS.themeLightOrange} size={16} />
            <Text style={styles.CardRateText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
        <Text style={styles.CardSubTitle}>{special_ingredient}</Text>
        <View style={styles.CardFooter}>
            <Text style={styles.CardPriceCurrency}>$ <Text style={styles.CardPrice}>{price.price}</Text></Text>
            <TouchableOpacity onPress={() => {
              buttonPressHandler({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices: [{...price, quantity: 1}],})
            }}>
              <View style={styles.IconBG}>
                <CustomIcons name='add_outline' size={10} color={COLORS.themeWhite} />
              </View>
            </TouchableOpacity>
        </View>
    </LinearGradient>
  )
}

export default ItemCard

const styles = StyleSheet.create({
  CardGradient: {
      padding: 15,
      borderRadius: 25,
  },
  CardImage: {
      width: CARD_WIDTH,
      height: CARD_WIDTH,
      borderRadius: 20,
      marginBottom: 15,
      overflow: 'hidden',
  },
  CardRatingContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.themeBlsckRGBA,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      paddingHorizontal: 15,
      position: 'absolute',
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 20,
      top: 0,
      right: 0,
  },
  CardRateText: {
      fontFamily: FONTFAMILY.lato_regular,
      color: COLORS.themeWhite,
      lineHeight: 22,
      fontSize: 14,
  },
  CardTitle: {
      fontFamily: FONTFAMILY.aclonica,
      color: COLORS.themePeach,
      fontSize: 16,
  },
  CardSubTitle: {
      fontFamily: FONTFAMILY.spectral_regular,
      color: COLORS.themeWhite,
      fontSize: 10,
  },
  CardPriceCurrency: {
      fontFamily: FONTFAMILY.lato_bold,
      color: COLORS.themeLightOrange,
      fontSize: 18,
  },
  CardPrice: {
      color: COLORS.themeWhite,
  },
  CardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15,
  },
  IconBG: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.themeLightOrange,
  },
})