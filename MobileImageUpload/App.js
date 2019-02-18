/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {View, Button, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker'

export default class App extends Component {
  state = {
    photo: null,
  }

  createFormData = (photo, body) => {
    const data = new FormData()

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    })

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    })

    return data
  }

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.launchImageLibrary(options, res => {
      if (res.uri) {
        this.setState({ photo: res })
      }
    })
  }

  render() {
    const { photo } = this.state

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}