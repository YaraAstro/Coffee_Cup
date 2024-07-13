import { create } from "zustand"; // to create a store
import { produce } from "immer"; // update store
import { persist, createJSONStorage } from "zustand/middleware"; // persist the store
import AsyncStorage from "@react-native-async-storage/async-storage"; // the storage we going to use

import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";

export const dataStore = create(
    persist(
        (set, get) => ({
            CoffeeList: CoffeeData,
            BeansList: BeansData,
            CartPrice: 0,
            FavouritesList: [],
            CartList: [],
            OrderHistoryList: [],
            addToCart: ( cartItem:any ) => 
                set(
                    produce( state => {
                        let found = false
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id == cartItem.id){
                                found = true
                                let size = false
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if(state.CartList[i].prices[j].size == cartItem.prices[0].size){
                                        size = true
                                        state.CartList[i].prices[j].quantity++
                                        break
                                    }
                                }
                                if ( size == false ) {
                                    state.CartList[i].prices.push(cartItem.prices[0])
                                }
                                state.CartList[i].prices.sort(( a:any,b:any ) => {
                                    if ( a.size > b.size ) {
                                        return -1
                                    }
                                    if ( a.size < b.size ) {
                                        return 1
                                    }
                                    return 0
                                })
                                break
                            }
                        }
                        if (found == false) {
                            state.CartList.push(cartItem)
                        }
                    })
                ),
            calculateCartPrice: () => set(produce(state => {
                let totalprice = 0
                    for (let i = 0; i < state.CartList.length; i++) {
                        let tempprice = 0;
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                          tempprice = tempprice + parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity;
                        }
                        state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
                        totalprice = totalprice + tempprice;
                    }
                    state.CartPrice = totalprice.toFixed(2).toString();
            })),
            addFavouriteList: ( type:string, id:string ) => set(produce(state => {
                if (type == 'Coffee') {
                    for (let i = 0; i < state.CoffeeList.length; i++) {
                        if (state.CoffeeList[i].id == id) {
                            if (state.CoffeeList[i].favourite == false) {
                                state.CoffeeList[i].favourite = true // pick favs
                                state.FavouritesList.unshift(state.CoffeeList[i]) // make sure that latest pick appears on top
                            } else {
                                state.CoffeeList[i].favourite = false
                            }
                            break
                        }
                    }
                } else if (type == 'Bean') {
                    for (let i = 0; i < state.BeansList.length; i++) {
                        if (state.BeansList[i].id == id) {
                            if (state.BeansList[i].favourite == false) {
                                state.BeansList[i].favourite = true // pick favs
                                state.FavouritesList.unshift(state.BeansList[i]) // make sure that latest pick appears on top
                            } else {
                                state.CoffeeList[i].favourite = false
                            }
                            break
                        }
                    }
                }
            })),
            removeFromFavouritList: ( type:string, id:string ) => set(produce(state => {
                if (type == 'Coffee') {
                    for (let i = 0; i < state.CoffeeList.length; i++) {
                        if (state.CoffeeList[i].id == id) {
                            if (state.CoffeeList[i].favourite == true) {
                                state.CoffeeList[i].favourite = false // remove favs
                            } else {
                                state.CoffeeList[i].favourite = true
                            }
                            break
                        }
                    }
                } else if (type == 'Bean') {
                    for (let i = 0; i < state.BeansList.length; i++) {
                        if (state.BeansList[i].id == id) {
                            if (state.BeansList[i].favourite == true) {
                                state.BeansList[i].favourite = false // remove favs
                            } else {
                                state.CoffeeList[i].favourite = true
                            }
                            break
                        }
                    }
                }
                let spliceIndex = -1
                for (let i = 0; i < state.FavouritesList.length; i++) {
                    if (state.FavouritesList[i].id == id ) {
                        spliceIndex = i
                        break
                    }
                }
                state.FavouritesList.splice(spliceIndex, 1)
            })),
            increaseItemQuantity: ( id:string, size:string ) => set(produce(state => {
                for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id == id) {
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                            if (state.CartList[i].prices[j].size == size) {
                                state.CartList[i].prices[j].quantity++
                                break
                            }
                        }
                    }
                }
            })),
            decreaseItemQuantity: ( id:string, size:string ) => set(produce(state => {
                for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id == id) {
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                            if (state.CartList[i].prices[j].size == size) {
                                if (state.CartList[i].prices[j].quantity > 1) {
                                    state.CartList[i].prices[j].quantity--
                                } else {
                                    state.CartList[i].prices.splice(j, 1)
                                }
                            } else {
                                if (state.CartList[i].prices[j].quantity > 1) {
                                    state.CartList[i].prices[j].quantity--
                                } else {
                                    state.CartList.splice(i, 1)
                                }
                            }
                            break
                        }
                    }
                }
            })),
            purchaseCartItems: () => set(produce(state => {
                let calculateCartTotal = state.CartList.reduce((accumulator:number, currentValue:any) => accumulator + parseFloat(currentValue.ItemPrice), 0)
                
                if (state.OrderHistoryList.length > 0) {
                    state.OrderHistoryList.unshift({
                        OrderDate: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
                        CartList: state.CartList,
                        CartListPrice: calculateCartTotal.toFixed(2).toString(),
                    })
                } else {
                    state.OrderHistoryList.push({
                        OrderDate: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
                        CartList: state.CartList,
                        CartListPrice: calculateCartTotal.toFixed(2).toString(),
                    })
                }

                state.CartList = []
            })),
        }),
        {
            name: 'coffee_cup',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)