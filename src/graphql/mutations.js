import { gql } from '@apollo/client'

export const UPDATE_REWARD_POINTS = gql`
    mutation updateRewardPoints($userId: uuid!, $rewardPoints: float8!) {
        update_user_by_pk(pk_columns: {userId: $userId}, _inc: {rewardPoints: $rewardPoints}) {
       		rewardPoints
        }
    }
`
