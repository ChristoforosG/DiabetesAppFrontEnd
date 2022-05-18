import React, { Fragment, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Avatar } from 'react-native-elements'

const mainEmojiRender = (mainStyle, emojiIndex) => {
    const size = 100
    switch (emojiIndex) {
        case 0:
            return (
                <Avatar rounded source={require('../../assets/Reaction/main.png')} size={size} />
            )
        case 1:
            return (
                <Avatar rounded source={require('../../assets/Reaction/angry.png')} size={size} />
            )
        case 2:
            return (
                <Avatar rounded source={require('../../assets/Reaction/happy.png')} size={size} />
            )
        case 3:
            return (
                <Avatar rounded source={require('../../assets/Reaction/sad.png')} size={size} />
            )
        case 4:
            return (
                <Avatar rounded source={require('../../assets/Reaction/neutral.png')} size={size} />
            )
        case 5:
            return (
                <Avatar rounded source={require('../../assets/Reaction/excited.png')} size={size} />
            )
        case 6:
            return (
                <Avatar rounded source={require('../../assets/Reaction/concerned.png')} size={size} />
            )
    }
}

const pickEmoji = (setIsDisabled, setVisible, setMainIndex, index) => {
    setIsDisabled(true)
    setVisible(0)
    setMainIndex(index)

}

const ReactionsComponent = props => {
    const [visible, setVisible] = useState(0)
    const [isDisabled, setIsDisabled] = useState(true)
    const [mainIndex, setMainIndex] = useState(0)
    const emojiDim = 40
    const mainEmojiDim = 51

    const mainReactionButton = {
        borderWidth: 0,
        borderColor: '#1EF6EB',
        position: 'absolute',
        top: props.height / 2 - mainEmojiDim,
        left: props.width / 2 - mainEmojiDim,
        right: props.width / 2 - mainEmojiDim,
        bottom: props.height / 2 - mainEmojiDim
    }
    const HappyButton = {
        borderWidth: 0,
        borderColor: '#1E22F6',
        position: 'absolute',
        top: props.height / 4 - emojiDim,
        left: props.width / 3 - emojiDim,
        right: 2 * props.width / 3 - emojiDim,
        bottom: 3 * props.height / 4 - emojiDim
    }
    const NeutralButton = {
        borderWidth: 0,
        borderColor: '#DCF61E',
        position: 'absolute',
        top: props.height / 4 - emojiDim,
        left: 2 * props.width / 3 - emojiDim,
        right: props.width / 3 - emojiDim,
        bottom: 3 * props.height / 4 - emojiDim
    }
    const SadButton = {
        borderWidth: 0,
        borderColor: '#4AF61E',
        position: 'absolute',
        top: props.height / 2 - emojiDim,
        left: props.width / 5 - emojiDim,
        right: 4 * props.width / 5 - emojiDim,
        bottom: props.height / 2 - emojiDim
    }
    const ExcitedButton = {
        borderWidth: 0,
        borderColor: '#F61E66',
        position: 'absolute',
        top: props.height / 2 - emojiDim,
        left: 4 * props.width / 5 - emojiDim,
        right: props.width / 5 - emojiDim,
        bottom: props.height / 2 - emojiDim
    }
    const AngryButton = {
        borderWidth: 0,
        borderColor: '#C61EF6',
        position: 'absolute',
        top: 3 * props.height / 4 - emojiDim,
        left: props.width / 3 - emojiDim,
        right: 2 * props.width / 3 - emojiDim,
        bottom: props.height / 4 - emojiDim
    }
    const ConcernedButton = {
        borderWidth: 0,
        borderColor: '#C61EF6',
        position: 'absolute',
        top: 3 * props.height / 4 - emojiDim,
        left: 2 * props.width / 3 - emojiDim,
        right: props.width / 3 - emojiDim,
        bottom: props.height / 4 - emojiDim
    }
    return (

        <Fragment>
            <View style={mainReactionButton} >
                <TouchableOpacity activeOpacity={0} disabled={false} onPress={() => {
                    setIsDisabled(!isDisabled)
                    if (visible == 0) {
                        setVisible(1)
                    }
                    if (visible == 1) {
                        setVisible(0)
                    }
                }
                }>
                    {mainEmojiRender(mainReactionButton, mainIndex)}
                </TouchableOpacity>
            </View>
            <View style={AngryButton} opacity={visible}>
                <TouchableOpacity activeOpacity={0} disabled={isDisabled} onPress={() => pickEmoji(setIsDisabled, setVisible, setMainIndex, 1)} >
                    <Avatar rounded source={require('../../assets/Reaction/angry.png')} size='large' />
                </TouchableOpacity>
            </View>
            <View style={HappyButton} opacity={visible}>
                <TouchableOpacity activeOpacity={0} disabled={isDisabled} onPress={() => pickEmoji(setIsDisabled, setVisible, setMainIndex, 2)}>
                    <Avatar rounded source={require('../../assets/Reaction/happy.png')} size='large' />
                </TouchableOpacity>
            </View>
            <View style={SadButton} opacity={visible}>
                <TouchableOpacity activeOpacity={0} disabled={isDisabled} onPress={() => pickEmoji(setIsDisabled, setVisible, setMainIndex, 3)}>
                    <Avatar rounded source={require('../../assets/Reaction/sad.png')} size='large' />
                </TouchableOpacity>
            </View>

            <View style={NeutralButton} opacity={visible}>
                <TouchableOpacity activeOpacity={0} disabled={isDisabled} onPress={() => pickEmoji(setIsDisabled, setVisible, setMainIndex, 4)}>
                    <Avatar rounded source={require('../../assets/Reaction/neutral.png')} size='large' />
                </TouchableOpacity>
            </View >

            <View style={ExcitedButton} opacity={visible}>
                <TouchableOpacity activeOpacity={0} disabled={isDisabled} onPress={() => pickEmoji(setIsDisabled, setVisible, setMainIndex, 5)}>
                    <Avatar rounded source={require('../../assets/Reaction/excited.png')} size='large' />
                </TouchableOpacity>
            </View>

            <View style={ConcernedButton} opacity={visible}>
                <TouchableOpacity activeOpacity={0} disabled={isDisabled} onPress={() => pickEmoji(setIsDisabled, setVisible, setMainIndex, 6)}>
                    <Avatar rounded source={require('../../assets/Reaction/concerned.png')} size='large' />
                </TouchableOpacity>
            </View>


        </Fragment >

    )
}

const styles = StyleSheet.create({
    ViewStyle: {
        borderColor: '#F00',
        borderWidth: 2
    },

})

export default ReactionsComponent