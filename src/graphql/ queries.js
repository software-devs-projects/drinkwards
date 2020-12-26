import { gql } from '@apollo/client'

export const GET_REWARD_POINTS = gql`
    query getRewardPoints($userId: uuid!) {
        user_by_pk(userId: $userId) {
        	rewardPoints
        }
    }  
`
export const GET_PURCHASE_HISTORY = gql`
    query getPurchaseHistory($userId: uuid!) {
        purchaseHistory(order_by: {created_at: asc}, where: {userId: {_eq: $userId}}) {
            created_at
            purchaseAmount
            purchaseType
            rewardAmount
        }
    }
`