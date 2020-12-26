import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView } from 'react-native'
import {
    Text, ListItem
} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

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
    }
})
const PurchaseHistory = () => {

    const list = [
        {
            created_at: '2020-12-26T15:17:00.011791+00:00',
            purchaseAmount: '2',
            purchaseType: 'reward'
        },
        {
            created_at: '2020-12-26T15:23:21.689156+00:00',
            purchaseAmount: '5',
            purchaseType: 'redeem'
        },
        {
            created_at: '2020-12-26T15:17:00.011791+00:00',
            purchaseAmount: '2',
            purchaseType: 'reward'
        },
        {
            created_at: '2020-12-26T15:23:21.689156+00:00',
            purchaseAmount: '5',
            purchaseType: 'redeem'
        },
        {
            created_at: '2020-12-26T15:17:00.011791+00:00',
            purchaseAmount: '2',
            purchaseType: 'reward'
        },
        {
            created_at: '2020-12-26T15:23:21.689156+00:00',
            purchaseAmount: '5',
            purchaseType: 'redeem'
        },
        {
            created_at: '2020-12-26T15:17:00.011791+00:00',
            purchaseAmount: '2',
            purchaseType: 'reward'
        },
        {
            created_at: '2020-12-26T15:23:21.689156+00:00',
            purchaseAmount: '5',
            purchaseType: 'redeem'
        },
        {
            created_at: '2020-12-26T15:17:00.011791+00:00',
            purchaseAmount: '2',
            purchaseType: 'reward'
        },
        {
            created_at: '2020-12-26T15:23:21.689156+00:00',
            purchaseAmount: '5',
            purchaseType: 'redeem'
        },
    ]

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <Text h1 style={styles.appName}>Drinkwards</Text>
                <ScrollView style={styles.scrollView}>
                    {
                        list.map((item, i) => (
                            <ListItem key={i} bottomDivider>
                                <Icon size={20} color='black' name='credit-card-alt' />
                                <View style={styles.transction}>
                                    <Text h5 style={styles.created_at}>{new Date(item.created_at).toLocaleString()}</Text>
                                    <Text>{item.purchaseType.toUpperCase()}</Text>
                                </View>
                                <View style={styles.purchaseAmount}>
                                    <Text h4
                                        style={{ alignSelf: 'flex-end', fontWeight: 'bold' }}>
                                        ${item.purchaseAmount}
                                    </Text>
                                </View>
                            </ListItem>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
export default PurchaseHistory