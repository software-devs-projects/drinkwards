import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native'
import { Auth } from 'aws-amplify'
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import { useMutation, useLazyQuery } from '@apollo/client'
import { UPDATE_REWARD_POINTS } from './graphql/mutations'
import { GET_REWARD_POINTS } from './graphql/ queries'

const styles = StyleSheet.create({
	container: {
		height: 400,
		textAlign: 'center'
	}
})

const RedeemPoints = () => {
	const [scan, setScan] = useState(true)
	const [rewardPoints, setRewardPoints] = useState(0.0)
	const [pointsToRedeem, setPointsToRedeem] = useState(0.0)
	const [userId, setUserId] = useState('')
	const [getRewardPoints, rewardPointsResponse] = useLazyQuery(GET_REWARD_POINTS)
	const [updateRewardPoints] = useMutation(UPDATE_REWARD_POINTS)

	useEffect(() => {
		if (rewardPointsResponse.data) {
			setRewardPoints(rewardPointsResponse.data.user_by_pk.rewardPoints)
		}
	}, [rewardPointsResponse])

	const handleQRCodeRead = async (e) => {
		setUserId(e.data)
		setScan(false)

		const user = await Auth.currentAuthenticatedUser()
		const { jwtToken } = user.signInUserSession.idToken

		getRewardPoints({
			variables: {
				userId: e.data
			},
			context: {
				headers: {
					Authorization: `Bearer ${jwtToken}`,
					'x-hasura-role': 'business'
				}
			},
		})
	}

	const resetPage = () => {
		setUserId('')
		setRewardPoints(0.0)
		setPointsToRedeem(0.0)
		setScan(true)
	}

	const handleChangeRedeem = (value) => {
		if (value > rewardPoints) {
			return
		}

		setPointsToRedeem(value)
	}

	const redeemAll = () => {
		setPointsToRedeem(rewardPoints)
	}

	const handleSubmit = async () => {

		const user = await Auth.currentAuthenticatedUser()
		const idToken = user.signInUserSession.idToken.jwtToken

		updateRewardPoints({
			variables: {
				userId,
				rewardPoints: -pointsToRedeem
			},
			context: {
				headers: {
					Authorization: `Bearer ${idToken}`,
					'x-hasura-role': 'business'
				}
			},
		})
		resetPage()
	}

	return (
		<SafeAreaView>
			<View style={styles.container}>
				{scan ? (
					<RNCamera
						style={{ flex: 1, alignItems: 'center' }}
						captureAudio={false}
						onBarCodeRead={handleQRCodeRead}
					/>
				) : (
					<>
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
							value={rewardPoints.toFixed(2).toString()}
							disabled
							leftIcon={
								<Icon
									name='money'
									size={24}
									color='black'
								/>
							}
						/>
						<Input
							value={(rewardPoints - pointsToRedeem).toFixed(2).toString()}
							disabled
							leftIcon={
								<Icon
									name='credit-card'
									size={24}
									color='black'
								/>
							}
						/>
						<Input
							placeholder='Points to redeem'
							value={pointsToRedeem.toString()}
							onChangeText={handleChangeRedeem}
							leftIcon={
								<Icon
									name='usd'
									size={24}
									color='black'
								/>
							}
						/>
						<Button disabled={!userId} onPress={redeemAll} title={'Redeem All'} />
						<Button disabled={!userId} onPress={handleSubmit} title={'Confirm Redeem'} />
					</>
				)}
			</View>
			<Button onPress={resetPage} title={'Reset'} />
		</SafeAreaView>
	)
}

export default RedeemPoints