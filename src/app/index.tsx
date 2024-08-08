import { StyleSheet, Platform, TextInput, TouchableOpacity, ActivityIndicator, View, Modal, KeyboardAvoidingView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { getAIResponse } from './apiClient.ts';

interface Task {
  id: string;
  text: string;
}

export default function HomeScreen() {
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
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
          {/* ばつ印のボタンを左上に配置 */}
        <TouchableOpacity style={styles.closeButton}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.response}>
          {loading ? (<ActivityIndicator size="large" color="#0000ff" />) 
          : (<Text style={styles.responseText}>{response}</Text>)}
        </View>

        <View style={styles.selfMassage}>
          <Text style={styles.selfMessageText}>{message}</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='コメントを入力' 
              style={styles.input}
              onChangeText={setMessageText}
              value={messageText}
              maxLength={100} // 文字数制限
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Icon name="arrow-upward" color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.charCount}>{messageText.length} / 100</Text>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }} // Android用に必要らしい、よくわからん
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>本当にこの内容で送信しますか？</Text>
            <Text style={styles.modalMessageText}>{messageText}</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmSendMessage}>
                <Text style={styles.modalButtonText}>はい</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={cancelSendMessage}>
                <Text style={styles.modalButtonText}>いいえ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#ccceee",
    borderWidth: 1,
    borderRadius: 25, 
    padding: 5,
    backgroundColor: '#fff', 
  },
  input: {
    flex: 1,
    color: "#000", 
    padding: 10,
  },
  sendButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: "#fff",
  },
  response: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding:100,
    backgroundColor: "#00FFFF",
    borderRadius: 50,
  },
  responseText: {
    color: "black",
    textAlign: "center",
    flex: 1,
    fontSize: 30,
  },
  selfMassage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 100,
    backgroundColor: "#FF00FF",
    borderRadius: 50,
  },
  selfMessageText: {
    color: "black",
    textAlign: "center",
    flex: 1,
    fontSize: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#eeeeee"
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: "black",
  },
  modalMessageText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: "black",
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  charCount: {
    color: "white",
    textAlign: 'right',
    marginTop: 5,
    marginRight: 10,
  }

});

const userProfile = {
  name: 'Taro',
  relationshipDuration: '2 years 3 months',
  mood: 'happy',
};

getAIResponse(userProfile)
  .then(response => {
    console.log(`AI Response: ${response}`);
  })
  .catch(error => {
    console.error('Error fetching AI response:', error);
  });
