import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY } from '../themes/theme'
import ImageBackgroundInfo from '../components/ImageBackgroundInfo'
import { dataStore } from '../store/store'

const DetailsScreen = ( {navigation,route}:any ) => {

  const Item = dataStore(( state:any ) => route.params.type == 'coffee' ? state.CoffeeList : state.BeansList )[route.params.index]

  const addFavouriteList = dataStore((state:any) => state.addFavouriteList)
  const removeFromFavouritList = dataStore((state:any) => state.removeFromFavouritList)

  const [price, setPrice] = useState(Item.prices[1])
  const [fullDesc, setFullDesc] = useState(false)
  const [addOns, setAddOns] = useState(Item.addings[0])

  // const addToCart = dataStore((state:any) => state.addToCart)
  // const calculateCartPrice = dataStore((state:any) => state.calculateCartPrice)

  const ToggleFavourite = ( favourite:boolean, type:string, id:string ) => {
    favourite ? removeFromFavouritList(type, id) : addFavouriteList(type, id)
  }

  // const HandleBack = () => {
  //   navigation.pop()
  // }

  // const addToCartHandler = ({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices, } : any ) => {
  //   addToCart({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices: [{ ...prices, quantity: 1}], })
  //   calculateCartPrice()
  //   navigation.navigate('Cart')
  // }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.themeBlack}/> 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
      <ImageBackgroundInfo 
          EnableBackHandler={true}
          imagelink_portrait={Item.image_portrait}
          type={Item.type}
          id={Item.id}
          favourite={Item.favourite}
          name={Item.name}
          special_ingredient={Item.specail}
          ingredients={Item.note}
          average_rating={Item.rate}
          ratings_count={Item.rating_count}
          roasted={Item.roasted}
          BackHandler={() => {}}
          ToggleFavourite={ToggleFavourite} 
        />

      {/* Description Area */}
      <View style={styles.RestOfInfo}>
        <Text style={styles.InfoTitle}>Description</Text>
        {
          fullDesc 
          ? (
            <TouchableWithoutFeedback onPress={() => {setFullDesc(prev => !prev)}}>
              <Text style={styles.DescriptionStyles}>{Item.description}</Text>
            </TouchableWithoutFeedback>
          ) 
          : (
            <TouchableWithoutFeedback onPress={() => {setFullDesc(prev => !prev)}}>
              <Text style={styles.DescriptionStyles} numberOfLines={3}>{Item.description}</Text>
            </TouchableWithoutFeedback>
          )
        }
        {/* Variations -> Add-Ons*/}
        <Text style={styles.InfoTitle}>Flavours</Text>
        <View style={styles.SizesOfCoffee}>
          {
            Item.addings.map((data:any) => {
              return (
                <TouchableOpacity key={data.adding_name} onPress={() => {setAddOns(data)}} style={[styles.AddingsSizeBox, {borderColor: data.adding_name == addOns.adding_name ? COLORS.themeLightOrange : COLORS.themeGray }]}>
                  <Text style={[styles.AddingText, {
                        fontSize:Item.type == 'beans' ? 14 : 16 ,
                        color:  data.adding_name == addOns.adding_name ? COLORS.themeLightOrange : COLORS.themeGray ,
                    }]}>
                      {data.adding_name}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </View>

        {/* Variations -> Sizes */}
        <Text style={styles.InfoTitle}>Size</Text>
        <View style={styles.SizesOfCoffee}>
          {
            Item.prices.map((data:any) => {
              return (
                <TouchableOpacity key={data.size} onPress={() => {setPrice(data)}} style={[styles.SizeBox, {borderColor: data.size == price.size ? COLORS.themeLightOrange : COLORS.themeGray }]}>
                  <Text style={[styles.SizeText, {
                        fontSize:Item.type == 'beans' ? 14 : 16 ,
                        color:  data.size == price.size ? COLORS.themeLightOrange : COLORS.themeGray ,
                    }]}>
                      {data.size}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </View>

      </View>
        
      </ScrollView>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.themeBlack
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  RestOfInfo: {
    padding: 20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.lato_bold,
    fontSize: 12,
    color: COLORS.themePeach,
    letterSpacing: 5,
    marginBottom: 10,
    textTransform: 'uppercase',
    opacity: 0.65,
  },
  DescriptionStyles: {
    fontFamily: FONTFAMILY.lato_regular,
    fontSize: 16,
    opacity: 0.75,
    color: COLORS.themeWhite,
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  AddingText: {},
  SizesOfCoffee: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.themeDarkGayRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24 * 2,
    borderRadius: 10,
    borderWidth: 2,
  },
  AddingsSizeBox: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: COLORS.themeDarkGayRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24 * 2,
    borderRadius: 10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.lato_regular,
  },
})