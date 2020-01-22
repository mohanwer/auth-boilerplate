import React from "react";
import {withOAuth} from 'aws-amplify-react'

interface Props {
  OAuthSignIn: () => void
}
const HomeBtn = (props: Props) => (
  <button onClick={props.OAuthSignIn}>
    Sign in with AWS
  </button>
)

export const Home = withOAuth(HomeBtn)
