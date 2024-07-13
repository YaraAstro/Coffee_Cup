import { Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { dataStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, FONTFAMILY } from '../themes/theme'
import CustomIcons from '../components/CustomIcons'
import ItemCard from '../components/ItemCard'
import HeaderBar from '../components/HeaderBar'

const getCategoriesFromData = ( data:any ) => {
  let temp: any = {}

  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1
    } else {
      temp[data[i].name]++
    }
  }
  let categories = Object.keys(temp)
  categories.unshift('All')
  return categories
}

const getCoffeeList = ( category:string, data:any ) => {
  if ( category == 'All') {
    return data
  } else {
    let Coffeelist = data.filter(( item:any ) => item.name == category)
    return Coffeelist
  }
}

const HomeScreen = ( {navigation}:any ) => {

  const CoffeeList = dataStore((state: any) => state.CoffeeList)
  const BeansList = dataStore((state: any) => state.BeansList)

  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList))
  const [searchText, setSearchText] = useState('')
  const [categoryIndex, setCategoryIndex] = useState({ index: 0, category: categories[0], })
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList( categoryIndex.category, CoffeeList ))

  const tabBarHeight = useBottomTabBarHeight()
  const ListRef: any = useRef<FlatList>()

  const addToCart = dataStore((state:any) => state.addToCart)
  const calculateCartPrice = dataStore((state:any) => state.calculateCartPrice)
  
  const searchCoffee = ( search:string ) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({animated:true, offset:0})
      setCategoryIndex({index:0, category: categories[0]})
      setSortedCoffee([...CoffeeList.filter((item:any) => item.name.toLowerCase().includes(search.toLowerCase()))])
    }
  }

  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({animated:true, offset:0})
    setCategoryIndex({index:0, category: categories[0]})
    setSortedCoffee([...CoffeeList])
    setSearchText('')
  }

  const CardAddToCart = ({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices, } : any ) => {
    addToCart({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices, })
    calculateCartPrice()
    ToastAndroid.showWithGravity(`${name} is Added to Cart`,ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.themeBlack} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>

        {/* Header Bar */}
        <HeaderBar />

        <Text style={styles.ScreenTitle}>Find the best {'\n'}coffee for you</Text>

        {/* Search Bar */}
        <View style={styles.SearchBarContainer}>
          <CustomIcons style={styles.SearchIcon} name='search' size={18} color={searchText.length>0 ? COLORS.themePeach : COLORS.themeWhite } />
          <TextInput 
            placeholder='Find Your Coffee...'  
            value={searchText} 
            onChangeText={ text => {
              setSearchText(text)
              searchCoffee(text)
            }} 
            style={styles.SearchTextContainer}
            placeholderTextColor={COLORS.themeWhite}
          />
          {
            searchText.length > 0 
            ? (
                <TouchableOpacity onPress={() => {resetSearchCoffee()}}>
                  <CustomIcons style={styles.InputIcon} name='close' size={16} color={COLORS.themeLightOrange} />
                </TouchableOpacity>
              ) 
            : ( <></> )
          }
        </View>

        {/* Categories Menu */}
        <ScrollView
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.CategoryScrollViewStyle}
        >
          {
              categories.map(( data,index ) => (
                <View key={index.toString()} style={styles.CategoryContainer}>
                  <TouchableOpacity style={styles.CategoryStyle} onPress={() => {
                    ListRef?.current?.scrollToOffset({animated:true, offset:0})
                    // change categary index inrder to jump through different categories
                    setCategoryIndex({index:index, category:categories[index]})
                    // sort displaying coffee according to category 
                    setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)])
                  }}>
                    <Text 
                      style={[
                        styles.CategoryText, 
                        categoryIndex.index == index ? {color: COLORS.themeLightOrange,} : {}
                      ]}>
                        {data}
                    </Text>
                    { // dot sign of selected category
                      categoryIndex.index == index 
                      ? ( <View style={styles.ActiveCategory}/> ) 
                      : ( <></> )
                    }
                  </TouchableOpacity>
                </View>
              ))
            }
        </ScrollView>

        {/* Display Coffee */}
        <FlatList
          ref={ListRef}
          ListEmptyComponent={
            <View style={styles.CoffeeUnavailable}>
              <Text style={styles.CategoryText}>Coffee isn't Available!</Text>
            </View>
          }
          horizontal 
          showsHorizontalScrollIndicator={false} 
          data={sortedCoffee} 
          contentContainerStyle={styles.FlatListContainer} 
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <TouchableOpacity onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }}>
              <ItemCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.image_square}
                name={item.name}
                special_ingredient={item.note}
                average_rating={item.rate}
                price={item.prices[2]}
                buttonPressHandler={CardAddToCart} 
              />
            </TouchableOpacity>
          }} 
        />

        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

        {/* Display Beans */}
        <FlatList 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          data={BeansList} 
          contentContainerStyle={styles.FlatListContainer} 
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <TouchableOpacity onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }}>
              <ItemCard 
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.image_square}
                name={item.name}
                special_ingredient={item.note}
                average_rating={item.rate}
                price={item.prices[2]}
                buttonPressHandler={CardAddToCart}
              />
            </TouchableOpacity>
          }} 
        />

        <Text style={styles.CoffeeBeansTitle}>Coffee Makers</Text>

        {/* Display Machines */}
        

      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.themeBlack
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: 48,
    fontFamily: FONTFAMILY.bebas_neue,
    color: COLORS.themePeach,
    paddingLeft: 30,
  },
  // search bar
  SearchBarContainer: {
    flexDirection: 'row',
    margin: 30,
    borderRadius: 20,
    backgroundColor: COLORS.themeGray,
    alignItems: 'center',
  },
  SearchTextContainer: {
    flex: 1,
    height: 60,
    fontFamily: FONTFAMILY.lato_regular,
    fontSize: 14,
    color: COLORS.themeWhite,
  },
  SearchIcon: {
    marginHorizontal: 20,
  },
  // categories menu
  CategoryScrollViewStyle: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  CategoryContainer: {
    paddingHorizontal: 15,
  },
  CategoryStyle: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.lato_bold,
    fontSize: 16,
    color: COLORS.themeGray,
    marginBottom: 4,
  },
  ActiveCategory: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: COLORS.themeLightOrange,
  },
  // Flat List
  FlatListContainer: {
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  CoffeeBeansTitle: {
    fontSize: 24,
    marginLeft: 30,
    marginTop: 20,
    fontFamily: FONTFAMILY.lato_bold,
    color: COLORS.themePeach,
  },
  InputIcon: {
    marginHorizontal: 20,
  },
  CoffeeUnavailable: {
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36*3,
  },
})