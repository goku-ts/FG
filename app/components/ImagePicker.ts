
import * as ImagePicker from 'expo-image-picker';



export const pickImage = async (ImageSet: any, mode?: string) => {
  // No permissions request is necessary for launching the image library
  // Ask the user for the permission to access the camera
  const permissionResult = mode === "camera" ?
    await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("You've refused to allow this appp to access your camera or media!");
    return;
  }

  let result = mode === "camera" ?

    await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    : await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



  console.log(result);

  if (!result.canceled) {
    ImageSet(result.assets[0].uri);
  }
};
