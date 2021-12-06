import React from "react"
import { AppContext } from './../Context/AppContext';
import { Button } from 'react-native';

export default function ContextTestView() {
    const ctx = React.useContext(AppContext)
  
    function updateLocation() {
      ctx.update({...ctx, location: "Paul-Emicouilles" })
    }
    return (
      <Button onPress={updateLocation} title={ctx.location} />
    )
  }