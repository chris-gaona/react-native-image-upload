/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component, Fragment} from 'react';
import {View, Button, Image, Platform} from 'react-native';
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

  handleUploadPhoto = () => {
    fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: this.createFormData(this.state.photo, { userId: "123" })
    })
    .then(res => res.json())
    .then(res => {
      console.log("upload succes", res);
      alert("Upload success!");
      this.setState({ photo: null });
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
  }

  render() {
    const { photo } = this.state

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Fragment>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
            <Button title="Upload" onPress={this.handleUploadPhoto} />
          </Fragment>
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}