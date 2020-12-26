import { gql } from '@apollo/client'

export const UPDATE_REWARD_POINTS = gql`
    mutation updateRewardPoints($userId: uuid!, $rewardPoints: float8!) {
        update_user_by_pk(pk_columns: {userId: $userId}, _inc: {rewardPoints: $rewardPoints}) {
       		rewardPoints
        }
    }
`
export const ADD_PURCHASE = gql`
    mutation addPurchase(
        $userId: uuid!, 
        $purchaseType: String!, 
        $rewardAmount: float8!, 
        $purchaseAmount: float8!) {
        insert_purchaseHistory_one(
        object: {
            purchaseAmount: $purchaseAmount, 
            purchaseType: $purchaseType, 
            rewardAmount: $rewardAmount, 
            userId: $userId
        }) {
            purchaseId
        }
    }
`