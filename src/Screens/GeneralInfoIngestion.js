import React, { useRef, useState } from 'react'
import { StyleSheet, View, StatusBar, FlatList, Dimensions } from 'react-native'
import { Text, Portal, Modal, Appbar, Button, ProgressBar } from 'react-native-paper'
import { generalInfoData } from '../Styling/GeneralInfoFlatList'
import GeneralFirstComponent from '../Components/GeneralFirstComponent'
import { colorPalette } from '../Styling/universalStyles'


const ITEM_HEIGHT = Dimensions.get('window').height / 2

const chooseComponent = (item) => {

    switch (item.id) {
        case 1:
            return (
                <View style={{ height: ITEM_HEIGHT, width: Dimensions.get('window').width, borderWidth: 1 }}>
                    <GeneralFirstComponent id={item.id} />
                </View>
            )
        case 2:
            return (
                <View style={{ height: ITEM_HEIGHT, width: Dimensions.get('window').width, borderWidth: 1 }}>
                    <GeneralFirstComponent id={item.id} />
                </View>
            )
        case 3:
            return (
                <View style={{ height: ITEM_HEIGHT, width: Dimensions.get('window').width, borderWidth: 1 }}>
                    <Text> 3 </Text>
                </View>
            )
    }
}



const GeneralInfoIngestion = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const slidesRef = useRef(null)
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current
    const scrollTo = () => {
        if (currentIndex < 2) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
        }
    }
    const [firstname, setFirstname] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')
    const [insulin, setInsulin] = useState('')
    const [open, setOpen] = React.useState(false)

    return (
        <View style={styles.Container}>
            <Appbar>
                <Appbar.BackAction onPress={() => props.navigation.navigate('Log In')} />
                <Appbar.Content title='Welcome' />
            </Appbar>
            <View>
                <FlatList
                    ref={slidesRef}
                    data={generalInfoData}
                    renderItem={
                        ({ item }) => chooseComponent(item)
                    }
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    scrollEnabled={true}
                    onViewableItemsChanged={viewableItemsChanged}
                    style={{ backgroundColor: colorPalette.background }}
                />
            </View>
            <View style={{ margin: 20 }}>
                <ProgressBar progress={(currentIndex + 1) / 3} />
            </View>
            <View style={styles.ButtonViewStyle}>
                <Button mode="contained" onPress={scrollTo}>
                    Next
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        borderWidth: 0,
        flex: 1,
        marginTop: StatusBar.currentHeight,

    },
    ButtonViewStyle: {
        borderWidth: 0,
        marginTop: Dimensions.get('window').height / 20,
        marginHorizontal: 80
    },
})

export default GeneralInfoIngestion