 import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
 import React from 'react'
import { COLORS, FONTFAMILY } from '../themes/theme'
import CustomIcons from './CustomIcons'
import LinearGradient from 'react-native-linear-gradient'

 interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean
    imagelink_portrait: ImageProps
    type: string
    id: string
    favourite: boolean
    name: string
    special_ingredient: string
    ingredients: string
    average_rating: number
    ratings_count: string
    roasted: string
    BackHandler?: any
    ToggleFavourite: any
 }
 
 const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    EnableBackHandler,
    imagelink_portrait,
    type,
    id,
    favourite ,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    ToggleFavourite,
 }) => {
   return (
     <View>
       <ImageBackground source={imagelink_portrait} style={styles.ImageBackground} >
            <View style={styles.ImageHeadBar}>
                <TouchableOpacity onPress={() => {ToggleFavourite(favourite, type, id)}}>
                    <CustomIcons name='heart' size={36} color={ favourite ? COLORS.themeOrange : COLORS.themeBlsckRGBA } />
                </TouchableOpacity>
            </View>
            <LinearGradient
            start={{ x:0,y:0 }} 
            end={{ x:0,y:1 }}
            style={styles.ContentBackdrop}
            colors={[COLORS.themeDarkGayRGBA, COLORS.themeBlack]}>
                <View style={styles.InfoContent}>
                    <View style={styles.InfoRow}>
                        <View>
                            <Text style={styles.ItemInfoTitle}>{name}</Text>
                            <Text style={styles.ItemInfoSubTitle}>{ingredients}</Text>
                        </View>
                        <View style={styles.ItemProperties}>
                            <View style={styles.FirstProperty}>
                                <CustomIcons name={type == 'beans' ? 'bean' : 'coffee' } size={type == 'beans' ? 18 : 24 } color={COLORS.themeLightOrange}/>
                                <Text style={[styles.ItemType, {marginTop: type == 'beans' ? 4 + 2 : 0 }]}>{type}</Text>
                            </View>
                            <View style={styles.FirstProperty}>
                                <CustomIcons name={type == 'beans' ? 'location' : 'drop' } size={18} color={COLORS.themeLightOrange}/>
                                {/* <Text style={styles.ItemIngredients}>{}</Text> */}
                            </View>
                        </View>
                    </View>
                    <View style={styles.InfoRow}>
                        <View style={styles.RatingsContainer}>
                            <CustomIcons name='star' color={COLORS.themeLightOrange} size={20} />
                            <Text style={styles.RatingText}>{average_rating}</Text>
                            <Text style={styles.RatingCount}>({ratings_count})</Text>
                        </View>
                        <View style={styles.Roasted}>
                            <Text style={styles.RoastedText}>{special_ingredient}</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
       </ImageBackground>
     </View>
   )
 }
 
 export default ImageBackgroundInfo
 
 const styles = StyleSheet.create({
    ImageBackground: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between',
    },
    ContentBackdrop: {
        borderTopLeftRadius: 55,
        borderTopEndRadius: 55,
        paddingVertical: 25,
        paddingHorizontal: 30,
        overflow: 'hidden',
    },
    ImageHeadBar: {
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    InfoContent: {
        justifyContent: 'space-between',
        gap: 15,
    },
    InfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ItemInfoTitle: {
        fontFamily: FONTFAMILY.aclonica,
        fontSize: 25,
        color: COLORS.themePeach,
    },
    ItemInfoSubTitle: {
        fontFamily: FONTFAMILY.spectral_regular,
        fontSize: 15,
        color: COLORS.themePeach,
    },
    ItemProperties: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    FirstProperty: {
      height: 55,
      width: 55,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.themeBlsckRGBA,  
    },
    ItemType: {
        fontFamily: FONTFAMILY.lato_regular,
        fontSize: 10,
        color: COLORS.themeLightOrange,
        textTransform: 'capitalize',
    },
    ItemIngredients: {
        fontFamily: FONTFAMILY.lato_regular,
        fontSize: 10,
        color: COLORS.themeWhite,
        marginTop: 4,
    },
    RatingsContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    RatingText: {
        fontFamily: FONTFAMILY.spectral_regular,
        fontSize: 20,
        color: COLORS.themeWhite,
        letterSpacing: 2.5,
    },
    RatingCount: {
        fontFamily: FONTFAMILY.spectral_medium,
        fontSize: 15,
        color: COLORS.themeWhite,
        letterSpacing: 2.5,
    },
    Roasted: {
        height: 55,
        width: 55 * 2 + 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.themeBlsckRGBA,
    },
    RoastedText: {
        fontFamily: FONTFAMILY.spectral_regular,
        fontSize: 12,
        color: COLORS.themeLightOrange,
    },
 })



