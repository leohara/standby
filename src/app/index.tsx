import { StyleSheet, Platform, TextInput, TouchableOpacity, ActivityIndicator, View, Modal, KeyboardAvoidingView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
// import { getAIResponse } from './utils/apiClient';

interface Task {
  id: string;
  text: string;
}

export default function Chat() {
  const [messageText, setMessageText] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSendMessage = () => {
    setModalVisible(true);
  };

  const confirmSendMessage = () => {
    setModalVisible(false);
    setMessage(messageText);
    setMessageText("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResponse("その辺にあるよ");
    }, 2000);
  };

  const cancelSendMessage = () => {
    setModalVisible(false);
  };

  return (
    <>
      <KeyboardAvoidingView 
        className="flex-1 p-10"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          className="absolute top-10 left-5 z-10"
        >
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>

        <View
          className="flex-row justify-center items-center p-24 bg-cyan-500 rounded-[50px]"
        >
          {loading ?
            (<ActivityIndicator size="large" color="#0000ff" />)
            :
            (
              <Text
                className="text-center text-black flex-1 text-2xl"
              >
                {response}
              </Text>)}
        </View>

        <View className="flex-row justify-between items-center p-24 bg-[#FF00FF] rounded-[50px]">
          <Text className="text-black text-center flex-1 text-3xl">
            {message}
          </Text>
        </View>

        <View className="flex-1 p-10">
          <View className="flex-row items-center border border-[#ccceee] rounded-full p-1.5 bg-white">
            <TextInput 
              placeholder='コメントを入力' 
              className="flex-1 text-black p-2.5"
              onChangeText={setMessageText}
              value={messageText}
              maxLength={100} // 文字数制限
            />
            <TouchableOpacity
              className="bg-blue-500 p-2.5 rounded-full ml-2.5 flex justify-center items-center"
              onPress={handleSendMessage}
            >
              <Icon name="arrow-upward" color="#fff" />
            </TouchableOpacity>
          </View>
          <Text
            className="text-white text-right mt-1"
          >
            {messageText.length} / 100
          </Text>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }} // Android用に必要らしい、よくわからん
        >
          <View className="flex-1 justify-center items-center m-5 bg-white rounded-lg p-8 shadow-lg">
            <Text className="mb-4 text-center text-xl font-bold text-black">
              本当にこの内容で送信しますか？
            </Text>
            <Text className="mb-5 text-center text-base text-black">
              {messageText}
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-blue-500 rounded-lg p-2.5 mx-2.5"
                onPress={confirmSendMessage}
              >
                <Text className="text-white font-bold text-center">
                  はい
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 rounded-lg p-2.5 mx-2.5"
                onPress={cancelSendMessage}
              >
                <Text className="text-white font-bold text-center">
                  いいえ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </>

  );
}

// const userProfile = {
//   name: 'Taro',
//   relationshipDuration: '2 years 3 months',
//   mood: 'happy',
// };

// getAIResponse(userProfile)
//   .then(response => {
//     console.log(`AI Response: ${response}`);
//   })
//   .catch(error => {
//     console.error('Error fetching AI response:', error);
//   });
