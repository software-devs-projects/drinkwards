import React, { useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Auth } from 'aws-amplify'
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import { useMutation } from '@apollo/client'
import { UPDATE_REWARD_POINTS } from './graphql/mutations'
import { GET_REWARD_POINTS } from './graphql/ queries'


const styles = StyleSheet.create({
	container: {
		height: 300,
		textAlign: 'center'
	}
})

const BusinessHomeScreen = () => {
	const [scan, setScan] = useState(true)
	const [rpoints, setrpoints] = useState(0.0)
	const [amount, setAmount] = useState(0.0)
	const [userId, setUserId] = useState('')
	const [updateRewardPoints] = useMutation(UPDATE_REWARD_POINTS)

	const handleQRCodeRead = e => {
		setEmail(e.data)
		setScan(false)
	}

	const handleChangeAmount = (value) => {
		setAmount(value)

		setrpoints(value * 0.05)
	}

	const handleLogout = () => {
		Auth.signOut()
	}

	const handleSubmit = async () => {

		const user = await Auth.currentAuthenticatedUser()
		const idToken = user.signInUserSession.idToken.jwtToken

		updateRewardPoints({
			variables: {
				userId,
				rewardPoints: rpoints
			},
			context: {
				headers: {
					Authorization: `Bearer ${idToken}`,
					'x-hasura-role': 'buisness'
				}
			},
		})
	}

	return (
		<>
			<View style={styles.container}>
				{scan && (
					<RNCamera
						style={{ flex: 1, alignItems: 'center' }}
						captureAudio={false}
						onBarCodeRead={handleQRCodeRead}
					/>
				)}
			</View>
			<Input
				value={userId}
				disabled
				leftIcon={
					<Icon
						name='user'
						size={24}
						color='black'
					/>
				}
			/>
			<Input
				value={rpoints.toPrecision(2).toString()}
				disabled
				leftIcon={
					<Icon
						name='gift'
						size={24}
						color='black'
					/>
				}
			/>
			<Input
				placeholder='Enter amount'
				value={amount.toString()}
				onChangeText={handleChangeAmount}
				leftIcon={
					<Icon
						name='usd'
						size={24}
						color='black'
					/>
				}
			/>
			<Button disabled={!userId} onPress={handleSubmit} title={'Submit'} />
			<Button onPress={handleLogout} title={'Log out'} />
		</>
	)
}

export default BusinessHomeScreen
