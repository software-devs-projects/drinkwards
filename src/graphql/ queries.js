import { gql } from '@apollo/client'

export const GET_REWARD_POINTS = gql`
    query getRewardPoints($userId: uuid!) {
        user_by_pk(userId: $userId) {
        rewardPoints
        }
    }  
`

