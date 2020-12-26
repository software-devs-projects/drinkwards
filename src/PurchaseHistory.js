import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView } from 'react-native'
import {
    Text, ListItem
} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useLazyQuery } from '@apollo/client'
import { GET_PURCHASE_HISTORY } from './graphql/queries'
import { Auth } from 'aws-amplify'

const styles = StyleSheet.create({
    appName: {
        color: 'black',
        fontWeight: 'bold',
        margin: 10
    },
    transction: {
        display: 'flex',
        flexDirection: 'column'
    },
    created_at: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    purchaseAmount: {
        display: 'flex',
        flexGrow: 1,
    },
    scrollView: {
        display: 'flex',
        flexGrow: 1
    },
    purchaseInfo: {
        display: 'flex',
        flexDirection: 'row'
    }
})
const PurchaseHistory = () => {
    const [getPurchaseHstory, purchaseHistoryResponse] = useLazyQuery(GET_PURCHASE_HISTORY)
    const [purchaseHistory, setpurchaseHistory] = useState([])


    const getUserData = async () => {
        const user = await Auth.currentAuthenticatedUser()
        const { sub } = user.attributes
        console.log('sub', sub)
        const { jwtToken } = user.signInUserSession.idToken

        console.log(jwtToken)

        getPurchaseHstory({
            variables: {
                userId: sub
            },
            context: {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        })
    }

    useEffect(() => {
        getUserData()
    }, [])

    useEffect(() => {
        if (purchaseHistoryResponse.data) {
            console.log(purchaseHistoryResponse.data)
            setpurchaseHistory(purchaseHistoryResponse.data.purchaseHistory)
        }
    }, [purchaseHistoryResponse])

    // console.log(purchaseHistoryResponse.error)

    const purchaseHistoryView = (
        <React.Fragment>
            <ScrollView style={styles.scrollView}>
                {
                    purchaseHistory.map((item, i) => (
                        <ListItem key={i} bottomDivider>

                            <Icon size={20} color='black' name='credit-card-alt' />
                            <View style={styles.purchaseAmount}>

                                <View style={styles.purchaseInfo}>
                                    <Text>PURCHASE</Text>
                                    <View style={styles.purchaseAmount}>
                                        <Text style={{ alignSelf: 'flex-end' }}>${item.purchaseAmount}</Text>
                                    </View>
                                </View>

                                <View style={styles.purchaseInfo}>
                                    <Text>{item.purchaseType.toUpperCase()}</Text>
                                    <View style={styles.purchaseAmount}>
                                        <Text style={{ alignSelf: 'flex-end' }}>${item.rewardAmount}</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={styles.transction}>
                                <Text h5 style={styles.created_at}>{new Date(item.created_at).toLocaleString()}</Text>
                            </View>
                        </ListItem>
                    ))
                }
            </ScrollView>

        </React.Fragment>
    )

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <Text h1 style={styles.appName}>Drinkwards</Text>
                {
                    !purchaseHistory ? <Text h4 style={styles.appName}>Make a Purchase Soon!</Text> :
                        purchaseHistoryView
                }
            </SafeAreaView>
        </>
    )
}
export default PurchaseHistory